/** Cross-site owner session cookie helpers (HttpOnly). */

export const OWNER_SESSION_COOKIE = "ask_owner_sid";

const DEFAULT_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

export function parseCookieHeader(header: string | null): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(val);
    } catch {
      out[key] = val;
    }
  }
  return out;
}

export function getOwnerSessionToken(request: Request): string | null {
  const cookies = parseCookieHeader(request.headers.get("Cookie"));
  const token = cookies[OWNER_SESSION_COOKIE];
  return token && token.length >= 32 ? token : null;
}

function isLocalDevRequest(request?: Request): boolean {
  if (!request) return false;
  try {
    const host = new URL(request.url).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return false;
  }
}

/**
 * Cross-origin production: SameSite=None; Secure.
 * Local wrangler (http://localhost): SameSite=Lax without Secure so the cookie can set.
 */
export function setOwnerSessionCookie(
  token: string,
  maxAgeSec = DEFAULT_MAX_AGE_SEC,
  request?: Request,
): string {
  const parts = [
    `${OWNER_SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    `Max-Age=${maxAgeSec}`,
  ];
  if (isLocalDevRequest(request)) {
    parts.push("SameSite=Lax");
  } else {
    parts.push("Secure", "SameSite=None");
  }
  return parts.join("; ");
}

export function clearOwnerSessionCookie(request?: Request): string {
  const parts = [
    `${OWNER_SESSION_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "Max-Age=0",
  ];
  if (isLocalDevRequest(request)) {
    parts.push("SameSite=Lax");
  } else {
    parts.push("Secure", "SameSite=None");
  }
  return parts.join("; ");
}
