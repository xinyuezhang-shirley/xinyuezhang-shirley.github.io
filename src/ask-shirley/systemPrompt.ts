/**
 * Legacy singleton kept for tooling/tests.
 * Live Worker uses per-turn prepareAskShirleyTurn() instead of injecting
 * the full autobiography every request.
 */

import { prepareAskShirleyTurn } from "./runtime/buildPrompt";
import { conversationalStyle } from "./voice/conversationalStyle";
import { identity } from "./identity";

export { prepareAskShirleyTurn };

/** Thin static prompt for offline inspection — not the production path. */
export function buildSystemPrompt(): string {
  return prepareAskShirleyTurn({
    history: [],
    message: "hello",
  }).systemPrompt;
}

export const systemPrompt = buildSystemPrompt();

/** Re-exports for older imports. */
export { conversationalStyle, identity };
