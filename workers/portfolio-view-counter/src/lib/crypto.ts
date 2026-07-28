/**
 * Password + token hashing for owner auth.
 * Passwords: bcrypt (bcryptjs). Session tokens: SHA-256 hex of opaque random.
 */

import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = 12;

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, BCRYPT_ROUNDS);
}

/** Constant-time-ish verify via bcrypt; never log plaintext. */
export async function verifyPassword(
  plaintext: string,
  passwordHash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(plaintext, passwordHash);
  } catch {
    return false;
  }
}

export function randomToken(bytes = 32): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return [...buf].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function newId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;
}
