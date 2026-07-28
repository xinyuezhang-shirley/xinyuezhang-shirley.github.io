/**
 * Public portfolio knowledge search — uses embedded Ask Shirley knowledge, not live scrape.
 */

import { knowledgeTopics } from "../../../../src/ask-shirley/knowledge";

export type PortfolioHit = {
  id: string;
  title: string;
  excerpt: string;
};

function score(text: string, terms: string[]): number {
  const lower = text.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!t) continue;
    if (lower.includes(t)) s += 2;
    const words = t.split(/\s+/);
    for (const w of words) {
      if (w.length > 2 && lower.includes(w)) s += 1;
    }
  }
  return s;
}

export function searchPortfolioContent(query: string, limit = 4): PortfolioHit[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2)
    .slice(0, 12);
  if (!terms.length) return [];

  const ranked = knowledgeTopics
    .map((topic) => {
      const hay = `${topic.title}\n${topic.markdown}`;
      return {
        id: topic.id,
        title: topic.title,
        excerpt: topic.markdown.slice(0, 800),
        s: score(hay, terms),
      };
    })
    .filter((t) => t.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, Math.min(Math.max(limit, 1), 6));

  return ranked.map(({ id, title, excerpt }) => ({ id, title, excerpt }));
}
