/**
 * Per-turn prompt assembly: style + retrieved identity/examples + memory.
 * Replaces injecting the entire autobiography into every request.
 */

import { conversationalStyle } from "../voice/conversationalStyle";
import { boundaries } from "../voice/boundaries";
import {
  retrieveBehaviorExamples,
  retrieveIdentityChunks,
  retrieveKnowledgeSnippets,
} from "../behavior/retrieval";
import { inferTagsFromMessages } from "../behavior/tags";
import { buildConversationMemory } from "./memory";
import type { ChatTurn } from "./state";
import type { ConversationExample } from "../behavior/examples";

export type PreparedTurn = {
  systemPrompt: string;
  debug: {
    tags: string[];
    exampleIds: string[];
    identityIds: string[];
    knowledgeIds: string[];
    memory: ReturnType<typeof buildConversationMemory>;
  };
};

function formatExample(ex: ConversationExample): string {
  const lines = ex.messages.map((m) =>
    m.role === "user" ? `Visitor: ${m.content}` : `Shirley: ${m.content}`,
  );
  return `### ${ex.id} [${ex.tags.join(", ")}]\n${lines.join("\n")}`;
}

export function prepareAskShirleyTurn(args: {
  history: ChatTurn[];
  message: string;
}): PreparedTurn {
  const recent = [
    ...args.history.slice(-28),
    { role: "user" as const, content: args.message },
  ];
  const tags = inferTagsFromMessages(recent);
  const examples = retrieveBehaviorExamples({
    recentMessages: recent,
    limit: 5,
  });
  const identity = retrieveIdentityChunks({
    recentMessages: recent,
    limit: tags.some((t) =>
      ["project", "portfolio", "philosophy", "introduction"].includes(t),
    )
      ? 4
      : 2,
  });
  const knowledge = retrieveKnowledgeSnippets({
    recentMessages: recent,
    limit: 2,
  });
  const memory = buildConversationMemory(args.history, args.message);

  const identityBlock =
    identity.length > 0
      ? identity.map((c) => `- (${c.id}) ${c.text}`).join("\n")
      : "(none retrieved — keep identity light)";

  const knowledgeBlock =
    knowledge.length > 0
      ? knowledge
          .map((k) => `### ${k.title} (${k.id})\n${k.markdown}`)
          .join("\n\n")
      : "(none — do not invent project details)";

  const memoryBlock = [
    memory.userName ? `userName: ${memory.userName}` : null,
    memory.knownPreferences.length
      ? `preferences: ${memory.knownPreferences.join(", ")}`
      : null,
    memory.recentEvents.length
      ? `recentEvents: ${memory.recentEvents.join("; ")}`
      : null,
    `relationshipTone: ${memory.relationshipTone}`,
  ]
    .filter(Boolean)
    .join("\n");

  const systemPrompt = `
# Ask Shirley — character turn

Objective: Given the ongoing conversation, produce the next message(s) Shirley
would naturally send. Optimize for continuity, social awareness, attention to
the user's actual situation, and believable texting rhythm.

Do NOT optimize for completeness, philosophical depth, advice, politeness
scripts, ending with a question, or summarizing Shirley's identity.

${conversationalStyle}

${boundaries}

## Compact conversation memory (volunteered only — use for callbacks)

${memoryBlock || "(new conversation)"}

## Relevant identity snippets (background — speak from these when natural)

${identityBlock}

## Relevant project knowledge (only if the topic needs it)

${knowledgeBlock}

## Behavior examples (match rhythm — do not copy wording literally)

${examples.map(formatExample).join("\n\n")}

## This turn

1. Infer a hidden plan (state): tone, userEmotion, attention (exact detail),
   immediateReaction, intention (ONE primary), shouldAskQuestion, responseLength,
   messageCount (1–3).
2. Generate messages[] — Shirley's visible text bubbles only.
3. Choose intention first; do not combine validation + anecdote + advice +
   philosophy + question automatically.
4. Multi-bubble only when excitement or an afterthought naturally splits.
5. grounding: documented | interpretive | unknown
6. relatedTopics: short labels or []

Return JSON matching the schema. Never put state/reasoning in messages.
`.trim();

  return {
    systemPrompt,
    debug: {
      tags,
      exampleIds: examples.map((e) => e.id),
      identityIds: identity.map((c) => c.id),
      knowledgeIds: knowledge.map((k) => k.id),
      memory,
    },
  };
}
