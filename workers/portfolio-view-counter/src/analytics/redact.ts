/** Redact secrets / PII from visitor chat text before storage or email. */

const PATTERNS: Array<{ re: RegExp; replacement: string }> = [
  { re: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, replacement: "[email]" },
  { re: /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g, replacement: "[phone]" },
  { re: /\bsk-[A-Za-z0-9_-]{10,}\b/g, replacement: "[api_key]" },
  { re: /\bBearer\s+[A-Za-z0-9._-]{10,}\b/gi, replacement: "[token]" },
  { re: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g, replacement: "[token]" },
  { re: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g, replacement: "[aws_key]" },
  { re: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, replacement: "[card]" },
  { re: /\/owner\b[\s\S]{0,500}/gi, replacement: "[redacted_auth]" },
  { re: /\bpassword\s*[:=]\s*\S+/gi, replacement: "password=[redacted]" },
];

export function redactVisitorText(input: string): string {
  let text = input.slice(0, 4000);
  for (const { re, replacement } of PATTERNS) {
    text = text.replace(re, replacement);
  }
  return text.trim();
}

export function looksLikeAuthMessage(text: string): boolean {
  return /^\/owner\b/i.test(text.trim());
}
