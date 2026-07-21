/**
 * OpenAI Responses API helper for Ask Shirley.
 */

export type AskShirleyModelResult = {
  answer: string;
  grounding: "documented" | "interpretive" | "unknown";
  relatedTopics: string[];
};

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    answer: { type: "string" },
    grounding: {
      type: "string",
      enum: ["documented", "interpretive", "unknown"],
    },
    relatedTopics: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["answer", "grounding", "relatedTopics"],
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

function parseResult(raw: string): AskShirleyModelResult {
  const parsed = JSON.parse(raw) as Partial<AskShirleyModelResult>;
  const grounding =
    parsed.grounding === "documented" ||
    parsed.grounding === "interpretive" ||
    parsed.grounding === "unknown"
      ? parsed.grounding
      : "unknown";

  const relatedTopics = Array.isArray(parsed.relatedTopics)
    ? parsed.relatedTopics.filter((t): t is string => typeof t === "string").slice(0, 8)
    : [];

  const answer = typeof parsed.answer === "string" ? parsed.answer.trim() : "";
  if (!answer) {
    throw new Error("empty_model_answer");
  }

  return { answer, grounding, relatedTopics };
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
      input,
      text: {
        format: {
          type: "json_schema",
          name: "ask_shirley_response",
          strict: true,
          schema: RESPONSE_SCHEMA,
        },
      },
    }),
  });

  if (!res.ok) {
    // Do not log body (may contain prompt fragments). Status only.
    console.error(`openai_responses_failed status=${res.status}`);
    throw new Error(`openai_http_${res.status}`);
  }

  const payload: unknown = await res.json();
  const text = extractOutputText(payload);
  if (!text) {
    throw new Error("openai_empty_output");
  }

  return parseResult(text);
}
