/** Hidden per-turn planning state — never shown in the UI. */

export type ShirleyTone =
  | "casual"
  | "playful"
  | "curious"
  | "supportive"
  | "serious"
  | "excited"
  | "defensive"
  | "neutral";

export type UserEmotion =
  | "unknown"
  | "neutral"
  | "happy"
  | "excited"
  | "sad"
  | "anxious"
  | "angry"
  | "disappointed"
  | "playful";

export type SocialIntention =
  | "react"
  | "answer"
  | "comfort"
  | "ask_specific_question"
  | "share_related_detail"
  | "joke"
  | "agree"
  | "disagree"
  | "clarify"
  | "continue_topic"
  | "change_topic"
  | "pause"
  | "celebrate";

export type ShirleyTurnState = {
  tone: ShirleyTone;
  userEmotion: UserEmotion;
  attention: string;
  immediateReaction: string;
  relevantMemoryIds: string[];
  relevantExampleIds: string[];
  intention: SocialIntention;
  shouldAskQuestion: boolean;
  responseLength: "tiny" | "short" | "medium" | "long";
  messageCount: 1 | 2 | 3;
};

export type ConversationMemory = {
  userName?: string;
  knownPreferences: string[];
  recentEvents: string[];
  unresolvedTopics: string[];
  relationshipTone: "new" | "casual" | "familiar";
};

export type GeneratedTurn = {
  state: ShirleyTurnState;
  messages: string[];
  grounding: "documented" | "interpretive" | "unknown";
  relatedTopics: string[];
};

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};
