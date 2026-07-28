/** Notes CRUD — editable documents, separate from memories. */

import { newId } from "../lib/crypto";

export type NoteRow = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  tags: string | null;
  created_at: number;
  updated_at: number;
  archived_at: number | null;
};

export type NoteInput = {
  title: string;
  body: string;
  tags?: string[] | null;
};

function tagsToJson(tags?: string[] | null): string | null {
  if (!tags || tags.length === 0) return null;
  return JSON.stringify(tags.map((t) => t.trim()).filter(Boolean).slice(0, 20));
}

export function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t): t is string => typeof t === "string");
  } catch {
    return [];
  }
}

export async function createNote(
  db: D1Database,
  userId: string,
  input: NoteInput,
): Promise<NoteRow> {
  const now = Date.now();
  const id = newId("note");
  const title = input.title.trim().slice(0, 200) || "Untitled note";
  const body = input.body.slice(0, 50_000);
  const tags = tagsToJson(input.tags);

  await db
    .prepare(
      `INSERT INTO notes (id, user_id, title, body, tags, embedding, created_at, updated_at, archived_at)
       VALUES (?, ?, ?, ?, ?, NULL, ?, ?, NULL)`,
    )
    .bind(id, userId, title, body, tags, now, now)
    .run();

  console.log(JSON.stringify({ event: "note_create", user_id: userId, note_id: id }));

  return {
    id,
    user_id: userId,
    title,
    body,
    tags,
    created_at: now,
    updated_at: now,
    archived_at: null,
  };
}

export async function listNotes(
  db: D1Database,
  userId: string,
  opts?: { includeArchived?: boolean; limit?: number },
): Promise<NoteRow[]> {
  const limit = Math.min(Math.max(opts?.limit ?? 50, 1), 100);
  if (opts?.includeArchived) {
    return (
      (
        await db
          .prepare(
            `SELECT id, user_id, title, body, tags, created_at, updated_at, archived_at
             FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT ?`,
          )
          .bind(userId, limit)
          .all<NoteRow>()
      ).results ?? []
    );
  }
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, title, body, tags, created_at, updated_at, archived_at
           FROM notes WHERE user_id = ? AND archived_at IS NULL
           ORDER BY updated_at DESC LIMIT ?`,
        )
        .bind(userId, limit)
        .all<NoteRow>()
    ).results ?? []
  );
}

export async function searchNotes(
  db: D1Database,
  userId: string,
  query: string,
  limit = 8,
): Promise<NoteRow[]> {
  const q = query.trim().slice(0, 200);
  if (!q) return listNotes(db, userId, { limit });
  const like = `%${q.replace(/[%_]/g, "")}%`;
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, title, body, tags, created_at, updated_at, archived_at
           FROM notes
           WHERE user_id = ? AND archived_at IS NULL
             AND (title LIKE ? OR body LIKE ? OR IFNULL(tags, '') LIKE ?)
           ORDER BY updated_at DESC LIMIT ?`,
        )
        .bind(userId, like, like, like, Math.min(Math.max(limit, 1), 20))
        .all<NoteRow>()
    ).results ?? []
  );
}

export async function getNote(
  db: D1Database,
  userId: string,
  id: string,
): Promise<NoteRow | null> {
  return (
    (await db
      .prepare(
        `SELECT id, user_id, title, body, tags, created_at, updated_at, archived_at
         FROM notes WHERE id = ? AND user_id = ? LIMIT 1`,
      )
      .bind(id, userId)
      .first<NoteRow>()) ?? null
  );
}

export async function updateNote(
  db: D1Database,
  userId: string,
  id: string,
  patch: Partial<NoteInput> & { archived?: boolean; appendBody?: string },
): Promise<NoteRow | null> {
  const existing = await getNote(db, userId, id);
  if (!existing) return null;
  const now = Date.now();
  let body = patch.body !== undefined ? patch.body.slice(0, 50_000) : existing.body;
  if (patch.appendBody) {
    body = `${body}\n\n${patch.appendBody}`.slice(0, 50_000);
  }
  const title =
    patch.title !== undefined
      ? patch.title.trim().slice(0, 200) || existing.title
      : existing.title;
  const tags =
    patch.tags !== undefined ? tagsToJson(patch.tags) : existing.tags;
  const archivedAt =
    patch.archived === true
      ? now
      : patch.archived === false
        ? null
        : existing.archived_at;

  await db
    .prepare(
      `UPDATE notes SET title = ?, body = ?, tags = ?, archived_at = ?, updated_at = ?
       WHERE id = ? AND user_id = ?`,
    )
    .bind(title, body, tags, archivedAt, now, id, userId)
    .run();

  return getNote(db, userId, id);
}

export async function deleteNote(
  db: D1Database,
  userId: string,
  id: string,
): Promise<boolean> {
  const result = await db
    .prepare("DELETE FROM notes WHERE id = ? AND user_id = ?")
    .bind(id, userId)
    .run();
  return (result.meta.changes ?? 0) > 0;
}
