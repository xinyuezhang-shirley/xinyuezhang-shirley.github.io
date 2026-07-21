import type { GeneratedTurn, ShirleyTurnState, SocialIntention, ShirleyTone, UserEmotion } from "./state";

const TONES: ShirleyTone[] = [
  "casual",
  "playful",
  "curious",
  "supportive",
  "serious",
  "excited",
  "defensive",
  "neutral",
];

const EMOTIONS: UserEmotion[] = [
  "unknown",
  "neutral",
  "happy",
  "excited",
  "sad",
  "anxious",
  "angry",
  "disappointed",
  "playful",
];

const INTENTIONS: SocialIntention[] = [
  "react",
  "answer",
  "comfort",
  "ask_specific_question",
  "share_related_detail",
  "joke",
  "agree",
  "disagree",
  "clarify",
  "continue_topic",
  "change_topic",
  "pause",
  "celebrate",
];

function asEnum<T extends string>(value: unknown, allowed: T[], fallback: T): T {
  return typeof value === "string" && (allowed as string[]).includes(value)
    ? (value as T)
    : fallback;
}

function normalizeMessages(raw: unknown, legacyAnswer?: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .filter((m): m is string => typeof m === "string")
      .map((m) => m.trim())
      .filter(Boolean)
      .slice(0, 3);
  }
  if (typeof legacyAnswer === "string" && legacyAnswer.trim()) {
    return [legacyAnswer.trim()];
  }
  return [];
}

function parseState(raw: unknown): ShirleyTurnState {
  const s = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const messageCountRaw = Number(s.messageCount);
  const messageCount: 1 | 2 | 3 =
    messageCountRaw === 2 || messageCountRaw === 3 ? messageCountRaw : 1;

  return {
    tone: asEnum(s.tone, TONES, "casual"),
    userEmotion: asEnum(s.userEmotion, EMOTIONS, "unknown"),
    attention: typeof s.attention === "string" ? s.attention : "",
    immediateReaction: typeof s.immediateReaction === "string" ? s.immediateReaction : "",
    relevantMemoryIds: Array.isArray(s.relevantMemoryIds)
      ? s.relevantMemoryIds.filter((x): x is string => typeof x === "string").slice(0, 8)
      : [],
    relevantExampleIds: Array.isArray(s.relevantExampleIds)
      ? s.relevantExampleIds.filter((x): x is string => typeof x === "string").slice(0, 8)
      : [],
    intention: asEnum(s.intention, INTENTIONS, "react"),
    shouldAskQuestion: Boolean(s.shouldAskQuestion),
    responseLength: asEnum(
      s.responseLength,
      ["tiny", "short", "medium", "long"] as const,
      "short",
    ),
    messageCount,
  };
}

/** Parse model JSON — supports new {state,messages} and legacy {answer}. */
export function parseGeneratedTurn(raw: string): GeneratedTurn {
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  const messages = normalizeMessages(parsed.messages, parsed.answer);
  if (messages.length === 0) {
    throw new Error("empty_model_answer");
  }

  const grounding =
    parsed.grounding === "documented" ||
    parsed.grounding === "interpretive" ||
    parsed.grounding === "unknown"
      ? parsed.grounding
      : "unknown";

  const relatedTopics = Array.isArray(parsed.relatedTopics)
    ? parsed.relatedTopics.filter((t): t is string => typeof t === "string").slice(0, 8)
    : [];

  return {
    state: parseState(parsed.state),
    messages,
    grounding,
    relatedTopics,
  };
}

export function messagesToAnswer(messages: string[]): string {
  return messages.join("\n\n");
}
