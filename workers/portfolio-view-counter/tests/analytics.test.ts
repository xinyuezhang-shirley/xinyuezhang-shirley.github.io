import { describe, expect, it } from "vitest";
import { redactVisitorText, looksLikeAuthMessage } from "../src/analytics/redact";
import { isAllowedEventName, sanitizeMetadata } from "../src/analytics/schema";
import { classifyAcquisition, isLikelyBot, referrerDomainFrom } from "../src/analytics/classify";

describe("analytics event allowlist", () => {
  it("accepts known events and rejects arbitrary names", () => {
    expect(isAllowedEventName("page_viewed")).toBe(true);
    expect(isAllowedEventName("hack_the_planet")).toBe(false);
  });

  it("strips non-allowlisted metadata keys", () => {
    const meta = sanitizeMetadata({
      analyticsId: "project-echo-open",
      password: "nope",
      label: "Open Echo",
      huge: "x".repeat(5000),
    });
    expect(meta).toBeTruthy();
    expect(meta).not.toHaveProperty("password");
    expect(meta?.analyticsId).toBe("project-echo-open");
  });
});

describe("redaction", () => {
  it("redacts emails, phones, keys, and /owner auth", () => {
    const out = redactVisitorText(
      "mail me at test@example.com or +1 415-555-1212 sk-abcdefghijklmnop /owner secret-passphrase-here",
    );
    expect(out).not.toMatch(/test@example.com/);
    expect(out).not.toMatch(/415-555-1212/);
    expect(out).not.toMatch(/sk-abcdefghijklmnop/);
    expect(out).not.toMatch(/secret-passphrase/);
    expect(looksLikeAuthMessage("/owner abcdefghijkl")).toBe(true);
  });
});

describe("acquisition + bots", () => {
  it("classifies linkedin and direct", () => {
    expect(
      classifyAcquisition({ referrerDomain: "linkedin.com", utmSource: null }),
    ).toBe("LinkedIn");
    expect(classifyAcquisition({ referrerDomain: null, utmSource: null })).toBe("Direct");
  });

  it("extracts referrer domain only", () => {
    expect(referrerDomainFrom("https://www.google.com/search?q=secret")).toBe("google.com");
  });

  it("flags crawlers", () => {
    expect(isLikelyBot("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(isLikelyBot("Mozilla/5.0 (Macintosh) Chrome/120")).toBe(false);
  });
});
