/**
 * Owner authentication + session resolution.
 * Role comes only from verified D1 session state — never from client claims.
 */

import {
  clearOwnerSessionCookie,
  getOwnerSessionToken,
  setOwnerSessionCookie,
} from "./cookies";
import { hashPassword, newId, randomToken, sha256Hex, verifyPassword } from "./crypto";
import { hashIpBucket } from "./rateLimit";

export type AuthEnv = {
  DB: D1Database;
  OWNER_PASSWORD_HASH?: string;
};

export type OwnerRole = "public" | "owner";

export type TrustedIdentity = {
  role: OwnerRole;
  userId: string | null;
  username: string | null;
  sessionId: string | null;
};

export const PUBLIC_IDENTITY: TrustedIdentity = {
  role: "public",
  userId: null,
  username: null,
  sessionId: null,
};

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_MAX_FAILURES = 5;
const AUTH_LOCK_MS = 15 * 60 * 1000;
const MIN_CREDENTIAL_CHARS_FOR_LOCKOUT = 12;

type UserRow = {
  id: string;
  username: string;
  password_hash: string;
};

type SessionRow = {
  id: string;
  user_id: string;
  expires_at: number;
  revoked_at: number | null;
  username: string;
};

/** Seed Shirley owner from OWNER_PASSWORD_HASH secret if users table empty. */
export async function ensureOwnerUser(env: AuthEnv): Promise<UserRow | null> {
  const existing = await env.DB.prepare(
    "SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1",
  )
    .bind("shirley")
    .first<UserRow>();
  if (existing) return existing;

  const hash = (env.OWNER_PASSWORD_HASH || "").trim();
  if (!hash || !hash.startsWith("$2")) {
    return null;
  }

  const now = Date.now();
  const id = newId("usr");
  await env.DB.prepare(
    "INSERT INTO users (id, username, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
  )
    .bind(id, "shirley", hash, now, now)
    .run();

  return { id, username: "shirley", password_hash: hash };
}

export async function resolveIdentity(
  env: AuthEnv,
  request: Request,
): Promise<TrustedIdentity> {
  const token = getOwnerSessionToken(request);
  if (!token) return PUBLIC_IDENTITY;

  const tokenHash = await sha256Hex(token);
  const now = Date.now();
  const row = await env.DB.prepare(
    `SELECT s.id, s.user_id, s.expires_at, s.revoked_at, u.username
     FROM owner_sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ?
     LIMIT 1`,
  )
    .bind(tokenHash)
    .first<SessionRow>();

  if (!row || row.revoked_at || row.expires_at <= now) {
    return PUBLIC_IDENTITY;
  }

  await env.DB.prepare("UPDATE owner_sessions SET last_used_at = ? WHERE id = ?")
    .bind(now, row.id)
    .run();

  return {
    role: "owner",
    userId: row.user_id,
    username: row.username,
    sessionId: row.id,
  };
}

export type AuthAttemptResult =
  | { ok: true; setCookie: string; identity: TrustedIdentity }
  | { ok: false; reason: "locked" | "invalid" | "unavailable"; retryAfterMs?: number };

async function getAuthBucket(request: Request): Promise<string> {
  return hashIpBucket(request, "owner_auth");
}

export async function checkAuthLock(
  env: AuthEnv,
  request: Request,
): Promise<{ locked: boolean; retryAfterMs?: number }> {
  const bucket = await getAuthBucket(request);
  const now = Date.now();
  const row = await env.DB.prepare(
    "SELECT failures, window_start, locked_until FROM auth_attempts WHERE bucket = ?",
  )
    .bind(bucket)
    .first<{ failures: number; window_start: number; locked_until: number | null }>();

  if (row?.locked_until && row.locked_until > now) {
    return { locked: true, retryAfterMs: row.locked_until - now };
  }
  return { locked: false };
}

async function recordAuthFailure(
  env: AuthEnv,
  request: Request,
  countTowardLock: boolean,
): Promise<void> {
  if (!countTowardLock) return;
  const bucket = await getAuthBucket(request);
  const now = Date.now();
  const row = await env.DB.prepare(
    "SELECT failures, window_start, locked_until FROM auth_attempts WHERE bucket = ?",
  )
    .bind(bucket)
    .first<{ failures: number; window_start: number; locked_until: number | null }>();

  if (!row || now - row.window_start >= AUTH_WINDOW_MS) {
    await env.DB.prepare(
      `INSERT INTO auth_attempts (bucket, failures, window_start, locked_until)
       VALUES (?, 1, ?, NULL)
       ON CONFLICT(bucket) DO UPDATE SET failures = 1, window_start = excluded.window_start, locked_until = NULL`,
    )
      .bind(bucket, now)
      .run();
    return;
  }

  const failures = row.failures + 1;
  const lockedUntil = failures >= AUTH_MAX_FAILURES ? now + AUTH_LOCK_MS : null;
  await env.DB.prepare(
    "UPDATE auth_attempts SET failures = ?, locked_until = ? WHERE bucket = ?",
  )
    .bind(failures, lockedUntil, bucket)
    .run();
}

async function clearAuthFailures(env: AuthEnv, request: Request): Promise<void> {
  const bucket = await getAuthBucket(request);
  await env.DB.prepare("DELETE FROM auth_attempts WHERE bucket = ?").bind(bucket).run();
}

export async function createOwnerSession(
  env: AuthEnv,
  userId: string,
  request?: Request,
): Promise<{ token: string; setCookie: string; sessionId: string }> {
  const token = randomToken(32);
  const tokenHash = await sha256Hex(token);
  const now = Date.now();
  const sessionId = newId("ses");
  await env.DB.prepare(
    `INSERT INTO owner_sessions (id, user_id, token_hash, expires_at, created_at, last_used_at, revoked_at)
     VALUES (?, ?, ?, ?, ?, ?, NULL)`,
  )
    .bind(sessionId, userId, tokenHash, now + SESSION_TTL_MS, now, now)
    .run();

  return {
    token,
    setCookie: setOwnerSessionCookie(token, Math.floor(SESSION_TTL_MS / 1000), request),
    sessionId,
  };
}

export async function authenticateOwner(
  env: AuthEnv,
  request: Request,
  credential: string,
): Promise<AuthAttemptResult> {
  const lock = await checkAuthLock(env, request);
  if (lock.locked) {
    return { ok: false, reason: "locked", retryAfterMs: lock.retryAfterMs };
  }

  const user = await ensureOwnerUser(env);
  if (!user) {
    // Same external response shape as invalid — do not leak setup state.
    await recordAuthFailure(
      env,
      request,
      credential.trim().length >= MIN_CREDENTIAL_CHARS_FOR_LOCKOUT,
    );
    return { ok: false, reason: "invalid" };
  }

  const valid = await verifyPassword(credential, user.password_hash);
  if (!valid) {
    await recordAuthFailure(
      env,
      request,
      credential.trim().length >= MIN_CREDENTIAL_CHARS_FOR_LOCKOUT,
    );
    return { ok: false, reason: "invalid" };
  }

  await clearAuthFailures(env, request);
  const session = await createOwnerSession(env, user.id, request);
  console.log(
    JSON.stringify({
      event: "owner_auth_success",
      user_id: user.id,
      session_id: session.sessionId,
    }),
  );

  return {
    ok: true,
    setCookie: session.setCookie,
    identity: {
      role: "owner",
      userId: user.id,
      username: user.username,
      sessionId: session.sessionId,
    },
  };
}

export async function logoutOwner(
  env: AuthEnv,
  request: Request,
): Promise<{ clearCookie: string }> {
  const token = getOwnerSessionToken(request);
  if (token) {
    const tokenHash = await sha256Hex(token);
    const now = Date.now();
    await env.DB.prepare(
      "UPDATE owner_sessions SET revoked_at = ? WHERE token_hash = ? AND revoked_at IS NULL",
    )
      .bind(now, tokenHash)
      .run();
    console.log(JSON.stringify({ event: "owner_logout" }));
  }
  return { clearCookie: clearOwnerSessionCookie(request) };
}

export async function revokeAllOwnerSessions(
  env: AuthEnv,
  userId: string,
): Promise<number> {
  const now = Date.now();
  const result = await env.DB.prepare(
    "UPDATE owner_sessions SET revoked_at = ? WHERE user_id = ? AND revoked_at IS NULL",
  )
    .bind(now, userId)
    .run();
  return result.meta.changes ?? 0;
}

/** Parse /owner credential or bare first-message auth candidate. Never logs credential. */
export function parseOwnerCredentialAttempt(
  message: string,
  opts: { historyHasUserMessages: boolean },
): { credential: string; via: "command" | "first_message" } | null {
  const trimmed = message.trim();
  const cmd = trimmed.match(/^\/owner(?:\s+|$)([\s\S]*)$/i);
  if (cmd) {
    const credential = (cmd[1] || "").trim();
    if (!credential) return null;
    return { credential, via: "command" };
  }
  if (!opts.historyHasUserMessages && trimmed.length >= MIN_CREDENTIAL_CHARS_FOR_LOCKOUT) {
    // First substantive message may be the passphrase — verified server-side only.
    return { credential: trimmed, via: "first_message" };
  }
  return null;
}

export async function updateOwnerPasswordHash(
  env: AuthEnv,
  plaintext: string,
): Promise<string> {
  const hash = await hashPassword(plaintext);
  const now = Date.now();
  const user = await ensureOwnerUser({ ...env, OWNER_PASSWORD_HASH: hash });
  if (user) {
    await env.DB.prepare(
      "UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?",
    )
      .bind(hash, now, user.id)
      .run();
  }
  return hash;
}
