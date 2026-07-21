/**
 * Entry used by the Worker: prepare context → call model → parse turn.
 * Single structured call returns hidden state + visible messages.
 */

import { prepareAskShirleyTurn, type PreparedTurn } from "./buildPrompt";
import type { ChatTurn, GeneratedTurn } from "./state";

export type GenerateTurnContext = PreparedTurn & {
  history: ChatTurn[];
  message: string;
};

export function buildGenerateTurnContext(args: {
  history: ChatTurn[];
  message: string;
}): GenerateTurnContext {
  const prepared = prepareAskShirleyTurn(args);
  return {
    ...prepared,
    history: args.history,
    message: args.message,
  };
}

export type { GeneratedTurn, PreparedTurn };
