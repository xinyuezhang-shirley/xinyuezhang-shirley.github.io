/** Owner conversation persistence + rolling summaries. */

import { newId } from "../lib/crypto";

export type ConversationRow = {
  id: string;
  user_id: string | null;
  visitor_session_id: string | null;
  mode: "public" | "owner";
  title: string | null;
  summary: string | null;
  created_at: number;
  updated_at: number;
};

export type MessageRow = {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: number;
  metadata: string | null;
};

export async function createConversation(
  db: D1Database,
  args: {
    mode: "public" | "owner";
    userId?: string | null;
    visitorSessionId?: string | null;
    title?: string | null;
  },
): Promise<ConversationRow> {
  const now = Date.now();
  const id = newId("conv");
  await db
    .prepare(
      `INSERT INTO conversations (id, user_id, visitor_session_id, mode, title, summary, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NULL, ?, ?)`,
    )
    .bind(
      id,
      args.userId ?? null,
      args.visitorSessionId ?? null,
      args.mode,
      args.title ?? null,
      now,
      now,
    )
    .run();

  return {
    id,
    user_id: args.userId ?? null,
    visitor_session_id: args.visitorSessionId ?? null,
    mode: args.mode,
    title: args.title ?? null,
    summary: null,
    created_at: now,
    updated_at: now,
  };
}

export async function getConversationForOwner(
  db: D1Database,
  userId: string,
  conversationId: string,
): Promise<ConversationRow | null> {
  return (
    (await db
      .prepare(
        `SELECT id, user_id, visitor_session_id, mode, title, summary, created_at, updated_at
         FROM conversations WHERE id = ? AND user_id = ? AND mode = 'owner' LIMIT 1`,
      )
      .bind(conversationId, userId)
      .first<ConversationRow>()) ?? null
  );
}

export async function listOwnerConversations(
  db: D1Database,
  userId: string,
  limit = 30,
): Promise<ConversationRow[]> {
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, visitor_session_id, mode, title, summary, created_at, updated_at
           FROM conversations WHERE user_id = ? AND mode = 'owner'
           ORDER BY updated_at DESC LIMIT ?`,
        )
        .bind(userId, Math.min(Math.max(limit, 1), 50))
        .all<ConversationRow>()
    ).results ?? []
  );
}

export async function appendMessage(
  db: D1Database,
  args: {
    conversationId: string;
    role: "user" | "assistant" | "system" | "tool";
    content: string;
    metadata?: Record<string, unknown> | null;
  },
): Promise<MessageRow> {
  const now = Date.now();
  const id = newId("msg");
  const content = args.content.slice(0, 20_000);
  const metadata = args.metadata ? JSON.stringify(args.metadata) : null;
  await db
    .prepare(
      `INSERT INTO messages (id, conversation_id, role, content, created_at, metadata)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, args.conversationId, args.role, content, now, metadata)
    .run();
  await db
    .prepare("UPDATE conversations SET updated_at = ? WHERE id = ?")
    .bind(now, args.conversationId)
    .run();
  return {
    id,
    conversation_id: args.conversationId,
    role: args.role,
    content,
    created_at: now,
    metadata,
  };
}

export async function listMessages(
  db: D1Database,
  conversationId: string,
  limit = 100,
): Promise<MessageRow[]> {
  return (
    (
      await db
        .prepare(
          `SELECT id, conversation_id, role, content, created_at, metadata
           FROM messages WHERE conversation_id = ?
           ORDER BY created_at ASC LIMIT ?`,
        )
        .bind(conversationId, Math.min(Math.max(limit, 1), 200))
        .all<MessageRow>()
    ).results ?? []
  );
}

export async function updateConversationSummary(
  db: D1Database,
  userId: string,
  conversationId: string,
  summary: string,
  title?: string | null,
): Promise<boolean> {
  const owned = await getConversationForOwner(db, userId, conversationId);
  if (!owned) return false;
  const now = Date.now();
  await db
    .prepare(
      `UPDATE conversations SET summary = ?, title = COALESCE(?, title), updated_at = ?
       WHERE id = ? AND user_id = ?`,
    )
    .bind(summary.slice(0, 8000), title ?? null, now, conversationId, userId)
    .run();
  return true;
}

export async function searchOwnerConversationSummaries(
  db: D1Database,
  userId: string,
  query: string,
  limit = 5,
): Promise<ConversationRow[]> {
  const q = query.trim().slice(0, 200);
  const like = q ? `%${q.replace(/[%_]/g, "")}%` : "%";
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, visitor_session_id, mode, title, summary, created_at, updated_at
           FROM conversations
           WHERE user_id = ? AND mode = 'owner'
             AND (IFNULL(summary, '') LIKE ? OR IFNULL(title, '') LIKE ?)
           ORDER BY updated_at DESC LIMIT ?`,
        )
        .bind(userId, like, like, Math.min(Math.max(limit, 1), 10))
        .all<ConversationRow>()
    ).results ?? []
  );
}

export async function deleteOwnerConversation(
  db: D1Database,
  userId: string,
  conversationId: string,
): Promise<boolean> {
  const owned = await getConversationForOwner(db, userId, conversationId);
  if (!owned) return false;
  await db.prepare("DELETE FROM messages WHERE conversation_id = ?").bind(conversationId).run();
  const result = await db
    .prepare("DELETE FROM conversations WHERE id = ? AND user_id = ?")
    .bind(conversationId, userId)
    .run();
  return (result.meta.changes ?? 0) > 0;
}

/** Heuristic rolling summary when message count grows (no extra LLM call). */
export function buildRollingSummary(
  messages: Array<{ role: string; content: string }>,
): string {
  const recent = messages.slice(-24);
  const lines: string[] = [];
  for (const m of recent) {
    const role = m.role === "user" ? "Shirley" : m.role === "assistant" ? "Agent" : m.role;
    lines.push(`${role}: ${m.content.slice(0, 240)}`);
  }
  return lines.join("\n").slice(0, 4000);
}
