/** Concept families for Representation Field × Specimens. Keep few and intentional. */
export type ConceptId =
  | "machine"
  | "person"
  | "representation"
  | "research"
  | "writing"
  | "amateur";

/** Longer phrases first so matching prefers multi-word anchors. */
export const CONCEPT_TERMS: { concept: ConceptId; term: string }[] = [
  { concept: "machine", term: "AI agent" },
  { concept: "person", term: "human experience" },
  { concept: "representation", term: "interpretation" },
  { concept: "amateur", term: "fondness" },
  { concept: "machine", term: "engineering" },
  { concept: "machine", term: "systems" },
  { concept: "machine", term: "system" },
  { concept: "machine", term: "machine" },
  { concept: "research", term: "research" },
  { concept: "research", term: "pipeline" },
  { concept: "research", term: "model" },
  { concept: "representation", term: "represent" },
  { concept: "representation", term: "means" },
  { concept: "person", term: "person" },
  { concept: "person", term: "people" },
  { concept: "writing", term: "writing" },
  { concept: "writing", term: "poem" },
  { concept: "amateur", term: "amateur" },
  { concept: "amateur", term: "amator" },
  { concept: "amateur", term: "lover" },
  { concept: "amateur", term: "love" },
];

export type TextPart =
  | { type: "text"; value: string }
  | { type: "anchor"; value: string; concept: ConceptId };

export function tokenizeConcepts(input: string): TextPart[] {
  if (!input) return [];

  const parts: TextPart[] = [];
  let i = 0;

  while (i < input.length) {
    let matched: { concept: ConceptId; term: string } | null = null;

    for (const entry of CONCEPT_TERMS) {
      const slice = input.slice(i, i + entry.term.length);
      if (slice.toLowerCase() !== entry.term.toLowerCase()) continue;

      const before = i === 0 ? "" : input[i - 1]!;
      const after = input[i + entry.term.length] ?? "";
      const boundaryBefore = i === 0 || /[\s—\-–.,;:'"()?]/.test(before);
      const boundaryAfter = after === "" || /[\s—\-–.,;:'"()?]/.test(after);
      if (!boundaryBefore || !boundaryAfter) continue;

      matched = entry;
      break;
    }

    if (matched) {
      parts.push({
        type: "anchor",
        value: input.slice(i, i + matched.term.length),
        concept: matched.concept,
      });
      i += matched.term.length;
      continue;
    }

    const next = parts[parts.length - 1];
    if (next?.type === "text") {
      next.value += input[i];
    } else {
      parts.push({ type: "text", value: input[i]! });
    }
    i += 1;
  }

  return parts;
}
