import { artworks } from "@/content/creative";
import type { Artwork } from "@/content/types";

export type CropFocus =
  | "center"
  | "face"
  | "hands"
  | "upper"
  | "lower"
  | "left"
  | "right";

export interface CatalogueEntry extends Artwork {
  plate: string;
  year: string;
  alt: string;
  note?: string;
  lore?: string[];
}

function yearFromDate(date: string): string {
  const match = date.match(/\d{4}/);
  return match?.[0] ?? date;
}

const bySlug = Object.fromEntries(artworks.map((a) => [a.slug, a]));

function entry(
  slug: string,
  extras: Partial<Pick<CatalogueEntry, "note" | "lore" | "alt">> & { plate: string }
): CatalogueEntry {
  const base = bySlug[slug];
  if (!base) {
    throw new Error(`Unknown artwork slug: ${slug}`);
  }
  return {
    ...base,
    plate: extras.plate,
    year: yearFromDate(base.date),
    alt: extras.alt ?? `${base.title}, ${base.medium}`,
    note: extras.note,
    lore: extras.lore,
  };
}

/** Full catalogue — plate order for archive + viewer. */
export const catalogue: CatalogueEntry[] = [
  entry("zion-introduction", {
    plate: "01",
    alt: "Zion, an apprentice god with white wings, holding a blood-stained apple",
    lore: [
      "An apprentice god.",
      "He learned divinity the way others learn grief.",
    ],
    note: "Halo first. Then the wound.",
  }),
  entry("surrender", {
    plate: "02",
    alt: "Surrender — portrait with glowing gold adornments against a rose ground",
    lore: ["After Italy.", "The first piece back."],
  }),
  entry("fear-me", {
    plate: "03",
    alt: "Fear Me — figure with violet hair and a radiant golden halo",
    lore: ["If I cannot inspire love,", "I will cause fear."],
  }),
  entry("mycoto", {
    plate: "04",
    alt: "Mycoto — original character portrait",
    lore: ["Hi there.", "I am Mycoto."],
  }),
  entry("ivan", {
    plate: "05",
    alt: "Ivan from Alien Stage — digital fanart portrait",
  }),
  entry("zheng-bei-x-jiang-xiaohai", {
    plate: "06",
    alt: "郑北 and 姜小海 fanart from 雪迷宫",
    note: "For @jackiehe.",
  }),
  entry("love-me-hate-me", {
    plate: "07",
    alt: "Love me, Hate me — Jeonghan album design study",
    note: "Album study.",
  }),
  entry("describe-what-you-see", {
    plate: "08",
    alt: "Describe what you see — Vernon album design inspired by Dead Poets Society",
    note: "Dead Poets Society.",
  }),
  entry("commission-1", {
    plate: "09",
    alt: "Commission 1 — purple horn character portrait",
  }),
  entry("commission-2", {
    plate: "10",
    alt: "Commission 2 — idol character portrait",
  }),
  entry("commission-3", {
    plate: "11",
    alt: "Commission 3 — fairy character portrait",
  }),
  entry("commission-4", {
    plate: "12",
    alt: "Commission 4 — schoolgirl character portrait",
  }),
];

export const catalogueBySlug = Object.fromEntries(
  catalogue.map((item) => [item.slug, item])
) as Record<string, CatalogueEntry>;

export function getCatalogueIndex(slug: string): number {
  return catalogue.findIndex((item) => item.slug === slug);
}
