/** Acquisition + referrer domain helpers (privacy-preserving). */

export function referrerDomainFrom(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== "string") return null;
  try {
    const u = new URL(raw);
    return u.hostname.replace(/^www\./, "").slice(0, 120) || null;
  } catch {
    return null;
  }
}

export function classifyAcquisition(args: {
  referrerDomain: string | null;
  utmSource?: string | null;
}): string {
  const utm = (args.utmSource || "").toLowerCase().trim();
  if (utm) {
    if (utm.includes("linkedin")) return "LinkedIn";
    if (utm.includes("github")) return "GitHub";
    if (/(twitter|x|instagram|facebook|reddit|weibo|rednote|xiaohongshu)/.test(utm)) {
      return "Social";
    }
    if (/(google|bing|duckduckgo|yahoo|baidu)/.test(utm)) return "Search";
    return "Other";
  }

  const d = (args.referrerDomain || "").toLowerCase();
  if (!d) return "Direct";
  if (/(google\.|bing\.|duckduckgo\.|yahoo\.|baidu\.)/.test(d)) return "Search";
  if (d.includes("linkedin.")) return "LinkedIn";
  if (d.includes("github.")) return "GitHub";
  if (/(twitter\.|x\.com|instagram\.|facebook\.|reddit\.|weibo\.|xiaohongshu\.)/.test(d)) {
    return "Social";
  }
  if (/(edu$|\.edu\.|stanford\.|northwestern\.)/.test(d)) return "University";
  return "Referral";
}

export function deviceCategory(ua: string): string {
  const u = ua.toLowerCase();
  if (/bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(ua)) return "bot";
  if (/ipad|tablet/i.test(u)) return "tablet";
  if (/mobi|iphone|android(?!.*tablet)/i.test(u)) return "mobile";
  return "desktop";
}

export function browserFamily(ua: string): string {
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  if (/bot|crawl|spider/i.test(ua)) return "Bot";
  return "Other";
}

export function isLikelyBot(ua: string): boolean {
  return /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|wget|curl|python-requests/i.test(
    ua,
  );
}
