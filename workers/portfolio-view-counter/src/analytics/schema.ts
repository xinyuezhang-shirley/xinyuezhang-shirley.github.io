/** Allowlisted analytics event names + metadata keys. */

export const ALLOWED_EVENT_NAMES = [
  "session_started",
  "session_ended",
  "page_viewed",
  "page_exited",
  "page_visibility_changed",
  "engagement_heartbeat",
  "button_clicked",
  "link_clicked",
  "project_opened",
  "project_interacted",
  "file_downloaded",
  "external_link_opened",
  "chat_opened",
  "chat_message_sent",
  "chat_response_received",
  "chat_tool_used",
  "chat_error",
  "owner_authenticated",
  "owner_logged_out",
] as const;

export type AllowedEventName = (typeof ALLOWED_EVENT_NAMES)[number];

export const ALLOWED_METADATA_KEYS = new Set([
  "analyticsId",
  "category",
  "label",
  "destinationPath",
  "destinationDomain",
  "projectId",
  "previousPath",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "activeMs",
  "visible",
  "screenCategory",
  "language",
  "conversationId",
  "latencyMs",
  "model",
  "toolNames",
  "errorCode",
  "isOwnerMode",
]);

export const MAX_EVENTS_PER_BATCH = 25;
export const MAX_METADATA_CHARS = 1500;
export const MAX_PATH_CHARS = 200;
export const MAX_TITLE_CHARS = 200;

export function isAllowedEventName(name: string): name is AllowedEventName {
  return (ALLOWED_EVENT_NAMES as readonly string[]).includes(name);
}

export function sanitizeMetadata(
  raw: unknown,
): Record<string, string | number | boolean | string[]> | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out: Record<string, string | number | boolean | string[]> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!ALLOWED_METADATA_KEYS.has(key)) continue;
    if (typeof value === "string") {
      out[key] = value.slice(0, 200);
    } else if (typeof value === "number" && Number.isFinite(value)) {
      out[key] = value;
    } else if (typeof value === "boolean") {
      out[key] = value;
    } else if (Array.isArray(value)) {
      out[key] = value
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.slice(0, 64))
        .slice(0, 8);
    }
  }
  const serialized = JSON.stringify(out);
  if (serialized.length > MAX_METADATA_CHARS) return null;
  return out;
}
