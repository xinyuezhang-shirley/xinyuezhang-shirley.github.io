/**
 * Photography collections — curated by mood, color, light, and atmosphere.
 * Sequence reads like sorting a box of prints on a studio table.
 */

export type PrintSize = "tiny" | "proof" | "sm" | "md" | "lg" | "xl";
export type PrintOrient = "landscape" | "portrait" | "square";

export interface PhotoPrint {
  id: string;
  src: string;
  alt: string;
  /** Short pencil note — place / year / observation */
  note?: string;
  size?: PrintSize;
  orient?: PrintOrient;
  /** Degrees — keep subtle (−3.5 … 3.5) */
  rotate?: number;
  /** CSS object-position for intentional framing */
  focus?: string;
  /** Detail crop: shows a portion only (teaches looking) */
  crop?: {
    objectPosition: string;
    aspect: string;
  };
  /** Skip opening viewer (decorative pin / ultra-tiny proof) */
  inert?: boolean;
}

export type CollectionLayout =
  | "glass-stack"
  | "macro-sheet"
  | "coastal"
  | "festival-pin"
  | "rhythm-strip"
  | "film-roll"
  | "concert-night"
  | "suspended"
  | "city-scatter"
  | "campus-scatter"
  | "facing-wall";

export interface PhotoCollectionData {
  id: string;
  title: string;
  /** One short line — understated */
  whisper: string;
  layout: CollectionLayout;
  tone?: "cool" | "warm" | "golden" | "night" | "mono" | "fog";
  prints: PhotoPrint[];
}

export const photoCollections: PhotoCollectionData[] = [
  {
    id: "through-glass",
    title: "Through Glass",
    whisper: "Condensation. Reflection. Looking out.",
    layout: "glass-stack",
    tone: "cool",
    prints: [
      {
        id: "portal",
        src: "/photography/Zhang_Portal.jpg",
        alt: "Hand pressed against condensed glass",
        note: "Portal. Pressure. Fog.",
        size: "xl",
        orient: "portrait",
        rotate: -1.2,
        focus: "center 40%",
      },
      {
        id: "hello",
        src: "/photography/hello.JPG",
        alt: "Circular mirror reflecting a hand against blue sky",
        note: "Hello. Mirror. Hand.",
        size: "md",
        orient: "landscape",
        rotate: 2.4,
      },
      {
        id: "coca-cola",
        src: "/photography/Zhang_CocaCola.jpg",
        alt: "Silhouettes looking out windows at a red Coca-Cola advertisement",
        note: "Red light through glass.",
        size: "sm",
        orient: "landscape",
        rotate: -0.8,
      },
      {
        id: "portal-fingers",
        src: "/photography/Zhang_Portal.jpg",
        alt: "Detail: fingertips pressing fogged glass",
        size: "proof",
        crop: { objectPosition: "50% 72%", aspect: "1 / 1" },
        rotate: 1.6,
      },
    ],
  },
  {
    id: "close-looking",
    title: "Close Looking",
    whisper: "Things that wait to be noticed.",
    layout: "macro-sheet",
    tone: "mono",
    prints: [
      {
        id: "cabbage",
        src: "/photography/Zhang_Cabbage.png",
        alt: "Black and white close-up of layered cabbage leaves",
        note: "Vein. Shadow. Leaf.",
        size: "lg",
        orient: "landscape",
        rotate: -0.6,
      },
      {
        id: "pepper",
        src: "/photography/Zhang_pepper.png",
        alt: "Black and white macro of a pepper stem",
        size: "proof",
        orient: "portrait",
        rotate: 1.1,
      },
      {
        id: "bok-choy",
        src: "/photography/Zhang_bok choy.png",
        alt: "Close-up of a deep green folded leaf",
        size: "proof",
        orient: "landscape",
        rotate: -1.8,
      },
      {
        id: "cupcake",
        src: "/photography/Zhang_Cupcake.png",
        alt: "Macro of white frosting and confetti sprinkles",
        size: "proof",
        orient: "landscape",
        rotate: 0.9,
      },
      {
        id: "cabbage-vein",
        src: "/photography/Zhang_Cabbage.png",
        alt: "Detail: leaf vein texture",
        size: "tiny",
        crop: { objectPosition: "40% 55%", aspect: "4 / 5" },
        rotate: -2.2,
      },
    ],
  },
  {
    id: "salt-light",
    title: "Salt Light",
    whisper: "Coast. Glitter. A red coat.",
    layout: "coastal",
    tone: "golden",
    prints: [
      {
        id: "michelle-beach",
        src: "/photography/Zhang_MichelleAtBeach-min.png",
        alt: "Woman in a red coat standing on rocks by sparkling blue water",
        note: "Red against blue.",
        size: "xl",
        orient: "landscape",
        rotate: -0.5,
        focus: "35% center",
      },
      {
        id: "shiny-beach",
        src: "/photography/Zhang_ShinyBeach-min.png",
        alt: "Beach shoreline with shimmering water and a distant pier",
        note: "Morning glitter.",
        size: "md",
        orient: "portrait",
        rotate: 1.8,
      },
      {
        id: "glitter-crop",
        src: "/photography/Zhang_ShinyBeach-min.png",
        alt: "Detail: sparkling reflections on water",
        size: "sm",
        crop: { objectPosition: "60% 45%", aspect: "3 / 2" },
        rotate: -1.4,
      },
    ],
  },
  {
    id: "one-roll",
    title: "One Roll",
    whisper: "Same day. Same light. Still drying.",
    layout: "film-roll",
    tone: "mono",
    prints: [
      {
        id: "film-lead",
        src: "/photography/film-day-lead.jpg",
        alt: "Flash portrait in black satin with a coat draped over the shoulders",
        note: "Before the rest of the roll.",
        size: "lg",
        orient: "portrait",
        rotate: -1.1,
      },
      {
        id: "film-01",
        src: "/photography/film-day-01.jpg",
        alt: "Portrait with a white paper crown on a mint-green bed",
        size: "proof",
        orient: "portrait",
        rotate: 0.8,
      },
      {
        id: "film-02",
        src: "/photography/film-day-02.jpg",
        alt: "Close portrait framed by a ring of white origami",
        size: "proof",
        orient: "portrait",
        rotate: -0.6,
      },
      {
        id: "film-03",
        src: "/photography/film-day-03.jpg",
        alt: "Soft indoor film portrait looking away",
        size: "proof",
        orient: "landscape",
        rotate: 1.2,
      },
      {
        id: "film-04",
        src: "/photography/film-day-04.jpg",
        alt: "Motion-soft portrait in black with gold buttons",
        size: "proof",
        orient: "landscape",
        rotate: -0.9,
      },
      {
        id: "film-05",
        src: "/photography/film-day-05.jpg",
        alt: "Candid film frame from the same indoor roll",
        size: "proof",
        orient: "landscape",
        rotate: 0.4,
      },
      {
        id: "film-06",
        src: "/photography/film-day-06.jpg",
        alt: "Hand in hair, direct gaze, soft flash",
        size: "proof",
        orient: "landscape",
        rotate: -1.4,
      },
      {
        id: "film-07",
        src: "/photography/film-day-07.jpg",
        alt: "Wider frame from the same film day",
        note: "Same afternoon.",
        size: "md",
        orient: "landscape",
        rotate: 1.6,
      },
      {
        id: "film-coda-01",
        src: "/photography/film-coda-01.jpg",
        alt: "Heavy motion-blur film portrait",
        note: "Also film.",
        size: "sm",
        orient: "landscape",
        rotate: -2.0,
      },
      {
        id: "film-coda-02",
        src: "/photography/film-coda-02.jpg",
        alt: "Eyes over a strawberry cake with a paper crown",
        size: "sm",
        orient: "landscape",
        rotate: 1.1,
      },
      {
        id: "film-coda-03",
        src: "/photography/film-coda-03.jpg",
        alt: "Warm-blurred film portrait, companion frame",
        size: "proof",
        orient: "landscape",
        rotate: -0.5,
      },
      {
        id: "film-coda-04",
        src: "/photography/film-coda-04.jpg",
        alt: "Sepia film portrait with a hand across the face",
        size: "proof",
        orient: "landscape",
        rotate: 1.8,
      },
    ],
  },
  {
    id: "lantern-night",
    title: "Lantern Night",
    whisper: "Warm bulbs. Red characters. Dusk.",
    layout: "festival-pin",
    tone: "night",
    prints: [
      {
        id: "characters",
        src: "/photography/characters.jpg",
        alt: "Festival night with hanging red Chinese character banners and string lights",
        note: "Night market. Paper signs.",
        size: "xl",
        orient: "landscape",
        rotate: -0.4,
      },
      {
        id: "dragon-boat",
        src: "/photography/dragonBoat.jpg",
        alt: "Blurred silhouettes at dusk with a lit dragon float",
        note: "Dragon Boat. Passing.",
        size: "tiny",
        orient: "landscape",
        rotate: 2.8,
      },
      {
        id: "characters-bulb",
        src: "/photography/characters.jpg",
        alt: "Detail: glowing bulb and red character banner",
        size: "proof",
        crop: { objectPosition: "55% 35%", aspect: "1 / 1" },
        rotate: -1.5,
      },
    ],
  },
  {
    id: "bodies-keep-time",
    title: "Bodies Keep Time",
    whisper: "Stage. Grain. The same breath.",
    layout: "rhythm-strip",
    tone: "mono",
    prints: [
      {
        id: "red-dancers",
        src: "/photography/Zhang_redDancers.jpg",
        alt: "Three dancers in red costumes mid-turn on a dark stage",
        note: "Red. Turn. Floor light.",
        size: "lg",
        orient: "landscape",
        rotate: -0.7,
      },
      {
        id: "dance-again",
        src: "/photography/Zhang_danceAgain-min.jpg",
        alt: "Group of dancers in dark dresses with arms outstretched",
        size: "proof",
        orient: "landscape",
        rotate: 0.4,
      },
      {
        id: "dance-cluster",
        src: "/photography/Zhang_dance (2).jpg",
        alt: "Dense cluster of dancers reaching and interlocking on stage",
        size: "proof",
        orient: "landscape",
        rotate: -0.3,
      },
      {
        id: "dance-leap",
        src: "/photography/Zhang_dance3.jpg",
        alt: "Abstract blurred silhouette of a leaping figure on white",
        size: "proof",
        orient: "landscape",
        rotate: 1.2,
      },
      {
        id: "dance-trail",
        src: "/photography/Zhang_dance.jpg",
        alt: "Long-exposure dancer with a white light trail",
        size: "proof",
        orient: "portrait",
        rotate: -1.0,
      },
      {
        id: "dance-arc",
        src: "/photography/Zhang_dance2.jpg",
        alt: "Long-exposure figure with a circular light arc on black",
        size: "proof",
        orient: "square",
        rotate: 0.6,
      },
      {
        id: "hands-crop",
        src: "/photography/Zhang_dance (2).jpg",
        alt: "Detail: interlocking arms of dancers",
        size: "tiny",
        crop: { objectPosition: "48% 42%", aspect: "1 / 1" },
        rotate: 2.0,
      },
    ],
  },
  {
    id: "raye",
    title: "Raye",
    whisper: "After the lights. Still ringing.",
    layout: "concert-night",
    tone: "night",
    prints: [
      {
        id: "raye-01",
        src: "/photography/raye-01.jpg",
        alt: "Grainy concert-night portrait with a white paper crown",
        note: "Raye. Night.",
        size: "xl",
        orient: "landscape",
        rotate: -0.7,
      },
      {
        id: "raye-02",
        src: "/photography/raye-02.jpg",
        alt: "Holding a strawberry cake under a paper crown",
        size: "md",
        orient: "portrait",
        rotate: 1.4,
      },
      {
        id: "raye-03",
        src: "/photography/raye-03.jpg",
        alt: "Eyes over cake, hand adjusting a paper crown",
        size: "sm",
        orient: "landscape",
        rotate: -1.2,
      },
      {
        id: "raye-04",
        src: "/photography/raye-04.jpg",
        alt: "Sepia concert-night portrait with star crown",
        size: "lg",
        orient: "landscape",
        rotate: 0.9,
      },
      {
        id: "raye-05",
        src: "/photography/raye-05.jpg",
        alt: "Hand reaching toward the lens, face half-hidden",
        size: "sm",
        orient: "landscape",
        rotate: -1.8,
      },
      {
        id: "raye-06",
        src: "/photography/raye-06.jpg",
        alt: "Black-and-white over-the-shoulder portrait with spiked crown",
        size: "md",
        orient: "portrait",
        rotate: 1.1,
      },
      {
        id: "raye-07",
        src: "/photography/raye-07.jpg",
        alt: "Sepia crown portrait against a plain wall",
        size: "proof",
        orient: "portrait",
        rotate: -0.6,
      },
      {
        id: "raye-08",
        src: "/photography/raye-08.jpg",
        alt: "Close dark portrait with star crown and blurred hands",
        size: "proof",
        orient: "portrait",
        rotate: 2.0,
      },
    ],
  },
  {
    id: "suspended",
    title: "Suspended",
    whisper: "Air. Water. A streak of speed.",
    layout: "suspended",
    tone: "cool",
    prints: [
      {
        id: "pool-jump",
        src: "/photography/Zhang_poolJump-min.png",
        alt: "Two swimmers diving mid-air from starting blocks",
        note: "Parallel. Held.",
        size: "xl",
        orient: "landscape",
        rotate: -1.1,
        focus: "center 40%",
      },
      {
        id: "butterfly",
        src: "/photography/Zhang_butterfly.jpg",
        alt: "Swimmer mid butterfly stroke breaking the surface",
        size: "md",
        orient: "landscape",
        rotate: 1.5,
      },
      {
        id: "car-blur",
        src: "/photography/car_blurr.png",
        alt: "Solar racing car with motion-blurred background",
        note: "Pan. Track.",
        size: "sm",
        orient: "landscape",
        rotate: -2.0,
      },
      {
        id: "blurry-petals",
        src: "/photography/Zhang_blurry.jpg",
        alt: "Person throwing pink petals with heavy motion blur",
        size: "sm",
        orient: "portrait",
        rotate: 1.3,
      },
    ],
  },
  {
    id: "city-lines",
    title: "City Lines",
    whisper: "Rust. Steel. Someone looking down at a camera.",
    layout: "city-scatter",
    tone: "warm",
    prints: [
      {
        id: "train",
        src: "/photography/Zhang_train.jpg",
        alt: "Low-angle view of an elevated train on rusted tracks",
        note: "Looking up.",
        size: "lg",
        orient: "portrait",
        rotate: -1.6,
      },
      {
        id: "texture",
        src: "/photography/Zhang_texture.jpg",
        alt: "Photographer against red industrial steel with yellow graphic overlay",
        size: "md",
        orient: "portrait",
        rotate: 1.9,
      },
      {
        id: "anna",
        src: "/photography/Zhang_Anna.jpg",
        alt: "Portrait of a woman with a camera around her neck by a chain-link fence",
        note: "Anna. Fence. Overcast.",
        size: "sm",
        orient: "portrait",
        rotate: -0.9,
      },
      {
        id: "rust-crop",
        src: "/photography/Zhang_train.jpg",
        alt: "Detail: rusted beam and rivets",
        size: "tiny",
        crop: { objectPosition: "20% 70%", aspect: "5 / 4" },
        rotate: 2.5,
      },
    ],
  },
  {
    id: "stanford",
    title: "Stanford",
    whisper: "Room light. Headphones. A campus day indoors.",
    layout: "campus-scatter",
    tone: "warm",
    prints: [
      {
        id: "stanford-01",
        src: "/photography/stanford-01.jpg",
        alt: "Grinning with over-ear headphones on a green floral bed",
        note: "Stanford. Flash.",
        size: "lg",
        orient: "landscape",
        rotate: -0.8,
      },
      {
        id: "stanford-02",
        src: "/photography/stanford-02.jpg",
        alt: "Rock-on hands and headphones, tongue out",
        size: "md",
        orient: "landscape",
        rotate: 1.6,
      },
      {
        id: "stanford-03",
        src: "/photography/stanford-03.jpg",
        alt: "Close headphone portrait with a crooked smile",
        size: "sm",
        orient: "landscape",
        rotate: -1.3,
      },
      {
        id: "stanford-04",
        src: "/photography/stanford-04.jpg",
        alt: "Leaning in, white ruffled shirt and black ribbon",
        size: "md",
        orient: "portrait",
        rotate: 0.7,
      },
      {
        id: "stanford-05",
        src: "/photography/stanford-05.jpg",
        alt: "Headphones and wide eyes on the edge of a bed",
        size: "sm",
        orient: "landscape",
        rotate: -1.9,
      },
      {
        id: "stanford-06",
        src: "/photography/stanford-06.jpg",
        alt: "Vertical dorm portrait from the same Stanford day",
        size: "sm",
        orient: "portrait",
        rotate: 1.2,
      },
      {
        id: "stanford-07",
        src: "/photography/stanford-07.jpg",
        alt: "Portrait against a pale wall, same afternoon",
        size: "proof",
        orient: "portrait",
        rotate: -0.5,
      },
      {
        id: "stanford-08",
        src: "/photography/stanford-08.jpg",
        alt: "Companion Stanford frame, soft flash",
        size: "proof",
        orient: "portrait",
        rotate: 1.8,
      },
      {
        id: "stanford-09",
        src: "/photography/stanford-09.jpg",
        alt: "Warmer indoor frame from the Stanford set",
        size: "md",
        orient: "landscape",
        rotate: -1.0,
      },
      {
        id: "stanford-10",
        src: "/photography/stanford-10.jpg",
        alt: "Leaning toward the camera in a white shirt and black ribbon",
        size: "sm",
        orient: "portrait",
        rotate: 0.9,
      },
    ],
  },
  {
    id: "facing",
    title: "Facing",
    whisper: "Light on a face. Someone looking back.",
    layout: "facing-wall",
    tone: "fog",
    prints: [
      {
        id: "molly",
        src: "/photography/Zhang_Molly.jpg",
        alt: "Person photographing with a camera, yellow and blue color treatment",
        note: "Molly. Seeing.",
        size: "lg",
        orient: "landscape",
        rotate: -0.8,
      },
      {
        id: "we-the-people",
        src: "/photography/Zhang_WeThePeople.jpg",
        alt: "Portrait with gothic typography projected on the face",
        size: "md",
        orient: "portrait",
        rotate: 1.4,
      },
      {
        id: "portrait-shutter",
        src: "/photography/Zhang_portrait2.jpg",
        alt: "Black and white portrait partially obscured by a wooden shutter",
        note: "Slats. Shadow.",
        size: "md",
        orient: "square",
        rotate: -1.7,
      },
      {
        id: "deer",
        src: "/photography/Zhang_deer.jpg",
        alt: "Magenta-toned portrait with motion blur",
        size: "sm",
        orient: "landscape",
        rotate: 2.1,
      },
      {
        id: "hero-portrait",
        src: "/photography/Zhang_hero-portrait.jpg",
        alt: "Close portrait with hands in hair against a plain wall",
        size: "sm",
        orient: "landscape",
        rotate: -1.2,
      },
      {
        id: "type-crop",
        src: "/photography/Zhang_WeThePeople.jpg",
        alt: "Detail: projected type on skin",
        size: "tiny",
        crop: { objectPosition: "55% 55%", aspect: "1 / 1" },
        rotate: 0.5,
      },
    ],
  },
];

/** Flat list for the fullscreen viewer — full prints only (no detail crops). */
export function getViewerPrints(): PhotoPrint[] {
  const seen = new Set<string>();
  const out: PhotoPrint[] = [];
  for (const collection of photoCollections) {
    for (const print of collection.prints) {
      if (print.crop) continue;
      if (seen.has(print.src)) continue;
      seen.add(print.src);
      out.push({ ...print, note: print.note ?? collection.title });
    }
  }
  return out;
}

export function findViewerIndex(src: string): number {
  return getViewerPrints().findIndex((p) => p.src === src);
}

export function collectionForSrc(src: string): PhotoCollectionData | undefined {
  return photoCollections.find((c) => c.prints.some((p) => p.src === src && !p.crop));
}
