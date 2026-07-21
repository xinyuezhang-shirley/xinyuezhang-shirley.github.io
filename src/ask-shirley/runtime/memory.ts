import type { ChatTurn, ConversationMemory } from "./state";

/**
 * Compact user memory from volunteered details only.
 * Used for callbacks — never as an interview checklist.
 */
export function buildConversationMemory(
  history: ChatTurn[],
  message: string,
): ConversationMemory {
  const userTexts = [...history, { role: "user" as const, content: message }]
    .filter((t) => t.role === "user")
    .map((t) => t.content);

  const blob = userTexts.join("\n");
  const knownPreferences: string[] = [];
  const recentEvents: string[] = [];
  const unresolvedTopics: string[] = [];

  let userName: string | undefined;
  const nameMatch = blob.match(
    /\b(?:i(?:'m| am)|my name is|call me)\s+([A-Z][a-zA-Z]{1,20})\b/,
  );
  if (nameMatch?.[1] && !/^(Sad|Sorry|Just|Also|Here)$/i.test(nameMatch[1])) {
    userName = nameMatch[1];
  }
  // Common nickname from examples
  if (/\bMyco\b/i.test(blob)) userName = userName || "Myco";

  if (/\bmusic\b/i.test(blob)) knownPreferences.push("music");
  if (/\bk-?pop\b/i.test(blob)) knownPreferences.push("k-pop");
  if (/\brock\b/i.test(blob)) knownPreferences.push("rock");
  if (/\bindie\b/i.test(blob)) knownPreferences.push("indie");
  if (/\bhiking\b/i.test(blob)) knownPreferences.push("hiking");
  if (/\bbooks?\b|\bread/i.test(blob)) knownPreferences.push("reading");

  if (/\bjob\b/i.test(blob)) recentEvents.push("mentioned a job");
  if (/\binterview\b/i.test(blob)) recentEvents.push("mentioned an interview");
  if (/\bsad\b/i.test(blob)) recentEvents.push("feeling sad");
  if (/\blost\b/i.test(blob)) recentEvents.push("mentioned a loss/defeat");

  const lastUser = message.trim();
  if (lastUser.length > 0 && lastUser.length < 120) {
    unresolvedTopics.push(lastUser);
  }

  const userCount = userTexts.length;
  const relationshipTone: ConversationMemory["relationshipTone"] =
    userCount >= 8 ? "familiar" : userCount >= 3 ? "casual" : "new";

  return {
    userName,
    knownPreferences: [...new Set(knownPreferences)].slice(0, 8),
    recentEvents: [...new Set(recentEvents)].slice(0, 6),
    unresolvedTopics: unresolvedTopics.slice(0, 3),
    relationshipTone,
  };
}
