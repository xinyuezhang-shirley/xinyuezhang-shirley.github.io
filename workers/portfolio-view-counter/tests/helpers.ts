/** Mirror of searchWeb host checks for unit tests (no network). */

const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^\[::1\]$/,
  /\.internal$/i,
  /\.local$/i,
];

export function isSafeUrlForTest(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    if (BLOCKED_HOST_PATTERNS.some((re) => re.test(u.hostname))) return false;
    return true;
  } catch {
    return false;
  }
}
