import { artworks } from "@/content/creative";
import type { Artwork } from "@/content/types";

export type Orientation = "landscape" | "portrait" | "square";

export interface CatalogueEntry extends Artwork {
  plate: string;
  year: string;
  alt: string;
  /** Intrinsic pixel size — layout adapts; never normalize. */
  width: number;
  height: number;
  orientation: Orientation;
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
  extras: Partial<Pick<CatalogueEntry, "note" | "lore" | "alt" | "edition">> & {
    plate: string;
    width: number;
    height: number;
  }
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
    width: extras.width,
    height: extras.height,
    orientation: orientationOf(extras.width, extras.height),
    note: extras.note,
    lore: extras.lore,
    edition: extras.edition,
  };
}

/** Full catalogue — plate order for archive + viewer. Layout is decided per spread in CreativeArt. */
export const catalogue: CatalogueEntry[] = [
  entry("zion-introduction", {
    plate: "01",
    width: 3800,
    height: 2400,
    alt: "Zion, an apprentice god with white wings, holding a blood-stained apple",
    lore: [
      "An apprentice god.",
      "He learned divinity the way others learn grief.",
    ],
    note: "Halo first. Then the wound.",
    edition: "OC · May 2025",
  }),
  entry("zion-again", {
    plate: "02",
    width: 711,
    height: 1024,
    alt: "Zion, Again — angelic figure dissolving into white static and glitch color",
    lore: ["The apprentice returns as static.", "Halo still tilted."],
    edition: "OC · 2026",
  }),
  entry("surrender", {
    plate: "03",
    width: 1620,
    height: 2160,
    alt: "Surrender — portrait with glowing gold adornments against a rose ground",
    lore: ["After Italy.", "The first piece back."],
    edition: "OC · August 2024",
  }),
  entry("fear-me", {
    plate: "04",
    width: 810,
    height: 1080,
    alt: "Fear Me — figure with violet hair and a radiant golden halo",
    lore: ["If I cannot inspire love,", "I will cause fear."],
    edition: "OC · January 2025",
  }),
  entry("creep", {
    plate: "05",
    width: 768,
    height: 1024,
    alt: "Creep — Radiohead lyrics collage with a face as a light-void eye",
    lore: ["The quieter confession.", "Not belonging — said out loud."],
    edition: "Self study · 2026",
  }),
  entry("soul-rotting", {
    plate: "06",
    width: 824,
    height: 1024,
    alt: "I Feel My Soul Rotting Away — blue-haired self-portrait with pale hands at the throat",
    lore: ["A smile that does not reach", "the hands at the throat."],
    edition: "Self study · 2026",
  }),
  entry("empty-empty-empty", {
    plate: "07",
    width: 724,
    height: 1024,
    alt: "Empty, Empty, Empty — New Year collage with notes-app grief and blue self-portraits",
    lore: ["A New Year found in the notes.", "Empty — and still asking."],
    edition: "Self study · 2026",
  }),
  entry("mycoto", {
    plate: "08",
    width: 1620,
    height: 2025,
    alt: "Mycoto — original character portrait",
    lore: ["Hi there.", "I am Mycoto."],
    edition: "OC · May 2025",
  }),
  entry("mycoto-shapeshift", {
    plate: "09",
    width: 1024,
    height: 711,
    alt: "Still Her — dual bandaged blue-haired Mycoto figures, shapeshift study",
    lore: ["Two faces, one bandage.", "Still her."],
    edition: "OC · 2026",
  }),
  entry("ivan", {
    plate: "10",
    width: 1620,
    height: 2160,
    alt: "Ivan from Alien Stage — digital fanart portrait",
    edition: "Fan study · June 2025",
  }),
  entry("am-i-pretty-now", {
    plate: "11",
    width: 824,
    height: 1024,
    alt: "Am I Pretty Now — Mizi with glowing hands at her throat, Candy Scar Face",
    lore: ["A smile held too tightly."],
    edition: "Fan study · 2026",
  }),
  entry("ocean-eyes", {
    plate: "12",
    width: 1024,
    height: 711,
    alt: "Ocean Eyes — William Jakrapatr grayscale eye study, letterboxed",
    lore: ["Letterboxed light", "on the water of a glance."],
    edition: "Fan study · 2026",
  }),
  entry("zheng-bei-x-jiang-xiaohai", {
    plate: "13",
    width: 1620,
    height: 2160,
    alt: "郑北 and 姜小海 fanart from 雪迷宫",
    note: "For @jackiehe.",
    edition: "Fan study · July 2025",
  }),
  entry("journey-towards-death", {
    plate: "14",
    width: 1023,
    height: 1024,
    alt: "A Journey Towards Death — female knight with cosmic dual-face and orbital crown",
    lore: ["Birth to death in one orbit.", "Crown, void, and the road between."],
    edition: "OC · 2026",
  }),
  entry("li-qi", {
    plate: "15",
    width: 791,
    height: 1024,
    alt: "Li Qi — warm scrapbook collage portrait for Sara Li",
    lore: ["For Sara.", "A scrapbook that keeps her light."],
    edition: "Portrait · 2026",
  }),
  entry("love-me-hate-me", {
    plate: "16",
    width: 3600,
    height: 3600,
    alt: "Love me, Hate me — Jeonghan album design study",
    note: "Album study.",
    edition: "Design · March 2023",
  }),
  entry("describe-what-you-see", {
    plate: "17",
    width: 3600,
    height: 3600,
    alt: "Describe what you see — Vernon album design inspired by Dead Poets Society",
    note: "Dead Poets Society.",
    edition: "Design · March 2023",
  }),
  entry("age-younger", {
    plate: "18",
    width: 2360,
    height: 1640,
    alt: "Age Younger — Vernon in two lights, one tearlit at a microphone",
    lore: [
      "A stage still bright enough to cry.",
      "The quieter face that follows.",
    ],
    edition: "Fan study · 2026",
  }),
  entry("my-bside", {
    plate: "19",
    width: 768,
    height: 1024,
    alt: "My B-Side — purple-lit portrait against black",
    lore: ["Still playing when the room goes dark."],
    edition: "Fan study · 2026",
  }),
  entry("romemok", {
    plate: "20",
    width: 2360,
    height: 1640,
    alt: "Romemok — vinyl record with William and Est as chibi figures among daisies",
    lore: ["Two names pressed into one groove."],
    edition: "Fan study · 2026",
  }),
  entry("two-hundred-fifty", {
    plate: "21",
    width: 711,
    height: 1024,
    alt: "Two Hundred Fifty — Alfred portrait with glasses, looking forward",
    lore: ["A birthday drawn like a quiet oath."],
    edition: "Fan study · 2026",
  }),
  entry("oc-emblems", {
    plate: "22",
    width: 940,
    height: 998,
    alt: "Emblems — typographic marks for Jiyoung, Zion, Mycoto, and Kyren",
    lore: ["Marks for the ones who live in the margins."],
    edition: "Design · 2026",
  }),
  entry("ioakun-mycoto-marks", {
    plate: "23",
    width: 718,
    height: 714,
    alt: "Hold Me. Haunt Me. — Ioakun and Mycoto studio wordmarks on a dark sheet",
    lore: ["Ioakun. Mycoto.", "The web between names."],
    edition: "Design · 2026",
  }),
  entry("commission-1", {
    plate: "24",
    width: 1968,
    height: 2560,
    alt: "Commission 1 — purple horn character portrait",
    edition: "Commission · August 2024",
  }),
  entry("commission-2", {
    plate: "25",
    width: 1620,
    height: 2160,
    alt: "Commission 2 — idol character portrait",
    edition: "Commission · August 2024",
  }),
  entry("commission-3", {
    plate: "26",
    width: 1582,
    height: 2117,
    alt: "Commission 3 — fairy character portrait",
    edition: "Commission · August 2024",
  }),
  entry("commission-4", {
    plate: "27",
    width: 1620,
    height: 2160,
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
