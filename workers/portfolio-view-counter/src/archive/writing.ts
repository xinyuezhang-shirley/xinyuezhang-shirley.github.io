/**
 * Writing pieces — drafts, versions, publish, annotations, thought links.
 */

import { newId } from "../lib/crypto";
import { recordChange } from "../content/drafts";

export type WritingStatus = "draft" | "private" | "public" | "archived";

export type WritingRow = {
  id: string;
  owner_id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  type: string;
  status: string;
  visibility: string;
  excerpt: string | null;
  structured_content: string;
  cover_image_id: string | null;
  created_at: number;
  updated_at: number;
  published_at: number | null;
  archived_at: number | null;
  show_origin: number;
  source_conversation_id: string | null;
};

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "untitled"
  );
}

const EMPTY_DOC = JSON.stringify({
  type: "doc",
  content: [{ type: "paragraph" }],
});

export function toPublicWriting(row: WritingRow, annotations?: unknown[]) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    type: row.type,
    excerpt: row.excerpt,
    structured_content: JSON.parse(row.structured_content || EMPTY_DOC),
    published_at: row.published_at,
    updated_at: row.updated_at,
    show_origin: row.show_origin === 1,
    annotations: annotations || [],
  };
}

export function toPublicWritingIndex(row: WritingRow) {
  let readingMins = 1;
  try {
    const doc = JSON.parse(row.structured_content || "{}") as {
      content?: Array<{ text?: string; content?: Array<{ text?: string }> }>;
    };
    const text = JSON.stringify(doc);
    readingMins = Math.max(1, Math.round(text.length / 1800));
  } catch {
    /* ignore */
  }
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    type: row.type,
    excerpt: row.excerpt,
    published_at: row.published_at,
    updated_at: row.updated_at,
    reading_minutes: readingMins,
  };
}

export async function createWriting(
  db: D1Database,
  ownerId: string,
  data: {
    title?: string;
    subtitle?: string | null;
    type?: string;
    structuredContent?: unknown;
    conversationId?: string | null;
    thoughtIds?: string[];
  },
): Promise<WritingRow> {
  const now = Date.now();
  const id = newId("wrt");
  const title = (data.title || "Untitled").slice(0, 200);
  let slug = slugify(title);
  const clash = await db
    .prepare(`SELECT id FROM writing_pieces WHERE slug = ?`)
    .bind(slug)
    .first();
  if (clash) slug = `${slug}-${id.slice(-6)}`;

  const content =
    data.structuredContent !== undefined
      ? JSON.stringify(data.structuredContent)
      : EMPTY_DOC;

  await db
    .prepare(
      `INSERT INTO writing_pieces
      (id, owner_id, slug, title, subtitle, type, status, visibility, excerpt,
       structured_content, cover_image_id, created_at, updated_at, published_at,
       archived_at, show_origin, source_conversation_id)
      VALUES (?, ?, ?, ?, ?, ?, 'draft', 'private', NULL, ?, NULL, ?, ?, NULL, NULL, 0, ?)`,
    )
    .bind(
      id,
      ownerId,
      slug,
      title,
      data.subtitle ?? null,
      data.type || "essay",
      content,
      now,
      now,
      data.conversationId ?? null,
    )
    .run();

  if (data.thoughtIds?.length) {
    for (const tid of data.thoughtIds) {
      await linkThoughtToWriting(db, ownerId, tid, id, "seed");
    }
  }

  const row = (await getWriting(db, ownerId, id))!;
  await recordChange(db, {
    ownerId,
    contentType: "writing",
    contentId: id,
    operation: "create_draft",
    after: { id, title, slug, status: "draft" },
    conversationId: data.conversationId,
  });
  return row;
}

export async function getWriting(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<WritingRow | null> {
  return (
    (await db
      .prepare(`SELECT * FROM writing_pieces WHERE id = ? AND owner_id = ?`)
      .bind(id, ownerId)
      .first<WritingRow>()) ?? null
  );
}

export async function getWritingBySlug(
  db: D1Database,
  slug: string,
  opts?: { publicOnly?: boolean },
): Promise<WritingRow | null> {
  const row = await db
    .prepare(`SELECT * FROM writing_pieces WHERE slug = ?`)
    .bind(slug)
    .first<WritingRow>();
  if (!row) return null;
  if (opts?.publicOnly && row.status !== "public") return null;
  return row;
}

export async function listOwnerWriting(
  db: D1Database,
  ownerId: string,
  opts?: { status?: string; limit?: number },
): Promise<WritingRow[]> {
  const limit = opts?.limit ?? 50;
  if (opts?.status && opts.status !== "all") {
    const { results } = await db
      .prepare(
        `SELECT * FROM writing_pieces WHERE owner_id = ? AND status = ?
         ORDER BY updated_at DESC LIMIT ?`,
      )
      .bind(ownerId, opts.status, limit)
      .all<WritingRow>();
    return results || [];
  }
  const { results } = await db
    .prepare(
      `SELECT * FROM writing_pieces WHERE owner_id = ?
       ORDER BY updated_at DESC LIMIT ?`,
    )
    .bind(ownerId, limit)
    .all<WritingRow>();
  return results || [];
}

export async function listPublicWriting(db: D1Database, limit = 40) {
  const { results } = await db
    .prepare(
      `SELECT * FROM writing_pieces WHERE status = 'public'
       ORDER BY published_at DESC LIMIT ?`,
    )
    .bind(limit)
    .all<WritingRow>();
  return (results || []).map(toPublicWritingIndex);
}

export async function updateWriting(
  db: D1Database,
  ownerId: string,
  id: string,
  patch: {
    title?: string;
    subtitle?: string | null;
    type?: string;
    excerpt?: string | null;
    structuredContent?: unknown;
    showOrigin?: boolean;
    coverImageId?: string | null;
    slug?: string;
  },
): Promise<WritingRow> {
  const before = await getWriting(db, ownerId, id);
  if (!before) throw new Error("writing_not_found");
  const now = Date.now();

  let slug = before.slug;
  if (patch.slug) {
    slug = slugify(patch.slug);
    const clash = await db
      .prepare(`SELECT id FROM writing_pieces WHERE slug = ? AND id != ?`)
      .bind(slug, id)
      .first();
    if (clash) throw new Error("slug_taken");
  } else if (patch.title && before.status === "draft") {
    const next = slugify(patch.title);
    const clash = await db
      .prepare(`SELECT id FROM writing_pieces WHERE slug = ? AND id != ?`)
      .bind(next, id)
      .first();
    if (!clash) slug = next;
  }

  const content =
    patch.structuredContent !== undefined
      ? JSON.stringify(patch.structuredContent)
      : before.structured_content;

  await db
    .prepare(
      `UPDATE writing_pieces SET title = ?, subtitle = ?, type = ?, excerpt = ?,
       structured_content = ?, cover_image_id = ?, slug = ?, show_origin = ?, updated_at = ?
       WHERE id = ? AND owner_id = ?`,
    )
    .bind(
      patch.title?.slice(0, 200) ?? before.title,
      patch.subtitle !== undefined ? patch.subtitle : before.subtitle,
      patch.type ?? before.type,
      patch.excerpt !== undefined ? patch.excerpt : before.excerpt,
      content,
      patch.coverImageId !== undefined ? patch.coverImageId : before.cover_image_id,
      slug,
      patch.showOrigin !== undefined
        ? patch.showOrigin
          ? 1
          : 0
        : before.show_origin,
      now,
      id,
      ownerId,
    )
    .run();

  return (await getWriting(db, ownerId, id))!;
}

export async function saveWritingVersion(
  db: D1Database,
  writingId: string,
  title: string,
  structuredContent: string,
  source: string,
) {
  await db
    .prepare(
      `INSERT INTO writing_versions
      (id, writing_id, structured_content_snapshot, title_snapshot, source, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(newId("wver"), writingId, structuredContent, title, source, Date.now())
    .run();
}

export async function publishWriting(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<WritingRow> {
  const before = await getWriting(db, ownerId, id);
  if (!before) throw new Error("writing_not_found");
  if (!before.title.trim()) throw new Error("title_required");
  const now = Date.now();
  await saveWritingVersion(
    db,
    id,
    before.title,
    before.structured_content,
    "publish",
  );
  await db
    .prepare(
      `UPDATE writing_pieces SET status = 'public', visibility = 'public',
       published_at = COALESCE(published_at, ?), updated_at = ?, archived_at = NULL
       WHERE id = ? AND owner_id = ?`,
    )
    .bind(now, now, id, ownerId)
    .run();
  const after = (await getWriting(db, ownerId, id))!;
  await recordChange(db, {
    ownerId,
    contentType: "writing",
    contentId: id,
    operation: "publish",
    before,
    after,
    publishedAt: now,
  });
  return after;
}

export async function unpublishWriting(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<WritingRow> {
  const before = await getWriting(db, ownerId, id);
  if (!before) throw new Error("writing_not_found");
  const now = Date.now();
  await db
    .prepare(
      `UPDATE writing_pieces SET status = 'private', visibility = 'private', updated_at = ?
       WHERE id = ? AND owner_id = ?`,
    )
    .bind(now, id, ownerId)
    .run();
  const after = (await getWriting(db, ownerId, id))!;
  await recordChange(db, {
    ownerId,
    contentType: "writing",
    contentId: id,
    operation: "unpublish",
    before,
    after,
  });
  return after;
}

export async function archiveWriting(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<WritingRow> {
  const before = await getWriting(db, ownerId, id);
  if (!before) throw new Error("writing_not_found");
  const now = Date.now();
  await db
    .prepare(
      `UPDATE writing_pieces SET status = 'archived', visibility = 'private',
       archived_at = ?, updated_at = ? WHERE id = ? AND owner_id = ?`,
    )
    .bind(now, now, id, ownerId)
    .run();
  return (await getWriting(db, ownerId, id))!;
}

export async function listVersions(db: D1Database, writingId: string, limit = 20) {
  const { results } = await db
    .prepare(
      `SELECT id, writing_id, title_snapshot, source, created_at FROM writing_versions
       WHERE writing_id = ? ORDER BY created_at DESC LIMIT ?`,
    )
    .bind(writingId, limit)
    .all();
  return results || [];
}

export async function rollbackWriting(
  db: D1Database,
  ownerId: string,
  writingId: string,
  versionId: string,
): Promise<WritingRow> {
  const piece = await getWriting(db, ownerId, writingId);
  if (!piece) throw new Error("writing_not_found");
  const ver = await db
    .prepare(`SELECT * FROM writing_versions WHERE id = ? AND writing_id = ?`)
    .bind(versionId, writingId)
    .first<{
      structured_content_snapshot: string;
      title_snapshot: string;
    }>();
  if (!ver) throw new Error("version_not_found");
  await saveWritingVersion(
    db,
    writingId,
    piece.title,
    piece.structured_content,
    "pre_rollback",
  );
  await db
    .prepare(
      `UPDATE writing_pieces SET title = ?, structured_content = ?, updated_at = ?
       WHERE id = ? AND owner_id = ?`,
    )
    .bind(ver.title_snapshot, ver.structured_content_snapshot, Date.now(), writingId, ownerId)
    .run();
  return (await getWriting(db, ownerId, writingId))!;
}

export async function createAnnotation(
  db: D1Database,
  ownerId: string,
  writingId: string,
  data: {
    body: string;
    blockId?: string | null;
    textAnchor?: string | null;
    visibility?: "private" | "public";
  },
) {
  const piece = await getWriting(db, ownerId, writingId);
  if (!piece) throw new Error("writing_not_found");
  const now = Date.now();
  const id = newId("wann");
  await db
    .prepare(
      `INSERT INTO writing_annotations
      (id, writing_id, block_id, text_anchor, body, visibility, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      writingId,
      data.blockId ?? null,
      data.textAnchor ?? null,
      data.body.slice(0, 4000),
      data.visibility ?? "private",
      now,
      now,
    )
    .run();
  await recordChange(db, {
    ownerId,
    contentType: "writing_annotation",
    contentId: id,
    operation: "create",
    after: { id, writingId, visibility: data.visibility ?? "private" },
  });
  return { id, writingId, body: data.body, visibility: data.visibility ?? "private" };
}

export async function listAnnotations(
  db: D1Database,
  writingId: string,
  opts?: { publicOnly?: boolean },
) {
  if (opts?.publicOnly) {
    const { results } = await db
      .prepare(
        `SELECT id, writing_id, block_id, text_anchor, body, visibility, created_at, updated_at
         FROM writing_annotations WHERE writing_id = ? AND visibility = 'public'
         ORDER BY created_at ASC`,
      )
      .bind(writingId)
      .all();
    return results || [];
  }
  const { results } = await db
    .prepare(
      `SELECT id, writing_id, block_id, text_anchor, body, visibility, created_at, updated_at
       FROM writing_annotations WHERE writing_id = ? ORDER BY created_at ASC`,
    )
    .bind(writingId)
    .all();
  return results || [];
}

export async function linkThoughtToWriting(
  db: D1Database,
  ownerId: string,
  thoughtId: string,
  writingId: string,
  relationshipType: string,
) {
  const thought = await db
    .prepare(`SELECT id FROM thoughts WHERE id = ? AND owner_id = ?`)
    .bind(thoughtId, ownerId)
    .first();
  const writing = await getWriting(db, ownerId, writingId);
  if (!thought || !writing) throw new Error("link_target_not_found");
  const id = newId("twl");
  await db
    .prepare(
      `INSERT INTO thought_writing_links (id, thought_id, writing_id, relationship_type, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(id, thoughtId, writingId, relationshipType.slice(0, 40), Date.now())
    .run();
  await recordChange(db, {
    ownerId,
    contentType: "thought_writing_link",
    contentId: id,
    operation: relationshipType,
    after: { thoughtId, writingId, relationshipType },
  });
  return { id, thoughtId, writingId, relationshipType };
}

/** Public origin trail — only public/passing/permanent thoughts. */
export async function getPublicOriginTrail(db: D1Database, writingId: string) {
  const { results } = await db
    .prepare(
      `SELECT t.id, t.text, t.edited_text, t.visibility, t.created_at, l.relationship_type
       FROM thought_writing_links l
       JOIN thoughts t ON t.id = l.thought_id
       WHERE l.writing_id = ?
         AND t.visibility IN ('passing', 'public', 'permanent')
       ORDER BY t.created_at ASC`,
    )
    .bind(writingId)
    .all<{
      id: string;
      text: string;
      edited_text: string | null;
      visibility: string;
      created_at: number;
      relationship_type: string;
    }>();
  return (results || []).map((r) => ({
    id: r.id,
    text: r.edited_text || r.text,
    visibility: r.visibility,
    created_at: r.created_at,
    relationship_type: r.relationship_type,
  }));
}

export async function getOwnerOriginTrail(
  db: D1Database,
  ownerId: string,
  writingId: string,
) {
  const piece = await getWriting(db, ownerId, writingId);
  if (!piece) return [];
  const { results } = await db
    .prepare(
      `SELECT t.id, t.text, t.edited_text, t.visibility, t.created_at, l.relationship_type
       FROM thought_writing_links l
       JOIN thoughts t ON t.id = l.thought_id
       WHERE l.writing_id = ? AND t.owner_id = ?
       ORDER BY t.created_at ASC`,
    )
    .bind(writingId, ownerId)
    .all();
  return results || [];
}
