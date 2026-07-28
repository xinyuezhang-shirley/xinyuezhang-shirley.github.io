/**
 * Content drafts + activity log for conversational CMS.
 */

import { newId } from "../lib/crypto";

export type ContentType =
  | "artwork"
  | "photo_collection"
  | "dream"
  | "atlas_change";

export type DraftRow = {
  id: string;
  owner_id: string;
  content_type: ContentType;
  target_content_id: string | null;
  operation_type: string;
  proposed_data: string;
  source_conversation_id: string | null;
  source_message_id: string | null;
  validation_status: string;
  preview_status: string;
  status: string;
  created_at: number;
  updated_at: number;
  expires_at: number | null;
};

export async function createDraft(
  db: D1Database,
  args: {
    ownerId: string;
    contentType: ContentType;
    operationType: string;
    proposedData: unknown;
    targetContentId?: string | null;
    conversationId?: string | null;
    messageId?: string | null;
  },
): Promise<DraftRow> {
  const now = Date.now();
  const id = newId("draft");
  const row: DraftRow = {
    id,
    owner_id: args.ownerId,
    content_type: args.contentType,
    target_content_id: args.targetContentId ?? null,
    operation_type: args.operationType,
    proposed_data: JSON.stringify(args.proposedData ?? {}),
    source_conversation_id: args.conversationId ?? null,
    source_message_id: args.messageId ?? null,
    validation_status: "pending",
    preview_status: "none",
    status: "open",
    created_at: now,
    updated_at: now,
    expires_at: now + 30 * 86_400_000,
  };
  await db
    .prepare(
      `INSERT INTO content_drafts
      (id, owner_id, content_type, target_content_id, operation_type, proposed_data,
       source_conversation_id, source_message_id, validation_status, preview_status,
       status, created_at, updated_at, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      row.id,
      row.owner_id,
      row.content_type,
      row.target_content_id,
      row.operation_type,
      row.proposed_data,
      row.source_conversation_id,
      row.source_message_id,
      row.validation_status,
      row.preview_status,
      row.status,
      row.created_at,
      row.updated_at,
      row.expires_at,
    )
    .run();
  return row;
}

export async function getDraft(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<DraftRow | null> {
  return (
    (await db
      .prepare(`SELECT * FROM content_drafts WHERE id = ? AND owner_id = ?`)
      .bind(id, ownerId)
      .first<DraftRow>()) ?? null
  );
}

export async function listDrafts(
  db: D1Database,
  ownerId: string,
  opts?: { status?: string; limit?: number },
): Promise<DraftRow[]> {
  const status = opts?.status ?? "open";
  const limit = opts?.limit ?? 30;
  const { results } = await db
    .prepare(
      `SELECT * FROM content_drafts WHERE owner_id = ? AND status = ?
       ORDER BY updated_at DESC LIMIT ?`,
    )
    .bind(ownerId, status, limit)
    .all<DraftRow>();
  return results || [];
}

export async function updateDraft(
  db: D1Database,
  ownerId: string,
  id: string,
  patch: {
    proposedData?: unknown;
    validationStatus?: string;
    previewStatus?: string;
    status?: string;
    targetContentId?: string | null;
  },
): Promise<DraftRow | null> {
  const existing = await getDraft(db, ownerId, id);
  if (!existing) return null;
  const now = Date.now();
  const proposed =
    patch.proposedData !== undefined
      ? JSON.stringify(patch.proposedData)
      : existing.proposed_data;
  const validation = patch.validationStatus ?? existing.validation_status;
  const preview = patch.previewStatus ?? existing.preview_status;
  const status = patch.status ?? existing.status;
  const target =
    patch.targetContentId !== undefined
      ? patch.targetContentId
      : existing.target_content_id;
  await db
    .prepare(
      `UPDATE content_drafts SET proposed_data = ?, validation_status = ?,
       preview_status = ?, status = ?, target_content_id = ?, updated_at = ?
       WHERE id = ? AND owner_id = ?`,
    )
    .bind(proposed, validation, preview, status, target, now, id, ownerId)
    .run();
  return getDraft(db, ownerId, id);
}

export async function recordChange(
  db: D1Database,
  args: {
    ownerId: string;
    contentType: string;
    contentId?: string | null;
    operation: string;
    before?: unknown;
    after?: unknown;
    draftId?: string | null;
    conversationId?: string | null;
    messageId?: string | null;
    status?: string;
    publishedAt?: number | null;
  },
): Promise<string> {
  const id = newId("chg");
  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO content_changes
      (id, owner_id, content_type, content_id, operation, before_snapshot, after_snapshot,
       source_conversation_id, source_message_id, draft_id, status, created_at, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      args.ownerId,
      args.contentType,
      args.contentId ?? null,
      args.operation,
      args.before != null ? JSON.stringify(args.before) : null,
      args.after != null ? JSON.stringify(args.after) : null,
      args.conversationId ?? null,
      args.messageId ?? null,
      args.draftId ?? null,
      args.status ?? "applied",
      now,
      args.publishedAt ?? null,
    )
    .run();
  return id;
}

export async function listChanges(
  db: D1Database,
  ownerId: string,
  limit = 40,
): Promise<
  Array<{
    id: string;
    content_type: string;
    content_id: string | null;
    operation: string;
    status: string;
    created_at: number;
    published_at: number | null;
    reverted_at: number | null;
  }>
> {
  const { results } = await db
    .prepare(
      `SELECT id, content_type, content_id, operation, status, created_at, published_at, reverted_at
       FROM content_changes WHERE owner_id = ? ORDER BY created_at DESC LIMIT ?`,
    )
    .bind(ownerId, limit)
    .all();
  return (results || []) as Array<{
    id: string;
    content_type: string;
    content_id: string | null;
    operation: string;
    status: string;
    created_at: number;
    published_at: number | null;
    reverted_at: number | null;
  }>;
}

export async function getChange(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<{
  id: string;
  content_type: string;
  content_id: string | null;
  operation: string;
  before_snapshot: string | null;
  after_snapshot: string | null;
  status: string;
  created_at: number;
  reverted_at: number | null;
} | null> {
  return (
    (await db
      .prepare(`SELECT * FROM content_changes WHERE id = ? AND owner_id = ?`)
      .bind(id, ownerId)
      .first()) ?? null
  );
}

export async function markChangeReverted(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<void> {
  await db
    .prepare(
      `UPDATE content_changes SET status = 'reverted', reverted_at = ? WHERE id = ? AND owner_id = ?`,
    )
    .bind(Date.now(), id, ownerId)
    .run();
}

export function parseProposed<T = Record<string, unknown>>(draft: DraftRow): T {
  try {
    return JSON.parse(draft.proposed_data) as T;
  } catch {
    return {} as T;
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || `item-${Date.now().toString(36)}`;
}
