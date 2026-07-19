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

/** How a piece should enter the monograph (not a reusable art card). */
export type Presentation =
  | "full-spread"
  | "narrow-column"
  | "diptych"
  | "detail-crop"
  | "archive-thumb";

export type Orientation = "landscape" | "portrait" | "square";

export interface CatalogueEntry extends Artwork {
  plate: string;
  year: string;
  alt: string;
  /** Intrinsic pixel size — layout adapts; never normalize. */
  width: number;
  height: number;
  orientation: Orientation;
  /** Default editorial presentation for this plate. */
  presentation: Presentation;
  note?: string;
  lore?: string[];
  edition?: string;
}

function yearFromDate(date: string): string {
  const match = date.match(/\d{4}/);
  return match?.[0] ?? date;
}

function orientationOf(width: number, height: number): Orientation {
  const ratio = width / height;
  if (ratio > 1.15) return "landscape";
  if (ratio < 0.92) return "portrait";
  return "square";
}

const bySlug = Object.fromEntries(artworks.map((a) => [a.slug, a]));

function entry(
  slug: string,
  extras: Partial<
    Pick<CatalogueEntry, "note" | "lore" | "alt" | "edition" | "presentation">
  > & {
    plate: string;
    width: number;
    height: number;
  }
): CatalogueEntry {
  const base = bySlug[slug];
  if (!base) {
    throw new Error(`Unknown artwork slug: ${slug}`);
  }
  const orientation = orientationOf(extras.width, extras.height);
  const presentation =
    extras.presentation ??
    (orientation === "landscape"
      ? "full-spread"
      : orientation === "square"
        ? "diptych"
        : "narrow-column");

  return {
    ...base,
    plate: extras.plate,
    year: yearFromDate(base.date),
    alt: extras.alt ?? `${base.title}, ${base.medium}`,
    width: extras.width,
    height: extras.height,
    orientation,
    presentation,
    note: extras.note,
    lore: extras.lore,
    edition: extras.edition,
  };
}

/** Full catalogue — plate order for archive + viewer. */
export const catalogue: CatalogueEntry[] = [
  entry("zion-introduction", {
    plate: "01",
    width: 3800,
    height: 2400,
    presentation: "full-spread",
    alt: "Zion, an apprentice god with white wings, holding a blood-stained apple",
    lore: [
      "An apprentice god.",
      "He learned divinity the way others learn grief.",
    ],
    note: "Halo first. Then the wound.",
    edition: "OC · May 2025",
  }),
  entry("surrender", {
    plate: "02",
    width: 1620,
    height: 2160,
    presentation: "narrow-column",
    alt: "Surrender — portrait with glowing gold adornments against a rose ground",
    lore: ["After Italy.", "The first piece back."],
    edition: "OC · August 2024",
  }),
  entry("fear-me", {
    plate: "03",
    width: 810,
    height: 1080,
    presentation: "narrow-column",
    alt: "Fear Me — figure with violet hair and a radiant golden halo",
    lore: ["If I cannot inspire love,", "I will cause fear."],
    edition: "OC · January 2025",
  }),
  entry("mycoto", {
    plate: "04",
    width: 1620,
    height: 2025,
    presentation: "narrow-column",
    alt: "Mycoto — original character portrait",
    lore: ["Hi there.", "I am Mycoto."],
    edition: "OC · May 2025",
  }),
  entry("ivan", {
    plate: "05",
    width: 1620,
    height: 2160,
    presentation: "narrow-column",
    alt: "Ivan from Alien Stage — digital fanart portrait",
    edition: "Fan study · June 2025",
  }),
  entry("zheng-bei-x-jiang-xiaohai", {
    plate: "06",
    width: 1620,
    height: 2160,
    presentation: "narrow-column",
    alt: "郑北 and 姜小海 fanart from 雪迷宫",
    note: "For @jackiehe.",
    edition: "Fan study · July 2025",
  }),
  entry("love-me-hate-me", {
    plate: "07",
    width: 3600,
    height: 3600,
    presentation: "diptych",
    alt: "Love me, Hate me — Jeonghan album design study",
    note: "Album study.",
    edition: "Design · March 2023",
  }),
  entry("describe-what-you-see", {
    plate: "08",
    width: 3600,
    height: 3600,
    presentation: "diptych",
    alt: "Describe what you see — Vernon album design inspired by Dead Poets Society",
    note: "Dead Poets Society.",
    edition: "Design · March 2023",
  }),
  entry("commission-1", {
    plate: "09",
    width: 1968,
    height: 2560,
    presentation: "narrow-column",
    alt: "Commission 1 — purple horn character portrait",
    edition: "Commission · August 2024",
  }),
  entry("commission-2", {
    plate: "10",
    width: 1620,
    height: 2160,
    presentation: "narrow-column",
    alt: "Commission 2 — idol character portrait",
    edition: "Commission · August 2024",
  }),
  entry("commission-3", {
    plate: "11",
    width: 1582,
    height: 2117,
    presentation: "narrow-column",
    alt: "Commission 3 — fairy character portrait",
    edition: "Commission · August 2024",
  }),
  entry("commission-4", {
    plate: "12",
    width: 1620,
    height: 2160,
    presentation: "narrow-column",
    alt: "Commission 4 — schoolgirl character portrait",
    edition: "Commission · August 2024",
  }),
];

export const catalogueBySlug = Object.fromEntries(
  catalogue.map((item) => [item.slug, item])
) as Record<string, CatalogueEntry>;

export function getCatalogueIndex(slug: string): number {
  return catalogue.findIndex((item) => item.slug === slug);
}

export function aspectRatio(work: CatalogueEntry): string {
  return `${work.width} / ${work.height}`;
}
