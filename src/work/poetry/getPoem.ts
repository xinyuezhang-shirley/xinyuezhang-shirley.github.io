import { poems } from "@/content/creative";
import type { Poem } from "@/content/types";

const bySlug = Object.fromEntries(poems.map((p) => [p.slug, p])) as Record<string, Poem>;

export function getPoem(slug: string): Poem {
  const poem = bySlug[slug];
  if (!poem) throw new Error(`Poem not found: ${slug}`);
  return poem;
}
