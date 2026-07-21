/**
 * Curated semantic atlas of the subconscious — hand-built from 26 redacted dreams.
 * Quality over TF-IDF: ontology, meaning ascent, and edge kinds are interpretive.
 */

import { dreamsData } from "@/work/dreams/dreams-data";

export type AtlasCategory =
  | "places"
  | "people"
  | "animals"
  | "objects"
  | "emotions"
  | "actions"
  | "themes"
  | "transformations";

/** Cognitive layer — how concrete vs inferred the concept is. */
export type AtlasLayer = "literal" | "theme" | "emotion" | "action" | "transformation";

export type EdgeKind = "cooccur" | "emotional" | "causal" | "symbolic";

export type AtlasViewId = "atlas" | "symbols" | "emotions" | "narrative";

export type AtlasExcerpt = {
  dreamId: string;
  dateLabel: string;
  title: string;
  text: string;
};

export type AtlasNode = {
  id: string;
  label: string;
  category: AtlasCategory;
  layer: AtlasLayer;
  dreamIds: string[];
  analysis: string;
  /** Meaning ascent: concrete → abstract (labels). */
  ascent: string[];
  views: AtlasViewId[];
};

export type AtlasEdge = {
  source: string;
  target: string;
  kind: EdgeKind;
  weight: number;
  note?: string;
};

export type AtlasRegion = {
  category: AtlasCategory;
  label: string;
  /** Polar angle for neighborhood center (radians). */
  angle: number;
  /** Radius factor 0–1 from canvas center. */
  radius: number;
};

export const ATLAS_VIEWS: {
  id: AtlasViewId;
  label: string;
  hint: string;
}[] = [
  {
    id: "atlas",
    label: "Semantic Atlas",
    hint: "all layers — symbols rising into meaning",
  },
  {
    id: "symbols",
    label: "Symbol Map",
    hint: "literal entities and how they touch",
  },
  {
    id: "emotions",
    label: "Emotional Landscape",
    hint: "recurring feelings and their weather",
  },
  {
    id: "narrative",
    label: "Narrative Grammar",
    hint: "actions, transformations, story motion",
  },
];

export const ATLAS_REGIONS: AtlasRegion[] = [
  { category: "people", label: "People", angle: -Math.PI * 0.72, radius: 0.72 },
  { category: "places", label: "Places", angle: -Math.PI * 0.42, radius: 0.74 },
  { category: "animals", label: "Animals", angle: -Math.PI * 0.12, radius: 0.7 },
  { category: "objects", label: "Objects", angle: Math.PI * 0.18, radius: 0.74 },
  { category: "actions", label: "Actions", angle: Math.PI * 0.42, radius: 0.72 },
  { category: "emotions", label: "Emotions", angle: Math.PI * 0.72, radius: 0.7 },
  { category: "themes", label: "Themes", angle: Math.PI * 0.95, radius: 0.68 },
  { category: "transformations", label: "Transformations", angle: -Math.PI * 0.95, radius: 0.68 },
];

export const CATEGORY_LABEL: Record<AtlasCategory, string> = {
  places: "place",
  people: "person",
  animals: "animal",
  objects: "object",
  emotions: "emotion",
  actions: "action",
  themes: "theme",
  transformations: "transformation",
};

export const LAYER_LABEL: Record<AtlasLayer, string> = {
  literal: "literal symbol",
  theme: "inferred theme",
  emotion: "emotional weather",
  action: "narrative action",
  transformation: "transformation",
};

export const EDGE_KIND_LABEL: Record<EdgeKind, string> = {
  cooccur: "frequently co-occurring",
  emotional: "emotionally correlated",
  causal: "causal / narrative progression",
  symbolic: "inferred symbolic association",
};

const dreamById = new Map(dreamsData.dreams.map((d) => [d.id, d]));

function excerptsFor(dreamIds: string[], limit = 3): AtlasExcerpt[] {
  const out: AtlasExcerpt[] = [];
  for (const id of dreamIds) {
    const d = dreamById.get(id);
    if (!d) continue;
    out.push({
      dreamId: d.id,
      dateLabel: d.dateLabel,
      title: d.title,
      text: d.excerpt,
    });
    if (out.length >= limit) break;
  }
  return out;
}

/** Hand-curated ontology nodes. */
export const atlasNodes: AtlasNode[] = [
  // ── Places ──────────────────────────────────────────────
  {
    id: "place-tourist-bus",
    label: "tourist bus",
    category: "places",
    layer: "literal",
    dreamIds: ["1655"],
    analysis: "Transit as stage for naming yourself to family — kinship performed while moving.",
    ascent: ["tourist bus", "transit", "identity performance"],
    views: ["atlas", "symbols"],
  },
  {
    id: "place-mountains",
    label: "california mountains",
    category: "places",
    layer: "literal",
    dreamIds: ["2200"],
    analysis: "Pastoral abundance that flips into night duty — beauty with a cost after dark.",
    ascent: ["california mountains", "pastoral abundance", "awe"],
    views: ["atlas", "symbols"],
  },
  {
    id: "place-parallel-school",
    label: "parallel school",
    category: "places",
    layer: "literal",
    dreamIds: ["2200", "2249", "2271"],
    analysis: "Classrooms that almost match memory — forks where recognition and shame trade places.",
    ascent: ["parallel school", "parallel selves", "confusion"],
    views: ["atlas", "symbols", "narrative"],
  },
  {
    id: "place-dorm",
    label: "dorm",
    category: "places",
    layer: "literal",
    dreamIds: ["1774"],
    analysis: "Shared threshold: one packs to leave the exam calendar; the other remains inside it.",
    ascent: ["dorm", "asymmetric obligation", "unease"],
    views: ["atlas", "symbols"],
  },
  {
    id: "place-comedy-club",
    label: "comedy club",
    category: "places",
    layer: "literal",
    dreamIds: ["1765"],
    analysis: "Campus performance among parents — laughter as social glue after illness reverses.",
    ascent: ["comedy club", "performance", "amusement"],
    views: ["atlas", "symbols"],
  },
  {
    id: "place-plaza",
    label: "shopping plaza",
    category: "places",
    layer: "literal",
    dreamIds: ["2269"],
    analysis: "A museum of surfaces — this season’s shine haunted by last year’s designs.",
    ascent: ["shopping plaza", "curated desire", "class archive"],
    views: ["atlas", "symbols"],
  },
  {
    id: "place-library-aquarium",
    label: "library–aquarium",
    category: "places",
    layer: "literal",
    dreamIds: ["2273"],
    analysis: "Hybrid civic roof: reading, display, and consumption stacked until hostility appears at the counter.",
    ascent: ["library–aquarium", "hybrid space", "unease"],
    views: ["atlas", "symbols"],
  },
  {
    id: "place-funeral-office",
    label: "funeral office",
    category: "places",
    layer: "literal",
    dreamIds: ["2277"],
    analysis: "Fluorescent rooms where death is rehearsed as logistics while the loved one still lives.",
    ascent: ["funeral office", "anticipatory grief", "grief"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "place-concert",
    label: "concert stage",
    category: "places",
    layer: "literal",
    dreamIds: ["2282", "2311", "2336"],
    analysis: "Proximity barrier: idols leave the stage; care mirrors across the line of fandom.",
    ascent: ["concert stage", "mediated presence", "amusement"],
    views: ["atlas", "symbols"],
  },
  {
    id: "place-park",
    label: "amusement park",
    category: "places",
    layer: "literal",
    dreamIds: ["2309"],
    analysis: "Process frozen mid-gesture — desire walks past paused rides toward empty clubhouses.",
    ascent: ["amusement park", "paused time", "suspended curiosity"],
    views: ["atlas", "symbols", "narrative"],
  },
  {
    id: "place-temple",
    label: "temple maze",
    category: "places",
    layer: "literal",
    dreamIds: ["2355"],
    analysis: "Sun-and-moon light in maze seams — power cycles, identity resets as architecture.",
    ascent: ["temple maze", "cycle of power", "awe"],
    views: ["atlas", "symbols", "narrative"],
  },
  {
    id: "place-closet",
    label: "closet archive",
    category: "places",
    layer: "literal",
    dreamIds: ["2328"],
    analysis: "Worn-out labels: space itself is the privilege that lets nothing be discarded.",
    ascent: ["closet archive", "class privilege", "archive"],
    views: ["atlas", "symbols"],
  },

  // ── People (redacted role labels) ───────────────────────
  {
    id: "person-parent",
    label: "[parent]",
    category: "people",
    layer: "literal",
    dreamIds: ["1655", "1762", "1765", "2200", "2252", "2263", "2269", "2271", "2276", "2282", "2301"],
    analysis: "The densest figure in the atlas — mediator of joke, complaint, prayer, shopping, and concert intimacy.",
    ascent: ["[parent]", "kinship duty", "nostalgia"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "person-grandparent",
    label: "[grandparent]",
    category: "people",
    layer: "literal",
    dreamIds: ["1655", "1765", "2249", "2252", "2301"],
    analysis: "Recognition across rain and dementia — restored, young again, or prayed for without recovery.",
    ascent: ["[grandparent]", "recognition", "grief"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "person-roommate",
    label: "[roommate]",
    category: "people",
    layer: "literal",
    dreamIds: ["1774"],
    analysis: "The one packing luggage while exams remain — proximity without shared obligation.",
    ascent: ["[roommate]", "departure", "asymmetric obligation"],
    views: ["atlas", "symbols"],
  },
  {
    id: "person-friend",
    label: "[friend]",
    category: "people",
    layer: "literal",
    dreamIds: ["1762", "2336"],
    analysis: "Childhood neighbor who vanishes; later a confused visual at a mediated concert.",
    ascent: ["[friend]", "disappearance", "nostalgia"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "person-idol",
    label: "[idol]",
    category: "people",
    layer: "literal",
    dreamIds: ["2282"],
    analysis: "High-five and Chinese hello — performer who also once brought his mother.",
    ascent: ["[idol]", "mirrored care", "amusement"],
    views: ["atlas", "symbols"],
  },
  {
    id: "person-spouse",
    label: "[spouse figure]",
    category: "people",
    layer: "literal",
    dreamIds: ["2357"],
    analysis: "A marriage that arrives almost only as verdict — partnership as abrupt refusal.",
    ascent: ["[spouse figure]", "abrupt verdict", "unease"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "person-teacher",
    label: "[teacher]",
    category: "people",
    layer: "literal",
    dreamIds: ["2249"],
    analysis: "Accusation as pedagogy — the numbered rock thrown away under public shame.",
    ascent: ["[teacher]", "accusation", "shame"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "person-children",
    label: "[children]",
    category: "people",
    layer: "literal",
    dreamIds: ["2263", "2271", "2309"],
    analysis: "Impossible kinship, parallel childhood, paused park watchers — the next generation as mirror.",
    ascent: ["[children]", "impossible kinship", "acceptance"],
    views: ["atlas", "symbols"],
  },

  // ── Animals ─────────────────────────────────────────────
  {
    id: "animal-companions",
    label: "animals",
    category: "animals",
    layer: "literal",
    dreamIds: ["1720", "1742", "2200", "2249", "2252", "2311"],
    analysis: "Care, naming, photography, spirit — animals as the softest recurring witnesses.",
    ascent: ["animals", "companionship", "nostalgia"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "animal-caged-cats",
    label: "caged cats",
    category: "animals",
    layer: "literal",
    dreamIds: ["1720"],
    analysis: "Adaptation to constraint asked as tenderness — are they used to the cages yet?",
    ascent: ["caged cats", "care under constraint", "nostalgia"],
    views: ["atlas", "symbols"],
  },
  {
    id: "animal-dogs",
    label: "[dog]",
    category: "animals",
    layer: "literal",
    dreamIds: ["1742", "2200"],
    analysis: "Named and sized; later photographed until one almost speaks in a jacket.",
    ascent: ["[dog]", "naming", "companionship"],
    views: ["atlas", "symbols"],
  },
  {
    id: "animal-fox",
    label: "fox spirit",
    category: "animals",
    layer: "literal",
    dreamIds: ["2249", "2311"],
    analysis: "Classroom gift and nine-tailed myth — transformation wearing an animal face.",
    ascent: ["fox spirit", "transformation", "unease"],
    views: ["atlas", "symbols", "narrative"],
  },

  // ── Objects ─────────────────────────────────────────────
  {
    id: "obj-photographs",
    label: "photographs",
    category: "objects",
    layer: "literal",
    dreamIds: ["1655", "1720", "2200", "2252", "2271", "2336"],
    analysis: "Proof, performance, parallel graduation — the archive that edits memory in real time.",
    ascent: ["photographs", "memory", "nostalgia"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "obj-bus",
    label: "bus",
    category: "objects",
    layer: "literal",
    dreamIds: ["1655", "2200"],
    analysis: "Vehicle of naming and of showing beautiful pictures — transit as uncertainty’s vessel.",
    ascent: ["bus", "transition", "uncertainty"],
    views: ["atlas", "symbols", "narrative"],
  },
  {
    id: "obj-music",
    label: "music",
    category: "objects",
    layer: "literal",
    dreamIds: ["1720", "1772", "2271", "2282", "2306", "2311", "2336"],
    analysis: "Listener, metadata, pitch, cult chant — sound as the densest literal thread.",
    ascent: ["music", "mediated presence", "curiosity"],
    views: ["atlas", "symbols"],
  },
  {
    id: "obj-clothing",
    label: "clothing",
    category: "objects",
    layer: "literal",
    dreamIds: ["1765", "2269", "2328"],
    analysis: "Cosplay restoration, torso bags, worn-out labels — fabric as class and costume.",
    ascent: ["clothing", "class archive", "amusement"],
    views: ["atlas", "symbols"],
  },
  {
    id: "obj-luggage",
    label: "luggage",
    category: "objects",
    layer: "literal",
    dreamIds: ["1774"],
    analysis: "Packed while exams remain — the object that marks who may leave.",
    ascent: ["luggage", "departure", "asymmetric obligation"],
    views: ["atlas", "symbols", "narrative"],
  },
  {
    id: "obj-mirror",
    label: "mirror",
    category: "objects",
    layer: "literal",
    dreamIds: ["2200"],
    analysis: "A voice that is not yours — staring until the wrong speech stops.",
    ascent: ["mirror", "possession / double", "unease"],
    views: ["atlas", "symbols", "emotions", "narrative"],
  },
  {
    id: "obj-flowers",
    label: "lotus incense",
    category: "objects",
    layer: "literal",
    dreamIds: ["2269"],
    analysis: "Artificial blossom releasing scent — desire curated as atmosphere.",
    ascent: ["lotus incense", "curated desire", "amusement"],
    views: ["atlas", "symbols"],
  },
  {
    id: "obj-drink",
    label: "holiday drink",
    category: "objects",
    layer: "literal",
    dreamIds: ["2276"],
    analysis: "One more thing licensed by the holiday against household surplus.",
    ascent: ["holiday drink", "small insistence", "desire"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "obj-stars",
    label: "stars",
    category: "objects",
    layer: "literal",
    dreamIds: ["1762"],
    analysis: "Childhood hobby that cannot be recovered — watching as lost capacity.",
    ascent: ["stars", "lost childhood", "nostalgia"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "obj-interface",
    label: "interface",
    category: "objects",
    layer: "literal",
    dreamIds: ["2311", "2336"],
    analysis: "Fourth wall and clickable dirt — presence rewritten as UI.",
    ascent: ["interface", "mediated presence", "confusion"],
    views: ["atlas", "symbols"],
  },
  {
    id: "obj-rock",
    label: "bingo rock",
    category: "objects",
    layer: "literal",
    dreamIds: ["2249"],
    analysis: "Golden-green numbered stone thrown away — rules become accusation.",
    ascent: ["bingo rock", "false accusation", "shame"],
    views: ["atlas", "symbols", "emotions"],
  },
  {
    id: "obj-light",
    label: "temple light",
    category: "objects",
    layer: "literal",
    dreamIds: ["2309", "2355"],
    analysis: "Glare that hides what is under the face; seams that hold returning gods.",
    ascent: ["temple light", "cycle of power", "awe"],
    views: ["atlas", "symbols", "narrative"],
  },

  // ── Emotions ────────────────────────────────────────────
  {
    id: "emo-nostalgia",
    label: "nostalgia",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["1720", "1762", "2249", "2271", "2301", "2355"],
    analysis: "The weather of parallel childhood, stars, and grandparents who almost return.",
    ascent: ["nostalgia"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-amusement",
    label: "amusement",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["1655", "1765", "1772", "2252", "2263", "2269", "2282", "2309", "2357"],
    analysis: "Comedy as cover — laughter that often sits beside unease or grief.",
    ascent: ["amusement"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-unease",
    label: "unease",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["1772", "2249", "2263", "2273", "2357"],
    analysis: "Hybrid spaces, fox gifts, impossible kinship — the body knowing something is off.",
    ascent: ["unease"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-grief",
    label: "grief",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["2249", "2252", "2277", "2301"],
    analysis: "Anticipatory menus, private knowledge they are not getting better, selective memory.",
    ascent: ["grief"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-confusion",
    label: "confusion",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["1770", "2249", "2263", "2271", "2336"],
    analysis: "Genre mashups, parallel pitch, mediated visuals — narrative logic that won’t settle.",
    ascent: ["confusion"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-shame",
    label: "shame",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["2249", "2271"],
    analysis: "Public accusation and a parent’s complaint about a less lovely child.",
    ascent: ["shame"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-awe",
    label: "awe",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["2200", "2309", "2311", "2355"],
    analysis: "Mountains, paused parks, cult chant, temple rounds — beauty that enlarges the self.",
    ascent: ["awe"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-curiosity",
    label: "curiosity",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["1770", "2306", "2309", "2311", "2336"],
    analysis: "Technical pitch tasks, meta-myth, interactive UI — inquiry as dream work.",
    ascent: ["curiosity"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-desire",
    label: "desire",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["2276", "2309"],
    analysis: "Holiday drink and majestic condos — wanting licensed by occasion or glance.",
    ascent: ["desire"],
    views: ["atlas", "emotions"],
  },
  {
    id: "emo-urgency",
    label: "urgency",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["1765", "2355"],
    analysis: "Running into the club table; lethal bullet at the last second.",
    ascent: ["urgency"],
    views: ["atlas", "emotions", "narrative"],
  },
  {
    id: "emo-acceptance",
    label: "acceptance",
    category: "emotions",
    layer: "emotion",
    dreamIds: ["2263", "2355"],
    analysis: "Living with contradiction — smiles after impossible kinship; another round after explosion.",
    ascent: ["acceptance"],
    views: ["atlas", "emotions"],
  },

  // ── Actions ─────────────────────────────────────────────
  {
    id: "act-photographing",
    label: "photographing",
    category: "actions",
    layer: "action",
    dreamIds: ["1655", "2200", "2252", "2271"],
    analysis: "Capturing cows, dogs, penguins, parallel graduations — proof as care and performance.",
    ascent: ["photographing", "memory", "nostalgia"],
    views: ["atlas", "narrative", "symbols"],
  },
  {
    id: "act-packing",
    label: "packing / leaving",
    category: "actions",
    layer: "action",
    dreamIds: ["1774"],
    analysis: "Luggage zipped while the dreamer remains inside the testing calendar.",
    ascent: ["packing / leaving", "asymmetric obligation", "unease"],
    views: ["atlas", "narrative"],
  },
  {
    id: "act-performing",
    label: "performing",
    category: "actions",
    layer: "action",
    dreamIds: ["1765", "2282", "2311"],
    analysis: "Comedy club, high-fives, cult chant on LED stage — self staged for others.",
    ascent: ["performing", "mediated presence", "amusement"],
    views: ["atlas", "narrative"],
  },
  {
    id: "act-praying",
    label: "praying",
    category: "actions",
    layer: "action",
    dreamIds: ["2252"],
    analysis: "A parent’s prayer for grandparents beside private knowledge they will not recover.",
    ascent: ["praying", "anticipatory grief", "grief"],
    views: ["atlas", "narrative", "emotions"],
  },
  {
    id: "act-watching",
    label: "watching",
    category: "actions",
    layer: "action",
    dreamIds: ["1762", "2309", "2311"],
    analysis: "Stars, paused park TV, fan viewing — attention as the last shared ritual.",
    ascent: ["watching", "lost childhood", "nostalgia"],
    views: ["atlas", "narrative"],
  },
  {
    id: "act-warding",
    label: "warding spirits",
    category: "actions",
    layer: "action",
    dreamIds: ["2200"],
    analysis: "Night duty after pastoral day — care for others’ nightmares becomes private ordeal.",
    ascent: ["warding spirits", "possession / double", "unease"],
    views: ["atlas", "narrative"],
  },
  {
    id: "act-reversing",
    label: "reversing time",
    category: "actions",
    layer: "action",
    dreamIds: ["2355"],
    analysis: "Last-second undo that still explodes — agency that cannot prevent the round.",
    ascent: ["reversing time", "cycle of power", "urgency"],
    views: ["atlas", "narrative"],
  },
  {
    id: "act-rehearsing-death",
    label: "rehearsing death",
    category: "actions",
    layer: "action",
    dreamIds: ["2277"],
    analysis: "Choosing funeral food while the loved one lives — grief practiced as logistics.",
    ascent: ["rehearsing death", "anticipatory grief", "grief"],
    views: ["atlas", "narrative", "emotions"],
  },
  {
    id: "act-naming",
    label: "naming / identity",
    category: "actions",
    layer: "action",
    dreamIds: ["1655", "1742"],
    analysis: "Surname for grandma; dogs sized and named — identity itemized for kinship.",
    ascent: ["naming / identity", "identity performance", "kinship duty"],
    views: ["atlas", "narrative", "symbols"],
  },
  {
    id: "act-marrying",
    label: "marrying",
    category: "actions",
    layer: "action",
    dreamIds: ["2357"],
    analysis: "Almost only a verdict — the dream refuses elaboration.",
    ascent: ["marrying", "abrupt verdict", "unease"],
    views: ["atlas", "narrative"],
  },

  // ── Themes (inferred) ───────────────────────────────────
  {
    id: "theme-memory",
    label: "memory",
    category: "themes",
    layer: "theme",
    dreamIds: ["1655", "1762", "2200", "2271", "2301"],
    analysis: "Photographs, pitch, selective recognition — memory edits itself while you watch.",
    ascent: ["memory"],
    views: ["atlas", "emotions", "symbols"],
  },
  {
    id: "theme-kinship",
    label: "kinship duty",
    category: "themes",
    layer: "theme",
    dreamIds: ["1655", "1762", "1765", "2252", "2263", "2271", "2282", "2301"],
    analysis: "Parents, grandparents, impossible children — care that binds and bruises.",
    ascent: ["kinship duty"],
    views: ["atlas", "emotions"],
  },
  {
    id: "theme-identity",
    label: "identity performance",
    category: "themes",
    layer: "theme",
    dreamIds: ["1655", "2271"],
    analysis: "Lawyer-in-training on a bus; parallel graduation photos — self staged for family.",
    ascent: ["identity performance"],
    views: ["atlas", "symbols"],
  },
  {
    id: "theme-parallel",
    label: "parallel selves",
    category: "themes",
    layer: "theme",
    dreamIds: ["1762", "2200", "2271"],
    analysis: "Almost the same schools, almost happier — forks where continuity frays.",
    ascent: ["parallel selves"],
    views: ["atlas", "narrative", "symbols"],
  },
  {
    id: "theme-disappearance",
    label: "disappearance",
    category: "themes",
    layer: "theme",
    dreamIds: ["1655", "1762", "2301"],
    analysis: "Parent before a flight; friend who never returns; recognition that skips a generation.",
    ascent: ["disappearance"],
    views: ["atlas", "emotions", "narrative"],
  },
  {
    id: "theme-class",
    label: "class privilege",
    category: "themes",
    layer: "theme",
    dreamIds: ["2269", "2309", "2328"],
    analysis: "Closet archives, condos, last year’s designs — space as the right to keep everything.",
    ascent: ["class privilege"],
    views: ["atlas", "symbols"],
  },
  {
    id: "theme-mediated",
    label: "mediated presence",
    category: "themes",
    layer: "theme",
    dreamIds: ["1772", "2282", "2311", "2336"],
    analysis: "Metadata inside the song; concert as UI — intimacy through glass and vibration.",
    ascent: ["mediated presence"],
    views: ["atlas", "symbols"],
  },
  {
    id: "theme-belief",
    label: "belief / religion",
    category: "themes",
    layer: "theme",
    dreamIds: ["2200", "2252", "2311", "2355"],
    analysis: "Prayer, fox myths, temple gods — belief accumulating like tails every fifty years.",
    ascent: ["belief / religion"],
    views: ["atlas", "narrative"],
  },
  {
    id: "theme-care-constraint",
    label: "care under constraint",
    category: "themes",
    layer: "theme",
    dreamIds: ["1720", "2200", "2252"],
    analysis: "Cages for vets, warding nightmares, hand-holding beside private grief.",
    ascent: ["care under constraint"],
    views: ["atlas", "emotions"],
  },
  {
    id: "theme-anticipatory",
    label: "anticipatory grief",
    category: "themes",
    layer: "theme",
    dreamIds: ["2252", "2277", "2301"],
    analysis: "Knowing they are not getting better; practicing post-death process while they live.",
    ascent: ["anticipatory grief"],
    views: ["atlas", "emotions"],
  },
  {
    id: "theme-uncertainty",
    label: "uncertainty",
    category: "themes",
    layer: "theme",
    dreamIds: ["1655", "1774", "2200"],
    analysis: "Buses, packing asymmetries, flights canceled — transition without a fixed landing.",
    ascent: ["uncertainty"],
    views: ["atlas", "emotions", "narrative"],
  },
  {
    id: "theme-lost-childhood",
    label: "lost childhood",
    category: "themes",
    layer: "theme",
    dreamIds: ["1762", "2271"],
    analysis: "Cannot watch stars as a kid again; pitch higher than memory allows.",
    ascent: ["lost childhood"],
    views: ["atlas", "emotions"],
  },

  // ── Transformations ─────────────────────────────────────
  {
    id: "xform-restored",
    label: "illness → costume comedy",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["1765"],
    analysis: "Grandpa well again in red suit — illness reverses into embrace and laughter.",
    ascent: ["illness → costume comedy", "kinship duty", "amusement"],
    views: ["atlas", "narrative"],
  },
  {
    id: "xform-pastoral-night",
    label: "pastoral → night duty",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["2200"],
    analysis: "Colorful mountains become mirror spirits — abundance flips into private ordeal.",
    ascent: ["pastoral → night duty", "possession / double", "unease"],
    views: ["atlas", "narrative"],
  },
  {
    id: "xform-graduation-fork",
    label: "graduation fork",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["2271"],
    analysis: "Same schools, slightly different photos — continuity that almost holds.",
    ascent: ["graduation fork", "parallel selves", "nostalgia"],
    views: ["atlas", "narrative"],
  },
  {
    id: "xform-fox-accrual",
    label: "fox tails accrue",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["2249", "2311"],
    analysis: "From classroom fox to nine tails every fifty years — belief thickening into myth.",
    ascent: ["fox tails accrue", "belief / religion", "awe"],
    views: ["atlas", "narrative"],
  },
  {
    id: "xform-cycle",
    label: "explosion → another round",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["2355"],
    analysis: "Time reversal fails; lights return to temple seams — identity as recurring architecture.",
    ascent: ["explosion → another round", "cycle of power", "acceptance"],
    views: ["atlas", "narrative"],
  },
  {
    id: "xform-paused",
    label: "motion → pause",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["2309"],
    analysis: "Everything stopped in the air — curiosity suspended beside talk of stocks and condos.",
    ascent: ["motion → pause", "suspended curiosity", "curiosity"],
    views: ["atlas", "narrative"],
  },
  {
    id: "xform-dementia-youth",
    label: "dementia → selective youth",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["2301"],
    analysis: "Grandpa in his twenties remembers mom, not you — recognition rewritten as grief.",
    ascent: ["dementia → selective youth", "disappearance", "grief"],
    views: ["atlas", "narrative", "emotions"],
  },
  {
    id: "xform-marriage-verdict",
    label: "marriage as verdict",
    category: "transformations",
    layer: "transformation",
    dreamIds: ["2357"],
    analysis: "Partnership collapses into a punchline that refuses story.",
    ascent: ["marriage as verdict", "abrupt verdict", "unease"],
    views: ["atlas", "narrative"],
  },
];

/** Semantic edges — curated, not pure co-occurrence. */
export const atlasEdges: AtlasEdge[] = [
  // Meaning ascent: literal → theme → emotion
  { source: "obj-photographs", target: "theme-memory", kind: "symbolic", weight: 3, note: "images as memory’s instrument" },
  { source: "theme-memory", target: "emo-nostalgia", kind: "emotional", weight: 3, note: "memory weather" },
  { source: "obj-bus", target: "theme-uncertainty", kind: "symbolic", weight: 2, note: "transit without landing" },
  { source: "theme-uncertainty", target: "emo-unease", kind: "emotional", weight: 2 },
  { source: "animal-fox", target: "xform-fox-accrual", kind: "symbolic", weight: 3, note: "fox → mythic accrual" },
  { source: "xform-fox-accrual", target: "theme-belief", kind: "symbolic", weight: 2 },
  { source: "theme-belief", target: "emo-awe", kind: "emotional", weight: 2 },
  { source: "animal-fox", target: "emo-unease", kind: "emotional", weight: 2, note: "classroom fox carries unease" },

  { source: "obj-mirror", target: "xform-pastoral-night", kind: "causal", weight: 3, note: "mirror opens night duty" },
  { source: "xform-pastoral-night", target: "emo-unease", kind: "emotional", weight: 3 },
  { source: "obj-stars", target: "theme-lost-childhood", kind: "symbolic", weight: 3 },
  { source: "theme-lost-childhood", target: "emo-nostalgia", kind: "emotional", weight: 3 },
  { source: "obj-luggage", target: "act-packing", kind: "causal", weight: 3 },
  { source: "act-packing", target: "theme-uncertainty", kind: "symbolic", weight: 2 },
  { source: "place-funeral-office", target: "act-rehearsing-death", kind: "causal", weight: 3 },
  { source: "act-rehearsing-death", target: "theme-anticipatory", kind: "symbolic", weight: 3 },
  { source: "theme-anticipatory", target: "emo-grief", kind: "emotional", weight: 3 },

  { source: "person-grandparent", target: "xform-dementia-youth", kind: "causal", weight: 3 },
  { source: "xform-dementia-youth", target: "theme-disappearance", kind: "symbolic", weight: 2 },
  { source: "theme-disappearance", target: "emo-grief", kind: "emotional", weight: 3 },
  { source: "person-grandparent", target: "xform-restored", kind: "causal", weight: 2, note: "illness reverses" },
  { source: "xform-restored", target: "emo-amusement", kind: "emotional", weight: 2 },

  { source: "place-temple", target: "act-reversing", kind: "causal", weight: 3 },
  { source: "act-reversing", target: "xform-cycle", kind: "causal", weight: 3 },
  { source: "xform-cycle", target: "emo-acceptance", kind: "emotional", weight: 2 },
  { source: "xform-cycle", target: "emo-awe", kind: "emotional", weight: 2 },

  { source: "place-park", target: "xform-paused", kind: "causal", weight: 3 },
  { source: "xform-paused", target: "emo-curiosity", kind: "emotional", weight: 2 },
  { source: "person-spouse", target: "act-marrying", kind: "causal", weight: 3 },
  { source: "act-marrying", target: "xform-marriage-verdict", kind: "causal", weight: 3 },
  { source: "xform-marriage-verdict", target: "emo-unease", kind: "emotional", weight: 3 },

  { source: "place-parallel-school", target: "theme-parallel", kind: "symbolic", weight: 3 },
  { source: "theme-parallel", target: "xform-graduation-fork", kind: "symbolic", weight: 2 },
  { source: "xform-graduation-fork", target: "emo-nostalgia", kind: "emotional", weight: 2 },
  { source: "xform-graduation-fork", target: "emo-shame", kind: "emotional", weight: 2 },

  { source: "obj-photographs", target: "act-photographing", kind: "cooccur", weight: 3 },
  { source: "act-photographing", target: "theme-memory", kind: "symbolic", weight: 2 },
  { source: "obj-music", target: "theme-mediated", kind: "symbolic", weight: 3 },
  { source: "obj-interface", target: "theme-mediated", kind: "symbolic", weight: 3 },
  { source: "place-concert", target: "theme-mediated", kind: "cooccur", weight: 2 },
  { source: "theme-mediated", target: "emo-curiosity", kind: "emotional", weight: 2 },
  { source: "theme-mediated", target: "emo-confusion", kind: "emotional", weight: 2 },

  { source: "obj-clothing", target: "theme-class", kind: "symbolic", weight: 2 },
  { source: "place-closet", target: "theme-class", kind: "symbolic", weight: 3 },
  { source: "animal-caged-cats", target: "theme-care-constraint", kind: "symbolic", weight: 3 },
  { source: "theme-care-constraint", target: "emo-nostalgia", kind: "emotional", weight: 2 },
  { source: "act-praying", target: "theme-anticipatory", kind: "causal", weight: 3 },
  { source: "act-praying", target: "theme-belief", kind: "symbolic", weight: 2 },

  { source: "person-parent", target: "theme-kinship", kind: "symbolic", weight: 4 },
  { source: "person-grandparent", target: "theme-kinship", kind: "symbolic", weight: 3 },
  { source: "theme-kinship", target: "emo-nostalgia", kind: "emotional", weight: 3 },
  { source: "theme-kinship", target: "emo-grief", kind: "emotional", weight: 2 },
  { source: "person-parent", target: "emo-amusement", kind: "emotional", weight: 2, note: "jokes, shopping, concert" },
  { source: "person-friend", target: "theme-disappearance", kind: "symbolic", weight: 3 },
  { source: "person-friend", target: "emo-nostalgia", kind: "emotional", weight: 2 },

  { source: "obj-rock", target: "person-teacher", kind: "causal", weight: 3, note: "rock thrown = accusation" },
  { source: "person-teacher", target: "emo-shame", kind: "emotional", weight: 3 },
  { source: "person-grandparent", target: "emo-nostalgia", kind: "emotional", weight: 2, note: "rain recognition" },
  { source: "place-library-aquarium", target: "emo-unease", kind: "emotional", weight: 2 },
  { source: "obj-drink", target: "emo-desire", kind: "emotional", weight: 3 },
  { source: "act-naming", target: "theme-identity", kind: "symbolic", weight: 3 },
  { source: "theme-identity", target: "place-tourist-bus", kind: "cooccur", weight: 2 },
  { source: "act-watching", target: "obj-stars", kind: "cooccur", weight: 2 },
  { source: "act-warding", target: "obj-mirror", kind: "causal", weight: 3 },
  { source: "act-performing", target: "place-concert", kind: "cooccur", weight: 2 },
  { source: "act-performing", target: "person-idol", kind: "cooccur", weight: 2 },
  { source: "person-idol", target: "person-parent", kind: "symbolic", weight: 2, note: "mirrored mother care" },
  { source: "animal-companions", target: "act-photographing", kind: "cooccur", weight: 3 },
  { source: "animal-companions", target: "emo-amusement", kind: "emotional", weight: 2 },
  { source: "animal-dogs", target: "animal-companions", kind: "cooccur", weight: 2 },
  { source: "place-mountains", target: "obj-photographs", kind: "cooccur", weight: 2 },
  { source: "place-mountains", target: "emo-awe", kind: "emotional", weight: 2 },
  { source: "obj-music", target: "act-performing", kind: "cooccur", weight: 2 },
  { source: "obj-light", target: "place-temple", kind: "cooccur", weight: 3 },
  { source: "obj-flowers", target: "place-plaza", kind: "cooccur", weight: 2 },
  { source: "person-children", target: "emo-acceptance", kind: "emotional", weight: 2 },
  { source: "person-roommate", target: "obj-luggage", kind: "cooccur", weight: 3 },
  { source: "place-dorm", target: "person-roommate", kind: "cooccur", weight: 3 },
  { source: "emo-amusement", target: "emo-unease", kind: "emotional", weight: 2, note: "comedy beside dread" },
  { source: "emo-grief", target: "emo-nostalgia", kind: "emotional", weight: 2 },
  { source: "emo-shame", target: "emo-confusion", kind: "emotional", weight: 1 },
  { source: "emo-urgency", target: "act-reversing", kind: "causal", weight: 2 },
  { source: "theme-parallel", target: "emo-confusion", kind: "emotional", weight: 2 },
  { source: "obj-bus", target: "place-tourist-bus", kind: "cooccur", weight: 2 },
  { source: "obj-bus", target: "place-parallel-school", kind: "cooccur", weight: 1 },
  { source: "place-comedy-club", target: "act-performing", kind: "cooccur", weight: 2 },
  { source: "person-parent", target: "act-praying", kind: "causal", weight: 2 },
  { source: "person-parent", target: "obj-drink", kind: "cooccur", weight: 2 },
  { source: "theme-belief", target: "place-temple", kind: "symbolic", weight: 2 },
  { source: "animal-fox", target: "place-parallel-school", kind: "cooccur", weight: 2 },
  { source: "obj-interface", target: "place-concert", kind: "cooccur", weight: 2 },
  { source: "act-photographing", target: "person-parent", kind: "cooccur", weight: 1 },
];

export type EnrichedAtlasNode = AtlasNode & {
  count: number;
  excerpts: AtlasExcerpt[];
};

export type DreamsAtlas = {
  subtitle: string;
  opening: string;
  dreamCount: number;
  nodes: EnrichedAtlasNode[];
  edges: AtlasEdge[];
  regions: AtlasRegion[];
  views: typeof ATLAS_VIEWS;
  countsByCategory: Record<AtlasCategory, number>;
};

function enrich(): DreamsAtlas {
  const nodes: EnrichedAtlasNode[] = atlasNodes.map((n) => ({
    ...n,
    count: n.dreamIds.length,
    excerpts: excerptsFor(n.dreamIds),
  }));

  const countsByCategory = {} as Record<AtlasCategory, number>;
  for (const c of Object.keys(CATEGORY_LABEL) as AtlasCategory[]) {
    countsByCategory[c] = 0;
  }
  for (const n of nodes) countsByCategory[n.category] += 1;

  return {
    subtitle: "a semantic atlas of the subconscious",
    opening: dreamsData.opening,
    dreamCount: dreamsData.dreamCount,
    nodes,
    edges: atlasEdges,
    regions: ATLAS_REGIONS,
    views: ATLAS_VIEWS,
    countsByCategory,
  };
}

export const dreamsAtlas = enrich();

export function filterAtlas(
  view: AtlasViewId,
): { nodes: EnrichedAtlasNode[]; edges: AtlasEdge[] } {
  const nodes = dreamsAtlas.nodes.filter((n) => n.views.includes(view));
  const ids = new Set(nodes.map((n) => n.id));
  let edges = dreamsAtlas.edges.filter((e) => ids.has(e.source) && ids.has(e.target));

  if (view === "symbols") {
    edges = edges.filter((e) => e.kind === "cooccur" || e.kind === "symbolic");
  } else if (view === "emotions") {
    edges = edges.filter(
      (e) => e.kind === "emotional" || e.kind === "symbolic" || e.kind === "causal",
    );
  } else if (view === "narrative") {
    edges = edges.filter((e) => e.kind === "causal" || e.kind === "symbolic");
  }

  return { nodes, edges };
}

export function relatedFor(
  nodeId: string,
  edges: AtlasEdge[],
  nodes: EnrichedAtlasNode[],
): { node: EnrichedAtlasNode; kind: EdgeKind; note?: string; weight: number }[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const out: { node: EnrichedAtlasNode; kind: EdgeKind; note?: string; weight: number }[] = [];
  for (const e of edges) {
    const other = e.source === nodeId ? e.target : e.target === nodeId ? e.source : null;
    if (!other) continue;
    const n = byId.get(other);
    if (!n) continue;
    out.push({ node: n, kind: e.kind, note: e.note, weight: e.weight });
  }
  return out.sort((a, b) => b.weight - a.weight);
}
