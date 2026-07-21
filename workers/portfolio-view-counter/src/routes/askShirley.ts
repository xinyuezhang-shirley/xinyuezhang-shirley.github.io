/**
 * POST /api/ask-shirley
 */

import { systemPrompt } from "../../../../src/ask-shirley/systemPrompt";
import { askShirleyWithOpenAI, type ChatTurn } from "../lib/openai";
import { allowRequest } from "../lib/rateLimit";

export type AskShirleyEnv = {
  DB: D1Database;
  ALLOWED_ORIGIN: string;
  OPENAI_API_KEY: string;
  OPENAI_MODEL: string;
  /** Optional override; defaults to a tighter chat limit. */
  ASK_SHIRLEY_RATE_MAX?: string;
};

const MAX_MESSAGE_CHARS = 1500;
/** Latest conversation turns (excluding current message). Target ~15–30. */
const MAX_HISTORY_TURNS = 24;

type JsonFn = (
  body: unknown,
  status: number,
  origin: string | null,
  allowed: string,
) => Response;

function trimHistory(raw: unknown): ChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns: ChatTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    turns.push({ role, content: trimmed.slice(0, MAX_MESSAGE_CHARS) });
  }
  return turns.slice(-MAX_HISTORY_TURNS);
}

export async function handleAskShirley(
  request: Request,
  env: AskShirleyEnv,
  json: JsonFn,
): Promise<Response> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;

  if (request.method !== "POST") {
    return json({ error: "Method not allowed", code: "method" }, 405, origin, allowed);
  }

  if (!env.OPENAI_API_KEY) {
    console.error("ask_shirley_missing_openai_key");
    return json({ error: "Ask Shirley is not configured.", code: "config" }, 503, origin, allowed);
  }

  const model = (env.OPENAI_MODEL || "").trim() || "gpt-4.1-mini";
  const rateMax = Number.parseInt(env.ASK_SHIRLEY_RATE_MAX || "8", 10);
  const max = Number.isFinite(rateMax) && rateMax > 0 ? rateMax : 8;

  if (!(await allowRequest(env, request, { prefix: "ask", max, windowMs: 60_000 }))) {
    return json({ error: "Too many requests. Try again shortly.", code: "rate_limit" }, 429, origin, allowed);
  }

  let body: { message?: unknown; history?: unknown } = {};
  try {
    body = (await request.json()) as { message?: unknown; history?: unknown };
  } catch {
    return json({ error: "Invalid JSON body.", code: "invalid_json" }, 400, origin, allowed);
  }

  if (typeof body.message !== "string") {
    return json({ error: "Message is required.", code: "missing_message" }, 400, origin, allowed);
  }

  const message = body.message.trim();
  if (!message) {
    return json({ error: "Message is empty.", code: "empty_message" }, 400, origin, allowed);
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return json(
      { error: `Message exceeds ${MAX_MESSAGE_CHARS} characters.`, code: "message_too_long" },
      400,
      origin,
      allowed,
    );
  }

  const history = trimHistory(body.history);

  try {
    const result = await askShirleyWithOpenAI({
      apiKey: env.OPENAI_API_KEY,
      model,
      systemPrompt,
      history,
      message,
    });

    return json(
      {
        answer: result.answer,
        grounding: result.grounding,
        relatedTopics: result.relatedTopics,
      },
      200,
      origin,
      allowed,
    );
  } catch (err) {
    const code = err instanceof Error ? err.message : "unknown";
    console.error(`ask_shirley_failed code=${code}`);
    return json(
      { error: "Could not generate a reply. Try again.", code: "upstream" },
      502,
      origin,
      allowed,
    );
  }
}
