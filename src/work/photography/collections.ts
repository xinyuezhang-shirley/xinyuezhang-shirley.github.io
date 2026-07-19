/**
 * Photography monograph — series defined by visual study, not scattered canvas pins.
 * Layouts are grid/flex compositions; images keep native aspect ratios.
 */

export type PrintRole = "hero" | "support" | "frame" | "sequence";

export interface PhotoPrint {
  id: string;
  src: string;
  alt: string;
  /** Short factual caption — place, subject, or technical note */
  caption?: string;
  role?: PrintRole;
  /** CSS object-position only when framing needs a nudge (not for cropping boxes) */
  focus?: string;
  kind?: "image" | "video";
}

export function printKind(print: Pick<PhotoPrint, "src" | "kind">): "image" | "video" {
  if (print.kind) return print.kind;
  return /\.(mp4|webm|mov)(\?|$)/i.test(print.src) ? "video" : "image";
}

/**
 * A — single-hero
 * B — hero + support
 * C — diptych
 * D — triptych
 * E — film-sequence (hero + readable strip)
 * F — contact-sheet (same study, consistent cells)
 * G — hero-sequence (hero + denser related row)
 */
export type CollectionLayout =
  | "single-hero"
  | "hero-support"
  | "diptych"
  | "triptych"
  | "film-sequence"
  | "contact-sheet"
  | "hero-sequence";

export interface PhotoCollectionData {
  id: string;
  title: string;
  /** Why these images belong together — visual / technical intent */
  rationale: string;
  layout: CollectionLayout;
  tone?: "cool" | "warm" | "golden" | "night" | "mono";
  prints: PhotoPrint[];
}

export const photoCollections: PhotoCollectionData[] = [
  {
    id: "through-glass",
    title: "Through Glass",
    rationale:
      "Surfaces that mediate looking — condensation, a pocket mirror, and a night window — treated as the subject rather than obstacles in front of it.",
    layout: "hero-sequence",
    tone: "cool",
    prints: [
      {
        id: "portal",
        src: "/photography/Zhang_Portal.jpg",
        alt: "Hand pressed against condensed glass",
        caption: "Condensation as a second skin.",
        role: "hero",
        focus: "center 40%",
      },
      {
        id: "hello",
        src: "/photography/hello.JPG",
        alt: "Circular mirror reflecting a hand against blue sky",
        caption: "Mirror held to the sky.",
        role: "sequence",
      },
      {
        id: "coca-cola",
        src: "/photography/Zhang_CocaCola.jpg",
        alt: "Silhouettes looking out windows at a red Coca-Cola advertisement",
        caption: "Red sign through night glass.",
        role: "sequence",
      },
    ],
  },
  {
    id: "salt-light",
    title: "Salt Light",
    rationale:
      "Coastal light as a material — specular water against a single saturated figure, then the empty shoreline that sets the color temperature.",
    layout: "hero-support",
    tone: "golden",
    prints: [
      {
        id: "michelle-beach",
        src: "/photography/Zhang_MichelleAtBeach-min.png",
        alt: "Woman in a red coat standing on rocks by sparkling blue water",
        caption: "Red coat against specular blue.",
        role: "hero",
        focus: "35% center",
      },
      {
        id: "shiny-beach",
        src: "/photography/Zhang_ShinyBeach-min.png",
        alt: "Beach shoreline with shimmering water and a distant pier",
        caption: "Same hour, without the figure.",
        role: "support",
      },
    ],
  },
  {
    id: "one-roll",
    title: "One Roll",
    rationale:
      "A single night of disposable film sequenced to P1Harmony’s Dancing Queen. Frames stay in lyric order — collage stills and short clips from the same roll — so motion and lyric read as one continuous strip rather than isolated prints.",
    layout: "film-sequence",
    tone: "warm",
    prints: [
      {
        id: "film-day-06",
        src: "/photography/film-day-06.jpg",
        alt: "Portrait with cowboy hat and Dancing Queen lyrics",
        caption: "Opening frame — lyric over portrait.",
        role: "hero",
      },
      {
        id: "film-day-05",
        src: "/photography/film-day-05.jpg",
        alt: "Collage with horse and lyric — To be my dancing queen",
        role: "sequence",
      },
      {
        id: "film-day-04",
        src: "/photography/film-day-04.jpg",
        alt: "Farm scene with sheep — I’m living in your dream",
        role: "sequence",
      },
      {
        id: "film-day-03",
        src: "/photography/film-day-03.jpg",
        alt: "Kitchen group portrait — Drunk in love, free-falling",
        role: "sequence",
      },
      {
        id: "film-day-video-01",
        src: "/photography/film-day-video-01.mp4",
        alt: "Film night video clip from the same roll",
        kind: "video",
        role: "sequence",
      },
      {
        id: "film-day-video-02",
        src: "/photography/film-day-video-02.mp4",
        alt: "Film night video clip from the same roll",
        kind: "video",
        role: "sequence",
      },
      {
        id: "film-day-02",
        src: "/photography/film-day-02.jpg",
        alt: "Film contact — Julia at the door; Grace with a tiara",
        caption: "Julia · Grace",
        role: "sequence",
      },
      {
        id: "film-day-01",
        src: "/photography/film-day-01.jpg",
        alt: "Film frame — Christine with a cup; Bonsai close-up",
        caption: "Christine · Bonsai",
        role: "sequence",
      },
    ],
  },
  {
    id: "shore-light",
    title: "Shore Light",
    rationale:
      "Late film along water and hills — birds, a lone duck, and the lake repeating until dusk closes the strip at Gertie’s.",
    layout: "film-sequence",
    tone: "golden",
    prints: [
      {
        id: "film-water-01",
        src: "/photography/film-water-01.jpg",
        alt: "Birds over a lake with golden hills beyond",
        caption: "Lake and hills, wide.",
        role: "hero",
      },
      {
        id: "film-water-02",
        src: "/photography/film-water-02.jpg",
        alt: "White duck on a shadowed shore",
        role: "sequence",
      },
      {
        id: "film-water-03",
        src: "/photography/film-water-03.jpg",
        alt: "Lake and hills",
        role: "sequence",
      },
      {
        id: "film-dusk-01",
        src: "/photography/film-dusk-01.jpg",
        alt: "Dinosaur Gertie's ice cream stand at dusk",
        caption: "Dusk at Gertie’s.",
        role: "sequence",
      },
    ],
  },
  {
    id: "close-looking",
    title: "Close Looking",
    rationale:
      "Macro studies of ordinary food surfaces — cabbage as the primary plate, then pepper, bok choy, and frosting as related textures under the same hard light.",
    layout: "hero-sequence",
    tone: "mono",
    prints: [
      {
        id: "cabbage",
        src: "/photography/Zhang_Cabbage.png",
        alt: "Black and white close-up of layered cabbage leaves",
        caption: "Vein structure as landscape.",
        role: "hero",
      },
      {
        id: "pepper",
        src: "/photography/Zhang_pepper.png",
        alt: "Black and white macro of a pepper stem",
        role: "sequence",
      },
      {
        id: "bok-choy",
        src: "/photography/Zhang_bok choy.png",
        alt: "Close-up of a deep green folded leaf",
        role: "sequence",
      },
      {
        id: "cupcake",
        src: "/photography/Zhang_Cupcake.png",
        alt: "Macro of white frosting and confetti sprinkles",
        role: "sequence",
      },
    ],
  },
  {
    id: "lantern-night",
    title: "Lantern Night",
    rationale:
      "Festival light at dusk — hanging characters as the architectural field, with the dragon float as a brief motion note in the same warm bulb temperature.",
    layout: "hero-support",
    tone: "night",
    prints: [
      {
        id: "characters",
        src: "/photography/characters.jpg",
        alt: "Festival night with hanging red Chinese character banners and string lights",
        caption: "Paper signs under string lights.",
        role: "hero",
      },
      {
        id: "dragon-boat",
        src: "/photography/dragonBoat.jpg",
        alt: "Blurred silhouettes at dusk with a lit dragon float",
        caption: "Dragon float — motion held soft.",
        role: "support",
      },
    ],
  },
  {
    id: "raye",
    title: "Raye",
    rationale:
      "Shot from the floor under purple wash. The sequence holds one clear silhouette, then arms and spotlight variants — stage light as atmosphere, not press documentation.",
    layout: "hero-sequence",
    tone: "night",
    prints: [
      {
        id: "raye-02",
        src: "/photography/raye-02.jpg",
        alt: "Raye in a red gown at the microphone under purple stage light",
        caption: "Red gown in purple wash.",
        role: "hero",
      },
      {
        id: "raye-06",
        src: "/photography/raye-06.jpg",
        alt: "Raye arms raised under beams of stage light",
        role: "sequence",
      },
      {
        id: "raye-01",
        src: "/photography/raye-01.jpg",
        alt: "Solo spotlight on Raye with fire projection above",
        role: "sequence",
      },
      {
        id: "raye-03",
        src: "/photography/raye-03.jpg",
        alt: "Raye concert frame from the crowd",
        role: "sequence",
      },
      {
        id: "raye-04",
        src: "/photography/raye-04.jpg",
        alt: "Raye concert frame from the crowd",
        role: "sequence",
      },
      {
        id: "raye-05",
        src: "/photography/raye-05.jpg",
        alt: "Raye concert frame from the crowd",
        role: "sequence",
      },
    ],
  },
  {
    id: "bodies-keep-time",
    title: "Bodies Keep Time",
    rationale:
      "During performance I used slower shutter speeds so movement stays visible as light rather than freezing each pose. The sequence moves from collective formations in red to isolated gestures and light trails.",
    layout: "hero-sequence",
    tone: "mono",
    prints: [
      {
        id: "red-dancers",
        src: "/photography/Zhang_redDancers.jpg",
        alt: "Three dancers in red costumes mid-turn on a dark stage",
        caption: "Formation held in red.",
        role: "hero",
      },
      {
        id: "dance-again",
        src: "/photography/Zhang_danceAgain-min.jpg",
        alt: "Group of dancers in dark dresses with arms outstretched",
        role: "sequence",
      },
      {
        id: "dance-cluster",
        src: "/photography/Zhang_dance (2).jpg",
        alt: "Dense cluster of dancers reaching and interlocking on stage",
        role: "sequence",
      },
      {
        id: "dance-leap",
        src: "/photography/Zhang_dance3.jpg",
        alt: "Abstract blurred silhouette of a leaping figure on white",
        role: "sequence",
      },
      {
        id: "dance-trail",
        src: "/photography/Zhang_dance.jpg",
        alt: "Long-exposure dancer with a white light trail",
        role: "sequence",
      },
      {
        id: "dance-arc",
        src: "/photography/Zhang_dance2.jpg",
        alt: "Long-exposure figure with a circular light arc on black",
        role: "sequence",
      },
    ],
  },
  {
    id: "suspended",
    title: "Suspended",
    rationale:
      "Bodies and objects caught between positions — divers held above water, then related studies of blur where shutter speed turns speed into streak.",
    layout: "hero-sequence",
    tone: "cool",
    prints: [
      {
        id: "pool-jump",
        src: "/photography/Zhang_poolJump-min.png",
        alt: "Two swimmers diving mid-air from starting blocks",
        caption: "Parallel bodies before entry.",
        role: "hero",
        focus: "center 40%",
      },
      {
        id: "butterfly",
        src: "/photography/Zhang_butterfly.jpg",
        alt: "Swimmer mid butterfly stroke breaking the surface",
        role: "sequence",
      },
      {
        id: "car-blur",
        src: "/photography/car_blurr.png",
        alt: "Solar racing car with motion-blurred background",
        caption: "Panning with the car.",
        role: "sequence",
      },
      {
        id: "blurry-petals",
        src: "/photography/Zhang_blurry.jpg",
        alt: "Person throwing pink petals with heavy motion blur",
        role: "sequence",
      },
    ],
  },
  {
    id: "city-lines",
    title: "City Lines",
    rationale:
      "Industrial color and steel edges — looking up at the elevated train, then the same palette in portrait and against the fence.",
    layout: "triptych",
    tone: "warm",
    prints: [
      {
        id: "train",
        src: "/photography/Zhang_train.jpg",
        alt: "Low-angle view of an elevated train on rusted tracks",
        caption: "Looking up.",
        role: "frame",
      },
      {
        id: "texture",
        src: "/photography/Zhang_texture.jpg",
        alt: "Photographer against red industrial steel with yellow graphic overlay",
        role: "frame",
      },
      {
        id: "anna",
        src: "/photography/Zhang_Anna.jpg",
        alt: "Portrait of a woman with a camera around her neck by a chain-link fence",
        caption: "Anna.",
        role: "frame",
      },
    ],
  },
  {
    id: "stanford",
    title: "Stanford",
    rationale:
      "Campus as a study in sandstone, palm, and repeated arches — one primary approach through the Main Quad, then related elevations and a denser row of facade details.",
    layout: "hero-sequence",
    tone: "golden",
    prints: [
      {
        id: "stanford-11",
        src: "/photography/stanford-11.jpg",
        alt: "Stanford Main Quad archway with palms and blue sky",
        caption: "Main Quad, through the arch.",
        role: "hero",
      },
      {
        id: "stanford-01",
        src: "/photography/stanford-01.jpg",
        alt: "Sandstone arcade and palm fronds against blue sky",
        role: "sequence",
      },
      {
        id: "stanford-10",
        src: "/photography/stanford-10.jpg",
        alt: "Terracotta overhang and columns looking up",
        role: "sequence",
      },
      {
        id: "stanford-13",
        src: "/photography/stanford-13.jpg",
        alt: "Ivy-covered corner where two tiled roofs meet",
        role: "sequence",
      },
      {
        id: "stanford-04",
        src: "/photography/stanford-04.jpg",
        alt: "Sharp modern building corner with tree silhouette",
        role: "sequence",
      },
      {
        id: "stanford-06",
        src: "/photography/stanford-06.jpg",
        alt: "Red staircase behind glass framed by branches",
        role: "sequence",
      },
      {
        id: "stanford-12",
        src: "/photography/stanford-12.jpg",
        alt: "Stanford campus courtyard light",
        role: "sequence",
      },
      {
        id: "stanford-02",
        src: "/photography/stanford-02.jpg",
        alt: "Stanford campus architectural detail",
        role: "sequence",
      },
      {
        id: "stanford-03",
        src: "/photography/stanford-03.jpg",
        alt: "Stanford campus architectural detail",
        role: "sequence",
      },
      {
        id: "stanford-05",
        src: "/photography/stanford-05.jpg",
        alt: "Horizontal bands of concrete and teal glass",
        role: "sequence",
      },
      {
        id: "stanford-07",
        src: "/photography/stanford-07.jpg",
        alt: "Warm facade with louvered windows and deep eaves",
        role: "sequence",
      },
      {
        id: "stanford-08",
        src: "/photography/stanford-08.jpg",
        alt: "Stanford campus architectural detail",
        role: "sequence",
      },
      {
        id: "stanford-09",
        src: "/photography/stanford-09.jpg",
        alt: "Stanford campus architectural detail",
        role: "sequence",
      },
    ],
  },
  {
    id: "facing",
    title: "Facing",
    rationale:
      "Portraits that return the gaze — camera-to-camera, type on skin, shutter slats, and soft blur — closing the book on looking as a reciprocal act.",
    layout: "contact-sheet",
    tone: "cool",
    prints: [
      {
        id: "molly",
        src: "/photography/Zhang_Molly.jpg",
        alt: "Person photographing with a camera, yellow and blue color treatment",
        caption: "Molly.",
        role: "frame",
      },
      {
        id: "we-the-people",
        src: "/photography/Zhang_WeThePeople.jpg",
        alt: "Portrait with gothic typography projected on the face",
        role: "frame",
      },
      {
        id: "portrait-shutter",
        src: "/photography/Zhang_portrait2.jpg",
        alt: "Black and white portrait partially obscured by a wooden shutter",
        caption: "Through the slats.",
        role: "frame",
      },
      {
        id: "deer",
        src: "/photography/Zhang_deer.jpg",
        alt: "Magenta-toned portrait with motion blur",
        role: "frame",
      },
      {
        id: "hero-portrait",
        src: "/photography/Zhang_hero-portrait.jpg",
        alt: "Close portrait with hands in hair against a plain wall",
        role: "frame",
      },
    ],
  },
];

/** Flat list for the fullscreen viewer. */
export function getViewerPrints(): PhotoPrint[] {
  const seen = new Set<string>();
  const out: PhotoPrint[] = [];
  for (const collection of photoCollections) {
    for (const print of collection.prints) {
      if (seen.has(print.src)) continue;
      seen.add(print.src);
      out.push({ ...print, caption: print.caption ?? collection.title });
    }
  }
  return out;
}

export function findViewerIndex(src: string): number {
  return getViewerPrints().findIndex((p) => p.src === src);
}

export function collectionForSrc(src: string): PhotoCollectionData | undefined {
  return photoCollections.find((c) => c.prints.some((p) => p.src === src));
}
