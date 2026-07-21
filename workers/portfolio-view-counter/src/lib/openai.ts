/**
 * OpenAI Responses API helper for Ask Shirley (character-turn schema).
 */

import { parseGeneratedTurn, messagesToAnswer } from "../../../../src/ask-shirley/runtime/parseTurn";
import type { ShirleyTurnState } from "../../../../src/ask-shirley/runtime/state";

export type AskShirleyModelResult = {
  answer: string;
  messages: string[];
  grounding: "documented" | "interpretive" | "unknown";
  relatedTopics: string[];
  /** Hidden — never send to browsers in production responses if undesired. */
  state: ShirleyTurnState;
};

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    state: {
      type: "object",
      properties: {
        tone: {
          type: "string",
          enum: [
            "casual",
            "playful",
            "curious",
            "supportive",
            "serious",
            "excited",
            "defensive",
            "neutral",
          ],
        },
        userEmotion: {
          type: "string",
          enum: [
            "unknown",
            "neutral",
            "happy",
            "excited",
            "sad",
            "anxious",
            "angry",
            "disappointed",
            "playful",
          ],
        },
        attention: { type: "string" },
        immediateReaction: { type: "string" },
        relevantMemoryIds: { type: "array", items: { type: "string" } },
        relevantExampleIds: { type: "array", items: { type: "string" } },
        intention: {
          type: "string",
          enum: [
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
          ],
        },
        shouldAskQuestion: { type: "boolean" },
        responseLength: {
          type: "string",
          enum: ["tiny", "short", "medium", "long"],
        },
        messageCount: { type: "integer", enum: [1, 2, 3] },
      },
      required: [
        "tone",
        "userEmotion",
        "attention",
        "immediateReaction",
        "relevantMemoryIds",
        "relevantExampleIds",
        "intention",
        "shouldAskQuestion",
        "responseLength",
        "messageCount",
      ],
      additionalProperties: false,
    },
    messages: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      maxItems: 3,
    },
    grounding: {
      type: "string",
      enum: ["documented", "interpretive", "unknown"],
    },
    relatedTopics: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["state", "messages", "grounding", "relatedTopics"],
  additionalProperties: false,
} as const;

function extractOutputText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const obj = payload as Record<string, unknown>;

  if (typeof obj.output_text === "string" && obj.output_text.trim()) {
    return obj.output_text;
  }

  const output = obj.output;
  if (!Array.isArray(output)) return "";

  const chunks: string[] = [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const p = part as { type?: string; text?: string };
      if ((p.type === "output_text" || p.type === "text") && typeof p.text === "string") {
        chunks.push(p.text);
      }
    }
  }
  return chunks.join("");
}

export async function askShirleyWithOpenAI(args: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  history: ChatTurn[];
  message: string;
}): Promise<AskShirleyModelResult> {
  const input: Array<{ role: string; content: string }> = [
    { role: "system", content: args.systemPrompt },
  ];

  for (const turn of args.history) {
    input.push({ role: turn.role, content: turn.content });
  }
  input.push({ role: "user", content: args.message });

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: args.model,
      temperature: 0.8,
      max_output_tokens: 280,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "ask_shirley_turn",
          strict: true,
          schema: RESPONSE_SCHEMA,
        },
      },
    }),
  });

  if (!res.ok) {
    console.error(`openai_responses_failed status=${res.status}`);
    throw new Error(`openai_http_${res.status}`);
  }

  const payload: unknown = await res.json();
  const text = extractOutputText(payload);
  if (!text) {
    throw new Error("openai_empty_output");
  }

  const turn = parseGeneratedTurn(text);
  return {
    answer: messagesToAnswer(turn.messages),
    messages: turn.messages,
    grounding: turn.grounding,
    relatedTopics: turn.relatedTopics,
    state: turn.state,
  };
}
