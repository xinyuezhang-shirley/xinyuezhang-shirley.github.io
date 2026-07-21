/** Lightweight tag inference from recent conversation text. */

export const BEHAVIOR_TAGS = [
  "greeting",
  "introduction",
  "name",
  "casual",
  "music",
  "books",
  "movies",
  "hobbies",
  "project",
  "portfolio",
  "excitement",
  "sadness",
  "comfort",
  "disappointment",
  "anxiety",
  "rejection",
  "teasing",
  "joke",
  "disagreement",
  "compliment",
  "criticism",
  "one_word",
  "topic_change",
  "pause",
  "philosophy",
  "callback",
  "contribute",
  "no_question",
  "ask_question",
] as const;

export type BehaviorTag = (typeof BEHAVIOR_TAGS)[number];

const KEYWORD_TAGS: Array<{ tag: BehaviorTag; patterns: RegExp[] }> = [
  { tag: "greeting", patterns: [/\b(hi|hey|hello|yo)\b/i] },
  { tag: "name", patterns: [/\bname\b/i, /\bi'?m\b/i, /\bmyco\b/i, /\bnickname\b/i] },
  { tag: "introduction", patterns: [/tell me about yourself/i, /what are you like/i] },
  { tag: "music", patterns: [/\bmusic\b/i, /\bk-?pop\b/i, /\bseventeen\b/i, /\bsong\b/i, /\blisten/i] },
  { tag: "books", patterns: [/\bbook/i, /\bread/i, /\bnovel/i] },
  { tag: "movies", patterns: [/\bmovie/i, /\bfilm/i, /\bmuseum/i] },
  { tag: "hobbies", patterns: [/\bhobb/i, /\bfor fun\b/i, /\bhiking\b/i, /\bdraw/i, /\bphoto/i] },
  { tag: "project", patterns: [/\becho\b/i, /\bnommi\b/i, /\bmuselab\b/i, /\bdiffer\b/i, /\bproject/i, /\bvibecode/i] },
  { tag: "portfolio", patterns: [/\bportfolio\b/i, /\bwebsite\b/i, /\byour site\b/i] },
  { tag: "excitement", patterns: [/\bgot the job\b/i, /!!/, /\bcongrats\b/i, /\bexcited\b/i, /\byay\b/i] },
  { tag: "sadness", patterns: [/\bsad\b/i, /\bcry/i, /\bupset\b/i, /\bdown\b/i, /\bmiserable\b/i] },
  { tag: "comfort", patterns: [/\bsad\b/i, /\balone\b/i, /\bhurt\b/i, /\banxious\b/i] },
  { tag: "disappointment", patterns: [/\blost\b/i, /\bfailed\b/i, /\breject/i, /\bripping my heart\b/i, /\bworld cup\b/i] },
  { tag: "anxiety", patterns: [/\banxi/i, /\bworried\b/i, /\bstress/i, /\bnervous\b/i] },
  { tag: "rejection", patterns: [/\breject/i, /\bignored\b/i, /\bghosted\b/i] },
  { tag: "teasing", patterns: [/\brobot\b/i, /\btease/i, /\blol\b/i] },
  { tag: "joke", patterns: [/\bjoke\b/i, /\blmao\b/i, /\bliving in a society\b/i] },
  { tag: "disagreement", patterns: [/\bi disagree\b/i, /\bwrong\b/i, /\bminimalism\b/i] },
  { tag: "compliment", patterns: [/\bthoughtful\b/i, /\bcool\b/i, /\blove your\b/i, /\bnice\b/i] },
  { tag: "criticism", patterns: [/\bweird\b/i, /\bboring\b/i, /\bhard to navigate\b/i, /\btoo\b.+\bweird/i] },
  { tag: "one_word", patterns: [/^(ok|okay|cool|sure|yeah|yep|nah|idk)\.?$/i] },
  { tag: "philosophy", patterns: [/\bmeaning of life\b/i, /\bexistenti/i, /\bpurpose\b/i] },
  { tag: "topic_change", patterns: [/\banyway\b/i, /\benough about\b/i, /\brandom\b/i] },
];

export function inferTagsFromText(text: string): BehaviorTag[] {
  const tags = new Set<BehaviorTag>();
  const trimmed = text.trim();
  if (!trimmed) return ["casual"];

  for (const row of KEYWORD_TAGS) {
    if (row.patterns.some((p) => p.test(trimmed))) tags.add(row.tag);
  }

  if (trimmed.split(/\s+/).length <= 2) tags.add("one_word");
  if (tags.size === 0) tags.add("casual");
  return [...tags];
}

export function inferTagsFromMessages(
  messages: Array<{ role: string; content: string }>,
): BehaviorTag[] {
  const recent = messages.slice(-6);
  const blob = recent.map((m) => m.content).join("\n");
  return inferTagsFromText(blob);
}
