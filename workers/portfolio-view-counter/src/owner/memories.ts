/** Memory CRUD — owner-private only. Never expose via public routes. */

import { newId } from "../lib/crypto";

export type MemoryRow = {
  id: string;
  user_id: string;
  content: string;
  category: string | null;
  importance: number;
  confidence: number;
  source_message_id: string | null;
  source_conversation_id: string | null;
  created_at: number;
  updated_at: number;
  archived_at: number | null;
};

export type MemoryInput = {
  content: string;
  category?: string | null;
  importance?: number;
  confidence?: number;
  sourceMessageId?: string | null;
  sourceConversationId?: string | null;
};

function clamp01(n: number, fallback: number): number {
  if (!Number.isFinite(n)) return fallback;
  return Math.min(1, Math.max(0, n));
}

export async function createMemory(
  db: D1Database,
  userId: string,
  input: MemoryInput,
): Promise<MemoryRow> {
  const now = Date.now();
  const id = newId("mem");
  const content = input.content.trim().slice(0, 4000);
  const category = input.category?.trim().slice(0, 64) || null;
  const importance = clamp01(input.importance ?? 0.5, 0.5);
  const confidence = clamp01(input.confidence ?? 0.8, 0.8);

  await db
    .prepare(
      `INSERT INTO memories
       (id, user_id, content, category, importance, confidence, source_message_id, source_conversation_id, embedding, created_at, updated_at, archived_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, NULL)`,
    )
    .bind(
      id,
      userId,
      content,
      category,
      importance,
      confidence,
      input.sourceMessageId ?? null,
      input.sourceConversationId ?? null,
      now,
      now,
    )
    .run();

  console.log(
    JSON.stringify({ event: "memory_create", user_id: userId, memory_id: id }),
  );

  return {
    id,
    user_id: userId,
    content,
    category,
    importance,
    confidence,
    source_message_id: input.sourceMessageId ?? null,
    source_conversation_id: input.sourceConversationId ?? null,
    created_at: now,
    updated_at: now,
    archived_at: null,
  };
}

export async function listMemories(
  db: D1Database,
  userId: string,
  opts?: { includeArchived?: boolean; limit?: number },
): Promise<MemoryRow[]> {
  const limit = Math.min(Math.max(opts?.limit ?? 50, 1), 100);
  if (opts?.includeArchived) {
    return (
      (
        await db
          .prepare(
            `SELECT id, user_id, content, category, importance, confidence,
                    source_message_id, source_conversation_id, created_at, updated_at, archived_at
             FROM memories WHERE user_id = ? ORDER BY updated_at DESC LIMIT ?`,
          )
          .bind(userId, limit)
          .all<MemoryRow>()
      ).results ?? []
    );
  }
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, content, category, importance, confidence,
                  source_message_id, source_conversation_id, created_at, updated_at, archived_at
           FROM memories WHERE user_id = ? AND archived_at IS NULL
           ORDER BY importance DESC, updated_at DESC LIMIT ?`,
        )
        .bind(userId, limit)
        .all<MemoryRow>()
    ).results ?? []
  );
}

export async function searchMemories(
  db: D1Database,
  userId: string,
  query: string,
  limit = 8,
): Promise<MemoryRow[]> {
  const q = query.trim().slice(0, 200);
  if (!q) return listMemories(db, userId, { limit });
  const like = `%${q.replace(/[%_]/g, "")}%`;
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, content, category, importance, confidence,
                  source_message_id, source_conversation_id, created_at, updated_at, archived_at
           FROM memories
           WHERE user_id = ? AND archived_at IS NULL
             AND (content LIKE ? OR IFNULL(category, '') LIKE ?)
           ORDER BY importance DESC, updated_at DESC
           LIMIT ?`,
        )
        .bind(userId, like, like, Math.min(Math.max(limit, 1), 20))
        .all<MemoryRow>()
    ).results ?? []
  );
}

export async function getMemory(
  db: D1Database,
  userId: string,
  id: string,
): Promise<MemoryRow | null> {
  return (
    (await db
      .prepare(
        `SELECT id, user_id, content, category, importance, confidence,
                source_message_id, source_conversation_id, created_at, updated_at, archived_at
         FROM memories WHERE id = ? AND user_id = ? LIMIT 1`,
      )
      .bind(id, userId)
      .first<MemoryRow>()) ?? null
  );
}

export async function updateMemory(
  db: D1Database,
  userId: string,
  id: string,
  patch: Partial<MemoryInput> & { archived?: boolean },
): Promise<MemoryRow | null> {
  const existing = await getMemory(db, userId, id);
  if (!existing) return null;
  const now = Date.now();
  const content = patch.content !== undefined ? patch.content.trim().slice(0, 4000) : existing.content;
  const category =
    patch.category !== undefined
      ? patch.category?.trim().slice(0, 64) || null
      : existing.category;
  const importance =
    patch.importance !== undefined
      ? clamp01(patch.importance, existing.importance)
      : existing.importance;
  const confidence =
    patch.confidence !== undefined
      ? clamp01(patch.confidence, existing.confidence)
      : existing.confidence;
  const archivedAt =
    patch.archived === true
      ? now
      : patch.archived === false
        ? null
        : existing.archived_at;

  await db
    .prepare(
      `UPDATE memories SET content = ?, category = ?, importance = ?, confidence = ?,
       archived_at = ?, updated_at = ? WHERE id = ? AND user_id = ?`,
    )
    .bind(content, category, importance, confidence, archivedAt, now, id, userId)
    .run();

  return getMemory(db, userId, id);
}

export async function deleteMemory(
  db: D1Database,
  userId: string,
  id: string,
): Promise<boolean> {
  const result = await db
    .prepare("DELETE FROM memories WHERE id = ? AND user_id = ?")
    .bind(id, userId)
    .run();
  return (result.meta.changes ?? 0) > 0;
}
