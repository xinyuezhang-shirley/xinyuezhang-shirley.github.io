/**
 * Knowledge topics for Ask Shirley v1.
 * Edit the `.md` files, then refresh embeds via:
 *   python3 -c "..." (see workers README) or re-run the embed script.
 * `embedded.ts` is what Vite + the Cloudflare Worker actually bundle.
 */

import type { KnowledgeTopic } from "./types";
import {
  aboutMarkdown,
  differMarkdown,
  echoMarkdown,
  ironcladMarkdown,
  muselabMarkdown,
  nommiMarkdown,
  portfolioMarkdown,
  researchMarkdown,
  teslaMarkdown,
} from "./knowledge/embedded";

export const knowledgeTopics: KnowledgeTopic[] = [
  { id: "echo", title: "Echo", markdown: echoMarkdown },
  { id: "nommi", title: "Nommi", markdown: nommiMarkdown },
  { id: "muselab", title: "MuseLab", markdown: muselabMarkdown },
  { id: "differ", title: "Differ", markdown: differMarkdown },
  { id: "ironclad", title: "Ironclad", markdown: ironcladMarkdown },
  { id: "tesla", title: "Tesla · Brake health", markdown: teslaMarkdown },
  { id: "research", title: "Research", markdown: researchMarkdown },
  { id: "portfolio", title: "Portfolio", markdown: portfolioMarkdown },
  { id: "about", title: "About", markdown: aboutMarkdown },
];

export function knowledgeById(id: string): KnowledgeTopic | undefined {
  return knowledgeTopics.find((t) => t.id === id);
}

export function formatKnowledgeForPrompt(
  topics: KnowledgeTopic[] = knowledgeTopics
): string {
  return topics
    .map((t) => `### ${t.title} (id: ${t.id})\n\n${t.markdown.trim()}`)
    .join("\n\n---\n\n");
}
