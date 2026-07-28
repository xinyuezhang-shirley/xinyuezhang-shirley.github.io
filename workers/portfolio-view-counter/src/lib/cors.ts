/** CORS helpers — credentials required for owner session cookies. */

export function parseAllowedOrigins(allowed: string): string[] {
  return allowed
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

export function isOriginAllowed(origin: string | null, allowed: string): boolean {
  if (!origin) return false;
  return parseAllowedOrigins(allowed).includes(origin);
}

export function corsHeaders(origin: string | null, allowed: string): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Dev-Reset-Secret",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && isOriginAllowed(origin, allowed)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

export function jsonResponse(
  body: unknown,
  status: number,
  origin: string | null,
  allowed: string,
  extraHeaders?: HeadersInit,
): Response {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    ...corsHeaders(origin, allowed),
  });
  if (extraHeaders) {
    const extra = new Headers(extraHeaders);
    extra.forEach((v, k) => headers.set(k, v));
  }
  return new Response(JSON.stringify(body), { status, headers });
}
