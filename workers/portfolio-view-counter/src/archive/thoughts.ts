/**
 * Thoughts archive — create, visibility, public weighted selection, encounters.
 */

import { newId } from "../lib/crypto";
import { recordChange } from "../content/drafts";

export type ThoughtVisibility =
  | "private"
  | "passing"
  | "public"
  | "permanent"
  | "dormant"
  | "archived";

export type ThoughtType =
  | "fragment"
  | "question"
  | "observation"
  | "contradiction"
  | "idea"
  | "return"
  | "note";

export type ThoughtRow = {
  id: string;
  owner_id: string;
  text: string;
  title: string | null;
  type: string;
  visibility: string;
  created_at: number;
  updated_at: number;
  published_at: number | null;
  dormant_at: number | null;
  archived_at: number | null;
  expires_at: number | null;
  max_public_encounters: number | null;
  public_encounter_count: number;
  last_surfaced_at: number | null;
  resurface_after_days: number | null;
  per_visitor_once: number;
  manual_weight: number;
  pinned: number;
  source_conversation_id: string | null;
  source_message_id: string | null;
  original_text: string;
  edited_text: string | null;
  behavior_json: string | null;
};

const PUBLIC_VIS = new Set(["passing", "public", "permanent"]);

export function toPublicThought(row: ThoughtRow) {
  return {
    id: row.id,
    text: row.edited_text || row.text,
    title: row.title,
    type: row.type,
    visibility: row.visibility,
    created_at: row.created_at,
    pinned: row.pinned === 1,
  };
}

export async function createThought(
  db: D1Database,
  ownerId: string,
  data: {
    text: string;
    title?: string | null;
    type?: ThoughtType;
    visibility?: ThoughtVisibility;
    conversationId?: string | null;
    messageId?: string | null;
    perVisitorOnce?: boolean;
    manualWeight?: number;
    pinned?: boolean;
    expiresAt?: number | null;
    maxPublicEncounters?: number | null;
    resurfaceAfterDays?: number | null;
    behavior?: Record<string, unknown> | null;
    tags?: string[];
  },
): Promise<ThoughtRow> {
  const now = Date.now();
  const id = newId("th");
  const text = data.text.trim().slice(0, 8000);
  if (!text) throw new Error("empty_thought");
  const visibility = data.visibility ?? "private";
  const row = {
    id,
    owner_id: ownerId,
    text,
    title: data.title?.slice(0, 200) ?? null,
    type: data.type ?? "fragment",
    visibility,
    created_at: now,
    updated_at: now,
    published_at: PUBLIC_VIS.has(visibility) ? now : null,
    dormant_at: visibility === "dormant" ? now : null,
    archived_at: visibility === "archived" ? now : null,
    expires_at: data.expiresAt ?? null,
    max_public_encounters: data.maxPublicEncounters ?? null,
    public_encounter_count: 0,
    last_surfaced_at: null as number | null,
    resurface_after_days: data.resurfaceAfterDays ?? null,
    per_visitor_once:
      data.perVisitorOnce !== undefined
        ? data.perVisitorOnce
          ? 1
          : 0
        : visibility === "passing"
          ? 1
          : 0,
    manual_weight: data.manualWeight ?? 0,
    pinned: data.pinned ? 1 : 0,
    source_conversation_id: data.conversationId ?? null,
    source_message_id: data.messageId ?? null,
    original_text: text,
    edited_text: null as string | null,
    behavior_json: data.behavior ? JSON.stringify(data.behavior) : null,
  };

  await db
    .prepare(
      `INSERT INTO thoughts
      (id, owner_id, text, title, type, visibility, created_at, updated_at, published_at,
       dormant_at, archived_at, expires_at, max_public_encounters, public_encounter_count,
       last_surfaced_at, resurface_after_days, per_visitor_once, manual_weight, pinned,
       source_conversation_id, source_message_id, original_text, edited_text, behavior_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      row.id,
      row.owner_id,
      row.text,
      row.title,
      row.type,
      row.visibility,
      row.created_at,
      row.updated_at,
      row.published_at,
      row.dormant_at,
      row.archived_at,
      row.expires_at,
      row.max_public_encounters,
      row.public_encounter_count,
      row.last_surfaced_at,
      row.resurface_after_days,
      row.per_visitor_once,
      row.manual_weight,
      row.pinned,
      row.source_conversation_id,
      row.source_message_id,
      row.original_text,
      row.edited_text,
      row.behavior_json,
    )
    .run();

  await db
    .prepare(
      `INSERT INTO thought_revisions (id, thought_id, body, source, created_at) VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(newId("trev"), id, text, "create", now)
    .run();

  if (data.tags?.length) {
    await setThoughtTags(db, ownerId, id, data.tags);
  }

  await recordChange(db, {
    ownerId,
    contentType: "thought",
    contentId: id,
    operation: "create",
    after: row,
    conversationId: data.conversationId,
  });

  return row as ThoughtRow;
}

export async function getThought(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<ThoughtRow | null> {
  return (
    (await db
      .prepare(`SELECT * FROM thoughts WHERE id = ? AND owner_id = ?`)
      .bind(id, ownerId)
      .first<ThoughtRow>()) ?? null
  );
}

export async function listOwnerThoughts(
  db: D1Database,
  ownerId: string,
  opts?: { visibility?: string; query?: string; limit?: number; offset?: number },
): Promise<ThoughtRow[]> {
  const limit = opts?.limit ?? 100;
  const offset = opts?.offset ?? 0;
  const vis = opts?.visibility;
  const q = opts?.query?.trim();

  if (vis && vis !== "all") {
    if (q) {
      const { results } = await db
        .prepare(
          `SELECT * FROM thoughts WHERE owner_id = ? AND visibility = ?
           AND (text LIKE ? OR IFNULL(title,'') LIKE ? OR IFNULL(edited_text,'') LIKE ?)
           ORDER BY pinned DESC, updated_at DESC LIMIT ? OFFSET ?`,
        )
        .bind(ownerId, vis, `%${q}%`, `%${q}%`, `%${q}%`, limit, offset)
        .all<ThoughtRow>();
      return results || [];
    }
    const { results } = await db
      .prepare(
        `SELECT * FROM thoughts WHERE owner_id = ? AND visibility = ?
         ORDER BY pinned DESC, updated_at DESC LIMIT ? OFFSET ?`,
      )
      .bind(ownerId, vis, limit, offset)
      .all<ThoughtRow>();
    return results || [];
  }

  if (q) {
    const { results } = await db
      .prepare(
        `SELECT * FROM thoughts WHERE owner_id = ?
         AND (text LIKE ? OR IFNULL(title,'') LIKE ? OR IFNULL(edited_text,'') LIKE ?)
         ORDER BY pinned DESC, updated_at DESC LIMIT ? OFFSET ?`,
      )
      .bind(ownerId, `%${q}%`, `%${q}%`, `%${q}%`, limit, offset)
      .all<ThoughtRow>();
    return results || [];
  }

  const { results } = await db
    .prepare(
      `SELECT * FROM thoughts WHERE owner_id = ?
       ORDER BY pinned DESC, updated_at DESC LIMIT ? OFFSET ?`,
    )
    .bind(ownerId, limit, offset)
    .all<ThoughtRow>();
  return results || [];
}

export async function updateThought(
  db: D1Database,
  ownerId: string,
  id: string,
  patch: {
    text?: string;
    title?: string | null;
    type?: ThoughtType;
    visibility?: ThoughtVisibility;
    perVisitorOnce?: boolean;
    manualWeight?: number;
    pinned?: boolean;
    expiresAt?: number | null;
    maxPublicEncounters?: number | null;
    resurfaceAfterDays?: number | null;
    behavior?: Record<string, unknown> | null;
    tags?: string[];
  },
): Promise<ThoughtRow> {
  const before = await getThought(db, ownerId, id);
  if (!before) throw new Error("thought_not_found");
  const now = Date.now();

  let text = before.text;
  let edited = before.edited_text;
  if (patch.text !== undefined) {
    const next = patch.text.trim().slice(0, 8000);
    if (!next) throw new Error("empty_thought");
    if (next !== (before.edited_text || before.text)) {
      edited = next;
      text = before.original_text; // keep original column stable
      await db
        .prepare(
          `INSERT INTO thought_revisions (id, thought_id, body, source, created_at) VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(newId("trev"), id, next, "edit", now)
        .run();
    }
  }

  const visibility = patch.visibility ?? before.visibility;
  const published_at =
    PUBLIC_VIS.has(visibility) && !before.published_at
      ? now
      : before.published_at;
  const dormant_at = visibility === "dormant" ? now : before.dormant_at;
  const archived_at = visibility === "archived" ? now : before.archived_at;

  await db
    .prepare(
      `UPDATE thoughts SET text = ?, title = ?, type = ?, visibility = ?, updated_at = ?,
       published_at = ?, dormant_at = ?, archived_at = ?, expires_at = ?,
       max_public_encounters = ?, resurface_after_days = ?, per_visitor_once = ?,
       manual_weight = ?, pinned = ?, edited_text = ?, behavior_json = ?
       WHERE id = ? AND owner_id = ?`,
    )
    .bind(
      text,
      patch.title !== undefined ? patch.title : before.title,
      patch.type ?? before.type,
      visibility,
      now,
      published_at,
      dormant_at,
      archived_at,
      patch.expiresAt !== undefined ? patch.expiresAt : before.expires_at,
      patch.maxPublicEncounters !== undefined
        ? patch.maxPublicEncounters
        : before.max_public_encounters,
      patch.resurfaceAfterDays !== undefined
        ? patch.resurfaceAfterDays
        : before.resurface_after_days,
      patch.perVisitorOnce !== undefined
        ? patch.perVisitorOnce
          ? 1
          : 0
        : before.per_visitor_once,
      patch.manualWeight !== undefined ? patch.manualWeight : before.manual_weight,
      patch.pinned !== undefined ? (patch.pinned ? 1 : 0) : before.pinned,
      edited,
      patch.behavior !== undefined
        ? patch.behavior
          ? JSON.stringify(patch.behavior)
          : null
        : before.behavior_json,
      id,
      ownerId,
    )
    .run();

  if (patch.tags) {
    await setThoughtTags(db, ownerId, id, patch.tags);
  }

  const after = (await getThought(db, ownerId, id))!;
  await recordChange(db, {
    ownerId,
    contentType: "thought",
    contentId: id,
    operation: patch.visibility ? `visibility_${visibility}` : "update",
    before,
    after,
  });
  return after;
}

export async function deleteThought(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<void> {
  const before = await getThought(db, ownerId, id);
  if (!before) throw new Error("thought_not_found");
  await db.prepare(`DELETE FROM thought_tag_map WHERE thought_id = ?`).bind(id).run();
  await db
    .prepare(`DELETE FROM thought_relationships WHERE from_thought_id = ? OR to_thought_id = ?`)
    .bind(id, id)
    .run();
  await db.prepare(`DELETE FROM thought_writing_links WHERE thought_id = ?`).bind(id).run();
  await db.prepare(`DELETE FROM thought_revisions WHERE thought_id = ?`).bind(id).run();
  await db.prepare(`DELETE FROM thoughts WHERE id = ? AND owner_id = ?`).bind(id, ownerId).run();
  await recordChange(db, {
    ownerId,
    contentType: "thought",
    contentId: id,
    operation: "delete",
    before,
  });
}

export async function resurfaceThought(
  db: D1Database,
  ownerId: string,
  id: string,
  visibility: ThoughtVisibility = "passing",
): Promise<ThoughtRow> {
  if (!PUBLIC_VIS.has(visibility) && visibility !== "public") {
    // allow passing/public/permanent
  }
  const target: ThoughtVisibility = PUBLIC_VIS.has(visibility)
    ? visibility
    : "passing";
  return updateThought(db, ownerId, id, {
    visibility: target,
    // clear dormancy by setting visibility
  });
}

function slugifyTag(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "tag";
}

export async function setThoughtTags(
  db: D1Database,
  ownerId: string,
  thoughtId: string,
  labels: string[],
): Promise<void> {
  await db.prepare(`DELETE FROM thought_tag_map WHERE thought_id = ?`).bind(thoughtId).run();
  const now = Date.now();
  for (const label of labels.slice(0, 12)) {
    const slug = slugifyTag(label);
    let tag = await db
      .prepare(`SELECT id FROM thought_tags WHERE owner_id = ? AND slug = ?`)
      .bind(ownerId, slug)
      .first<{ id: string }>();
    if (!tag) {
      const id = newId("ttag");
      await db
        .prepare(
          `INSERT INTO thought_tags (id, owner_id, slug, label, created_at) VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(id, ownerId, slug, label.slice(0, 80), now)
        .run();
      tag = { id };
    }
    await db
      .prepare(`INSERT OR IGNORE INTO thought_tag_map (thought_id, tag_id) VALUES (?, ?)`)
      .bind(thoughtId, tag.id)
      .run();
  }
}

export async function connectThoughts(
  db: D1Database,
  ownerId: string,
  fromId: string,
  toId: string,
  relationshipType: string,
) {
  const a = await getThought(db, ownerId, fromId);
  const b = await getThought(db, ownerId, toId);
  if (!a || !b) throw new Error("thought_not_found");
  const id = newId("trel");
  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO thought_relationships
      (id, owner_id, from_thought_id, to_thought_id, relationship_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, ownerId, fromId, toId, relationshipType.slice(0, 40), now)
    .run();
  return { id, fromId, toId, relationshipType };
}

function isEligiblePublic(row: ThoughtRow, now: number): boolean {
  if (!PUBLIC_VIS.has(row.visibility)) return false;
  if (row.expires_at && row.expires_at < now) return false;
  if (
    row.max_public_encounters != null &&
    row.public_encounter_count >= row.max_public_encounters
  ) {
    return false;
  }
  return true;
}

function scoreThought(
  row: ThoughtRow,
  now: number,
  context?: string | null,
): number {
  let score = row.manual_weight + (row.pinned ? 100 : 0);
  const ageDays = (now - row.created_at) / 86_400_000;
  score += Math.max(0, 10 - ageDays * 0.15);
  if (row.last_surfaced_at) {
    const since = (now - row.last_surfaced_at) / 86_400_000;
    score += Math.min(8, since * 0.5);
  } else {
    score += 4;
  }
  score += Math.random() * 3;
  if (context && row.text.toLowerCase().includes(context.toLowerCase().slice(0, 40))) {
    score *= 1.1;
  }
  return score;
}

export async function selectPublicThoughts(
  db: D1Database,
  opts?: {
    limit?: number;
    excludeIds?: string[];
    context?: string | null;
  },
): Promise<ReturnType<typeof toPublicThought>[]> {
  const now = Date.now();
  const limit = Math.min(Math.max(opts?.limit ?? 5, 1), 12);
  const exclude = new Set(opts?.excludeIds || []);

  const { results } = await db
    .prepare(
      `SELECT * FROM thoughts
       WHERE visibility IN ('passing', 'public', 'permanent')
       ORDER BY pinned DESC, updated_at DESC LIMIT 40`,
    )
    .all<ThoughtRow>();

  const eligible = (results || []).filter(
    (r) => isEligiblePublic(r, now) && !exclude.has(r.id),
  );

  const scored = eligible
    .map((r) => ({ r, s: scoreThought(r, now, opts?.context) }))
    .sort((a, b) => b.s - a.s);

  const picked = scored.slice(0, limit).map((x) => x.r);

  for (const row of picked) {
    await db
      .prepare(`UPDATE thoughts SET last_surfaced_at = ? WHERE id = ?`)
      .bind(now, row.id)
      .run();
  }

  return picked.map(toPublicThought);
}

export async function recordEncounter(
  db: D1Database,
  thoughtId: string,
): Promise<{ ok: boolean; count?: number }> {
  const row = await db
    .prepare(`SELECT * FROM thoughts WHERE id = ?`)
    .bind(thoughtId)
    .first<ThoughtRow>();
  if (!row || !PUBLIC_VIS.has(row.visibility)) return { ok: false };
  const count = row.public_encounter_count + 1;
  await db
    .prepare(`UPDATE thoughts SET public_encounter_count = ? WHERE id = ?`)
    .bind(count, thoughtId)
    .run();
  return { ok: true, count };
}

export async function getThoughtTags(
  db: D1Database,
  thoughtId: string,
): Promise<string[]> {
  const { results } = await db
    .prepare(
      `SELECT t.label FROM thought_tags t
       JOIN thought_tag_map m ON m.tag_id = t.id
       WHERE m.thought_id = ?`,
    )
    .bind(thoughtId)
    .all<{ label: string }>();
  return (results || []).map((r) => r.label);
}
