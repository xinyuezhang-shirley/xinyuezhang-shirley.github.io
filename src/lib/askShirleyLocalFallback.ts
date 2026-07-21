/**
 * Labeled local fallback when VITE_ASK_SHIRLEY_ENDPOINT is unset.
 * Prefer the real Worker API in development and production.
 */

import { ASK_SHIRLEY_QUESTIONS } from "@/ask-shirley/questions";
import { examples } from "@/ask-shirley/examples";
import { isPlaceholderAnswer } from "@/ask-shirley/types";

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function craftLocalAskShirleyReply(userText: string): string {
  const n = normalize(userText);

  const exactQ = ASK_SHIRLEY_QUESTIONS.find((q) => normalize(q.text) === n);
  if (exactQ) {
    const ex = examples.find((e) => e.id === exactQ.id);
    if (ex && !isPlaceholderAnswer(ex.answer)) return ex.answer;
    if (ex && isPlaceholderAnswer(ex.answer)) {
      return "Shirley has not recorded a personal answer for this question yet. The authoring view at /ask-shirley/author (dev only) is where she fills these in.";
    }
  }

  const byQuestion = examples.find((e) => normalize(e.question) === n);
  if (byQuestion && !isPlaceholderAnswer(byQuestion.answer)) return byQuestion.answer;

  const keywordRows: { keys: string[]; id: string }[] = [
    { keys: ["are you actually", "are you shirley", "real shirley"], id: "actually-shirley" },
    { keys: ["phone number"], id: "phone-number" },
    { keys: ["nommi", "nonmi"], id: "nommi-inspire" },
    { keys: ["differ"], id: "differ-about" },
    { keys: ["ironclad"], id: "ironclad-work" },
    { keys: ["tesla", "brake"], id: "tesla-work" },
    { keys: ["poem-to-song", "poem to song"], id: "poem-to-song" },
    { keys: ["pomdp"], id: "pomdp" },
    { keys: ["amateur"], id: "amateur" },
  ];

  for (const row of keywordRows) {
    if (row.keys.some((k) => n.includes(k))) {
      const ex = examples.find((e) => e.id === row.id);
      if (ex && !isPlaceholderAnswer(ex.answer)) return ex.answer;
    }
  }

  return [
    "I don't have a recorded answer for that exact question yet.",
    "",
    `You asked: “${userText.trim()}”`,
    "",
    "Try a curated prompt from the sidebar, or configure VITE_ASK_SHIRLEY_ENDPOINT so replies come from the Worker + OpenAI path.",
    "",
    "AI INTERPRETATION — NOT ACTUALLY SHIRLEY.",
  ].join("\n");
}
