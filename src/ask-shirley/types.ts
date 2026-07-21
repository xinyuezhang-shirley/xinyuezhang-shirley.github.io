/** Shared types for Ask Shirley personality layer + chat API. */

export type AskShirleyCategory =
  | "all"
  | "design"
  | "projects"
  | "ai"
  | "research"
  | "creative"
  | "career"
  | "personal"
  | "identity"
  | "boundaries";

export type AskShirleyQuestionCategory = Exclude<AskShirleyCategory, "all">;

export type AskShirleyQuestion = {
  id: string;
  number: string;
  text: string;
  category: AskShirleyQuestionCategory;
};

export type ShirleyExampleTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ShirleyExample = {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedKnowledgeIds: string[];
  /** Multi-turn exchange preferred for few-shot formatting when present. */
  turns?: ShirleyExampleTurn[];
};

export type KnowledgeSectionKey =
  | "oneSentence"
  | "motivation"
  | "problem"
  | "role"
  | "technicalDecisions"
  | "visualDecisions"
  | "whatChanged"
  | "whatFailed"
  | "whatLearned"
  | "redesign"
  | "links";

export type KnowledgeTopic = {
  id: string;
  title: string;
  /** Markdown body used in the v1 system prompt. */
  markdown: string;
};

export type GroundingLevel = "documented" | "interpretive" | "unknown";

export type AskShirleyChatRole = "user" | "assistant";

export type AskShirleyChatMessage = {
  id: string;
  role: AskShirleyChatRole;
  content: string;
  createdAt: number;
  grounding?: GroundingLevel;
  relatedTopics?: string[];
};

export type AskShirleyApiRequest = {
  message: string;
  history?: Array<{
    role: AskShirleyChatRole;
    content: string;
  }>;
};

export type AskShirleyApiResponse = {
  /** Joined messages for legacy clients. */
  answer: string;
  /** Preferred: 1–3 text bubbles for this turn. */
  messages?: string[];
  grounding: GroundingLevel;
  relatedTopics: string[];
};

export type AskShirleyApiError = {
  error: string;
  code?: string;
};

/** Marker used in example answers Shirley still needs to write. */
export const SHIRLEY_WRITE_MARKER = "[SHIRLEY TO WRITE:";

export function isPlaceholderAnswer(answer: string): boolean {
  return answer.includes(SHIRLEY_WRITE_MARKER);
}
