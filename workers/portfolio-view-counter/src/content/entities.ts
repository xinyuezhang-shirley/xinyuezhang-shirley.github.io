/**
 * Artwork + photography + dream persistence for conversational CMS.
 */

import { newId } from "../lib/crypto";
import { recordChange, slugify } from "./drafts";
import { promoteToPublic, publicMediaPath, type MediaBucket } from "./uploads";

export type ArtworkRow = {
  id: string;
  owner_id: string;
  slug: string;
  title: string;
  description: string | null;
  medium: string | null;
  dimensions: string | null;
  completed_at: string | null;
  year: number | null;
  status: string;
  section: string | null;
  display_order: number;
  primary_image_id: string | null;
  tags: string | null;
  alt_text: string | null;
  created_at: number;
  updated_at: number;
  published_at: number | null;
};

export async function createArtworkFromDraft(
  db: D1Database,
  ownerId: string,
  data: {
    title: string;
    description?: string | null;
    medium?: string | null;
    dimensions?: string | null;
    completedAt?: string | null;
    year?: number | null;
    section?: string | null;
    tags?: string[];
    altText?: string | null;
    uploadObjectIds?: string[];
    displayOrder?: number;
    status?: "draft" | "published" | "hidden" | "archived";
  },
  opts?: {
    conversationId?: string | null;
    draftId?: string | null;
    privateBucket?: MediaBucket;
    publicBucket?: MediaBucket;
  },
): Promise<ArtworkRow> {
  const now = Date.now();
  const id = newId("art");
  let slug = slugify(data.title);
  const clash = await db
    .prepare(`SELECT id FROM artworks WHERE slug = ?`)
    .bind(slug)
    .first();
  if (clash) slug = `${slug}-${id.slice(-6)}`;

  const status = data.status ?? "draft";
  await db
    .prepare(
      `INSERT INTO artworks
      (id, owner_id, slug, title, description, medium, dimensions, completed_at, year,
       status, section, display_order, primary_image_id, tags, alt_text, created_at, updated_at, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      ownerId,
      slug,
      data.title.slice(0, 200),
      data.description ?? null,
      data.medium ?? null,
      data.dimensions ?? null,
      data.completedAt ?? null,
      data.year ?? null,
      status,
      data.section ?? "Recent Work",
      data.displayOrder ?? 0,
      data.tags ? JSON.stringify(data.tags) : null,
      data.altText ?? null,
      now,
      now,
      status === "published" ? now : null,
    )
    .run();

  let primary: string | null = null;
  const uploadIds = data.uploadObjectIds || [];
  for (let i = 0; i < uploadIds.length; i++) {
    const uploadId = uploadIds[i]!;
    const upload = await db
      .prepare(`SELECT * FROM upload_objects WHERE id = ? AND owner_id = ?`)
      .bind(uploadId, ownerId)
      .first<{
        id: string;
        storage_key: string;
        mime_type: string;
        byte_size: number;
        width: number | null;
        height: number | null;
      }>();
    if (!upload) continue;

    let publicUrl: string | null = null;
    if (status === "published" && opts?.privateBucket && opts?.publicBucket) {
      const pubKey = `public/art/${id}/${upload.id}`;
      await promoteToPublic({
        privateBucket: opts.privateBucket,
        publicBucket: opts.publicBucket,
        privateKey: upload.storage_key,
        publicKey: pubKey,
      });
      publicUrl = publicMediaPath(pubKey);
      await db
        .prepare(`UPDATE upload_objects SET bucket = 'public', storage_key = ? WHERE id = ?`)
        .bind(pubKey, upload.id)
        .run();
    }

    const imageId = newId("aimg");
    if (!primary) primary = imageId;
    await db
      .prepare(
        `INSERT INTO artwork_images
        (id, artwork_id, upload_object_id, original_url, optimized_url, thumbnail_url,
         width, height, mime_type, file_size, display_order, alt_text, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        imageId,
        id,
        upload.id,
        publicUrl,
        publicUrl,
        publicUrl,
        upload.width,
        upload.height,
        upload.mime_type,
        upload.byte_size,
        i,
        data.altText ?? null,
        now,
      )
      .run();
  }

  if (primary) {
    await db
      .prepare(`UPDATE artworks SET primary_image_id = ? WHERE id = ?`)
      .bind(primary, id)
      .run();
  }

  const row = (await db
    .prepare(`SELECT * FROM artworks WHERE id = ?`)
    .bind(id)
    .first<ArtworkRow>())!;

  await recordChange(db, {
    ownerId,
    contentType: "artwork",
    contentId: id,
    operation: status === "published" ? "create_publish" : "create_draft",
    after: row,
    draftId: opts?.draftId,
    conversationId: opts?.conversationId,
    publishedAt: status === "published" ? now : null,
  });

  return row;
}

export async function listPublishedArtworks(db: D1Database) {
  const { results } = await db
    .prepare(
      `SELECT a.*, 
        (SELECT optimized_url FROM artwork_images WHERE artwork_id = a.id ORDER BY display_order ASC LIMIT 1) as image_url,
        (SELECT width FROM artwork_images WHERE artwork_id = a.id ORDER BY display_order ASC LIMIT 1) as width,
        (SELECT height FROM artwork_images WHERE artwork_id = a.id ORDER BY display_order ASC LIMIT 1) as height
       FROM artworks a WHERE a.status = 'published'
       ORDER BY a.display_order ASC, a.published_at DESC`,
    )
    .all();
  return results || [];
}

export async function listOwnerArtworks(db: D1Database, ownerId: string) {
  const { results } = await db
    .prepare(
      `SELECT * FROM artworks WHERE owner_id = ? ORDER BY display_order ASC, updated_at DESC`,
    )
    .bind(ownerId)
    .all<ArtworkRow>();
  return results || [];
}

export async function setArtworkStatus(
  db: D1Database,
  ownerId: string,
  id: string,
  status: "draft" | "published" | "hidden" | "archived",
) {
  const before = await db
    .prepare(`SELECT * FROM artworks WHERE id = ? AND owner_id = ?`)
    .bind(id, ownerId)
    .first<ArtworkRow>();
  if (!before) throw new Error("artwork_not_found");
  const now = Date.now();
  await db
    .prepare(
      `UPDATE artworks SET status = ?, updated_at = ?, published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, ?) ELSE published_at END
       WHERE id = ? AND owner_id = ?`,
    )
    .bind(status, now, status, now, id, ownerId)
    .run();
  const after = await db
    .prepare(`SELECT * FROM artworks WHERE id = ?`)
    .bind(id)
    .first<ArtworkRow>();
  await recordChange(db, {
    ownerId,
    contentType: "artwork",
    contentId: id,
    operation: `status_${status}`,
    before,
    after,
    publishedAt: status === "published" ? now : null,
  });
  return after;
}

export async function reorderArtworks(
  db: D1Database,
  ownerId: string,
  orderedIds: string[],
) {
  const before = await listOwnerArtworks(db, ownerId);
  const now = Date.now();
  for (let i = 0; i < orderedIds.length; i++) {
    await db
      .prepare(
        `UPDATE artworks SET display_order = ?, updated_at = ? WHERE id = ? AND owner_id = ?`,
      )
      .bind(i, now, orderedIds[i], ownerId)
      .run();
  }
  const after = await listOwnerArtworks(db, ownerId);
  await recordChange(db, {
    ownerId,
    contentType: "artwork",
    contentId: null,
    operation: "reorder",
    before: before.map((a) => ({ id: a.id, display_order: a.display_order })),
    after: after.map((a) => ({ id: a.id, display_order: a.display_order })),
  });
  return after;
}

export async function createPhotoCollectionFromDraft(
  db: D1Database,
  ownerId: string,
  data: {
    title: string;
    description?: string | null;
    capturedAt?: string | null;
    locationLabel?: string | null;
    uploadObjectIds: string[];
    coverUploadObjectId?: string | null;
    status?: "draft" | "published" | "hidden" | "archived";
  },
  opts?: {
    conversationId?: string | null;
    draftId?: string | null;
    privateBucket?: MediaBucket;
    publicBucket?: MediaBucket;
  },
) {
  const now = Date.now();
  const id = newId("pcol");
  let slug = slugify(data.title);
  if (await db.prepare(`SELECT id FROM photo_collections WHERE slug = ?`).bind(slug).first()) {
    slug = `${slug}-${id.slice(-6)}`;
  }
  const status = data.status ?? "draft";
  await db
    .prepare(
      `INSERT INTO photo_collections
      (id, owner_id, slug, title, description, captured_at, location_label, cover_photo_id,
       status, display_order, created_at, updated_at, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?, 0, ?, ?, ?)`,
    )
    .bind(
      id,
      ownerId,
      slug,
      data.title.slice(0, 200),
      data.description ?? null,
      data.capturedAt ?? null,
      data.locationLabel ?? null,
      status,
      now,
      now,
      status === "published" ? now : null,
    )
    .run();

  let coverPhotoId: string | null = null;
  for (let i = 0; i < data.uploadObjectIds.length; i++) {
    const uploadId = data.uploadObjectIds[i]!;
    const upload = await db
      .prepare(`SELECT * FROM upload_objects WHERE id = ? AND owner_id = ?`)
      .bind(uploadId, ownerId)
      .first<{
        id: string;
        storage_key: string;
        mime_type: string;
        width: number | null;
        height: number | null;
        caption: string | null;
      }>();
    if (!upload) continue;

    let publicUrl: string | null = null;
    if (status === "published" && opts?.privateBucket && opts?.publicBucket) {
      const pubKey = `public/photos/${id}/${upload.id}`;
      await promoteToPublic({
        privateBucket: opts.privateBucket,
        publicBucket: opts.publicBucket,
        privateKey: upload.storage_key,
        publicKey: pubKey,
      });
      publicUrl = publicMediaPath(pubKey);
    }

    const photoId = newId("photo");
    if (
      !coverPhotoId &&
      (!data.coverUploadObjectId || data.coverUploadObjectId === uploadId)
    ) {
      coverPhotoId = photoId;
    }
    await db
      .prepare(
        `INSERT INTO photos
        (id, collection_id, upload_object_id, original_url, optimized_url, thumbnail_url,
         title, caption, alt_text, captured_at, display_order, width, height, orientation, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NULL, ?, NULL, NULL, ?, ?, ?, NULL, ?, ?)`,
      )
      .bind(
        photoId,
        id,
        upload.id,
        publicUrl,
        publicUrl,
        publicUrl,
        upload.caption,
        i,
        upload.width,
        upload.height,
        status,
        now,
      )
      .run();
  }

  if (coverPhotoId) {
    await db
      .prepare(`UPDATE photo_collections SET cover_photo_id = ? WHERE id = ?`)
      .bind(coverPhotoId, id)
      .run();
  }

  const row = await db
    .prepare(`SELECT * FROM photo_collections WHERE id = ?`)
    .bind(id)
    .first();
  await recordChange(db, {
    ownerId,
    contentType: "photo_collection",
    contentId: id,
    operation: status === "published" ? "create_publish" : "create_draft",
    after: row,
    draftId: opts?.draftId,
    conversationId: opts?.conversationId,
    publishedAt: status === "published" ? now : null,
  });
  return row;
}

export async function listPublishedCollections(db: D1Database) {
  const collections = (
    await db
      .prepare(
        `SELECT * FROM photo_collections WHERE status = 'published'
         ORDER BY display_order ASC, published_at DESC`,
      )
      .all()
  ).results || [];

  const out = [];
  for (const c of collections as Array<Record<string, unknown>>) {
    const photos =
      (
        await db
          .prepare(
            `SELECT * FROM photos WHERE collection_id = ? AND status = 'published'
             ORDER BY display_order ASC`,
          )
          .bind(c.id)
          .all()
      ).results || [];
    out.push({ ...c, photos });
  }
  return out;
}

export async function createDream(
  db: D1Database,
  ownerId: string,
  data: {
    rawPrivateText: string;
    title?: string | null;
    dreamDate?: string | null;
    ownerNotes?: string | null;
    publicExcerpt?: string | null;
    visibility?: "full_private" | "private_with_public_excerpt" | "fully_public";
  },
  opts?: { conversationId?: string | null; draftId?: string | null },
) {
  const id = newId("dream");
  const now = Date.now();
  const visibility = data.visibility ?? "full_private";
  await db
    .prepare(
      `INSERT INTO dreams
      (id, owner_id, dream_date, title, raw_private_text, owner_notes, public_excerpt,
       visibility, processing_status, atlas_proposal_json, created_at, updated_at, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'saved', NULL, ?, ?, ?)`,
    )
    .bind(
      id,
      ownerId,
      data.dreamDate ?? null,
      data.title ?? null,
      data.rawPrivateText.slice(0, 100_000),
      data.ownerNotes ?? null,
      data.publicExcerpt ?? null,
      visibility,
      now,
      now,
      visibility === "fully_public" || visibility === "private_with_public_excerpt"
        ? now
        : null,
    )
    .run();

  const row = await db.prepare(`SELECT * FROM dreams WHERE id = ?`).bind(id).first();
  // Never put raw_private_text into after_snapshot for safety — redact
  await recordChange(db, {
    ownerId,
    contentType: "dream",
    contentId: id,
    operation: "create",
    after: {
      id,
      title: data.title,
      visibility,
      excerpt: data.publicExcerpt ? "[set]" : null,
    },
    draftId: opts?.draftId,
    conversationId: opts?.conversationId,
  });
  return row;
}

export async function proposeAtlasChanges(
  db: D1Database,
  ownerId: string,
  dreamId: string,
): Promise<{ dreamId: string; proposal: Record<string, unknown> }> {
  const dream = await db
    .prepare(`SELECT * FROM dreams WHERE id = ? AND owner_id = ?`)
    .bind(dreamId, ownerId)
    .first<{ id: string; raw_private_text: string; title: string | null }>();
  if (!dream) throw new Error("dream_not_found");

  const text = dream.raw_private_text.toLowerCase();
  const evidence: string[] = [];
  const reinforce: string[] = [];
  if (/\b(school|class|homework|campus|classroom)\b/.test(text)) {
    evidence.push("institutional spaces");
    reinforce.push("institutional performance");
  }
  if (/\b(leave|leaving|depart|airport|bus|train|missed)\b/.test(text)) {
    evidence.push("departure and separation");
    reinforce.push("departure and separation");
  }
  if (/\b(mom|dad|parent|family|grandma|grandpa)\b/.test(text)) {
    reinforce.push("kinship");
  }
  if (/\b(friend|companion)\b/.test(text)) {
    reinforce.push("mediated presence");
  }

  const proposal = {
    dreamId,
    title: dream.title,
    proposedAt: Date.now(),
    reinforce: [...new Set(reinforce)],
    evidence: [...new Set(evidence)],
    newCoreMotif: null as string | null,
    note:
      reinforce.length || evidence.length
        ? "Heuristic proposal from dream text — review before apply."
        : "No strong motif reinforcement detected.",
    confidence: reinforce.length >= 2 ? "medium" : "low",
  };

  await db
    .prepare(
      `UPDATE dreams SET atlas_proposal_json = ?, processing_status = 'ready', updated_at = ? WHERE id = ?`,
    )
    .bind(JSON.stringify(proposal), Date.now(), dreamId)
    .run();

  await recordChange(db, {
    ownerId,
    contentType: "atlas_change",
    contentId: dreamId,
    operation: "propose",
    after: proposal,
  });

  return { dreamId, proposal };
}

export async function getDreamPublicSafe(db: D1Database, id: string) {
  const row = await db
    .prepare(
      `SELECT id, dream_date, title, public_excerpt, visibility, published_at, created_at
       FROM dreams WHERE id = ? AND visibility IN ('private_with_public_excerpt', 'fully_public')`,
    )
    .bind(id)
    .first();
  return row;
}
