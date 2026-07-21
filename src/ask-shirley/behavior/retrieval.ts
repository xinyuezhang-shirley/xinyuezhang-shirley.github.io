import { behaviorExamples, type ConversationExample } from "./examples";
import { inferTagsFromMessages, type BehaviorTag } from "./tags";
import { identityChunks, type IdentityChunk } from "../identity/chunks";
import { knowledgeTopics } from "../knowledge";

export type RetrieveBehaviorArgs = {
  recentMessages: Array<{ role: string; content: string }>;
  inferredTone?: string[];
  limit?: number;
};

function scoreExample(
  ex: ConversationExample,
  tags: BehaviorTag[],
  blob: string,
): number {
  let score = 0;
  for (const t of tags) {
    if (ex.tags.includes(t)) score += 3;
  }
  const lower = blob.toLowerCase();
  for (const t of ex.tags) {
    if (lower.includes(t.replace(/_/g, " "))) score += 1;
  }
  // Prefer multi-turn examples slightly
  if (ex.messages.length >= 4) score += 1;
  return score;
}

export function retrieveBehaviorExamples(
  args: RetrieveBehaviorArgs,
): ConversationExample[] {
  const limit = args.limit ?? 4;
  const tags = inferTagsFromMessages(args.recentMessages);
  const blob = args.recentMessages
    .slice(-6)
    .map((m) => m.content)
    .join("\n");

  const ranked = behaviorExamples
    .map((ex) => ({ ex, score: scoreExample(ex, tags, blob) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = ranked.slice(0, limit).map((r) => r.ex);
  if (picked.length >= 2) return picked;

  // Always include a no_question casual example as ballast
  const ballast =
    behaviorExamples.find((e) => e.id === "ex-music-share") ||
    behaviorExamples[0];
  return [...picked, ballast].filter(Boolean).slice(0, limit);
}

export function retrieveIdentityChunks(args: {
  recentMessages: Array<{ role: string; content: string }>;
  limit?: number;
}): IdentityChunk[] {
  const limit = args.limit ?? 3;
  const tags = inferTagsFromMessages(args.recentMessages);
  const blob = args.recentMessages
    .slice(-8)
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  const emotional =
    tags.includes("sadness") ||
    tags.includes("comfort") ||
    tags.includes("anxiety") ||
    tags.includes("disappointment");

  const ranked = identityChunks
    .map((chunk) => {
      let score = 0;
      for (const t of chunk.tags) {
        if (tags.includes(t as BehaviorTag)) score += 3;
        if (blob.includes(t)) score += 2;
      }
      if (emotional && chunk.id === "friendship") score += 5;
      if (emotional && chunk.id === "worldview-light") score -= 2;
      // Casual small talk: keep identity light
      if (tags.includes("casual") && chunk.id === "bio-core") score += 1;
      return { chunk, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, limit).map((r) => r.chunk);
}

/** Project/knowledge markdown — only when project tags fire. */
export function retrieveKnowledgeSnippets(args: {
  recentMessages: Array<{ role: string; content: string }>;
  limit?: number;
}): Array<{ id: string; title: string; markdown: string }> {
  const limit = args.limit ?? 2;
  const blob = args.recentMessages
    .slice(-6)
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  const hits = knowledgeTopics.filter((t) => {
    if (blob.includes(t.id)) return true;
    if (blob.includes(t.title.toLowerCase())) return true;
    return false;
  });

  return hits.slice(0, limit).map((t) => ({
    id: t.id,
    title: t.title,
    // Keep snippets short for casual turns
    markdown: t.markdown.slice(0, 1200),
  }));
}
