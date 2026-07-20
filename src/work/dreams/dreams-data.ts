/** Auto-generated from Notes dream exports — redacted. Do not hand-edit. */
export type DreamPersonRef = { id: string; label: string };

export type DreamRecord = {
  id: string;
  ordinal: number;
  dateLabel: string;
  date: string | null;
  dateSource?: string;
  dateProvenance?: string;
  archiveId?: string;
  title: string;
  atmosphere: string;
  text: string;
  excerpt: string;
  interpretation: string;
  symbols: DreamPersonRef[];
  places: DreamPersonRef[];
  people: DreamPersonRef[];
  emotions: DreamPersonRef[];
  source: string;
  notesId: string;
};

export type GraphExcerpt = {
  dreamId: string;
  dateLabel: string;
  title: string;
  text: string;
};

export type GraphNode = {
  id: string;
  kind: "symbol" | "place" | "person" | "motif" | string;
  label: string;
  count: number;
  dreamIds: string[];
  excerpts: GraphExcerpt[];
  analysis: string;
};

export type GraphLink = {
  source: string;
  target: string;
  weight: number;
};

export type DreamsData = {
  generatedAt: string;
  opening: string;
  subtitle: string;
  captureNotes: Record<string, unknown>;
  dreamCount: number;
  dreams: DreamRecord[];
  graph: { nodes: GraphNode[]; links: GraphLink[] };
  symbolIndex: { id: string; label: string; count: number; dreamIds: string[] }[];
  peopleIndex: { id: string; label: string; count: number; dreamIds: string[] }[];
  placesIndex: { id: string; label: string; count: number; dreamIds: string[] }[];
  emotionIndex: { id: string; label: string; count: number; dreamIds: string[] }[];
  patterns: { id: string; label: string; evidence: string[]; summary: string }[];
  trajectories: { id: string; label: string; steps: string[]; dreamIds: string[] }[];
};

const data = {
  "generatedAt": "2026-07-20T04:50:49Z",
  "opening": "Dreams are the only place where memory edits itself in real time.",
  "subtitle": "a private sky of recurring symbols",
  "captureNotes": {
    "notesAppleScript": "timed out (-1712) enumerating Notes.app",
    "notesSqliteTitles": 26,
    "rawExports": 26,
    "archiveSupplement": 7,
    "primarySource": "content/dreams/raw/*.txt (Notes exports; Z_PK ids match NoteStore.sqlite ZTITLE1)",
    "redaction": "Human names → [friend]/[roommate]/[idol]/[spouse figure]/[clubmate]/[classmate]/[character]/[dog]/[L—]; place/brand/fictional kept",
    "namedNoteSearch": "dreams from somewhere else",
    "namedNoteFound": true,
    "namedNoteNote": "Split compilation into 52 dreams; 50 new, 2 duplicate(s) of existing archive. Dates from in-text headers.",
    "newDreamsImported": [
      "1747",
      "1749"
    ],
    "newDreamsSource": "Notes folder Dreams (Z_PK 1747, 1749) — present locally but absent from prior 26-import",
    "dateProvenance": "Prefer ZCREATIONDATE3/1 (note creation). Fallback ZMODIFICATIONDATE1. These are Notes metadata timestamps (approx. capture time), not in-text dream dates. No in-text dates found.",
    "archivePath": "content/dreams/archive/dreams-full.json",
    "dfseSeparated": 52,
    "dfseNew": 50,
    "dfseDuplicates": 2,
    "dfseSource": "content/dreams/sources/dreams-from-somewhere-else.md"
  },
  "dreamCount": 78,
  "dreams": [
    {
      "id": "dfse01",
      "ordinal": 1,
      "dateLabel": "2025-09-04",
      "date": "2025-09-04",
      "title": "Was happy. I walk into friends who I have not seen i",
      "atmosphere": "light buoyancy",
      "text": "In my dream I was happy. I walk into friends who I have not seen in a long time and their parents who I’ve never seen and they are happy to see me. I am extroverted and the parents love me. I agree to have dinner with them. I was not worried sick of eating with strangers. I was doing Mongolian dance. My friends were there, we do combinations of dances and I laugh out loud. I rarely laugh out loud. I sound very happy.",
      "excerpt": "In my dream I was happy. I walk into friends who I have not seen in a long time and their parents who I’ve never seen and they are happy to…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse01",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse01"
    },
    {
      "id": "dfse02",
      "ordinal": 2,
      "dateLabel": "2025-09-05",
      "date": "2025-09-05",
      "title": "I have panicked dreams of mom asking me to help exch",
      "atmosphere": "family weather",
      "text": "I have panicked dreams of mom asking me to help exchange/ transfer money again and it’s very complicated and I’m stressed in my sleep",
      "excerpt": "I have panicked dreams of mom asking me to help exchange/ transfer money again and it’s very complicated and I’m stressed in my sleep",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse02",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse02"
    },
    {
      "id": "dfse03",
      "ordinal": 3,
      "dateLabel": "2025-09-05",
      "date": "2025-09-05",
      "title": "It was some sort of performance of a male teacher’s",
      "atmosphere": "drifting recall",
      "text": "I had another dream that it was some sort of performance of a male teacher’s wife and I took a lot of pictures for them. She is an artist? She made really pretty painting pictures of a window sill. Somehow I knew the male teacher’s, I think he taught me something but I’m not sure. The female teacher is really pretty. Their two kids were young and also there. I wanted to send them the pictures but my camera roll was acting up and wouldn’t give me my recent pictures.",
      "excerpt": "I had another dream that it was some sort of performance of a male teacher’s wife and I took a lot of pictures for them. She is an artist?…",
      "interpretation": "Motifs observed: photographs. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "photographs",
          "label": "photographs"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "children",
          "label": "children"
        },
        {
          "id": "teacher",
          "label": "teacher"
        }
      ],
      "emotions": [
        {
          "id": "confusion",
          "label": "confusion"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse03",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse03"
    },
    {
      "id": "1655",
      "ordinal": 4,
      "dateLabel": "2025-09-08",
      "date": "2025-09-08",
      "title": "Tourist bus surnames",
      "atmosphere": "fractured kinship",
      "text": "I had a dream I was talking to Beijing grandma in tourist bus and I told them my last name is [L—] and I was a lawyer in training and somewhere in my dream I wanted to go kill this girl who is a social media influencer by putting posinsonous gas where she is going and since she is the only one who would be taking a lot of pictures she would pass out? Something also about dad flying to China but disappearing before the flight and so I canceled his flight so he got mad and disappeared I had a dream I met the guy that Elon slapped in the hotel elevator and he is ex Google or something but I said he was ex Apple because k don t know him except someone else told me lol",
      "excerpt": "On a tourist bus I tell Beijing grandma my last name is [L—]—I am a lawyer in training.",
      "interpretation": "Identity is performed for family in transit. A parallel strand invents hostility toward a public figure and a disappearing parent before a flight—kinship, naming, and disappearance share one night.",
      "symbols": [
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "bus",
          "label": "bus"
        }
      ],
      "places": [
        {
          "id": "tourist-bus",
          "label": "tourist bus"
        }
      ],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "grandparent",
          "label": "grandparent"
        },
        {
          "id": "influencer",
          "label": "public figure"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        }
      ],
      "source": "notes",
      "notesId": "1655",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1655"
    },
    {
      "id": "dfse06",
      "ordinal": 5,
      "dateLabel": "2025-09-09",
      "date": "2025-09-09",
      "title": "I was thorn for buy insurance at school and it was a",
      "atmosphere": "academic residue",
      "text": "I had a dream that I was thorn for buy insurance at school and it was annoying to try to get cheap insurance",
      "excerpt": "I had a dream that I was thorn for buy insurance at school and it was annoying to try to get cheap insurance",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse06",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse06"
    },
    {
      "id": "dfse07",
      "ordinal": 6,
      "dateLabel": "2025-09-09",
      "date": "2025-09-09",
      "title": "Many things. I dealt that schools tatted but asshien",
      "atmosphere": "academic residue",
      "text": "I dreamt of many things. I dealt that schools tatted but asshienktns are on schoology again  and I was worried I submitted late.",
      "excerpt": "I dreamt of many things. I dealt that schools tatted but asshienktns are on schoology again and I was worried I submitted late.",
      "interpretation": "Motifs observed: parallel school. Night fragment from the compilation note.",
      "symbols": [],
      "places": [
        {
          "id": "parallel-school",
          "label": "parallel school"
        }
      ],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse07",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse07"
    },
    {
      "id": "dfse08",
      "ordinal": 7,
      "dateLabel": "2025-09-09",
      "date": "2025-09-09",
      "title": "Dancing gnarly with a bunch of little kids",
      "atmosphere": "drifting recall",
      "text": "I dreamt of dancing gnarly with a bunch of little kids.",
      "excerpt": "I dreamt of dancing gnarly with a bunch of little kids.",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "children",
          "label": "children"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse08",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse08"
    },
    {
      "id": "dfse09",
      "ordinal": 8,
      "dateLabel": "2025-09-09",
      "date": "2025-09-09",
      "title": "A past that was similar but somehow kind of differen",
      "atmosphere": "drifting recall",
      "text": "I dreamt of a past that was similar but somehow kind of different to mine, watering flowers on a porch that was just slightly bigger than the one at town place.",
      "excerpt": "I dreamt of a past that was similar but somehow kind of different to mine, watering flowers on a porch that was just slightly bigger than…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "confusion",
          "label": "confusion"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse09",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse09"
    },
    {
      "id": "dfse10",
      "ordinal": 9,
      "dateLabel": "2025-09-10",
      "date": "2025-09-10",
      "title": "I was talking to this guy about games and all the ne",
      "atmosphere": "playful staging",
      "text": "Dreamt that I was talking to this guy about games and all the new feature updates and he was actually gonna play love and deep space to do feature testing and also I was playing love and deep space and some other card games that included exo members and seventeen members kind of like 橙光games that I used to play when o was younger",
      "excerpt": "Dreamt that I was talking to this guy about games and all the new feature updates and he was actually gonna play love and deep space to do…",
      "interpretation": "Motifs observed: concert, concert / stage. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "concert",
          "label": "concert"
        }
      ],
      "places": [
        {
          "id": "concert-stage",
          "label": "concert / stage"
        }
      ],
      "people": [
        {
          "id": "idol",
          "label": "idol / performer"
        }
      ],
      "emotions": [
        {
          "id": "nostalgia",
          "label": "nostalgia"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse10",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse10"
    },
    {
      "id": "dfse11",
      "ordinal": 10,
      "dateLabel": "2025-09-12",
      "date": "2025-09-12",
      "title": "I was witnessing from third person a death investiga",
      "atmosphere": "drifting recall",
      "text": "I had a dream that I was witnessing from third person a death investigation and the girl was trying to describe the car she was driving to the person and also that the victim stole her car and ran away and then randomly it transitions to her falling from the sky and surviving by spinning in circles and throwing paint at the ground and I was dreaming of me spinning in circles slowly",
      "excerpt": "I had a dream that I was witnessing from third person a death investigation and the girl was trying to describe the car she was driving to…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse11",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse11"
    },
    {
      "id": "dfse12",
      "ordinal": 11,
      "dateLabel": "2025-09-13",
      "date": "2025-09-13",
      "title": "I was a kid? Or maybe it was another kid, and the ki",
      "atmosphere": "drifting recall",
      "text": "I had a dream that I was a kid? Or maybe it was another kid, and the kid was going through adulting tasks with me and we were figuring things out together",
      "excerpt": "I had a dream that I was a kid? Or maybe it was another kid, and the kid was going through adulting tasks with me and we were figuring…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse12",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse12"
    },
    {
      "id": "dfse13",
      "ordinal": 12,
      "dateLabel": "2025-09-14",
      "date": "2025-09-14",
      "title": "Microwaves and and ovens and where to inquire about",
      "atmosphere": "drifting recall",
      "text": "Had a very practical dream about microwaves and and ovens and where to inquire about getting one",
      "excerpt": "Had a very practical dream about microwaves and and ovens and where to inquire about getting one",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse13",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse13"
    },
    {
      "id": "dfse14",
      "ordinal": 13,
      "dateLabel": "2025-09-14",
      "date": "2025-09-14",
      "title": "This 动漫and the two main characters one is like a 美强惨",
      "atmosphere": "playful staging",
      "text": "I dream about this 动漫and the two main characters one is like a 美强惨and one is somewhat like a 没头脑similar to linkclick and the last dream j had was an episode where they go and act as lamen rider and the 美强惨would apparently only want to learn out of his eagerness to win over the other guy and I guess they want him to succeed something so that makes the 没头脑 kind of sad he is not important",
      "excerpt": "I dream about this 动漫and the two main characters one is like a 美强惨and one is somewhat like a 没头脑similar to linkclick and the last dream j…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "grief",
          "label": "grief"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse14",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse14"
    },
    {
      "id": "dfse15",
      "ordinal": 14,
      "dateLabel": "2025-09-15",
      "date": "2025-09-15",
      "title": "Mom opened some kind of dessert store and for the fi",
      "atmosphere": "family weather",
      "text": "I had a dream that mom opened some kind of dessert store and for the first time time someone showed up to our house but we were missing ingredients and we went to get it with the parent and somewhere in the middle we help her get an iPad or something and this whole time this lady’s daughter was just at our house sitting there and it took at least and hour",
      "excerpt": "I had a dream that mom opened some kind of dessert store and for the first time time someone showed up to our house but we were missing…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse15",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse15"
    },
    {
      "id": "dfse16",
      "ordinal": 15,
      "dateLabel": "2025-09-16",
      "date": "2025-09-16",
      "title": "Someone was trying to lend money from me and basical",
      "atmosphere": "drifting recall",
      "text": "I had a dream that someone was trying to lend money from me and basically I did not",
      "excerpt": "I had a dream that someone was trying to lend money from me and basically I did not",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse16",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse16"
    },
    {
      "id": "dfse17",
      "ordinal": 16,
      "dateLabel": "2025-09-17",
      "date": "2025-09-17",
      "title": "This main guy used to teach at a school but somethin",
      "atmosphere": "uneasy night",
      "text": "Had a dream that this main guy used to teach at a school but something happened during his time there and he was also somewhat involved in politics and people think he killed someone so he had to quit and went to this small town to become a 神父 and people would come to him for confessions which included this girl who was drunk while driving and may have killed someone and this boy who went for confessions and also this boy taught literature as a TA in class but he is giving his confession to get close to the 神父 just to find out if he actually killed this guy and was recording this conversations with the father.",
      "excerpt": "Had a dream that this main guy used to teach at a school but something happened during his time there and he was also somewhat involved in…",
      "interpretation": "Motifs observed: parallel school. Night fragment from the compilation note.",
      "symbols": [],
      "places": [
        {
          "id": "parallel-school",
          "label": "parallel school"
        }
      ],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [
        {
          "id": "nostalgia",
          "label": "nostalgia"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse17",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse17"
    },
    {
      "id": "dfse18",
      "ordinal": 17,
      "dateLabel": "2025-09-18",
      "date": "2025-09-18",
      "title": "Dreaming about talking to all sorts of people about",
      "atmosphere": "drifting recall",
      "text": "Dreaming about talking to all sorts of people about program requirements and stuff",
      "excerpt": "Dreaming about talking to all sorts of people about program requirements and stuff",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "curiosity",
          "label": "curiosity"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse18",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse18"
    },
    {
      "id": "dfse19",
      "ordinal": 18,
      "dateLabel": "2025-09-18",
      "date": "2025-09-18",
      "title": "There’s also a this thing called something moon flow",
      "atmosphere": "drifting recall",
      "text": "There’s also a this thing called something moon flower and it’s very expensive and hard to collect and they were talking about colllecting them and selling them in bushels",
      "excerpt": "There’s also a this thing called something moon flower and it’s very expensive and hard to collect and they were talking about colllecting…",
      "interpretation": "Motifs observed: light, flowers. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "light",
          "label": "light"
        },
        {
          "id": "flowers",
          "label": "flowers"
        }
      ],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse19",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse19"
    },
    {
      "id": "dfse20",
      "ordinal": 19,
      "dateLabel": "2025-09-18",
      "date": "2025-09-18",
      "title": "Mom and dad. Mom as trying to get info out of me abo",
      "atmosphere": "academic residue",
      "text": "I dreamed of mom and dad. Mom as trying to get info out of me about my boyfriend, who does not exist, asking me when I text him and all that. I was annoyed in my dreams she made me 红烧肉 and stuff, dad was in my dream too, he showed up separately, he was checking out my closet and checking my blinds and telling me to sleep early. For that second I was in first grade again and it seemed like he was telling me to sleep early for elementary school",
      "excerpt": "I dreamed of mom and dad. Mom as trying to get info out of me about my boyfriend, who does not exist, asking me when I text him and all…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse20",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse20"
    },
    {
      "id": "dfse21",
      "ordinal": 20,
      "dateLabel": "2025-09-19",
      "date": "2025-09-19",
      "title": "Was still at Stanford but lived in what looked like",
      "atmosphere": "family weather",
      "text": "had a dream I was still at Stanford but lived in what looked like a hotel and my mom was also on the hotel",
      "excerpt": "had a dream I was still at Stanford but lived in what looked like a hotel and my mom was also on the hotel",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse21",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse21"
    },
    {
      "id": "dfse22",
      "ordinal": 21,
      "dateLabel": "2025-09-22",
      "date": "2025-09-22",
      "title": "School projects and this rich guy basically brute fo",
      "atmosphere": "academic residue",
      "text": "I had a dream about school projects and this rich guy basically brute forcing his way in school finding people who are smarter and can just do the work",
      "excerpt": "I had a dream about school projects and this rich guy basically brute forcing his way in school finding people who are smarter and can just…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse22",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse22"
    },
    {
      "id": "dfse23",
      "ordinal": 22,
      "dateLabel": "2025-09-23",
      "date": "2025-09-23",
      "title": "Proofs but it was really practical proofs, something",
      "atmosphere": "academic residue",
      "text": "I had a dream about proofs but it was really practical proofs, something to do with the rules of traffic and how you have to continuously and recursively travel in a certain aidrection and I was really frustrated",
      "excerpt": "I had a dream about proofs but it was really practical proofs, something to do with the rules of traffic and how you have to continuously…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse23",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse23"
    },
    {
      "id": "dfse24",
      "ordinal": 23,
      "dateLabel": "2025-09-23",
      "date": "2025-09-23",
      "title": "We hosted a birthday party for friend’s brother outs",
      "atmosphere": "light buoyancy",
      "text": "I had a dream we hosted a birthday party for [friend]’s brother outside her house and it was a surprise party where we had signs and everything and her brother showed up in a scouter with music and it was all fun and he wanted a new game set",
      "excerpt": "I had a dream we hosted a birthday party for [friend]’s brother outside her house and it was a surprise party where we had signs and…",
      "interpretation": "Motifs observed: music. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        }
      ],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse24",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse24"
    },
    {
      "id": "dfse25",
      "ordinal": 24,
      "dateLabel": "2025-09-24",
      "date": "2025-09-24",
      "title": "The renaissance game, I don’t think it’s the first t",
      "atmosphere": "playful staging",
      "text": "I dreamed of the renaissance game,  I don’t think it’s the first time now. Idk why I call it that but it it’s my version of an airplane based history simulation game where the idea of it is for people who are bored on a plane but it requires a lot of space so idk how it worked out. Basically people don’t have to sign a waiver and they are volunteered in. It’s like a rollercoaster ride but halfway through the ground disappears and they start flying (like those spinny rides) over scenery.",
      "excerpt": "I dreamed of the renaissance game, I don’t think it’s the first time now. Idk why I call it that but it it’s my version of an airplane…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse25",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse25"
    },
    {
      "id": "dfse26",
      "ordinal": 25,
      "dateLabel": "2025-09-24",
      "date": "2025-09-24",
      "title": "I went with my grandma and she liked it a lot and we",
      "atmosphere": "uneasy night",
      "text": "I dreamed that I went with my grandma and she liked it a lot and we rod together. One lady got so surprised that the ground fell away and fell off. There is a tour description of the things happening in history, and actors and actresses that are acting them out. As the ground fall away there is a part of the acting where they tell you that “your child died” and it goes into acting from there on. And then it’s all sorts of singing the different national anthems and actors as different famous people including trump. I was singing the national anthem. Grandma was really happy and carefree but she spoke English lol. I think it’s my imagination of it’s a small world performed in the air and with a lot of sentimentality",
      "excerpt": "I dreamed that I went with my grandma and she liked it a lot and we rod together. One lady got so surprised that the ground fell away and…",
      "interpretation": "Motifs observed: music. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "grandparent",
          "label": "grandparent"
        },
        {
          "id": "children",
          "label": "children"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse26",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse26"
    },
    {
      "id": "dfse27",
      "ordinal": 26,
      "dateLabel": "2025-09-25",
      "date": "2025-09-25",
      "title": "Some oc character names mini seven (57) who is like",
      "atmosphere": "drifting recall",
      "text": "I had a dream of some oc character names mini seven (57) who is like a tall girl in a black and white maid-like dress.",
      "excerpt": "I had a dream of some oc character names mini seven (57) who is like a tall girl in a black and white maid-like dress.",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse27",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse27"
    },
    {
      "id": "dfse28",
      "ordinal": 27,
      "dateLabel": "2025-09-25",
      "date": "2025-09-25",
      "title": "The design of pins and how they are so centered and",
      "atmosphere": "drifting recall",
      "text": "I believe there was also another dream about the design of pins and how they are so centered and over contrasted or something like that",
      "excerpt": "I believe there was also another dream about the design of pins and how they are so centered and over contrasted or something like that",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse28",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse28"
    },
    {
      "id": "dfse29",
      "ordinal": 28,
      "dateLabel": "2025-09-28",
      "date": "2025-09-28",
      "title": "A musical formed by mathematical combinations of ano",
      "atmosphere": "playful staging",
      "text": "I had a dream of a musical formed by mathematical combinations of another musical",
      "excerpt": "I had a dream of a musical formed by mathematical combinations of another musical",
      "interpretation": "Motifs observed: music. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        }
      ],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse29",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse29"
    },
    {
      "id": "dfse30",
      "ordinal": 29,
      "dateLabel": "2025-09-28",
      "date": "2025-09-28",
      "title": "I asked to date this guy who seemed cute and asked h",
      "atmosphere": "light buoyancy",
      "text": "I had another dream that I asked to date this guy who seemed cute and asked him to be my bf and it was quite cute and all but I don’t think I share any classes with him so I also had to figure out how to learn more about this guy",
      "excerpt": "I had another dream that I asked to date this guy who seemed cute and asked him to be my bf and it was quite cute and all but I don’t think…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse30",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse30"
    },
    {
      "id": "dfse31",
      "ordinal": 30,
      "dateLabel": "2025-09-30",
      "date": "2025-09-30",
      "title": "People basically wrote proofs and then to prove that",
      "atmosphere": "academic residue",
      "text": "I had a dream that people basically wrote proofs and then to prove that you write the proof because I guess it’s like a community forum online where the first one is written, you have to write conditions that other people don’t known about your proof or something like that",
      "excerpt": "I had a dream that people basically wrote proofs and then to prove that you write the proof because I guess it’s like a community forum…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse31",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse31"
    },
    {
      "id": "dfse32",
      "ordinal": 31,
      "dateLabel": "2025-10-01",
      "date": "2025-10-01",
      "title": "Was in Italy because friend was in my dream and I ha",
      "atmosphere": "drifting recall",
      "text": "Had a dream I was in Italy because [friend] was in my dream and I had plans but he alked into target to get a book and they had a pet store and were speaking in english and the pet store had owls called kojonnovo owls that looked like one of those big eyes dolls",
      "excerpt": "Had a dream I was in Italy because [friend] was in my dream and I had plans but he alked into target to get a book and they had a pet store…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse32",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse32"
    },
    {
      "id": "dfse33",
      "ordinal": 32,
      "dateLabel": "2025-10-04",
      "date": "2025-10-04",
      "title": "There was this nice cheap market that sold tiny carp",
      "atmosphere": "light buoyancy",
      "text": "There was this nice cheap market that sold tiny carpet tufting things and it was really cute.",
      "excerpt": "There was this nice cheap market that sold tiny carpet tufting things and it was really cute.",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse33",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse33"
    },
    {
      "id": "dfse34",
      "ordinal": 33,
      "dateLabel": "2025-10-04",
      "date": "2025-10-04",
      "title": "Some place that had all sorts of ethnic? Cuisines an",
      "atmosphere": "family weather",
      "text": "I also dreamed of some place that had all sorts of ethnic? Cuisines and it included medicine soup and all that and grandpa was in my dream and I was holding on to something random and didn’t know what to do and he just threw it away. He was very confident in that dtrsm",
      "excerpt": "I also dreamed of some place that had all sorts of ethnic? Cuisines and it included medicine soup and all that and grandpa was in my dream…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "grandparent",
          "label": "grandparent"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse34",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse34"
    },
    {
      "id": "dfse35",
      "ordinal": 34,
      "dateLabel": "2025-10-07",
      "date": "2025-10-07",
      "title": "Kept seeing this board game add there it looked like",
      "atmosphere": "academic residue",
      "text": "I had a dream I kept seeing this board game add there it looked like some version of a card game similar to uno and it has two Asian guys in the ad description and [friend] suggested it or something and one night [friend] and [friend]  a card game night so I bought it and we wanted to learn so I somehow asked h [friend]’s friend [friend] to join who was doing his physics homework and he said sure and I was also doing my physics he but a different class and I searched up a tuturial and I guess the tutorial says the objected of the game is to left sort by something in two separate rounds of the game",
      "excerpt": "I had a dream I kept seeing this board game add there it looked like some version of a card game similar to uno and it has two Asian guys…",
      "interpretation": "Motifs observed: parallel school. Night fragment from the compilation note.",
      "symbols": [],
      "places": [
        {
          "id": "parallel-school",
          "label": "parallel school"
        }
      ],
      "people": [],
      "emotions": [
        {
          "id": "confusion",
          "label": "confusion"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse35",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse35"
    },
    {
      "id": "dfse36",
      "ordinal": 35,
      "dateLabel": "2025-10-10",
      "date": "2025-10-10",
      "title": "Had a nightmare that when a kid died the parents die",
      "atmosphere": "uneasy night",
      "text": "Had a nightmare that when a kid died the parents died too and they staged the kids eyes to get the kid to stop crying",
      "excerpt": "Had a nightmare that when a kid died the parents died too and they staged the kids eyes to get the kid to stop crying",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "children",
          "label": "children"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse36",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse36"
    },
    {
      "id": "dfse37",
      "ordinal": 36,
      "dateLabel": "2025-10-18",
      "date": "2025-10-18",
      "title": "I was a little kid from northern Texas and I acciden",
      "atmosphere": "academic residue",
      "text": "I had a dream that I was a little kid from northern Texas and I accidentally walked onto a battle field where there were rockets and they were playing my favorite seventeen songs and I went with them inside one of these rockets and landed in Canada and my friend from Pwc was there and they started playing my favorite seventeen songs again but somehow now I’m me instead of the little Texas boy and I said I really like the song and he pulled up my Instagram stories as proof",
      "excerpt": "I had a dream that I was a little kid from northern Texas and I accidentally walked onto a battle field where there were rockets and they…",
      "interpretation": "Motifs observed: music, concert, concert / stage. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "concert",
          "label": "concert"
        }
      ],
      "places": [
        {
          "id": "concert-stage",
          "label": "concert / stage"
        }
      ],
      "people": [
        {
          "id": "idol",
          "label": "idol / performer"
        }
      ],
      "emotions": [
        {
          "id": "confusion",
          "label": "confusion"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse37",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse37"
    },
    {
      "id": "dfse38",
      "ordinal": 37,
      "dateLabel": "2025-10-18",
      "date": "2025-10-18",
      "title": "I was in vacation and saw idol making his rounds and",
      "atmosphere": "family weather",
      "text": "I dreamed that I was in vacation and saw [idol] making his rounds and my no. Has. A conversation about religion with this guy and he asks if we want a picture but my mom says no and I was sad because I wanted photo and signature but my mom ignored me even though the whole time next to here I was like “signature, signagjd",
      "excerpt": "I dreamed that I was in vacation and saw [idol] making his rounds and my no. Has. A conversation about religion with this guy and he asks…",
      "interpretation": "Motifs observed: religion. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "religion",
          "label": "religion"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "idol",
          "label": "idol / performer"
        }
      ],
      "emotions": [
        {
          "id": "grief",
          "label": "grief"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse38",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse38"
    },
    {
      "id": "dfse39",
      "ordinal": 38,
      "dateLabel": "2025-10-19",
      "date": "2025-10-19",
      "title": "A little bit of what seems like a 无限流competitive gam",
      "atmosphere": "playful staging",
      "text": "I dream a little bit of what seems like a 无限流competitive game, but the game I dream of is too easy and very cs coded. There are a set of rules for inheritance, you follow it and find where an issue is. I don’t recall what the rules are",
      "excerpt": "I dream a little bit of what seems like a 无限流competitive game, but the game I dream of is too easy and very cs coded. There are a set of…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse39",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse39"
    },
    {
      "id": "dfse40",
      "ordinal": 39,
      "dateLabel": "2025-10-19",
      "date": "2025-10-19",
      "title": "Was at like a comic con meetup thing out doors and I",
      "atmosphere": "playful staging",
      "text": "I had another dream I was at like a comic con meetup thing out doors and I was wearing a Lolita dress with a 大咪头套 and went up and 集邮a few people. [friend] and [friend] were also there but [friend] went home early and [friend] and I were deiciding where to go next and I wanted some alcohol so we were walkinf",
      "excerpt": "I had another dream I was at like a comic con meetup thing out doors and I was wearing a Lolita dress with a 大咪头套 and went up and 集邮a few…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse40",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse40"
    },
    {
      "id": "dfse41",
      "ordinal": 40,
      "dateLabel": "2025-10-21",
      "date": "2025-10-21",
      "title": "I was dreaming of Bayes rule. I also saw roommate in",
      "atmosphere": "academic residue",
      "text": "I was dreaming of Bayes rule. I also saw [roommate] in my dream, she was sick because she was waiting for her advisor professor in the rain, which she put on her social media",
      "excerpt": "I was dreaming of Bayes rule. I also saw [roommate] in my dream, she was sick because she was waiting for her advisor professor in the…",
      "interpretation": "Motifs observed: photographs, water, dorm / apartment. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "water",
          "label": "water"
        }
      ],
      "places": [
        {
          "id": "dorm",
          "label": "dorm / apartment"
        }
      ],
      "people": [
        {
          "id": "roommate",
          "label": "roommate"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse41",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse41"
    },
    {
      "id": "dfse42",
      "ordinal": 41,
      "dateLabel": "2025-10-22",
      "date": "2025-10-22",
      "title": "I was at a local farm restaurant with 姑奶奶 姑爷爷 relati",
      "atmosphere": "family weather",
      "text": "I had a dream that I was at a local farm restaurant with 姑奶奶 姑爷爷 [relative] and 叔叔阿姨 and my dad it was some sort of 串串香. I was in charge of brining some drinks from the fridge and I guess dad was 装修something at the time so in the restaurant he is talking about lights and what type of lights with 叔叔阿姨",
      "excerpt": "I had a dream that I was at a local farm restaurant with 姑奶奶 姑爷爷 [relative] and 叔叔阿姨 and my dad it was some sort of 串串香. I was in charge of…",
      "interpretation": "Motifs observed: light, drink. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "light",
          "label": "light"
        },
        {
          "id": "drink",
          "label": "drink"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse42",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse42"
    },
    {
      "id": "dfse43",
      "ordinal": 42,
      "dateLabel": "2025-10-24",
      "date": "2025-10-24",
      "title": "Was in some Pokémon club and they were hosting it on",
      "atmosphere": "playful staging",
      "text": "I dreamed I was in some Pokémon club and they were hosting it on a Wednesday afternoon and there was trivia but I didn’t know and they had Pokémon merch prizes. I was inspired by that to make my own custom made puzzles.",
      "excerpt": "I dreamed I was in some Pokémon club and they were hosting it on a Wednesday afternoon and there was trivia but I didn’t know and they had…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse43",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse43"
    },
    {
      "id": "dfse44",
      "ordinal": 43,
      "dateLabel": "2025-10-24",
      "date": "2025-10-24",
      "title": "Was entering my first day into school in some countr",
      "atmosphere": "academic residue",
      "text": "Then I dreamed I was entering my first day into school in some country that made me wear my own suit the first day and pay for a folder with my own info and also wake up really early",
      "excerpt": "Then I dreamed I was entering my first day into school in some country that made me wear my own suit the first day and pay for a folder…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse44",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse44"
    },
    {
      "id": "dfse45",
      "ordinal": 44,
      "dateLabel": "2025-10-25",
      "date": "2025-10-25",
      "title": "我梦到带friend去天津旅游然后躺了几天后来就是想着一只出去吃东西 她喜欢吃椰子我准备给他买个椰子蛋叶",
      "atmosphere": "drifting recall",
      "text": "我梦到带[friend]去天津旅游然后躺了几天后来就是想着一只出去吃东西 她喜欢吃椰子我准备给他买个椰子蛋叶子卖完了店家给我们他们剩下的培根免费 然后他把培根吃了",
      "excerpt": "我梦到带[friend]去天津旅游然后躺了几天后来就是想着一只出去吃东西 她喜欢吃椰子我准备给他买个椰子蛋叶子卖完了店家给我们他们剩下的培根免费 然后他把培根吃了",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse45",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse45"
    },
    {
      "id": "dfse46",
      "ordinal": 45,
      "dateLabel": "2025-11-04",
      "date": "2025-11-04",
      "title": "Was dreaming about music and it was about how these",
      "atmosphere": "drifting recall",
      "text": "Was dreaming about music and it was about how these two Shanghainese men from different generations became friends over cross dressing and they are trying to capture why Shanghai is such a free place and what are art forms normal people can feel free in and they also talked about music and there was this one song they were talking about where a girl who never rapped before was invited to try rap",
      "excerpt": "Was dreaming about music and it was about how these two Shanghainese men from different generations became friends over cross dressing and…",
      "interpretation": "Motifs observed: music. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        }
      ],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "curiosity",
          "label": "curiosity"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse46",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse46"
    },
    {
      "id": "dfse47",
      "ordinal": 46,
      "dateLabel": "2025-11-05",
      "date": "2025-11-05",
      "title": "I am running some sort of race but the first day it",
      "atmosphere": "family weather",
      "text": "i had a dream that i am running some sort of race but the first day it was raining and i have to run the second day and my dad was there and he found a dog who looked a bit scrappy and said now we have a dog",
      "excerpt": "i had a dream that i am running some sort of race but the first day it was raining and i have to run the second day and my dad was there…",
      "interpretation": "Motifs observed: animals. Night fragment from the compilation note.",
      "symbols": [
        {
          "id": "animals",
          "label": "animals"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse47",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse47"
    },
    {
      "id": "dfse48",
      "ordinal": 47,
      "dateLabel": "2025-11-10",
      "date": "2025-11-10",
      "title": "I was a Disney princess actress and I was rapunzel b",
      "atmosphere": "light buoyancy",
      "text": "I had a dream that I was a Disney princess actress and I was rapunzel because I could swing across the room and back onto the platform and it was fun.",
      "excerpt": "I had a dream that I was a Disney princess actress and I was rapunzel because I could swing across the room and back onto the platform and…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse48",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse48"
    },
    {
      "id": "dfse49",
      "ordinal": 48,
      "dateLabel": "2025-11-10",
      "date": "2025-11-10",
      "title": "I also had fancy outfit to make videos in",
      "atmosphere": "drifting recall",
      "text": "I also had fancy outfit to make videos in",
      "excerpt": "I also had fancy outfit to make videos in",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse49",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse49"
    },
    {
      "id": "dfse50",
      "ordinal": 49,
      "dateLabel": "2025-11-12",
      "date": "2025-11-12",
      "title": "梦见我在写喜剧稿子",
      "atmosphere": "drifting recall",
      "text": "梦见我在写喜剧稿子",
      "excerpt": "梦见我在写喜剧稿子",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse50",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse50"
    },
    {
      "id": "dfse51",
      "ordinal": 50,
      "dateLabel": "2025-11-12",
      "date": "2025-11-12",
      "title": "梦见发明了一个自动馋protein powder的冰淇凌scoop that mixes the cho",
      "atmosphere": "drifting recall",
      "text": "梦见发明了一个自动馋protein powder的冰淇凌scoop that mixes the chocolate with the powder in a scoop and it kind of looks like those people who freeze mixed cofee balls and looks very creamy with protein and you can just take one out and it looks like it tastes very good. The spoon has a button that moves the middle kind of like a treadmill and it has little small\nBlades that carries things forward so it’s an automatic scooped",
      "excerpt": "梦见发明了一个自动馋protein powder的冰淇凌scoop that mixes the chocolate with the powder in a scoop and it kind of looks like those people who freeze…",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse51",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse51"
    },
    {
      "id": "dfse52",
      "ordinal": 51,
      "dateLabel": "2025-11-12",
      "date": "2025-11-12",
      "title": "我是个毒贩 你居然敢走毒？ 不是 是写这个的人让我说的 她又没让你走毒 不是哥们你油盐不进啊 Idk t",
      "atmosphere": "uneasy night",
      "text": "我是个毒贩\n你居然敢走毒？\n不是 是写这个的人让我说的\n她又没让你走毒\n不是哥们你油盐不进啊\nIdk this sounded more funny in my dream",
      "excerpt": "我是个毒贩 你居然敢走毒？ 不是 是写这个的人让我说的 她又没让你走毒 不是哥们你油盐不进啊 Idk this sounded more funny in my dream",
      "interpretation": "Motifs observed: sparse imagery. Night fragment from the compilation note.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        }
      ],
      "source": "dreams-from-somewhere-else",
      "notesId": "dfse52",
      "dateSource": "source.in_text_date",
      "dateProvenance": "in_text_dated_compilation",
      "archiveId": "dfse52"
    },
    {
      "id": "1720",
      "ordinal": 52,
      "dateLabel": "2025-11-16",
      "date": "2025-11-16",
      "title": "Cats in cages",
      "atmosphere": "domestic inquiry",
      "text": "I had a dream where I was asking my , who apparently had 3 cats now, if her cats finally got used to being in cages because you need to take them in vets on cages and I think in my dream she posted on social media. She said no but they re betting better. Something something I also dreamed about someone talking about how music is all about the listener and that as an art form the youth and acceptance of the audience is really important ib;",
      "excerpt": "I ask whether the cats have finally gotten used to cages—the ones you need for the vet.",
      "interpretation": "Care appears as adaptation to constraint. A second strand treats music as an art form measured by whether youth will accept the listener.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "animals",
          "label": "animals"
        }
      ],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "nostalgia",
          "label": "nostalgia"
        }
      ],
      "source": "notes",
      "notesId": "1720",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1720"
    },
    {
      "id": "1742",
      "ordinal": 53,
      "dateLabel": "2025-12-11",
      "date": "2025-12-11",
      "title": "Two named dogs",
      "atmosphere": "tender inventory",
      "text": "I had a dream I have two dogs, one named [dog] and done named [dog], [dog] is a small skinny dog and [dog] is a bigger sig eDQ.6A~",
      "excerpt": "Two dogs: [dog] small and skinny, [dog] larger—named, sized, kept.",
      "interpretation": "Companionship is itemized by body and name. The dream barely elaborates; naming is enough.",
      "symbols": [
        {
          "id": "animals",
          "label": "animals"
        }
      ],
      "places": [],
      "people": [],
      "emotions": [],
      "source": "notes",
      "notesId": "1742",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1742"
    },
    {
      "id": "1747",
      "ordinal": 54,
      "dateLabel": "2025-12-16",
      "date": "2025-12-16",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "title": "Florence reunion",
      "atmosphere": "proof and nostalgia",
      "text": "I dream is as studying abroad in Florence again, except now these are all the people I’ve known in my life. Actually I think these are people that went th year afer me, and I meet them at the end of their study abroad. [friend] jokingly proposes to [friend]. There was that one girl from UIUC who I did not like very much back in high school. There are people from elementary school. The timeline made little sense in my dream, it fasts forward- people get rich. It goes back, I see pictures of myself in Florence that don’t actually exist. My old English teacher from elementary school was there. I think I must be obsessed with being successful, somehow these are people I want to prove that I could be successful.",
      "excerpt": "Study abroad in Florence again—except now everyone I have ever known is there.",
      "interpretation": "The dream collapses timelines so every peer becomes a witness. Success is staged as reunion; photographs that do not exist still demand to be proven.",
      "symbols": [
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "parallel-self",
          "label": "parallel self"
        }
      ],
      "places": [
        {
          "id": "florence",
          "label": "Florence"
        }
      ],
      "people": [
        {
          "id": "friend",
          "label": "friend"
        },
        {
          "id": "teacher",
          "label": "teacher"
        }
      ],
      "emotions": [
        {
          "id": "urgency",
          "label": "urgency"
        },
        {
          "id": "nostalgia",
          "label": "nostalgia"
        }
      ],
      "source": "notes",
      "notesId": "1747",
      "archiveId": "1747"
    },
    {
      "id": "1749",
      "ordinal": 55,
      "dateLabel": "2025-12-19",
      "date": "2025-12-19",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "title": "Language among idols",
      "atmosphere": "comic incomprehension",
      "text": "我梦见我在一个什么地方听课然后我问[idol]一个问题他回了一个答案我转头看我旁边的[idol]说他那个字怎么写（我忘了什么成语反正有个心有个热闹的闹）的他说你听讲 然后谁接了一句完了我们这里除了两个文盲后来好像[idol]给我用英文解释了一下 [idol]又哑火了表示没有听懂。旁边谁说了一句到底有没有语言可以完全的表达这个沟通 我说这个什么语言都没有用主要是有的人他什么语言都没学会。",
      "excerpt": "In class I ask [idol] a question; beside me [idol] asks how to write a character—and no language can finish the joke.",
      "interpretation": "Idols fill a classroom where literacy fails. The dream treats communication as a shared embarrassment: vocabulary cannot bridge who never learned the language of the room.",
      "symbols": [
        {
          "id": "language",
          "label": "language"
        }
      ],
      "places": [
        {
          "id": "classroom",
          "label": "classroom"
        }
      ],
      "people": [
        {
          "id": "idol",
          "label": "idol"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        },
        {
          "id": "confusion",
          "label": "confusion"
        }
      ],
      "source": "notes",
      "notesId": "1749",
      "archiveId": "1749"
    },
    {
      "id": "1762",
      "ordinal": 56,
      "dateLabel": "2025-12-27",
      "date": "2025-12-27",
      "title": "Watermelon neighbor",
      "atmosphere": "parallel childhood",
      "text": "I had a dream maybe in Some parallel universe I have a verge old friend who used to live next door and we did everything together. We would play ball and eat watermelon and I liked watching stars and one day we were watching the stars she left and never came back and we never saw for a long time and I found her contact later in the years and held a grudge that she never found me and one day I found her later and invited her to my house to sit and my mom jokingly asks so who was the one who liked watching stars as a kid. She said it was me and she only watched stars because I liked it and she left because she realized she had fallen in love with me. I broke out in tears and I realized something clicked in me and all the grudge I had been holding disappeared and I hugged her very tightly. I had felt lost and searching randomly in life and I let hobbies come by me but I could never feel as if I was watching stars as a kid again",
      "excerpt": "A verge-old friend next door—ball, watermelon, stars—leaves and never comes back.",
      "interpretation": "A parallel-universe friendship ends in disappearance and grudge. Reunion at home is mediated by a mother’s joke about who liked whom.",
      "symbols": [
        {
          "id": "parallel-self",
          "label": "parallel self"
        },
        {
          "id": "water",
          "label": "water"
        },
        {
          "id": "stars",
          "label": "stars"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "childhood-friend",
          "label": "childhood friend"
        }
      ],
      "emotions": [
        {
          "id": "nostalgia",
          "label": "nostalgia"
        }
      ],
      "source": "notes",
      "notesId": "1762",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1762"
    },
    {
      "id": "1765",
      "ordinal": 57,
      "dateLabel": "2026-01-02",
      "date": "2026-01-02",
      "title": "Grandpa well again",
      "atmosphere": "restored embrace",
      "text": "Had a dream grandpa was well again and he is wearing cosplay with grandma and I hugged grandpa and grandma and in the picture grandpa is in a red suit and grandma in a brown suit and I think geandpa was a comedic actor and we fall over onto and he still looks as that we fall over onto him Had another dream I was part of northwestern club and I had to attend and event that had parents and also students in part of the comedy clubs and [clubmate] from solar asked me if I wanted for age but I was wedged int ehsbwat if whatever I was running in and I hit the table of the end point and fell over. For some reason I think [classmate] s dad was at the event and in running I passed by a white guy in a purple outfit. The event starts with different clubs of people talking and it started with the people, then some sort of club in fancy outfits and then it was and someone else and it was funny because he was acting as a couple and I think his mom was there and he goes and he has to wave at the table in our direction .and then idk what club it is performs and I was like oh that guy is cute",
      "excerpt": "Grandpa is well again in cosplay with grandma—red suit, brown suit—I hug them both.",
      "interpretation": "Illness reverses into costume and comedy. A second strand seats the dreamer in a campus comedy club among parents and students.",
      "symbols": [
        {
          "id": "clothing",
          "label": "clothing"
        }
      ],
      "places": [
        {
          "id": "comedy-club",
          "label": "comedy club"
        }
      ],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "grandparent",
          "label": "grandparent"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        },
        {
          "id": "urgency",
          "label": "urgency"
        }
      ],
      "source": "notes",
      "notesId": "1765",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1765"
    },
    {
      "id": "1770",
      "ordinal": 58,
      "dateLabel": "2026-01-07",
      "date": "2026-01-07",
      "title": "BL mashup",
      "atmosphere": "narrative collage",
      "text": "Dreaming about BL plot lines and somehow I think the main guy is and it s like a mashup of different tropes and one of them he was a",
      "excerpt": "BL plot lines mash into tropes; the main figure keeps shifting roles.",
      "interpretation": "Story logic becomes a collage of romance tropes—the dream watches genre assemble itself.",
      "symbols": [],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "curiosity",
          "label": "curiosity"
        },
        {
          "id": "confusion",
          "label": "confusion"
        }
      ],
      "source": "notes",
      "notesId": "1770",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1770"
    },
    {
      "id": "1772",
      "ordinal": 59,
      "dateLabel": "2026-01-12",
      "date": "2026-01-12",
      "title": "Editor's song",
      "atmosphere": "serious comedy",
      "text": "Had a dream from the point of view of an editor and apparently like you have to put the information of whatever song you use directly in the song or something so it s kind of funny in a very serious situation you hear a song and all the subtext is there and then lykn s charm is stuck in my head so that part with Lego spinning is the song in the is dream lol .",
      "excerpt": "In a very serious situation you hear a song—and all the subtext is already inside it.",
      "interpretation": "Metadata appears as audible content: song information must live inside the music itself, collapsing documentation into performance.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "metadata",
          "label": "metadata"
        }
      ],
      "places": [
        {
          "id": "editorial-space",
          "label": "editorial space"
        }
      ],
      "people": [
        {
          "id": "editor",
          "label": "editor"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        },
        {
          "id": "unease",
          "label": "unease"
        }
      ],
      "source": "notes",
      "notesId": "1772",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1772"
    },
    {
      "id": "1774",
      "ordinal": 60,
      "dateLabel": "2026-01-16",
      "date": "2026-01-16",
      "title": "Roommate packing",
      "atmosphere": "exam anxiety",
      "text": "I had a dream I live in a dorm that looks kind of like an apartment and I live with the same roommate [roommate] and I wake up because I didn t close my door and I hear some noise and I see her packing her luggage s because I guess she doesn t have exams and I have sxams",
      "excerpt": "Dorm door left open—I wake to my roommate packing luggage; she has no exams, I do.",
      "interpretation": "Asymmetry of obligation: one person leaves; the other remains inside the testing calendar.",
      "symbols": [
        {
          "id": "graduation",
          "label": "graduation"
        },
        {
          "id": "luggage",
          "label": "luggage"
        }
      ],
      "places": [
        {
          "id": "dorm",
          "label": "dorm / apartment"
        }
      ],
      "people": [
        {
          "id": "roommate",
          "label": "roommate"
        }
      ],
      "emotions": [],
      "source": "notes",
      "notesId": "1774",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "1774"
    },
    {
      "id": "2200",
      "ordinal": 61,
      "dateLabel": "2026-01-22",
      "date": "2026-01-22",
      "title": "California mountains",
      "atmosphere": "vivid custody",
      "text": "I dreamed I lived in the mountains of California and everything was so beautifully vibrant and colorful and I was at some rich friends house and probably friends of my parents and they had cows and I took pictures of cows and they had dogs and I took pictures of them too. I think I had powers to take nightmares off of people but I return when I sleep at night I must ward off the bad spirits and I look in the mirror I would be speaking and it is not what I am saying and I must stare at the mirror in order for me to stop saying by different things and for them to go away. The next day a little bit of that remains and I look at a dog with a little jacket and it looked like it was going to stand up and talk but when I look longer at it it just is a normal dog. I go on a school bus of some sort and outside it is so pretty and I show people the beautiful pictures I took of the dogs with my cameras. Mom talks about some kid who needed a laptop for work and I suggested something and I said something about how you cannot get a super cheap camera for school. Then I reach school and I find a seat and sit down and it was a really cool looking project class with big wooden tables and some of the people look like classmates I had in middle school",
      "excerpt": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror.",
      "interpretation": "Pastoral abundance flips into night duty. The mirror speaks with a voice that is not the dreamer’s; care for others’ nightmares becomes a private ordeal.",
      "symbols": [
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "gods",
          "label": "gods"
        },
        {
          "id": "animals",
          "label": "animals"
        },
        {
          "id": "mirror",
          "label": "mirror"
        },
        {
          "id": "bus",
          "label": "bus"
        }
      ],
      "places": [
        {
          "id": "parallel-school",
          "label": "parallel school"
        },
        {
          "id": "california-mountains",
          "label": "california mountains"
        }
      ],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [
        {
          "id": "awe",
          "label": "awe"
        }
      ],
      "source": "notes",
      "notesId": "2200",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2200"
    },
    {
      "id": "2249",
      "ordinal": 62,
      "dateLabel": "2026-02-10",
      "date": "2026-02-10",
      "title": "Fox and bingo rock",
      "atmosphere": "classroom injustice",
      "text": "Had a dream in a class where they give you a fox and I have this shiny golden green rock and they have numbers on it and the goal is when they list out a bunch of numbers you name the ones that are on your rock kind of like bingo and this really mean teacher when he got to me said that can t be right you cheated by writing more numbers and threw my rock away and I was sad and I walked out on him standing in the rain and across the street I see my grandpa and he recognizes me kind of like when I was a kid and walks toward me. There was then some sort of a revenge story on this kind of mean guy and somehow the people involved include ppw and it read like a novel that i was involved in Isn t it odd my dreams have more emotions now? I cry and get mad in them, I used to not feel things or be rage baited in dreams",
      "excerpt": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away.",
      "interpretation": "Rules become accusation. Rain and a grandfather across the street restore recognition after public shame.",
      "symbols": [
        {
          "id": "water",
          "label": "water"
        },
        {
          "id": "animals",
          "label": "animals"
        },
        {
          "id": "fox-spirit",
          "label": "fox spirit"
        }
      ],
      "places": [
        {
          "id": "parallel-school",
          "label": "parallel school"
        }
      ],
      "people": [
        {
          "id": "grandparent",
          "label": "grandparent"
        },
        {
          "id": "teacher",
          "label": "teacher"
        }
      ],
      "emotions": [
        {
          "id": "unease",
          "label": "unease"
        },
        {
          "id": "nostalgia",
          "label": "nostalgia"
        },
        {
          "id": "confusion",
          "label": "confusion"
        },
        {
          "id": "grief",
          "label": "grief"
        },
        {
          "id": "shame",
          "label": "shame"
        }
      ],
      "source": "notes",
      "notesId": "2249",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2249"
    },
    {
      "id": "2252",
      "ordinal": 63,
      "dateLabel": "2026-02-16",
      "date": "2026-02-16",
      "title": "Animals close up",
      "atmosphere": "fragile happiness",
      "text": "Had a dream that I as seeing animals really close up and it made me happy and I took cute pictures of penguins breaking the ice and there are rhinos that look like humans and then are holding peace signs and I posted on my social media saying absurdism popped of today. I tell me mom that looking at the animals make me happy and she holds my hand. She tells me about talking to our grandparents and making the pray and how they re getting better. I know in my heart they are not really getting better",
      "excerpt": "Penguins break ice; rhinos hold peace signs—I tell mom looking at animals makes me happy.",
      "interpretation": "Joy is immediate and photographic. A parent’s prayer for grandparents’ recovery sits beside the dreamer’s private knowledge that they are not really getting better.",
      "symbols": [
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "animals",
          "label": "animals"
        },
        {
          "id": "religion",
          "label": "religion"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "grandparent",
          "label": "grandparent"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        },
        {
          "id": "grief",
          "label": "grief"
        }
      ],
      "source": "notes",
      "notesId": "2252",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2252"
    },
    {
      "id": "2263",
      "ordinal": 64,
      "dateLabel": "2026-02-22",
      "date": "2026-02-22",
      "title": "Twin daughters",
      "atmosphere": "impossible kinship",
      "text": "I had a dream that I had twin daughters with my dad and it is a very weird dream but the kids are very cute. Halfway through the dream I was like is that not incest? That would mean the kids would be extremely disabled. During the dream they said one of the kids would need a wheelchair for the rest of their lives, which I accepted. They were twin girls with little bobs and turns out they were fine, which made no sense to me but they were very smiley and happy",
      "excerpt": "Twin girls with little bobs—mid-dream the logic of kinship collapses, then they are simply happy.",
      "interpretation": "The dream stages an impossible family structure, interrupts itself with ethical alarm, then returns to the children’s smiles as if the contradiction could be lived with.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "children",
          "label": "children"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        },
        {
          "id": "unease",
          "label": "unease"
        },
        {
          "id": "confusion",
          "label": "confusion"
        },
        {
          "id": "acceptance",
          "label": "acceptance"
        }
      ],
      "source": "notes",
      "notesId": "2263",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2263"
    },
    {
      "id": "2269",
      "ordinal": 65,
      "dateLabel": "2026-02-27",
      "date": "2026-02-27",
      "title": "Lotus incense plaza",
      "atmosphere": "curated desire",
      "text": "I dreamed I was shopping and there s this type of artificial flower that blossoms really pretty and it looks like a lotus and releases smell like incense. The shopping plaza also had cool things like bags shaped like torso and they have cool past designs that are like torso bags with different clothing styles btt ur apparently they are known for their crocodile skin shiny designs but whoever i was shopping with said that it was not as good as their past year designs. There was alsp this shop that looked like sanfu ish and it was bare bear branding and i walked in and saw WilliamEst Wesley merch and needed to get some lol. Also mom appeared in my dream driving and i think she was talking me shopping or something",
      "excerpt": "Artificial lotuses release incense; torso-shaped bags with past-year designs outshine this season’s crocodile shine.",
      "interpretation": "Shopping becomes a museum of surfaces. Taste is comparative—what was better last year haunts what is for sale now.",
      "symbols": [
        {
          "id": "clothing",
          "label": "clothing"
        },
        {
          "id": "flowers",
          "label": "flowers"
        }
      ],
      "places": [
        {
          "id": "shopping-plaza",
          "label": "shopping plaza"
        }
      ],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        }
      ],
      "source": "notes",
      "notesId": "2269",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2269"
    },
    {
      "id": "2271",
      "ordinal": 66,
      "dateLabel": "2026-03-03",
      "date": "2026-03-03",
      "title": "Parallel graduation",
      "atmosphere": "tender displacement",
      "text": "I had a dream that I graduated from The same schools in a patrolled universe but somehow I have slightly different geaduation photos and different songs playingin the background/ mom sends me a video of my talking and the tone pitch is higher than I remember having as a kid. I have more pictures from middle school graduation. I look slightly happier. I m in a trip with mom somewhere sunny that starts with a S that s for women and they play music. Mom still complains I used to be a more lovely child. Maybe in a parallel universe I d still be the same",
      "excerpt": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows.",
      "interpretation": "Graduation recurs as a fork in continuity—images and pitch mark a self that is almost the same, almost happier, still accountable to a parent’s complaint.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "graduation",
          "label": "graduation"
        },
        {
          "id": "parallel-self",
          "label": "parallel self"
        },
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "pitch",
          "label": "pitch"
        }
      ],
      "places": [
        {
          "id": "parallel-school",
          "label": "parallel school"
        },
        {
          "id": "sunny-trip",
          "label": "sunny trip"
        }
      ],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "children",
          "label": "children"
        }
      ],
      "emotions": [
        {
          "id": "nostalgia",
          "label": "nostalgia"
        },
        {
          "id": "confusion",
          "label": "confusion"
        },
        {
          "id": "shame",
          "label": "shame"
        }
      ],
      "source": "notes",
      "notesId": "2271",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2271"
    },
    {
      "id": "2273",
      "ordinal": 67,
      "dateLabel": "2026-03-06",
      "date": "2026-03-06",
      "title": "Library aquarium",
      "atmosphere": "civic unease",
      "text": "I dreamed that I was in a library that also was an aquarium that had creepy fish and also had a food court that had a Panda Express and the Panda Express worker was very mean to people",
      "excerpt": "A library that is also an aquarium, with a food court attached—and a worker unkind to everyone.",
      "interpretation": "Hybrid civic space stacks reading, display, and consumption into one building. Water and books share a roof; hostility appears at the counter.",
      "symbols": [
        {
          "id": "water",
          "label": "water"
        },
        {
          "id": "hybrid-space",
          "label": "hybrid space"
        },
        {
          "id": "food-court",
          "label": "food court"
        }
      ],
      "places": [
        {
          "id": "library-aquarium",
          "label": "library–aquarium"
        },
        {
          "id": "food-court",
          "label": "food court"
        }
      ],
      "people": [
        {
          "id": "food-worker",
          "label": "food-court worker"
        }
      ],
      "emotions": [
        {
          "id": "unease",
          "label": "unease"
        }
      ],
      "source": "notes",
      "notesId": "2273",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2273"
    },
    {
      "id": "2276",
      "ordinal": 68,
      "dateLabel": "2026-03-10",
      "date": "2026-03-10",
      "title": "Holiday drink",
      "atmosphere": "small insistence",
      "text": "I have a dream that there s a new type of and I got it and my mom was like there are so lag drinks at home and I was like I just really want this and it s the holidays, and she was like",
      "excerpt": "A new drink I really want—mom says there are already so many at home; I say it’s the holidays.",
      "interpretation": "Desire negotiates with household surplus. The holiday licenses wanting one more thing.",
      "symbols": [
        {
          "id": "drink",
          "label": "drink"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        }
      ],
      "emotions": [
        {
          "id": "desire",
          "label": "desire"
        }
      ],
      "source": "notes",
      "notesId": "2276",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2276"
    },
    {
      "id": "2277",
      "ordinal": 69,
      "dateLabel": "2026-03-12",
      "date": "2026-03-12",
      "title": "Funeral practice rooms",
      "atmosphere": "anticipatory grief",
      "text": "I had a dream where there are these office rooms that people practice the post death process of their loved ones and they sit there kind of lost and sad as their still alive a loved ones pick out what they d want others to eat at their funeral",
      "excerpt": "Office rooms where people practice the post-death process—living loved ones choose what others would eat at the funeral.",
      "interpretation": "Death is rehearsed as logistics while the loved one is still alive. Grief appears as menu selection in fluorescent rooms.",
      "symbols": [
        {
          "id": "death-ritual",
          "label": "death ritual"
        }
      ],
      "places": [
        {
          "id": "funeral-office",
          "label": "funeral office"
        }
      ],
      "people": [],
      "emotions": [
        {
          "id": "grief",
          "label": "grief"
        }
      ],
      "source": "notes",
      "notesId": "2277",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2277"
    },
    {
      "id": "2282",
      "ordinal": 70,
      "dateLabel": "2026-03-23",
      "date": "2026-03-23",
      "title": "Mom at the concert",
      "atmosphere": "fandom intimacy",
      "text": "I had a dream j brought my mom to a seventeen concert that also was like a fandom and when they started getting off from the stage to interact with everyone I high-fived with [idol] and [idol] and told [idol] you re the best and the [idol] came off and I was like and he said hi in Chinese but then he just started talking because there s a line to get back in stage and he was like this reminds me of when I took my mom to the concert and they were making bf me do tongue twisters and whatever and he got shy from laughing to he started talking to other people waiting in line but they were also people I know so I said oh they don t speak Chinese lol and he just waved it off and laughed and said something about tongue twisters and was like maybe we can do and walked away",
      "excerpt": "I bring mom to a Seventeen concert; idols leave the stage—high-fives, Chinese hello, a tongue-twister line.",
      "interpretation": "Idol proximity and parental presence overlap. A performer recalls taking his own mother; the dream mirrors care across the barrier of the stage.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "hybrid-space",
          "label": "hybrid space"
        },
        {
          "id": "concert",
          "label": "concert"
        }
      ],
      "places": [
        {
          "id": "concert-stage",
          "label": "concert / stage"
        }
      ],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "idol",
          "label": "idol / performer"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        }
      ],
      "source": "notes",
      "notesId": "2282",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2282"
    },
    {
      "id": "2301",
      "ordinal": 71,
      "dateLabel": "2026-04-14",
      "date": "2026-04-14",
      "title": "Grandpa young again",
      "atmosphere": "mourning clarity",
      "text": "I had a dream that grandpa has dimentia m. He hasn t talking to me in a long time now, but he talked to me in my dream. He was in his twenties, he remembers mom but does not remember me. He talks ago it everything technology wise being so new. He walks straight like he is still young. I cried in my dream. M\\!2Oh",
      "excerpt": "Grandpa talks—he is in his twenties, remembers mom, does not remember me. I cried in the dream.",
      "interpretation": "Dementia is rewritten as youth with selective memory. Technology feels new to him; recognition skips a generation and lands as grief.",
      "symbols": [],
      "places": [],
      "people": [
        {
          "id": "parent",
          "label": "parent"
        },
        {
          "id": "grandparent",
          "label": "grandparent"
        }
      ],
      "emotions": [
        {
          "id": "nostalgia",
          "label": "nostalgia"
        },
        {
          "id": "grief",
          "label": "grief"
        }
      ],
      "source": "notes",
      "notesId": "2301",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2301"
    },
    {
      "id": "2306",
      "ordinal": 72,
      "dateLabel": "2026-04-20",
      "date": "2026-04-20",
      "title": "Pitch and gender",
      "atmosphere": "technical focus",
      "text": "I had a dream where basically I learned that there are different musical effects between a song sang by male va female voice when you raise the key and something technical about a higher pitch distorting the words a little or something like that and I had to write a written response of four examples is songs that either when sang at a female pitch has that result or sang at a male pitch does not have that result",
      "excerpt": "Raising the key changes a song differently in a male voice than in a female one—words begin to distort.",
      "interpretation": "The dream rehearses a research task: compare gendered vocal effects under transposition, then prove it with four examples.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "pitch",
          "label": "pitch"
        }
      ],
      "places": [],
      "people": [],
      "emotions": [
        {
          "id": "curiosity",
          "label": "curiosity"
        }
      ],
      "source": "notes",
      "notesId": "2306",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2306"
    },
    {
      "id": "2311",
      "ordinal": 73,
      "dateLabel": "2026-04-22",
      "date": "2026-04-22",
      "title": "Nine-tailed fox drama",
      "atmosphere": "meta-myth",
      "text": "I had the coolest dream where I dreamed this kdrama and it is about religion and questioning and the main character is a nine tailed fox but in this setting she gains a new tail every 50 years so it keeps growing and I am not watching the show but I am at some sort of a fan view thing watching the episodes but then I am inside the episodes and at one episode there is this cool scene where they break the fourth wall and talk about all the shows out there that refer to religion and beliefs and sorcery and they stand on a square stage performing to the camera, but the camera does not move and they move around in the stage almost like they re acting out the scenes that switch one by one and it looks almost like a bboy competition where everyone is on the side lines and they come in and come out. For some reason phuwin was there and he started out with the plot of the story still and a kid acted as pperm where he messes up his dance and at that point it still faced the audience but then they turn around and face the camera and the back of the stage, then scene by scene it flies past showing the different references and the stage itself is a huge led screen and it cuts to the nine tailed fox and the very dramatic and beautiful religious music and everyone on the stage begins chanting very loudly to an almost culty speech it was beautiful",
      "excerpt": "A K-drama about religion—a nine-tailed fox gains a tail every fifty years—then breaks the fourth wall.",
      "interpretation": "The dreamer is both inside the episode and at a fan viewing. Belief systems accumulate like tails; the show discusses other shows about belief.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "interface",
          "label": "interface"
        },
        {
          "id": "concert",
          "label": "concert"
        },
        {
          "id": "animals",
          "label": "animals"
        },
        {
          "id": "fox-spirit",
          "label": "fox spirit"
        },
        {
          "id": "religion",
          "label": "religion"
        }
      ],
      "places": [
        {
          "id": "concert-stage",
          "label": "concert / stage"
        },
        {
          "id": "fan-viewing",
          "label": "fan viewing"
        }
      ],
      "people": [],
      "emotions": [
        {
          "id": "curiosity",
          "label": "curiosity"
        },
        {
          "id": "awe",
          "label": "awe"
        }
      ],
      "source": "notes",
      "notesId": "2311",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2311"
    },
    {
      "id": "2309",
      "ordinal": 74,
      "dateLabel": "2026-04-25",
      "date": "2026-04-25",
      "title": "Paused park",
      "atmosphere": "suspended curiosity",
      "text": "Had a dream Where I was somewhere with a Mickey mouse club house of sorts and it wasn t Disneyland and I was there for something else but I was like I should check that out. Everything in the amusement park was paused, like literally stopped in the air. I was walking across from somewhere, two guys in a cowboy cat were talking about stuff like stocks and houses and stuff, the houses next to them are majestic condos , and for a second I was like I d like to have one like that. I get to the clubhouse and nothing was there and it was mostly a few kids and I watching tv and there is this guy with cool glasses like the type where the screens has to be far away from the face and he was talking hilariously about how with glare he can t see something right under his face",
      "excerpt": "Everything in the amusement park was paused—literally stopped in the air.",
      "interpretation": "Process freezes mid-gesture. Talk of stocks and condos sits beside a nearly empty clubhouse where glare makes nearby things invisible.",
      "symbols": [
        {
          "id": "paused-time",
          "label": "paused time"
        },
        {
          "id": "amusement-park",
          "label": "amusement park"
        },
        {
          "id": "houses",
          "label": "houses"
        },
        {
          "id": "light",
          "label": "light"
        },
        {
          "id": "glasses",
          "label": "glasses"
        }
      ],
      "places": [
        {
          "id": "amusement-park",
          "label": "amusement park"
        }
      ],
      "people": [
        {
          "id": "cowboys",
          "label": "strangers in cowboy hats"
        },
        {
          "id": "children",
          "label": "children"
        },
        {
          "id": "glasses-man",
          "label": "man with distant glasses"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        },
        {
          "id": "curiosity",
          "label": "curiosity"
        },
        {
          "id": "awe",
          "label": "awe"
        },
        {
          "id": "desire",
          "label": "desire"
        }
      ],
      "source": "notes",
      "notesId": "2309",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2309"
    },
    {
      "id": "2328",
      "ordinal": 75,
      "dateLabel": "2026-05-04",
      "date": "2026-05-04",
      "title": "Worn-out labels",
      "atmosphere": "class observation",
      "text": "Has a dream I was looking through sweatshirts I already wore with labels that says this is worn out don t wear and it has just occurred to me that rich people never have to donate their stuff or remove them because they have all the space and they probably are able to collect everything they want to including every piece of clothing they wore if they wanted",
      "excerpt": "Sweatshirts labeled worn out—don’t wear. Rich people never have to donate; they can keep every piece.",
      "interpretation": "Clothing becomes an archive of class. Space itself is the privilege that lets nothing be discarded.",
      "symbols": [
        {
          "id": "clothing",
          "label": "clothing"
        }
      ],
      "places": [
        {
          "id": "closet-archive",
          "label": "closet archive"
        }
      ],
      "people": [],
      "emotions": [],
      "source": "notes",
      "notesId": "2328",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2328"
    },
    {
      "id": "2336",
      "ordinal": 76,
      "dateLabel": "2026-05-20",
      "date": "2026-05-20",
      "title": "Concert interface",
      "atmosphere": "mediated presence",
      "text": "was dreaming about all sorts of interactive uis for videos to the bts concert like clicking on the screen and then dirt would come off and I think it was focusing on the vibrations the concert makes and I also dreamed that [friend] was at the concert because there are visuals of her being confused",
      "excerpt": "Click the screen and dirt comes off; the interface listens for the concert’s vibrations.",
      "interpretation": "A live performance is rewritten as interactive UI. Attention splits between haptic design and a companion who appears only as a confused visual.",
      "symbols": [
        {
          "id": "music",
          "label": "music"
        },
        {
          "id": "photographs",
          "label": "photographs"
        },
        {
          "id": "interface",
          "label": "interface"
        },
        {
          "id": "concert",
          "label": "concert"
        }
      ],
      "places": [
        {
          "id": "concert-stage",
          "label": "concert / stage"
        }
      ],
      "people": [],
      "emotions": [
        {
          "id": "curiosity",
          "label": "curiosity"
        },
        {
          "id": "confusion",
          "label": "confusion"
        }
      ],
      "source": "notes",
      "notesId": "2336",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2336"
    },
    {
      "id": "2355",
      "ordinal": 77,
      "dateLabel": "2026-06-28",
      "date": "2026-06-28",
      "title": "Temple of rounds",
      "atmosphere": "mythic urgency",
      "text": "I had this dream of this beautiful premise of gods and power where basically the power comes from like this beautiful palace with energy from the sun and moon and they show up as lights in mazes in the temple and the strongest can gather life form and sometimes the most strongest show up as gods that then live longer, but they are also able to kill eachother because over time they evolve powers and stuff and the scene I dreamed is that there is this power to reverse time of some sort and this other person who is like a less powerful god has a lethal bullet that they are merging and shooting and is warning that if he shoot s it is all over and there is really cool slow mow scene of the bullets me merging and shooting over and at the very last second everything reverses and the first person goes - are you kidding you will regret this, and the second person says, you will not remember for me to regret this, and something happens but basically everything still explodes because he adds in his own powers and everyone is gone and they all show up as lights in the temple seams again and all will come another round",
      "excerpt": "At the last second everything reverses—then still explodes. Lights return to the temple seams for another round.",
      "interpretation": "Power cycles through sun-and-moon light in maze walls. Time reversal fails to prevent endings; identity resets as lights in the architecture.",
      "symbols": [
        {
          "id": "paused-time",
          "label": "paused time"
        },
        {
          "id": "gods",
          "label": "gods"
        },
        {
          "id": "light",
          "label": "light"
        },
        {
          "id": "maze",
          "label": "maze"
        },
        {
          "id": "bullet",
          "label": "lethal choice"
        },
        {
          "id": "cycle",
          "label": "cycle"
        }
      ],
      "places": [
        {
          "id": "temple-maze",
          "label": "temple maze"
        }
      ],
      "people": [
        {
          "id": "lesser-god",
          "label": "lesser god"
        },
        {
          "id": "gods",
          "label": "gods"
        }
      ],
      "emotions": [
        {
          "id": "nostalgia",
          "label": "nostalgia"
        },
        {
          "id": "awe",
          "label": "awe"
        },
        {
          "id": "urgency",
          "label": "urgency"
        },
        {
          "id": "acceptance",
          "label": "acceptance"
        }
      ],
      "source": "notes",
      "notesId": "2355",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2355"
    },
    {
      "id": "2357",
      "ordinal": 78,
      "dateLabel": "2026-06-30",
      "date": "2026-06-30",
      "title": "Traumatic marriage",
      "atmosphere": "abrupt refusal",
      "text": "I bad a dream that I married [spouse figure] and politely that is traumatic lol",
      "excerpt": "A marriage that the note itself marks as politely traumatic.",
      "interpretation": "The dream is almost only a verdict. Partnership appears as a punchline that refuses elaboration.",
      "symbols": [
        {
          "id": "marriage",
          "label": "marriage"
        }
      ],
      "places": [],
      "people": [
        {
          "id": "spouse-figure",
          "label": "spouse figure"
        }
      ],
      "emotions": [
        {
          "id": "amusement",
          "label": "amusement"
        },
        {
          "id": "unease",
          "label": "unease"
        }
      ],
      "source": "notes",
      "notesId": "2357",
      "dateSource": "notes.ZCREATIONDATE3",
      "dateProvenance": "note_creation",
      "archiveId": "2357"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "symbol:music",
        "kind": "symbol",
        "label": "music",
        "count": 12,
        "dreamIds": [
          "dfse24",
          "dfse26",
          "dfse29",
          "dfse37",
          "dfse46",
          "1720",
          "1772",
          "2271",
          "2282",
          "2306",
          "2311",
          "2336"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:photographs",
        "kind": "symbol",
        "label": "photographs",
        "count": 9,
        "dreamIds": [
          "dfse03",
          "1655",
          "dfse41",
          "1720",
          "1747",
          "2200",
          "2252",
          "2271",
          "2336"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:animals",
        "kind": "symbol",
        "label": "animals",
        "count": 7,
        "dreamIds": [
          "dfse47",
          "1720",
          "1742",
          "2200",
          "2249",
          "2252",
          "2311"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:concert",
        "kind": "symbol",
        "label": "concert",
        "count": 5,
        "dreamIds": [
          "dfse10",
          "dfse37",
          "2282",
          "2311",
          "2336"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:light",
        "kind": "symbol",
        "label": "light",
        "count": 4,
        "dreamIds": [
          "dfse19",
          "dfse42",
          "2309",
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:water",
        "kind": "symbol",
        "label": "water",
        "count": 4,
        "dreamIds": [
          "dfse41",
          "1762",
          "2249",
          "2273"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:clothing",
        "kind": "symbol",
        "label": "clothing",
        "count": 3,
        "dreamIds": [
          "1765",
          "2269",
          "2328"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:parallel-self",
        "kind": "symbol",
        "label": "parallel self",
        "count": 3,
        "dreamIds": [
          "1747",
          "1762",
          "2271"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:religion",
        "kind": "symbol",
        "label": "religion",
        "count": 3,
        "dreamIds": [
          "dfse38",
          "2252",
          "2311"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:bus",
        "kind": "symbol",
        "label": "bus",
        "count": 2,
        "dreamIds": [
          "1655",
          "2200"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:drink",
        "kind": "symbol",
        "label": "drink",
        "count": 2,
        "dreamIds": [
          "dfse42",
          "2276"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:flowers",
        "kind": "symbol",
        "label": "flowers",
        "count": 2,
        "dreamIds": [
          "dfse19",
          "2269"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:fox-spirit",
        "kind": "symbol",
        "label": "fox spirit",
        "count": 2,
        "dreamIds": [
          "2249",
          "2311"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:gods",
        "kind": "symbol",
        "label": "gods",
        "count": 2,
        "dreamIds": [
          "2200",
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:graduation",
        "kind": "symbol",
        "label": "graduation",
        "count": 2,
        "dreamIds": [
          "1774",
          "2271"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:hybrid-space",
        "kind": "symbol",
        "label": "hybrid space",
        "count": 2,
        "dreamIds": [
          "2273",
          "2282"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:interface",
        "kind": "symbol",
        "label": "interface",
        "count": 2,
        "dreamIds": [
          "2311",
          "2336"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:paused-time",
        "kind": "symbol",
        "label": "paused time",
        "count": 2,
        "dreamIds": [
          "2309",
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:pitch",
        "kind": "symbol",
        "label": "pitch",
        "count": 2,
        "dreamIds": [
          "2271",
          "2306"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:amusement-park",
        "kind": "symbol",
        "label": "amusement park",
        "count": 1,
        "dreamIds": [
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:cycle",
        "kind": "symbol",
        "label": "cycle",
        "count": 1,
        "dreamIds": [
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:death-ritual",
        "kind": "symbol",
        "label": "death ritual",
        "count": 1,
        "dreamIds": [
          "2277"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:food-court",
        "kind": "symbol",
        "label": "food court",
        "count": 1,
        "dreamIds": [
          "2273"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:glasses",
        "kind": "symbol",
        "label": "glasses",
        "count": 1,
        "dreamIds": [
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:houses",
        "kind": "symbol",
        "label": "houses",
        "count": 1,
        "dreamIds": [
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:language",
        "kind": "symbol",
        "label": "language",
        "count": 1,
        "dreamIds": [
          "1749"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:bullet",
        "kind": "symbol",
        "label": "lethal choice",
        "count": 1,
        "dreamIds": [
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:luggage",
        "kind": "symbol",
        "label": "luggage",
        "count": 1,
        "dreamIds": [
          "1774"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:marriage",
        "kind": "symbol",
        "label": "marriage",
        "count": 1,
        "dreamIds": [
          "2357"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:maze",
        "kind": "symbol",
        "label": "maze",
        "count": 1,
        "dreamIds": [
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:metadata",
        "kind": "symbol",
        "label": "metadata",
        "count": 1,
        "dreamIds": [
          "1772"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:mirror",
        "kind": "symbol",
        "label": "mirror",
        "count": 1,
        "dreamIds": [
          "2200"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "symbol:stars",
        "kind": "symbol",
        "label": "stars",
        "count": 1,
        "dreamIds": [
          "1762"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:parent",
        "kind": "person",
        "label": "parent",
        "count": 21,
        "dreamIds": [
          "dfse01",
          "dfse02",
          "1655",
          "dfse15",
          "dfse17",
          "dfse20",
          "dfse21",
          "dfse36",
          "dfse38",
          "dfse42",
          "dfse47",
          "1762",
          "1765",
          "2200",
          "2252",
          "2263",
          "2269",
          "2271",
          "2276",
          "2282",
          "2301"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:children",
        "kind": "person",
        "label": "children",
        "count": 7,
        "dreamIds": [
          "dfse03",
          "dfse08",
          "dfse26",
          "dfse36",
          "2263",
          "2271",
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:grandparent",
        "kind": "person",
        "label": "grandparent",
        "count": 7,
        "dreamIds": [
          "1655",
          "dfse26",
          "dfse34",
          "1765",
          "2249",
          "2252",
          "2301"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:idol",
        "kind": "person",
        "label": "idol / performer",
        "count": 5,
        "dreamIds": [
          "dfse10",
          "dfse37",
          "dfse38",
          "1749",
          "2282"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:teacher",
        "kind": "person",
        "label": "teacher",
        "count": 3,
        "dreamIds": [
          "dfse03",
          "1747",
          "2249"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:roommate",
        "kind": "person",
        "label": "roommate",
        "count": 2,
        "dreamIds": [
          "dfse41",
          "1774"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:childhood-friend",
        "kind": "person",
        "label": "childhood friend",
        "count": 1,
        "dreamIds": [
          "1762"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:editor",
        "kind": "person",
        "label": "editor",
        "count": 1,
        "dreamIds": [
          "1772"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:food-worker",
        "kind": "person",
        "label": "food-court worker",
        "count": 1,
        "dreamIds": [
          "2273"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:friend",
        "kind": "person",
        "label": "friend",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:gods",
        "kind": "person",
        "label": "gods",
        "count": 1,
        "dreamIds": [
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:lesser-god",
        "kind": "person",
        "label": "lesser god",
        "count": 1,
        "dreamIds": [
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:glasses-man",
        "kind": "person",
        "label": "man with distant glasses",
        "count": 1,
        "dreamIds": [
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:influencer",
        "kind": "person",
        "label": "public figure",
        "count": 1,
        "dreamIds": [
          "1655"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:spouse-figure",
        "kind": "person",
        "label": "spouse figure",
        "count": 1,
        "dreamIds": [
          "2357"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "person:cowboys",
        "kind": "person",
        "label": "strangers in cowboy hats",
        "count": 1,
        "dreamIds": [
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:parallel-school",
        "kind": "place",
        "label": "parallel school",
        "count": 6,
        "dreamIds": [
          "dfse07",
          "dfse17",
          "dfse35",
          "2200",
          "2249",
          "2271"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:concert-stage",
        "kind": "place",
        "label": "concert / stage",
        "count": 5,
        "dreamIds": [
          "dfse10",
          "dfse37",
          "2282",
          "2311",
          "2336"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:dorm",
        "kind": "place",
        "label": "dorm / apartment",
        "count": 2,
        "dreamIds": [
          "dfse41",
          "1774"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:florence",
        "kind": "place",
        "label": "Florence",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:amusement-park",
        "kind": "place",
        "label": "amusement park",
        "count": 1,
        "dreamIds": [
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:california-mountains",
        "kind": "place",
        "label": "california mountains",
        "count": 1,
        "dreamIds": [
          "2200"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:classroom",
        "kind": "place",
        "label": "classroom",
        "count": 1,
        "dreamIds": [
          "1749"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:closet-archive",
        "kind": "place",
        "label": "closet archive",
        "count": 1,
        "dreamIds": [
          "2328"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:comedy-club",
        "kind": "place",
        "label": "comedy club",
        "count": 1,
        "dreamIds": [
          "1765"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:editorial-space",
        "kind": "place",
        "label": "editorial space",
        "count": 1,
        "dreamIds": [
          "1772"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:fan-viewing",
        "kind": "place",
        "label": "fan viewing",
        "count": 1,
        "dreamIds": [
          "2311"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:food-court",
        "kind": "place",
        "label": "food court",
        "count": 1,
        "dreamIds": [
          "2273"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:funeral-office",
        "kind": "place",
        "label": "funeral office",
        "count": 1,
        "dreamIds": [
          "2277"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:library-aquarium",
        "kind": "place",
        "label": "library–aquarium",
        "count": 1,
        "dreamIds": [
          "2273"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:shopping-plaza",
        "kind": "place",
        "label": "shopping plaza",
        "count": 1,
        "dreamIds": [
          "2269"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:sunny-trip",
        "kind": "place",
        "label": "sunny trip",
        "count": 1,
        "dreamIds": [
          "2271"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:temple-maze",
        "kind": "place",
        "label": "temple maze",
        "count": 1,
        "dreamIds": [
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "place:tourist-bus",
        "kind": "place",
        "label": "tourist bus",
        "count": 1,
        "dreamIds": [
          "1655"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:amusement",
        "kind": "emotion",
        "label": "amusement",
        "count": 13,
        "dreamIds": [
          "dfse01",
          "1655",
          "dfse26",
          "dfse52",
          "1749",
          "1765",
          "1772",
          "2252",
          "2263",
          "2269",
          "2282",
          "2309",
          "2357"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:confusion",
        "kind": "emotion",
        "label": "confusion",
        "count": 10,
        "dreamIds": [
          "dfse03",
          "dfse09",
          "dfse35",
          "dfse37",
          "1749",
          "1770",
          "2249",
          "2263",
          "2271",
          "2336"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:nostalgia",
        "kind": "emotion",
        "label": "nostalgia",
        "count": 9,
        "dreamIds": [
          "dfse10",
          "dfse17",
          "1720",
          "1747",
          "1762",
          "2249",
          "2271",
          "2301",
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:curiosity",
        "kind": "emotion",
        "label": "curiosity",
        "count": 7,
        "dreamIds": [
          "dfse18",
          "dfse46",
          "1770",
          "2306",
          "2311",
          "2309",
          "2336"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:grief",
        "kind": "emotion",
        "label": "grief",
        "count": 6,
        "dreamIds": [
          "dfse14",
          "dfse38",
          "2249",
          "2252",
          "2277",
          "2301"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:unease",
        "kind": "emotion",
        "label": "unease",
        "count": 5,
        "dreamIds": [
          "1772",
          "2249",
          "2263",
          "2273",
          "2357"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:awe",
        "kind": "emotion",
        "label": "awe",
        "count": 4,
        "dreamIds": [
          "2200",
          "2311",
          "2309",
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:urgency",
        "kind": "emotion",
        "label": "urgency",
        "count": 3,
        "dreamIds": [
          "1747",
          "1765",
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:acceptance",
        "kind": "emotion",
        "label": "acceptance",
        "count": 2,
        "dreamIds": [
          "2263",
          "2355"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:desire",
        "kind": "emotion",
        "label": "desire",
        "count": 2,
        "dreamIds": [
          "2276",
          "2309"
        ],
        "excerpts": [],
        "analysis": ""
      },
      {
        "id": "emotion:shame",
        "kind": "emotion",
        "label": "shame",
        "count": 2,
        "dreamIds": [
          "2249",
          "2271"
        ],
        "excerpts": [],
        "analysis": ""
      }
    ],
    "links": [
      {
        "source": "person:parent",
        "target": "emotion:amusement",
        "weight": 7
      },
      {
        "source": "symbol:concert",
        "target": "place:concert-stage",
        "weight": 5
      },
      {
        "source": "symbol:music",
        "target": "symbol:concert",
        "weight": 4
      },
      {
        "source": "symbol:music",
        "target": "place:concert-stage",
        "weight": 4
      },
      {
        "source": "symbol:music",
        "target": "emotion:curiosity",
        "weight": 4
      },
      {
        "source": "symbol:photographs",
        "target": "person:parent",
        "weight": 4
      },
      {
        "source": "person:parent",
        "target": "person:grandparent",
        "weight": 4
      },
      {
        "source": "person:parent",
        "target": "emotion:nostalgia",
        "weight": 4
      },
      {
        "source": "person:grandparent",
        "target": "emotion:amusement",
        "weight": 4
      },
      {
        "source": "symbol:music",
        "target": "symbol:photographs",
        "weight": 3
      },
      {
        "source": "symbol:music",
        "target": "emotion:amusement",
        "weight": 3
      },
      {
        "source": "symbol:music",
        "target": "emotion:confusion",
        "weight": 3
      },
      {
        "source": "symbol:photographs",
        "target": "symbol:animals",
        "weight": 3
      },
      {
        "source": "symbol:photographs",
        "target": "emotion:confusion",
        "weight": 3
      },
      {
        "source": "symbol:photographs",
        "target": "emotion:nostalgia",
        "weight": 3
      },
      {
        "source": "symbol:animals",
        "target": "person:parent",
        "weight": 3
      },
      {
        "source": "symbol:concert",
        "target": "person:idol",
        "weight": 3
      },
      {
        "source": "symbol:parallel-self",
        "target": "emotion:nostalgia",
        "weight": 3
      },
      {
        "source": "person:parent",
        "target": "person:children",
        "weight": 3
      },
      {
        "source": "person:parent",
        "target": "place:parallel-school",
        "weight": 3
      },
      {
        "source": "person:parent",
        "target": "emotion:grief",
        "weight": 3
      },
      {
        "source": "person:children",
        "target": "emotion:amusement",
        "weight": 3
      },
      {
        "source": "person:children",
        "target": "emotion:confusion",
        "weight": 3
      },
      {
        "source": "person:grandparent",
        "target": "emotion:grief",
        "weight": 3
      },
      {
        "source": "person:idol",
        "target": "place:concert-stage",
        "weight": 3
      },
      {
        "source": "place:parallel-school",
        "target": "emotion:confusion",
        "weight": 3
      },
      {
        "source": "place:parallel-school",
        "target": "emotion:nostalgia",
        "weight": 3
      },
      {
        "source": "emotion:amusement",
        "target": "emotion:unease",
        "weight": 3
      },
      {
        "source": "symbol:music",
        "target": "symbol:animals",
        "weight": 2
      },
      {
        "source": "symbol:music",
        "target": "symbol:interface",
        "weight": 2
      },
      {
        "source": "symbol:music",
        "target": "symbol:pitch",
        "weight": 2
      },
      {
        "source": "symbol:music",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "symbol:music",
        "target": "person:children",
        "weight": 2
      },
      {
        "source": "symbol:music",
        "target": "person:idol",
        "weight": 2
      },
      {
        "source": "symbol:music",
        "target": "emotion:nostalgia",
        "weight": 2
      },
      {
        "source": "symbol:photographs",
        "target": "symbol:parallel-self",
        "weight": 2
      },
      {
        "source": "symbol:photographs",
        "target": "symbol:bus",
        "weight": 2
      },
      {
        "source": "symbol:photographs",
        "target": "person:children",
        "weight": 2
      },
      {
        "source": "symbol:photographs",
        "target": "person:grandparent",
        "weight": 2
      },
      {
        "source": "symbol:photographs",
        "target": "person:teacher",
        "weight": 2
      },
      {
        "source": "symbol:photographs",
        "target": "place:parallel-school",
        "weight": 2
      },
      {
        "source": "symbol:photographs",
        "target": "emotion:amusement",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "symbol:religion",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "symbol:fox-spirit",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "person:grandparent",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "place:parallel-school",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "emotion:nostalgia",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "emotion:grief",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "emotion:awe",
        "weight": 2
      },
      {
        "source": "symbol:concert",
        "target": "symbol:interface",
        "weight": 2
      },
      {
        "source": "symbol:concert",
        "target": "emotion:confusion",
        "weight": 2
      },
      {
        "source": "symbol:concert",
        "target": "emotion:curiosity",
        "weight": 2
      },
      {
        "source": "symbol:light",
        "target": "symbol:paused-time",
        "weight": 2
      },
      {
        "source": "symbol:light",
        "target": "emotion:awe",
        "weight": 2
      },
      {
        "source": "symbol:water",
        "target": "emotion:nostalgia",
        "weight": 2
      },
      {
        "source": "symbol:water",
        "target": "emotion:unease",
        "weight": 2
      },
      {
        "source": "symbol:clothing",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "symbol:clothing",
        "target": "emotion:amusement",
        "weight": 2
      },
      {
        "source": "symbol:parallel-self",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "symbol:religion",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "symbol:religion",
        "target": "emotion:grief",
        "weight": 2
      },
      {
        "source": "symbol:bus",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "symbol:drink",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "symbol:gods",
        "target": "emotion:awe",
        "weight": 2
      },
      {
        "source": "symbol:interface",
        "target": "place:concert-stage",
        "weight": 2
      },
      {
        "source": "symbol:interface",
        "target": "emotion:curiosity",
        "weight": 2
      },
      {
        "source": "symbol:paused-time",
        "target": "emotion:awe",
        "weight": 2
      },
      {
        "source": "person:parent",
        "target": "person:idol",
        "weight": 2
      },
      {
        "source": "person:parent",
        "target": "emotion:confusion",
        "weight": 2
      },
      {
        "source": "person:grandparent",
        "target": "emotion:nostalgia",
        "weight": 2
      },
      {
        "source": "person:idol",
        "target": "emotion:amusement",
        "weight": 2
      },
      {
        "source": "person:idol",
        "target": "emotion:confusion",
        "weight": 2
      },
      {
        "source": "person:teacher",
        "target": "emotion:confusion",
        "weight": 2
      },
      {
        "source": "person:teacher",
        "target": "emotion:nostalgia",
        "weight": 2
      },
      {
        "source": "person:roommate",
        "target": "place:dorm",
        "weight": 2
      },
      {
        "source": "place:parallel-school",
        "target": "emotion:shame",
        "weight": 2
      },
      {
        "source": "place:concert-stage",
        "target": "emotion:confusion",
        "weight": 2
      },
      {
        "source": "place:concert-stage",
        "target": "emotion:curiosity",
        "weight": 2
      },
      {
        "source": "emotion:amusement",
        "target": "emotion:confusion",
        "weight": 2
      },
      {
        "source": "emotion:confusion",
        "target": "emotion:nostalgia",
        "weight": 2
      },
      {
        "source": "emotion:confusion",
        "target": "emotion:curiosity",
        "weight": 2
      },
      {
        "source": "emotion:confusion",
        "target": "emotion:unease",
        "weight": 2
      },
      {
        "source": "emotion:confusion",
        "target": "emotion:shame",
        "weight": 2
      },
      {
        "source": "emotion:nostalgia",
        "target": "emotion:grief",
        "weight": 2
      },
      {
        "source": "emotion:nostalgia",
        "target": "emotion:urgency",
        "weight": 2
      },
      {
        "source": "emotion:nostalgia",
        "target": "emotion:shame",
        "weight": 2
      },
      {
        "source": "emotion:curiosity",
        "target": "emotion:awe",
        "weight": 2
      }
    ]
  },
  "symbolIndex": [
    {
      "id": "music",
      "label": "music",
      "count": 12,
      "dreamIds": [
        "dfse24",
        "dfse26",
        "dfse29",
        "dfse37",
        "dfse46",
        "1720",
        "1772",
        "2271",
        "2282",
        "2306",
        "2311",
        "2336"
      ]
    },
    {
      "id": "photographs",
      "label": "photographs",
      "count": 9,
      "dreamIds": [
        "dfse03",
        "1655",
        "dfse41",
        "1720",
        "1747",
        "2200",
        "2252",
        "2271",
        "2336"
      ]
    },
    {
      "id": "animals",
      "label": "animals",
      "count": 7,
      "dreamIds": [
        "dfse47",
        "1720",
        "1742",
        "2200",
        "2249",
        "2252",
        "2311"
      ]
    },
    {
      "id": "concert",
      "label": "concert",
      "count": 5,
      "dreamIds": [
        "dfse10",
        "dfse37",
        "2282",
        "2311",
        "2336"
      ]
    },
    {
      "id": "light",
      "label": "light",
      "count": 4,
      "dreamIds": [
        "dfse19",
        "dfse42",
        "2309",
        "2355"
      ]
    },
    {
      "id": "water",
      "label": "water",
      "count": 4,
      "dreamIds": [
        "dfse41",
        "1762",
        "2249",
        "2273"
      ]
    },
    {
      "id": "clothing",
      "label": "clothing",
      "count": 3,
      "dreamIds": [
        "1765",
        "2269",
        "2328"
      ]
    },
    {
      "id": "parallel-self",
      "label": "parallel self",
      "count": 3,
      "dreamIds": [
        "1747",
        "1762",
        "2271"
      ]
    },
    {
      "id": "religion",
      "label": "religion",
      "count": 3,
      "dreamIds": [
        "dfse38",
        "2252",
        "2311"
      ]
    },
    {
      "id": "bus",
      "label": "bus",
      "count": 2,
      "dreamIds": [
        "1655",
        "2200"
      ]
    },
    {
      "id": "drink",
      "label": "drink",
      "count": 2,
      "dreamIds": [
        "dfse42",
        "2276"
      ]
    },
    {
      "id": "flowers",
      "label": "flowers",
      "count": 2,
      "dreamIds": [
        "dfse19",
        "2269"
      ]
    },
    {
      "id": "fox-spirit",
      "label": "fox spirit",
      "count": 2,
      "dreamIds": [
        "2249",
        "2311"
      ]
    },
    {
      "id": "gods",
      "label": "gods",
      "count": 2,
      "dreamIds": [
        "2200",
        "2355"
      ]
    },
    {
      "id": "graduation",
      "label": "graduation",
      "count": 2,
      "dreamIds": [
        "1774",
        "2271"
      ]
    },
    {
      "id": "hybrid-space",
      "label": "hybrid space",
      "count": 2,
      "dreamIds": [
        "2273",
        "2282"
      ]
    },
    {
      "id": "interface",
      "label": "interface",
      "count": 2,
      "dreamIds": [
        "2311",
        "2336"
      ]
    },
    {
      "id": "paused-time",
      "label": "paused time",
      "count": 2,
      "dreamIds": [
        "2309",
        "2355"
      ]
    },
    {
      "id": "pitch",
      "label": "pitch",
      "count": 2,
      "dreamIds": [
        "2271",
        "2306"
      ]
    },
    {
      "id": "amusement-park",
      "label": "amusement park",
      "count": 1,
      "dreamIds": [
        "2309"
      ]
    },
    {
      "id": "cycle",
      "label": "cycle",
      "count": 1,
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "death-ritual",
      "label": "death ritual",
      "count": 1,
      "dreamIds": [
        "2277"
      ]
    },
    {
      "id": "food-court",
      "label": "food court",
      "count": 1,
      "dreamIds": [
        "2273"
      ]
    },
    {
      "id": "glasses",
      "label": "glasses",
      "count": 1,
      "dreamIds": [
        "2309"
      ]
    },
    {
      "id": "houses",
      "label": "houses",
      "count": 1,
      "dreamIds": [
        "2309"
      ]
    },
    {
      "id": "language",
      "label": "language",
      "count": 1,
      "dreamIds": [
        "1749"
      ]
    },
    {
      "id": "bullet",
      "label": "lethal choice",
      "count": 1,
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "luggage",
      "label": "luggage",
      "count": 1,
      "dreamIds": [
        "1774"
      ]
    },
    {
      "id": "marriage",
      "label": "marriage",
      "count": 1,
      "dreamIds": [
        "2357"
      ]
    },
    {
      "id": "maze",
      "label": "maze",
      "count": 1,
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "metadata",
      "label": "metadata",
      "count": 1,
      "dreamIds": [
        "1772"
      ]
    },
    {
      "id": "mirror",
      "label": "mirror",
      "count": 1,
      "dreamIds": [
        "2200"
      ]
    },
    {
      "id": "stars",
      "label": "stars",
      "count": 1,
      "dreamIds": [
        "1762"
      ]
    }
  ],
  "peopleIndex": [
    {
      "id": "parent",
      "label": "parent",
      "count": 21,
      "dreamIds": [
        "dfse01",
        "dfse02",
        "1655",
        "dfse15",
        "dfse17",
        "dfse20",
        "dfse21",
        "dfse36",
        "dfse38",
        "dfse42",
        "dfse47",
        "1762",
        "1765",
        "2200",
        "2252",
        "2263",
        "2269",
        "2271",
        "2276",
        "2282",
        "2301"
      ]
    },
    {
      "id": "children",
      "label": "children",
      "count": 7,
      "dreamIds": [
        "dfse03",
        "dfse08",
        "dfse26",
        "dfse36",
        "2263",
        "2271",
        "2309"
      ]
    },
    {
      "id": "grandparent",
      "label": "grandparent",
      "count": 7,
      "dreamIds": [
        "1655",
        "dfse26",
        "dfse34",
        "1765",
        "2249",
        "2252",
        "2301"
      ]
    },
    {
      "id": "idol",
      "label": "idol / performer",
      "count": 5,
      "dreamIds": [
        "dfse10",
        "dfse37",
        "dfse38",
        "1749",
        "2282"
      ]
    },
    {
      "id": "teacher",
      "label": "teacher",
      "count": 3,
      "dreamIds": [
        "dfse03",
        "1747",
        "2249"
      ]
    },
    {
      "id": "roommate",
      "label": "roommate",
      "count": 2,
      "dreamIds": [
        "dfse41",
        "1774"
      ]
    },
    {
      "id": "childhood-friend",
      "label": "childhood friend",
      "count": 1,
      "dreamIds": [
        "1762"
      ]
    },
    {
      "id": "editor",
      "label": "editor",
      "count": 1,
      "dreamIds": [
        "1772"
      ]
    },
    {
      "id": "food-worker",
      "label": "food-court worker",
      "count": 1,
      "dreamIds": [
        "2273"
      ]
    },
    {
      "id": "friend",
      "label": "friend",
      "count": 1,
      "dreamIds": [
        "1747"
      ]
    },
    {
      "id": "gods",
      "label": "gods",
      "count": 1,
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "lesser-god",
      "label": "lesser god",
      "count": 1,
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "glasses-man",
      "label": "man with distant glasses",
      "count": 1,
      "dreamIds": [
        "2309"
      ]
    },
    {
      "id": "influencer",
      "label": "public figure",
      "count": 1,
      "dreamIds": [
        "1655"
      ]
    },
    {
      "id": "spouse-figure",
      "label": "spouse figure",
      "count": 1,
      "dreamIds": [
        "2357"
      ]
    },
    {
      "id": "cowboys",
      "label": "strangers in cowboy hats",
      "count": 1,
      "dreamIds": [
        "2309"
      ]
    }
  ],
  "placesIndex": [
    {
      "id": "parallel-school",
      "label": "parallel school",
      "count": 6,
      "dreamIds": [
        "dfse07",
        "dfse17",
        "dfse35",
        "2200",
        "2249",
        "2271"
      ]
    },
    {
      "id": "concert-stage",
      "label": "concert / stage",
      "count": 5,
      "dreamIds": [
        "dfse10",
        "dfse37",
        "2282",
        "2311",
        "2336"
      ]
    },
    {
      "id": "dorm",
      "label": "dorm / apartment",
      "count": 2,
      "dreamIds": [
        "dfse41",
        "1774"
      ]
    },
    {
      "id": "florence",
      "label": "Florence",
      "count": 1,
      "dreamIds": [
        "1747"
      ]
    },
    {
      "id": "amusement-park",
      "label": "amusement park",
      "count": 1,
      "dreamIds": [
        "2309"
      ]
    },
    {
      "id": "california-mountains",
      "label": "california mountains",
      "count": 1,
      "dreamIds": [
        "2200"
      ]
    },
    {
      "id": "classroom",
      "label": "classroom",
      "count": 1,
      "dreamIds": [
        "1749"
      ]
    },
    {
      "id": "closet-archive",
      "label": "closet archive",
      "count": 1,
      "dreamIds": [
        "2328"
      ]
    },
    {
      "id": "comedy-club",
      "label": "comedy club",
      "count": 1,
      "dreamIds": [
        "1765"
      ]
    },
    {
      "id": "editorial-space",
      "label": "editorial space",
      "count": 1,
      "dreamIds": [
        "1772"
      ]
    },
    {
      "id": "fan-viewing",
      "label": "fan viewing",
      "count": 1,
      "dreamIds": [
        "2311"
      ]
    },
    {
      "id": "food-court",
      "label": "food court",
      "count": 1,
      "dreamIds": [
        "2273"
      ]
    },
    {
      "id": "funeral-office",
      "label": "funeral office",
      "count": 1,
      "dreamIds": [
        "2277"
      ]
    },
    {
      "id": "library-aquarium",
      "label": "library–aquarium",
      "count": 1,
      "dreamIds": [
        "2273"
      ]
    },
    {
      "id": "shopping-plaza",
      "label": "shopping plaza",
      "count": 1,
      "dreamIds": [
        "2269"
      ]
    },
    {
      "id": "sunny-trip",
      "label": "sunny trip",
      "count": 1,
      "dreamIds": [
        "2271"
      ]
    },
    {
      "id": "temple-maze",
      "label": "temple maze",
      "count": 1,
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "tourist-bus",
      "label": "tourist bus",
      "count": 1,
      "dreamIds": [
        "1655"
      ]
    }
  ],
  "emotionIndex": [
    {
      "id": "amusement",
      "label": "amusement",
      "count": 13,
      "dreamIds": [
        "dfse01",
        "1655",
        "dfse26",
        "dfse52",
        "1749",
        "1765",
        "1772",
        "2252",
        "2263",
        "2269",
        "2282",
        "2309",
        "2357"
      ]
    },
    {
      "id": "confusion",
      "label": "confusion",
      "count": 10,
      "dreamIds": [
        "dfse03",
        "dfse09",
        "dfse35",
        "dfse37",
        "1749",
        "1770",
        "2249",
        "2263",
        "2271",
        "2336"
      ]
    },
    {
      "id": "nostalgia",
      "label": "nostalgia",
      "count": 9,
      "dreamIds": [
        "dfse10",
        "dfse17",
        "1720",
        "1747",
        "1762",
        "2249",
        "2271",
        "2301",
        "2355"
      ]
    },
    {
      "id": "curiosity",
      "label": "curiosity",
      "count": 7,
      "dreamIds": [
        "dfse18",
        "dfse46",
        "1770",
        "2306",
        "2311",
        "2309",
        "2336"
      ]
    },
    {
      "id": "grief",
      "label": "grief",
      "count": 6,
      "dreamIds": [
        "dfse14",
        "dfse38",
        "2249",
        "2252",
        "2277",
        "2301"
      ]
    },
    {
      "id": "unease",
      "label": "unease",
      "count": 5,
      "dreamIds": [
        "1772",
        "2249",
        "2263",
        "2273",
        "2357"
      ]
    },
    {
      "id": "awe",
      "label": "awe",
      "count": 4,
      "dreamIds": [
        "2200",
        "2311",
        "2309",
        "2355"
      ]
    },
    {
      "id": "urgency",
      "label": "urgency",
      "count": 3,
      "dreamIds": [
        "1747",
        "1765",
        "2355"
      ]
    },
    {
      "id": "acceptance",
      "label": "acceptance",
      "count": 2,
      "dreamIds": [
        "2263",
        "2355"
      ]
    },
    {
      "id": "desire",
      "label": "desire",
      "count": 2,
      "dreamIds": [
        "2276",
        "2309"
      ]
    },
    {
      "id": "shame",
      "label": "shame",
      "count": 2,
      "dreamIds": [
        "2249",
        "2271"
      ]
    }
  ],
  "patterns": [
    {
      "id": "hybrid-architecture",
      "label": "Hybrid architecture",
      "evidence": [
        "2273",
        "2355",
        "2309",
        "2269",
        "2277"
      ],
      "summary": "Spaces refuse single function: library∩aquarium∩food court; temple∩maze; amusement park that is not Disneyland; funeral offices; shopping plazas as museums of surfaces."
    },
    {
      "id": "mediated-sound",
      "label": "Mediated sound",
      "evidence": [
        "1772",
        "2306",
        "2271",
        "2336",
        "2282",
        "1720"
      ],
      "summary": "Music and voice recur as systems—metadata inside songs, pitch distortion, pitch-shifted childhood speech, concert UIs, idol stages, music judged by youth acceptance."
    },
    {
      "id": "time-suspended",
      "label": "Suspended or reversed time",
      "evidence": [
        "2309",
        "2355",
        "1765",
        "2301"
      ],
      "summary": "Parks freeze mid-air; temple combat reverses; illness reverses into wellness or youth; memory skips generations."
    },
    {
      "id": "parallel-identity",
      "label": "Parallel identity",
      "evidence": [
        "2271",
        "2355",
        "1762",
        "1655"
      ],
      "summary": "Slightly different graduations, gods who reset as lights, childhood friends in parallel universes, surnames performed for family on a bus."
    },
    {
      "id": "performance-as-interface",
      "label": "Performance as interface",
      "evidence": [
        "1772",
        "2336",
        "2306",
        "2282",
        "2311"
      ],
      "summary": "Songs, concerts, dramas, and vocal keys become editable or enterable surfaces—clicked, annotated, high-fived, or broken through a fourth wall."
    },
    {
      "id": "kinship-and-care",
      "label": "Kinship and care",
      "evidence": [
        "1765",
        "2301",
        "2252",
        "2249",
        "2271",
        "2282",
        "1655",
        "2276"
      ],
      "summary": "Parents, grandparents, and elders recur as recognition, prayer, complaint, concert companions, or figures who remember the wrong generation."
    },
    {
      "id": "animals-as-witness",
      "label": "Animals as witness",
      "evidence": [
        "1742",
        "2249",
        "2252",
        "2200",
        "1720",
        "2311"
      ],
      "summary": "Dogs, foxes, penguins, cows, cats, and fox-spirits mark happiness, classroom games, pastoral wealth, veterinary cages, and mythic accumulation of time."
    },
    {
      "id": "class-and-space",
      "label": "Class and space",
      "evidence": [
        "2328",
        "2309",
        "2200",
        "2269"
      ],
      "summary": "Wealth appears as closet space, paused condos, mountain houses with cows, and shopping plazas where last year’s design still wins."
    }
  ],
  "trajectories": [
    {
      "id": "civic-unease",
      "label": "Civic stacking",
      "steps": [
        "curiosity",
        "unease",
        "distance"
      ],
      "dreamIds": [
        "2273"
      ]
    },
    {
      "id": "park-suspend",
      "label": "Park suspension",
      "steps": [
        "curiosity",
        "desire",
        "amusement"
      ],
      "dreamIds": [
        "2309"
      ]
    },
    {
      "id": "temple-cycle",
      "label": "Temple cycle",
      "steps": [
        "awe",
        "urgency",
        "acceptance"
      ],
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "graduation-fork",
      "label": "Graduation fork",
      "steps": [
        "nostalgia",
        "confusion",
        "acceptance"
      ],
      "dreamIds": [
        "2271"
      ]
    },
    {
      "id": "grandpa-grief",
      "label": "Grandfather recognition",
      "steps": [
        "awe",
        "confusion",
        "grief"
      ],
      "dreamIds": [
        "2301",
        "1765",
        "2249"
      ]
    },
    {
      "id": "animal-joy",
      "label": "Animal joy undercut",
      "steps": [
        "curiosity",
        "amusement",
        "unease"
      ],
      "dreamIds": [
        "2252",
        "2200"
      ]
    },
    {
      "id": "classroom-exile",
      "label": "Classroom exile",
      "steps": [
        "curiosity",
        "unease",
        "nostalgia"
      ],
      "dreamIds": [
        "2249"
      ]
    },
    {
      "id": "funeral-rehearsal",
      "label": "Funeral rehearsal",
      "steps": [
        "unease",
        "confusion",
        "acceptance"
      ],
      "dreamIds": [
        "2277"
      ]
    }
  ]
} as const;

export const dreamsData: DreamsData = data as unknown as DreamsData;
export default dreamsData;
