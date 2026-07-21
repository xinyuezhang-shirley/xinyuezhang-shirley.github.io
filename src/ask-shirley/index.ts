/**
 * Ask Shirley module barrel — character-turn architecture.
 */
export { identity } from "./identity";
export { voice } from "./voice";
export { conversationalStyle } from "./voice/conversationalStyle";
export { knowledgeTopics, knowledgeById, formatKnowledgeForPrompt } from "./knowledge";
export { examples, exampleById, incompleteExamples } from "./examples";
export { behaviorExamples } from "./behavior/examples";
export { retrieveBehaviorExamples, retrieveIdentityChunks } from "./behavior/retrieval";
export { prepareAskShirleyTurn } from "./runtime/buildPrompt";
export { buildGenerateTurnContext } from "./runtime/generateTurn";
export {
  ASK_SHIRLEY_CATEGORIES,
  ASK_SHIRLEY_QUESTIONS,
  questionsForCategory,
} from "./questions";
export { buildSystemPrompt, systemPrompt } from "./systemPrompt";
export type {
  AskShirleyApiRequest,
  AskShirleyApiResponse,
  AskShirleyCategory,
  AskShirleyChatMessage,
  AskShirleyQuestion,
  GroundingLevel,
  ShirleyExample,
} from "./types";
export type { ShirleyTurnState, ConversationMemory, GeneratedTurn } from "./runtime/state";
export { isPlaceholderAnswer, SHIRLEY_WRITE_MARKER } from "./types";
