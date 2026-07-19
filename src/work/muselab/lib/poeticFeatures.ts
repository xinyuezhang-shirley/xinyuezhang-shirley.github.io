/** Client-side poetic feature bags — mirrors MuseLab ParsedFeatures. */

export type ParsedFeatures = {
  repeated: Map<string, number>;
  abstract: Set<string>;
  emotional: Set<string>;
  sensory: Set<string>;
  lineLengths: number[];
};

export type SpecimenPoeticFeatures = {
  repeated_content_words?: { word: string; count: number }[];
  abstract_word_hits?: string[];
  emotional_word_hits?: string[];
  sensory_word_hits_by_channel?: Record<string, string[]>;
  line_count?: number;
  average_line_length_chars?: number;
};

export function parsedFeaturesFromSpecimen(pf: SpecimenPoeticFeatures): ParsedFeatures {
  const repeated = new Map<string, number>();
  for (const item of pf.repeated_content_words ?? []) {
    const w = String(item.word).toLowerCase();
    if (w) repeated.set(w, Number(item.count) || 1);
  }
  const toSet = (v?: string[]) =>
    new Set((v ?? []).filter((x): x is string => typeof x === "string").map((s) => s.toLowerCase()));
  const abstract = toSet(pf.abstract_word_hits);
  const emotional = toSet(pf.emotional_word_hits);
  const sensory = new Set<string>();
  const sw = pf.sensory_word_hits_by_channel;
  if (sw) {
    for (const arr of Object.values(sw)) {
      for (const x of arr ?? []) {
        if (typeof x === "string") sensory.add(x.toLowerCase());
      }
    }
  }
  const lines = typeof pf.line_count === "number" ? pf.line_count : 0;
  const avg =
    typeof pf.average_line_length_chars === "number" ? pf.average_line_length_chars : 40;
  const lineLengths: number[] = [];
  const lc = Math.max(1, lines);
  for (let i = 0; i < lc; i++) {
    lineLengths.push(avg + Math.sin(i * 1.7) * (avg * 0.25));
  }
  return { repeated, abstract, emotional, sensory, lineLengths };
}
