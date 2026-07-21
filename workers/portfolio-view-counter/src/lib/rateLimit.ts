/**
 * Per-IP rate limiting via D1 (hashed IP buckets — never log raw IPs).
 */

export type RateLimitEnv = {
  DB: D1Database;
};

const DEFAULT_MAX = 12;
const DEFAULT_WINDOW_MS = 60_000;

export async function hashIpBucket(request: Request, prefix = "rl"): Promise<string> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const data = new TextEncoder().encode(`${prefix}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  let hex = "";
  for (let i = 0; i < 16; i++) hex += bytes[i]!.toString(16).padStart(2, "0");
  return hex;
}

export async function allowRequest(
  env: RateLimitEnv,
  request: Request,
  options?: {
    prefix?: string;
    max?: number;
    windowMs?: number;
  },
): Promise<boolean> {
  const prefix = options?.prefix ?? "rl";
  const max = options?.max ?? DEFAULT_MAX;
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const bucket = await hashIpBucket(request, prefix);
  const now = Date.now();

  const row = await env.DB.prepare(
    "SELECT hits, window_start FROM rate_limits WHERE bucket = ?",
  )
    .bind(bucket)
    .first<{ hits: number; window_start: number }>();

  if (!row || now - row.window_start >= windowMs) {
    await env.DB.prepare(
      "INSERT INTO rate_limits (bucket, hits, window_start) VALUES (?, 1, ?) ON CONFLICT(bucket) DO UPDATE SET hits = 1, window_start = excluded.window_start",
    )
      .bind(bucket, now)
      .run();
    return true;
  }

  if (row.hits >= max) {
    return false;
  }

  await env.DB.prepare("UPDATE rate_limits SET hits = hits + 1 WHERE bucket = ?")
    .bind(bucket)
    .run();
  return true;
}
