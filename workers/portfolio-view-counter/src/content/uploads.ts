/**
 * Owner upload sessions + R2 object storage.
 * MIME/signature checks; EXIF GPS strip for JPEG when possible.
 */

import { newId } from "../lib/crypto";

export const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
export const MAX_DIMENSION = 8000;

export type MediaBucket = R2Bucket;

function sniffMime(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  // PNG
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  // GIF
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "image/gif";
  // WEBP (RIFF....WEBP)
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

/** Strip APP1 EXIF from JPEG (removes GPS). Other formats returned unchanged. */
export function stripJpegExif(input: Uint8Array): Uint8Array {
  if (input.length < 4 || input[0] !== 0xff || input[1] !== 0xd8) return input;
  const out: number[] = [0xff, 0xd8];
  let i = 2;
  while (i + 3 < input.length) {
    if (input[i] !== 0xff) break;
    const marker = input[i + 1]!;
    if (marker === 0xda) {
      // SOS — copy rest
      for (let j = i; j < input.length; j++) out.push(input[j]!);
      return Uint8Array.from(out);
    }
    if (marker === 0xd9) {
      out.push(0xff, 0xd9);
      return Uint8Array.from(out);
    }
    const len = (input[i + 2]! << 8) | input[i + 3]!;
    if (len < 2 || i + 2 + len > input.length) break;
    // Skip APP1 (0xE1) EXIF
    if (marker !== 0xe1) {
      for (let j = i; j < i + 2 + len; j++) out.push(input[j]!);
    }
    i += 2 + len;
  }
  for (let j = i; j < input.length; j++) out.push(input[j]!);
  return Uint8Array.from(out);
}

export function readPngSize(bytes: Uint8Array): { width: number; height: number } | null {
  if (sniffMime(bytes) !== "image/png" || bytes.length < 24) return null;
  const width =
    (bytes[16]! << 24) | (bytes[17]! << 16) | (bytes[18]! << 8) | bytes[19]!;
  const height =
    (bytes[20]! << 24) | (bytes[21]! << 16) | (bytes[22]! << 8) | bytes[23]!;
  return { width, height };
}

export function readJpegSize(bytes: Uint8Array): { width: number; height: number } | null {
  if (sniffMime(bytes) !== "image/jpeg") return null;
  let i = 2;
  while (i + 8 < bytes.length) {
    if (bytes[i] !== 0xff) break;
    const marker = bytes[i + 1]!;
    const len = (bytes[i + 2]! << 8) | bytes[i + 3]!;
    // SOF0–SOF3
    if (marker >= 0xc0 && marker <= 0xc3 && len >= 7) {
      const height = (bytes[i + 5]! << 8) | bytes[i + 6]!;
      const width = (bytes[i + 7]! << 8) | bytes[i + 8]!;
      return { width, height };
    }
    if (len < 2) break;
    i += 2 + len;
  }
  return null;
}

export async function createUploadSession(
  db: D1Database,
  ownerId: string,
  conversationId?: string | null,
): Promise<{ id: string; expiresAt: number }> {
  const id = newId("upl");
  const now = Date.now();
  const expiresAt = now + 6 * 60 * 60 * 1000;
  await db
    .prepare(
      `INSERT INTO upload_sessions (id, owner_id, conversation_id, status, created_at, expires_at)
       VALUES (?, ?, ?, 'open', ?, ?)`,
    )
    .bind(id, ownerId, conversationId ?? null, now, expiresAt)
    .run();
  return { id, expiresAt };
}

export type StoredUpload = {
  id: string;
  sessionId: string;
  storageKey: string;
  mimeType: string;
  byteSize: number;
  width: number | null;
  height: number | null;
  originalFilename: string | null;
  status: string;
};

export async function storeUploadObject(args: {
  db: D1Database;
  privateBucket: MediaBucket | undefined;
  ownerId: string;
  sessionId: string;
  filename: string | null;
  bytes: Uint8Array;
  claimedMime?: string | null;
  caption?: string | null;
  displayOrder?: number;
}): Promise<StoredUpload> {
  const session = await args.db
    .prepare(
      `SELECT id, owner_id, status, expires_at FROM upload_sessions WHERE id = ? AND owner_id = ?`,
    )
    .bind(args.sessionId, args.ownerId)
    .first<{ id: string; status: string; expires_at: number }>();
  if (!session || session.status !== "open" || session.expires_at < Date.now()) {
    throw new Error("upload_session_invalid");
  }
  if (args.bytes.byteLength === 0 || args.bytes.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("upload_size");
  }
  const sniffed = sniffMime(args.bytes);
  if (!sniffed || !ALLOWED_MIME.has(sniffed)) throw new Error("upload_mime");
  if (args.claimedMime && args.claimedMime !== sniffed && !args.claimedMime.startsWith("image/")) {
    throw new Error("upload_mime_mismatch");
  }

  let payload = args.bytes;
  let exifStripped = 0;
  if (sniffed === "image/jpeg") {
    payload = stripJpegExif(args.bytes);
    exifStripped = 1;
  }

  const size =
    sniffed === "image/png"
      ? readPngSize(payload)
      : sniffed === "image/jpeg"
        ? readJpegSize(payload)
        : null;
  if (size && (size.width > MAX_DIMENSION || size.height > MAX_DIMENSION)) {
    throw new Error("upload_dimensions");
  }

  if (!args.privateBucket) throw new Error("r2_unavailable");

  const id = newId("file");
  const safeExt =
    sniffed === "image/png"
      ? "png"
      : sniffed === "image/webp"
        ? "webp"
        : sniffed === "image/gif"
          ? "gif"
          : "jpg";
  const storageKey = `private/${args.ownerId}/${args.sessionId}/${id}.${safeExt}`;

  await args.privateBucket.put(storageKey, payload, {
    httpMetadata: { contentType: sniffed },
    customMetadata: { ownerId: args.ownerId, uploadId: id },
  });

  const now = Date.now();
  await args.db
    .prepare(
      `INSERT INTO upload_objects
      (id, session_id, owner_id, storage_key, bucket, original_filename, mime_type, byte_size,
       width, height, status, caption, display_order, exif_stripped, created_at)
      VALUES (?, ?, ?, ?, 'private', ?, ?, ?, ?, ?, 'ready', ?, ?, ?, ?)`,
    )
    .bind(
      id,
      args.sessionId,
      args.ownerId,
      storageKey,
      args.filename ? args.filename.slice(0, 200) : null,
      sniffed,
      payload.byteLength,
      size?.width ?? null,
      size?.height ?? null,
      args.caption ?? null,
      args.displayOrder ?? 0,
      exifStripped,
      now,
    )
    .run();

  return {
    id,
    sessionId: args.sessionId,
    storageKey,
    mimeType: sniffed,
    byteSize: payload.byteLength,
    width: size?.width ?? null,
    height: size?.height ?? null,
    originalFilename: args.filename,
    status: "ready",
  };
}

export async function getUploadObject(
  db: D1Database,
  ownerId: string,
  id: string,
): Promise<{
  id: string;
  storage_key: string;
  bucket: string;
  mime_type: string;
  status: string;
  caption: string | null;
  width: number | null;
  height: number | null;
} | null> {
  return (
    (await db
      .prepare(`SELECT * FROM upload_objects WHERE id = ? AND owner_id = ?`)
      .bind(id, ownerId)
      .first()) ?? null
  );
}

export async function listSessionUploads(
  db: D1Database,
  ownerId: string,
  sessionId: string,
) {
  const { results } = await db
    .prepare(
      `SELECT id, original_filename, mime_type, byte_size, width, height, status, caption, display_order, storage_key
       FROM upload_objects WHERE session_id = ? AND owner_id = ?
       ORDER BY display_order ASC, created_at ASC`,
    )
    .bind(sessionId, ownerId)
    .all();
  return results || [];
}

/** Promote a private object into the public bucket; returns public key. */
export async function promoteToPublic(args: {
  privateBucket: MediaBucket;
  publicBucket: MediaBucket;
  privateKey: string;
  publicKey: string;
}): Promise<string> {
  const obj = await args.privateBucket.get(args.privateKey);
  if (!obj) throw new Error("upload_missing");
  const body = await obj.arrayBuffer();
  await args.publicBucket.put(args.publicKey, body, {
    httpMetadata: obj.httpMetadata,
  });
  return args.publicKey;
}

export function publicMediaPath(key: string): string {
  return `/api/media/public/${encodeURIComponent(key)}`;
}
