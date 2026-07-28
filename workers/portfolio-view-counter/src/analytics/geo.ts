/** Privacy-preserving geo from Cloudflare request headers only. */

export type GeoInfo = {
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
};

export function geoFromRequest(request: Request): GeoInfo {
  // Cloudflare provides these on the Request cf object in production Workers.
  const cf = (request as Request & { cf?: Record<string, unknown> }).cf;
  if (!cf) {
    return { country: null, region: null, city: null, timezone: null };
  }
  const country = typeof cf.country === "string" ? cf.country.slice(0, 8) : null;
  const region = typeof cf.region === "string" ? cf.region.slice(0, 64) : null;
  const city = typeof cf.city === "string" ? cf.city.slice(0, 64) : null;
  const timezone = typeof cf.timezone === "string" ? cf.timezone.slice(0, 64) : null;
  return { country, region, city, timezone };
}
