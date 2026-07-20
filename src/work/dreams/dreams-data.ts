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
  "generatedAt": "2026-07-20T04:37:24Z",
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
    "namedNoteFound": false,
    "namedNoteNote": "No local Notes title matched (sqlite + fuzzy + body scan). AppleScript enumeration times out. If the note lives on another device, sync iCloud and re-run import.",
    "newDreamsImported": [
      "1747",
      "1749"
    ],
    "newDreamsSource": "Notes folder Dreams (Z_PK 1747, 1749) — present locally but absent from prior 26-import",
    "dateProvenance": "Prefer ZCREATIONDATE3/1 (note creation). Fallback ZMODIFICATIONDATE1. These are Notes metadata timestamps (approx. capture time), not in-text dream dates. No in-text dates found.",
    "archivePath": "content/dreams/archive/dreams-full.json"
  },
  "dreamCount": 28,
  "dreams": [
    {
      "id": "1655",
      "ordinal": 1,
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
      "id": "1720",
      "ordinal": 2,
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
      "ordinal": 3,
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
      "ordinal": 4,
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
      "ordinal": 5,
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
      "ordinal": 6,
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
      "ordinal": 7,
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
      "ordinal": 8,
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
      "ordinal": 9,
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
      "ordinal": 10,
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
      "ordinal": 11,
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
      "ordinal": 12,
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
      "ordinal": 13,
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
      "ordinal": 14,
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
      "ordinal": 15,
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
      "ordinal": 16,
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
      "ordinal": 17,
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
      "ordinal": 18,
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
      "ordinal": 19,
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
      "ordinal": 20,
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
      "ordinal": 21,
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
      "ordinal": 22,
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
      "ordinal": 23,
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
      "ordinal": 24,
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
      "ordinal": 25,
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
      "ordinal": 26,
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
      "ordinal": 27,
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
      "ordinal": 28,
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
        "id": "person:parent",
        "kind": "person",
        "label": "parent",
        "count": 11,
        "dreamIds": [
          "1655",
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
        "excerpts": [
          {
            "dreamId": "1655",
            "dateLabel": "2025-09-08",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L—]—I am a lawyer in training."
          },
          {
            "dreamId": "1762",
            "dateLabel": "2025-12-27",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door—ball, watermelon, stars—leaves and never comes back."
          },
          {
            "dreamId": "1765",
            "dateLabel": "2026-01-02",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma—red suit, brown suit—I hug them both."
          },
          {
            "dreamId": "2200",
            "dateLabel": "2026-01-22",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror."
          }
        ],
        "analysis": "Parents appear as complaint, prayer, concert companion, or the one whose flight disappears before boarding."
      },
      {
        "id": "motif:amusement",
        "kind": "motif",
        "label": "amusement",
        "count": 9,
        "dreamIds": [
          "1655",
          "1765",
          "1772",
          "2252",
          "2263",
          "2269",
          "2282",
          "2309",
          "2357"
        ],
        "excerpts": [
          {
            "dreamId": "1655",
            "dateLabel": "2025-09-08",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L—]—I am a lawyer in training."
          },
          {
            "dreamId": "1765",
            "dateLabel": "2026-01-02",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma—red suit, brown suit—I hug them both."
          },
          {
            "dreamId": "1772",
            "dateLabel": "2026-01-12",
            "title": "Editor's song",
            "text": "In a very serious situation you hear a song—and all the subtext is already inside it."
          },
          {
            "dreamId": "2252",
            "dateLabel": "2026-02-16",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs—I tell mom looking at animals makes me happy."
          }
        ],
        "analysis": "Humor softens the sharp edges: paused parks, metadata songs, marriages that refuse elaboration."
      },
      {
        "id": "symbol:music",
        "kind": "symbol",
        "label": "music",
        "count": 7,
        "dreamIds": [
          "1720",
          "1772",
          "2271",
          "2282",
          "2306",
          "2311",
          "2336"
        ],
        "excerpts": [
          {
            "dreamId": "1720",
            "dateLabel": "2025-11-16",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages—the ones you need for the vet."
          },
          {
            "dreamId": "1772",
            "dateLabel": "2026-01-12",
            "title": "Editor's song",
            "text": "In a very serious situation you hear a song—and all the subtext is already inside it."
          },
          {
            "dreamId": "2271",
            "dateLabel": "2026-03-03",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          },
          {
            "dreamId": "2282",
            "dateLabel": "2026-03-23",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage—high-fives, Chinese hello, a tongue-twister line."
          }
        ],
        "analysis": "Sound arrives already annotated—songs carry their own footnotes, pitch shifts the words until meaning frays."
      },
      {
        "id": "symbol:animals",
        "kind": "symbol",
        "label": "animals",
        "count": 6,
        "dreamIds": [
          "1720",
          "1742",
          "2200",
          "2249",
          "2252",
          "2311"
        ],
        "excerpts": [
          {
            "dreamId": "1720",
            "dateLabel": "2025-11-16",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages—the ones you need for the vet."
          },
          {
            "dreamId": "1742",
            "dateLabel": "2025-12-11",
            "title": "Two named dogs",
            "text": "Two dogs: [dog] small and skinny, [dog] larger—named, sized, kept."
          },
          {
            "dreamId": "2200",
            "dateLabel": "2026-01-22",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          }
        ],
        "analysis": "Animals witness joy before it is undercut—dogs named, foxes given, penguins breaking ice."
      },
      {
        "id": "motif:nostalgia",
        "kind": "motif",
        "label": "nostalgia",
        "count": 6,
        "dreamIds": [
          "1720",
          "1762",
          "2249",
          "2271",
          "2301",
          "2355"
        ],
        "excerpts": [
          {
            "dreamId": "1720",
            "dateLabel": "2025-11-16",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages—the ones you need for the vet."
          },
          {
            "dreamId": "1762",
            "dateLabel": "2025-12-27",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door—ball, watermelon, stars—leaves and never comes back."
          },
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2271",
            "dateLabel": "2026-03-03",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Appears in 6 nights—the sky keeps placing this word beside the others."
      },
      {
        "id": "symbol:photographs",
        "kind": "symbol",
        "label": "photographs",
        "count": 6,
        "dreamIds": [
          "1655",
          "1720",
          "2200",
          "2252",
          "2271",
          "2336"
        ],
        "excerpts": [
          {
            "dreamId": "1655",
            "dateLabel": "2025-09-08",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L—]—I am a lawyer in training."
          },
          {
            "dreamId": "1720",
            "dateLabel": "2025-11-16",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages—the ones you need for the vet."
          },
          {
            "dreamId": "2200",
            "dateLabel": "2026-01-22",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2252",
            "dateLabel": "2026-02-16",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs—I tell mom looking at animals makes me happy."
          }
        ],
        "analysis": "Images prove presence and invent danger: tourist buses, animal close-ups, social feeds that mark who will pass out."
      },
      {
        "id": "motif:confusion",
        "kind": "motif",
        "label": "confusion",
        "count": 5,
        "dreamIds": [
          "1770",
          "2249",
          "2263",
          "2271",
          "2336"
        ],
        "excerpts": [
          {
            "dreamId": "1770",
            "dateLabel": "2026-01-07",
            "title": "BL mashup",
            "text": "BL plot lines mash into tropes; the main figure keeps shifting roles."
          },
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2263",
            "dateLabel": "2026-02-22",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs—mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2271",
            "dateLabel": "2026-03-03",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Appears in 5 nights—the sky keeps placing this word beside the others."
      },
      {
        "id": "motif:curiosity",
        "kind": "motif",
        "label": "curiosity",
        "count": 5,
        "dreamIds": [
          "1770",
          "2306",
          "2309",
          "2311",
          "2336"
        ],
        "excerpts": [
          {
            "dreamId": "1770",
            "dateLabel": "2026-01-07",
            "title": "BL mashup",
            "text": "BL plot lines mash into tropes; the main figure keeps shifting roles."
          },
          {
            "dreamId": "2306",
            "dateLabel": "2026-04-20",
            "title": "Pitch and gender",
            "text": "Raising the key changes a song differently in a male voice than in a female one—words begin to distort."
          },
          {
            "dreamId": "2309",
            "dateLabel": "2026-04-25",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused—literally stopped in the air."
          },
          {
            "dreamId": "2311",
            "dateLabel": "2026-04-22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion—a nine-tailed fox gains a tail every fifty years—then breaks the fourth wall."
          }
        ],
        "analysis": "You keep walking toward the clubhouse, the fox, the fourth wall—just to see."
      },
      {
        "id": "person:grandparent",
        "kind": "person",
        "label": "grandparent",
        "count": 5,
        "dreamIds": [
          "1655",
          "1765",
          "2249",
          "2252",
          "2301"
        ],
        "excerpts": [
          {
            "dreamId": "1655",
            "dateLabel": "2025-09-08",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L—]—I am a lawyer in training."
          },
          {
            "dreamId": "1765",
            "dateLabel": "2026-01-02",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma—red suit, brown suit—I hug them both."
          },
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2252",
            "dateLabel": "2026-02-16",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs—I tell mom looking at animals makes me happy."
          }
        ],
        "analysis": "Grandparents restore and refuse recognition—well again in cosplay, or young and unable to remember you."
      },
      {
        "id": "motif:unease",
        "kind": "motif",
        "label": "unease",
        "count": 5,
        "dreamIds": [
          "1772",
          "2249",
          "2263",
          "2273",
          "2357"
        ],
        "excerpts": [
          {
            "dreamId": "1772",
            "dateLabel": "2026-01-12",
            "title": "Editor's song",
            "text": "In a very serious situation you hear a song—and all the subtext is already inside it."
          },
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2263",
            "dateLabel": "2026-02-22",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs—mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2273",
            "dateLabel": "2026-03-06",
            "title": "Library aquarium",
            "text": "A library that is also an aquarium, with a food court attached—and a worker unkind to everyone."
          }
        ],
        "analysis": "Mean counters, poisonous gas plots, classroom shame—civic spaces that smile wrong."
      },
      {
        "id": "motif:awe",
        "kind": "motif",
        "label": "awe",
        "count": 4,
        "dreamIds": [
          "2200",
          "2309",
          "2311",
          "2355"
        ],
        "excerpts": [
          {
            "dreamId": "2200",
            "dateLabel": "2026-01-22",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2309",
            "dateLabel": "2026-04-25",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused—literally stopped in the air."
          },
          {
            "dreamId": "2311",
            "dateLabel": "2026-04-22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion—a nine-tailed fox gains a tail every fifty years—then breaks the fourth wall."
          },
          {
            "dreamId": "2355",
            "dateLabel": "2026-06-28",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses—then still explodes. Lights return to the temple seams for another round."
          }
        ],
        "analysis": "Color saturates mountains, temples, and animals until duty or explosion breaks the spell."
      },
      {
        "id": "motif:grief",
        "kind": "motif",
        "label": "grief",
        "count": 4,
        "dreamIds": [
          "2249",
          "2252",
          "2277",
          "2301"
        ],
        "excerpts": [
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2252",
            "dateLabel": "2026-02-16",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs—I tell mom looking at animals makes me happy."
          },
          {
            "dreamId": "2277",
            "dateLabel": "2026-03-12",
            "title": "Funeral practice rooms",
            "text": "Office rooms where people practice the post-death process—living loved ones choose what others would eat at the funeral."
          },
          {
            "dreamId": "2301",
            "dateLabel": "2026-04-14",
            "title": "Grandpa young again",
            "text": "Grandpa talks—he is in his twenties, remembers mom, does not remember me. I cried in the dream."
          }
        ],
        "analysis": "Recognition skips a generation and lands as crying you only notice after waking."
      },
      {
        "id": "person:children",
        "kind": "person",
        "label": "children",
        "count": 3,
        "dreamIds": [
          "2263",
          "2271",
          "2309"
        ],
        "excerpts": [
          {
            "dreamId": "2263",
            "dateLabel": "2026-02-22",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs—mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2271",
            "dateLabel": "2026-03-03",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          },
          {
            "dreamId": "2309",
            "dateLabel": "2026-04-25",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused—literally stopped in the air."
          }
        ],
        "analysis": "Appears in 3 nights—the sky keeps placing this word beside the others."
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
        "excerpts": [
          {
            "dreamId": "1765",
            "dateLabel": "2026-01-02",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma—red suit, brown suit—I hug them both."
          },
          {
            "dreamId": "2269",
            "dateLabel": "2026-02-27",
            "title": "Lotus incense plaza",
            "text": "Artificial lotuses release incense; torso-shaped bags with past-year designs outshine this season’s crocodile shine."
          },
          {
            "dreamId": "2328",
            "dateLabel": "2026-05-04",
            "title": "Worn-out labels",
            "text": "Sweatshirts labeled worn out—don’t wear. Rich people never have to donate; they can keep every piece."
          }
        ],
        "analysis": "Labels say worn out / don’t wear; wealth is the space that never has to donate."
      },
      {
        "id": "symbol:concert",
        "kind": "symbol",
        "label": "concert",
        "count": 3,
        "dreamIds": [
          "2282",
          "2311",
          "2336"
        ],
        "excerpts": [
          {
            "dreamId": "2282",
            "dateLabel": "2026-03-23",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage—high-fives, Chinese hello, a tongue-twister line."
          },
          {
            "dreamId": "2311",
            "dateLabel": "2026-04-22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion—a nine-tailed fox gains a tail every fifty years—then breaks the fourth wall."
          },
          {
            "dreamId": "2336",
            "dateLabel": "2026-05-20",
            "title": "Concert interface",
            "text": "Click the screen and dirt comes off; the interface listens for the concert’s vibrations."
          }
        ],
        "analysis": "Stages leak into the crowd: high-fives, Chinese hellos, interfaces that listen for vibration."
      },
      {
        "id": "place:concert-stage",
        "kind": "place",
        "label": "concert / stage",
        "count": 3,
        "dreamIds": [
          "2282",
          "2311",
          "2336"
        ],
        "excerpts": [
          {
            "dreamId": "2282",
            "dateLabel": "2026-03-23",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage—high-fives, Chinese hello, a tongue-twister line."
          },
          {
            "dreamId": "2311",
            "dateLabel": "2026-04-22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion—a nine-tailed fox gains a tail every fifty years—then breaks the fourth wall."
          },
          {
            "dreamId": "2336",
            "dateLabel": "2026-05-20",
            "title": "Concert interface",
            "text": "Click the screen and dirt comes off; the interface listens for the concert’s vibrations."
          }
        ],
        "analysis": "Appears in 3 nights—the sky keeps placing this word beside the others."
      },
      {
        "id": "place:parallel-school",
        "kind": "place",
        "label": "parallel school",
        "count": 3,
        "dreamIds": [
          "2200",
          "2249",
          "2271"
        ],
        "excerpts": [
          {
            "dreamId": "2200",
            "dateLabel": "2026-01-22",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2271",
            "dateLabel": "2026-03-03",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Appears in 3 nights—the sky keeps placing this word beside the others."
      },
      {
        "id": "symbol:water",
        "kind": "symbol",
        "label": "water",
        "count": 3,
        "dreamIds": [
          "1762",
          "2249",
          "2273"
        ],
        "excerpts": [
          {
            "dreamId": "1762",
            "dateLabel": "2025-12-27",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door—ball, watermelon, stars—leaves and never comes back."
          },
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2273",
            "dateLabel": "2026-03-06",
            "title": "Library aquarium",
            "text": "A library that is also an aquarium, with a food court attached—and a worker unkind to everyone."
          }
        ],
        "analysis": "Water refuses to stay in one building—libraries become aquariums; rain arrives after public shame."
      },
      {
        "id": "motif:acceptance",
        "kind": "motif",
        "label": "acceptance",
        "count": 2,
        "dreamIds": [
          "2263",
          "2355"
        ],
        "excerpts": [
          {
            "dreamId": "2263",
            "dateLabel": "2026-02-22",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs—mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2355",
            "dateLabel": "2026-06-28",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses—then still explodes. Lights return to the temple seams for another round."
          }
        ],
        "analysis": "Appears in 2 nights—the sky keeps placing this word beside the others."
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
        "excerpts": [
          {
            "dreamId": "1655",
            "dateLabel": "2025-09-08",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L—]—I am a lawyer in training."
          },
          {
            "dreamId": "2200",
            "dateLabel": "2026-01-22",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror."
          }
        ],
        "analysis": "Identity is performed in transit—surnames, professions, and disappearances share one ride."
      },
      {
        "id": "motif:desire",
        "kind": "motif",
        "label": "desire",
        "count": 2,
        "dreamIds": [
          "2276",
          "2309"
        ],
        "excerpts": [
          {
            "dreamId": "2276",
            "dateLabel": "2026-03-10",
            "title": "Holiday drink",
            "text": "A new drink I really want—mom says there are already so many at home; I say it’s the holidays."
          },
          {
            "dreamId": "2309",
            "dateLabel": "2026-04-25",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused—literally stopped in the air."
          }
        ],
        "analysis": "Appears in 2 nights—the sky keeps placing this word beside the others."
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
        "excerpts": [
          {
            "dreamId": "2249",
            "dateLabel": "2026-02-10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo—then a teacher throws the rock away."
          },
          {
            "dreamId": "2311",
            "dateLabel": "2026-04-22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion—a nine-tailed fox gains a tail every fifty years—then breaks the fourth wall."
          }
        ],
        "analysis": "Tails accumulate like centuries of belief; the show discusses other shows about belief."
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
        "excerpts": [
          {
            "dreamId": "2200",
            "dateLabel": "2026-01-22",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs—then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2355",
            "dateLabel": "2026-06-28",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses—then still explodes. Lights return to the temple seams for another round."
          }
        ],
        "analysis": "Power gathers as sun-and-moon light in maze walls; the strongest become gods, then lights again."
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
        "excerpts": [
          {
            "dreamId": "1774",
            "dateLabel": "2026-01-16",
            "title": "Roommate packing",
            "text": "Dorm door left open—I wake to my roommate packing luggage; she has no exams, I do."
          },
          {
            "dreamId": "2271",
            "dateLabel": "2026-03-03",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Ceremony recurs as a fork: same schools, slightly different photos, a childhood voice pitched higher than memory allows."
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
        "excerpts": [
          {
            "dreamId": "2273",
            "dateLabel": "2026-03-06",
            "title": "Library aquarium",
            "text": "A library that is also an aquarium, with a food court attached—and a worker unkind to everyone."
          },
          {
            "dreamId": "2282",
            "dateLabel": "2026-03-23",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage—high-fives, Chinese hello, a tongue-twister line."
          }
        ],
        "analysis": "Buildings refuse single purpose; the dream stacks functions until hostility appears at a counter."
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
        "excerpts": [
          {
            "dreamId": "2311",
            "dateLabel": "2026-04-22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion—a nine-tailed fox gains a tail every fifty years—then breaks the fourth wall."
          },
          {
            "dreamId": "2336",
            "dateLabel": "2026-05-20",
            "title": "Concert interface",
            "text": "Click the screen and dirt comes off; the interface listens for the concert’s vibrations."
          }
        ],
        "analysis": "Click and dirt comes off the screen; drama breaks the fourth wall mid-episode."
      },
      {
        "id": "symbol:light",
        "kind": "symbol",
        "label": "light",
        "count": 2,
        "dreamIds": [
          "2309",
          "2355"
        ],
        "excerpts": [
          {
            "dreamId": "2309",
            "dateLabel": "2026-04-25",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused—literally stopped in the air."
          },
          {
            "dreamId": "2355",
            "dateLabel": "2026-06-28",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses—then still explodes. Lights return to the temple seams for another round."
          }
        ],
        "analysis": "Sun and moon show up as lights in mazes; glare makes nearby things invisible."
      },
      {
        "id": "symbol:parallel-self",
        "kind": "symbol",
        "label": "parallel self",
        "count": 2,
        "dreamIds": [
          "1762",
          "2271"
        ],
        "excerpts": [
          {
            "dreamId": "1762",
            "dateLabel": "2025-12-27",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door—ball, watermelon, stars—leaves and never comes back."
          },
          {
            "dreamId": "2271",
            "dateLabel": "2026-03-03",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Another version of you keeps living next door—happier photos, unfinished friendships, surnames performed for family."
      },
      {
        "id": "photographs",
        "kind": "symbol",
        "label": "photographs",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [
          {
            "dreamId": "1747",
            "dateLabel": "2025-12-16",
            "title": "Florence reunion",
            "text": "Study abroad in Florence again—except now everyone I have ever known is there."
          }
        ],
        "analysis": "Recurring symbol: photographs."
      },
      {
        "id": "parallel-self",
        "kind": "symbol",
        "label": "parallel self",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [
          {
            "dreamId": "1747",
            "dateLabel": "2025-12-16",
            "title": "Florence reunion",
            "text": "Study abroad in Florence again—except now everyone I have ever known is there."
          }
        ],
        "analysis": "Recurring symbol: parallel self."
      },
      {
        "id": "florence",
        "kind": "place",
        "label": "Florence",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [
          {
            "dreamId": "1747",
            "dateLabel": "2025-12-16",
            "title": "Florence reunion",
            "text": "Study abroad in Florence again—except now everyone I have ever known is there."
          }
        ],
        "analysis": "Recurring place: Florence."
      },
      {
        "id": "friend",
        "kind": "person",
        "label": "friend",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [
          {
            "dreamId": "1747",
            "dateLabel": "2025-12-16",
            "title": "Florence reunion",
            "text": "Study abroad in Florence again—except now everyone I have ever known is there."
          }
        ],
        "analysis": "Recurring person: friend."
      },
      {
        "id": "teacher",
        "kind": "person",
        "label": "teacher",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [
          {
            "dreamId": "1747",
            "dateLabel": "2025-12-16",
            "title": "Florence reunion",
            "text": "Study abroad in Florence again—except now everyone I have ever known is there."
          }
        ],
        "analysis": "Recurring person: teacher."
      },
      {
        "id": "urgency",
        "kind": "motif",
        "label": "urgency",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [
          {
            "dreamId": "1747",
            "dateLabel": "2025-12-16",
            "title": "Florence reunion",
            "text": "Study abroad in Florence again—except now everyone I have ever known is there."
          }
        ],
        "analysis": "Recurring motif: urgency."
      },
      {
        "id": "nostalgia",
        "kind": "motif",
        "label": "nostalgia",
        "count": 1,
        "dreamIds": [
          "1747"
        ],
        "excerpts": [
          {
            "dreamId": "1747",
            "dateLabel": "2025-12-16",
            "title": "Florence reunion",
            "text": "Study abroad in Florence again—except now everyone I have ever known is there."
          }
        ],
        "analysis": "Recurring motif: nostalgia."
      },
      {
        "id": "language",
        "kind": "symbol",
        "label": "language",
        "count": 1,
        "dreamIds": [
          "1749"
        ],
        "excerpts": [
          {
            "dreamId": "1749",
            "dateLabel": "2025-12-19",
            "title": "Language among idols",
            "text": "In class I ask [idol] a question; beside me [idol] asks how to write a character—and no language can finish the joke."
          }
        ],
        "analysis": "Recurring symbol: language."
      },
      {
        "id": "classroom",
        "kind": "place",
        "label": "classroom",
        "count": 1,
        "dreamIds": [
          "1749"
        ],
        "excerpts": [
          {
            "dreamId": "1749",
            "dateLabel": "2025-12-19",
            "title": "Language among idols",
            "text": "In class I ask [idol] a question; beside me [idol] asks how to write a character—and no language can finish the joke."
          }
        ],
        "analysis": "Recurring place: classroom."
      },
      {
        "id": "idol",
        "kind": "person",
        "label": "idol",
        "count": 1,
        "dreamIds": [
          "1749"
        ],
        "excerpts": [
          {
            "dreamId": "1749",
            "dateLabel": "2025-12-19",
            "title": "Language among idols",
            "text": "In class I ask [idol] a question; beside me [idol] asks how to write a character—and no language can finish the joke."
          }
        ],
        "analysis": "Recurring person: idol."
      },
      {
        "id": "amusement",
        "kind": "motif",
        "label": "amusement",
        "count": 1,
        "dreamIds": [
          "1749"
        ],
        "excerpts": [
          {
            "dreamId": "1749",
            "dateLabel": "2025-12-19",
            "title": "Language among idols",
            "text": "In class I ask [idol] a question; beside me [idol] asks how to write a character—and no language can finish the joke."
          }
        ],
        "analysis": "Recurring motif: amusement."
      },
      {
        "id": "confusion",
        "kind": "motif",
        "label": "confusion",
        "count": 1,
        "dreamIds": [
          "1749"
        ],
        "excerpts": [
          {
            "dreamId": "1749",
            "dateLabel": "2025-12-19",
            "title": "Language among idols",
            "text": "In class I ask [idol] a question; beside me [idol] asks how to write a character—and no language can finish the joke."
          }
        ],
        "analysis": "Recurring motif: confusion."
      }
    ],
    "links": [
      {
        "source": "symbol:bus",
        "target": "symbol:photographs",
        "weight": 2
      },
      {
        "source": "person:parent",
        "target": "symbol:photographs",
        "weight": 4
      },
      {
        "source": "person:grandparent",
        "target": "symbol:photographs",
        "weight": 2
      },
      {
        "source": "motif:amusement",
        "target": "symbol:photographs",
        "weight": 2
      },
      {
        "source": "person:parent",
        "target": "symbol:bus",
        "weight": 2
      },
      {
        "source": "person:grandparent",
        "target": "symbol:bus",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "symbol:bus",
        "weight": 1
      },
      {
        "source": "person:grandparent",
        "target": "person:parent",
        "weight": 4
      },
      {
        "source": "motif:amusement",
        "target": "person:parent",
        "weight": 6
      },
      {
        "source": "motif:amusement",
        "target": "person:grandparent",
        "weight": 3
      },
      {
        "source": "symbol:music",
        "target": "symbol:photographs",
        "weight": 3
      },
      {
        "source": "symbol:animals",
        "target": "symbol:music",
        "weight": 2
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:music",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "symbol:photographs",
        "weight": 3
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:photographs",
        "weight": 2
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:animals",
        "weight": 2
      },
      {
        "source": "symbol:parallel-self",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "person:parent",
        "target": "symbol:parallel-self",
        "weight": 2
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:parallel-self",
        "weight": 2
      },
      {
        "source": "person:parent",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:water",
        "weight": 2
      },
      {
        "source": "motif:nostalgia",
        "target": "person:parent",
        "weight": 3
      },
      {
        "source": "person:parent",
        "target": "symbol:clothing",
        "weight": 2
      },
      {
        "source": "person:grandparent",
        "target": "symbol:clothing",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "symbol:clothing",
        "weight": 2
      },
      {
        "source": "motif:confusion",
        "target": "motif:curiosity",
        "weight": 2
      },
      {
        "source": "motif:amusement",
        "target": "symbol:music",
        "weight": 2
      },
      {
        "source": "motif:unease",
        "target": "symbol:music",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "motif:unease",
        "weight": 3
      },
      {
        "source": "symbol:gods",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:photographs",
        "weight": 2
      },
      {
        "source": "motif:awe",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "symbol:animals",
        "target": "symbol:gods",
        "weight": 1
      },
      {
        "source": "symbol:bus",
        "target": "symbol:gods",
        "weight": 1
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:gods",
        "weight": 1
      },
      {
        "source": "person:parent",
        "target": "symbol:gods",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "symbol:gods",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "symbol:bus",
        "weight": 1
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:animals",
        "weight": 2
      },
      {
        "source": "person:parent",
        "target": "symbol:animals",
        "weight": 2
      },
      {
        "source": "motif:awe",
        "target": "symbol:animals",
        "weight": 2
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:bus",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "symbol:bus",
        "weight": 1
      },
      {
        "source": "person:parent",
        "target": "place:parallel-school",
        "weight": 2
      },
      {
        "source": "motif:awe",
        "target": "place:parallel-school",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "person:parent",
        "weight": 1
      },
      {
        "source": "symbol:animals",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "symbol:fox-spirit",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "person:grandparent",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "motif:unease",
        "target": "symbol:water",
        "weight": 2
      },
      {
        "source": "motif:confusion",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "motif:grief",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "symbol:animals",
        "target": "symbol:fox-spirit",
        "weight": 2
      },
      {
        "source": "person:grandparent",
        "target": "symbol:animals",
        "weight": 2
      },
      {
        "source": "motif:unease",
        "target": "symbol:animals",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:animals",
        "weight": 1
      },
      {
        "source": "motif:grief",
        "target": "symbol:animals",
        "weight": 2
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "person:grandparent",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:unease",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:grief",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "person:grandparent",
        "target": "place:parallel-school",
        "weight": 1
      },
      {
        "source": "motif:unease",
        "target": "place:parallel-school",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "place:parallel-school",
        "weight": 2
      },
      {
        "source": "motif:confusion",
        "target": "place:parallel-school",
        "weight": 2
      },
      {
        "source": "motif:grief",
        "target": "place:parallel-school",
        "weight": 1
      },
      {
        "source": "motif:unease",
        "target": "person:grandparent",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "person:grandparent",
        "weight": 2
      },
      {
        "source": "motif:confusion",
        "target": "person:grandparent",
        "weight": 1
      },
      {
        "source": "motif:grief",
        "target": "person:grandparent",
        "weight": 3
      },
      {
        "source": "motif:nostalgia",
        "target": "motif:unease",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "motif:unease",
        "weight": 2
      },
      {
        "source": "motif:grief",
        "target": "motif:unease",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "motif:nostalgia",
        "weight": 2
      },
      {
        "source": "motif:grief",
        "target": "motif:nostalgia",
        "weight": 2
      },
      {
        "source": "motif:confusion",
        "target": "motif:grief",
        "weight": 1
      },
      {
        "source": "motif:grief",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "symbol:animals",
        "weight": 1
      },
      {
        "source": "motif:grief",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "motif:amusement",
        "target": "motif:grief",
        "weight": 1
      },
      {
        "source": "person:children",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "motif:unease",
        "target": "person:parent",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "person:parent",
        "weight": 2
      },
      {
        "source": "motif:acceptance",
        "target": "person:parent",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "person:children",
        "weight": 2
      },
      {
        "source": "motif:unease",
        "target": "person:children",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "person:children",
        "weight": 2
      },
      {
        "source": "motif:acceptance",
        "target": "person:children",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "motif:confusion",
        "weight": 1
      },
      {
        "source": "motif:acceptance",
        "target": "motif:amusement",
        "weight": 1
      },
      {
        "source": "motif:acceptance",
        "target": "motif:unease",
        "weight": 1
      },
      {
        "source": "motif:acceptance",
        "target": "motif:confusion",
        "weight": 1
      },
      {
        "source": "symbol:graduation",
        "target": "symbol:music",
        "weight": 1
      },
      {
        "source": "symbol:music",
        "target": "symbol:parallel-self",
        "weight": 1
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:music",
        "weight": 1
      },
      {
        "source": "person:parent",
        "target": "symbol:music",
        "weight": 2
      },
      {
        "source": "person:children",
        "target": "symbol:music",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:music",
        "weight": 2
      },
      {
        "source": "symbol:graduation",
        "target": "symbol:parallel-self",
        "weight": 1
      },
      {
        "source": "symbol:graduation",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:graduation",
        "weight": 1
      },
      {
        "source": "person:parent",
        "target": "symbol:graduation",
        "weight": 1
      },
      {
        "source": "person:children",
        "target": "symbol:graduation",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:graduation",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:graduation",
        "weight": 1
      },
      {
        "source": "symbol:parallel-self",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "place:parallel-school",
        "target": "symbol:parallel-self",
        "weight": 1
      },
      {
        "source": "person:children",
        "target": "symbol:parallel-self",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:parallel-self",
        "weight": 1
      },
      {
        "source": "person:children",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:photographs",
        "weight": 2
      },
      {
        "source": "person:children",
        "target": "place:parallel-school",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "person:children",
        "weight": 1
      },
      {
        "source": "symbol:hybrid-space",
        "target": "symbol:water",
        "weight": 1
      },
      {
        "source": "motif:unease",
        "target": "symbol:hybrid-space",
        "weight": 1
      },
      {
        "source": "motif:desire",
        "target": "person:parent",
        "weight": 1
      },
      {
        "source": "symbol:hybrid-space",
        "target": "symbol:music",
        "weight": 1
      },
      {
        "source": "symbol:concert",
        "target": "symbol:music",
        "weight": 3
      },
      {
        "source": "place:concert-stage",
        "target": "symbol:music",
        "weight": 3
      },
      {
        "source": "symbol:concert",
        "target": "symbol:hybrid-space",
        "weight": 1
      },
      {
        "source": "place:concert-stage",
        "target": "symbol:hybrid-space",
        "weight": 1
      },
      {
        "source": "person:parent",
        "target": "symbol:hybrid-space",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "symbol:hybrid-space",
        "weight": 1
      },
      {
        "source": "place:concert-stage",
        "target": "symbol:concert",
        "weight": 3
      },
      {
        "source": "person:parent",
        "target": "symbol:concert",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "symbol:concert",
        "weight": 1
      },
      {
        "source": "person:parent",
        "target": "place:concert-stage",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "place:concert-stage",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "symbol:music",
        "weight": 3
      },
      {
        "source": "person:children",
        "target": "symbol:light",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "symbol:light",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "symbol:light",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "symbol:light",
        "weight": 2
      },
      {
        "source": "motif:desire",
        "target": "symbol:light",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "person:children",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "person:children",
        "weight": 1
      },
      {
        "source": "motif:desire",
        "target": "person:children",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "motif:curiosity",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "motif:awe",
        "weight": 1
      },
      {
        "source": "motif:amusement",
        "target": "motif:desire",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "motif:curiosity",
        "weight": 2
      },
      {
        "source": "motif:curiosity",
        "target": "motif:desire",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "motif:desire",
        "weight": 1
      },
      {
        "source": "symbol:interface",
        "target": "symbol:music",
        "weight": 2
      },
      {
        "source": "symbol:fox-spirit",
        "target": "symbol:music",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "symbol:music",
        "weight": 1
      },
      {
        "source": "symbol:concert",
        "target": "symbol:interface",
        "weight": 2
      },
      {
        "source": "symbol:animals",
        "target": "symbol:interface",
        "weight": 1
      },
      {
        "source": "symbol:fox-spirit",
        "target": "symbol:interface",
        "weight": 1
      },
      {
        "source": "place:concert-stage",
        "target": "symbol:interface",
        "weight": 2
      },
      {
        "source": "motif:curiosity",
        "target": "symbol:interface",
        "weight": 2
      },
      {
        "source": "motif:awe",
        "target": "symbol:interface",
        "weight": 1
      },
      {
        "source": "symbol:animals",
        "target": "symbol:concert",
        "weight": 1
      },
      {
        "source": "symbol:concert",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "symbol:concert",
        "weight": 2
      },
      {
        "source": "motif:awe",
        "target": "symbol:concert",
        "weight": 1
      },
      {
        "source": "place:concert-stage",
        "target": "symbol:animals",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "symbol:animals",
        "weight": 1
      },
      {
        "source": "place:concert-stage",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "symbol:fox-spirit",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "place:concert-stage",
        "weight": 2
      },
      {
        "source": "motif:awe",
        "target": "place:concert-stage",
        "weight": 1
      },
      {
        "source": "symbol:interface",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "symbol:concert",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "place:concert-stage",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "motif:curiosity",
        "target": "symbol:photographs",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:interface",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "symbol:concert",
        "weight": 1
      },
      {
        "source": "motif:confusion",
        "target": "place:concert-stage",
        "weight": 1
      },
      {
        "source": "symbol:gods",
        "target": "symbol:light",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:gods",
        "weight": 1
      },
      {
        "source": "motif:acceptance",
        "target": "symbol:gods",
        "weight": 1
      },
      {
        "source": "motif:nostalgia",
        "target": "symbol:light",
        "weight": 1
      },
      {
        "source": "motif:acceptance",
        "target": "symbol:light",
        "weight": 1
      },
      {
        "source": "motif:awe",
        "target": "motif:nostalgia",
        "weight": 1
      },
      {
        "source": "motif:acceptance",
        "target": "motif:nostalgia",
        "weight": 1
      },
      {
        "source": "motif:acceptance",
        "target": "motif:awe",
        "weight": 1
      },
      {
        "source": "photographs",
        "target": "parallel-self",
        "weight": 1
      },
      {
        "source": "photographs",
        "target": "florence",
        "weight": 1
      },
      {
        "source": "photographs",
        "target": "friend",
        "weight": 1
      },
      {
        "source": "photographs",
        "target": "teacher",
        "weight": 1
      },
      {
        "source": "photographs",
        "target": "urgency",
        "weight": 1
      },
      {
        "source": "photographs",
        "target": "nostalgia",
        "weight": 1
      },
      {
        "source": "parallel-self",
        "target": "florence",
        "weight": 1
      },
      {
        "source": "parallel-self",
        "target": "friend",
        "weight": 1
      },
      {
        "source": "parallel-self",
        "target": "teacher",
        "weight": 1
      },
      {
        "source": "parallel-self",
        "target": "urgency",
        "weight": 1
      },
      {
        "source": "parallel-self",
        "target": "nostalgia",
        "weight": 1
      },
      {
        "source": "florence",
        "target": "friend",
        "weight": 1
      },
      {
        "source": "florence",
        "target": "teacher",
        "weight": 1
      },
      {
        "source": "florence",
        "target": "urgency",
        "weight": 1
      },
      {
        "source": "florence",
        "target": "nostalgia",
        "weight": 1
      },
      {
        "source": "friend",
        "target": "teacher",
        "weight": 1
      },
      {
        "source": "friend",
        "target": "urgency",
        "weight": 1
      },
      {
        "source": "friend",
        "target": "nostalgia",
        "weight": 1
      },
      {
        "source": "teacher",
        "target": "urgency",
        "weight": 1
      },
      {
        "source": "teacher",
        "target": "nostalgia",
        "weight": 1
      },
      {
        "source": "urgency",
        "target": "nostalgia",
        "weight": 1
      },
      {
        "source": "language",
        "target": "classroom",
        "weight": 1
      },
      {
        "source": "language",
        "target": "idol",
        "weight": 1
      },
      {
        "source": "language",
        "target": "amusement",
        "weight": 1
      },
      {
        "source": "language",
        "target": "confusion",
        "weight": 1
      },
      {
        "source": "classroom",
        "target": "idol",
        "weight": 1
      },
      {
        "source": "classroom",
        "target": "amusement",
        "weight": 1
      },
      {
        "source": "classroom",
        "target": "confusion",
        "weight": 1
      },
      {
        "source": "idol",
        "target": "amusement",
        "weight": 1
      },
      {
        "source": "idol",
        "target": "confusion",
        "weight": 1
      },
      {
        "source": "amusement",
        "target": "confusion",
        "weight": 1
      }
    ]
  },
  "symbolIndex": [
    {
      "id": "music",
      "label": "music",
      "count": 7,
      "dreamIds": [
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
      "count": 7,
      "dreamIds": [
        "1655",
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
      "count": 6,
      "dreamIds": [
        "1720",
        "1742",
        "2200",
        "2249",
        "2252",
        "2311"
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
      "id": "concert",
      "label": "concert",
      "count": 3,
      "dreamIds": [
        "2282",
        "2311",
        "2336"
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
      "id": "water",
      "label": "water",
      "count": 3,
      "dreamIds": [
        "1762",
        "2249",
        "2273"
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
      "id": "light",
      "label": "light",
      "count": 2,
      "dreamIds": [
        "2309",
        "2355"
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
      "id": "religion",
      "label": "religion",
      "count": 2,
      "dreamIds": [
        "2252",
        "2311"
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
      "id": "drink",
      "label": "drink",
      "count": 1,
      "dreamIds": [
        "2276"
      ]
    },
    {
      "id": "flowers",
      "label": "flowers",
      "count": 1,
      "dreamIds": [
        "2269"
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
      "count": 11,
      "dreamIds": [
        "1655",
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
      "id": "grandparent",
      "label": "grandparent",
      "count": 5,
      "dreamIds": [
        "1655",
        "1765",
        "2249",
        "2252",
        "2301"
      ]
    },
    {
      "id": "children",
      "label": "children",
      "count": 3,
      "dreamIds": [
        "2263",
        "2271",
        "2309"
      ]
    },
    {
      "id": "idol",
      "label": "idol",
      "count": 2,
      "dreamIds": [
        "1749",
        "2282"
      ]
    },
    {
      "id": "teacher",
      "label": "teacher",
      "count": 2,
      "dreamIds": [
        "1747",
        "2249"
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
      "id": "roommate",
      "label": "roommate",
      "count": 1,
      "dreamIds": [
        "1774"
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
      "id": "concert-stage",
      "label": "concert / stage",
      "count": 3,
      "dreamIds": [
        "2282",
        "2311",
        "2336"
      ]
    },
    {
      "id": "parallel-school",
      "label": "parallel school",
      "count": 3,
      "dreamIds": [
        "2200",
        "2249",
        "2271"
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
      "id": "dorm",
      "label": "dorm / apartment",
      "count": 1,
      "dreamIds": [
        "1774"
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
      "count": 10,
      "dreamIds": [
        "1655",
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
      "id": "nostalgia",
      "label": "nostalgia",
      "count": 7,
      "dreamIds": [
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
      "id": "confusion",
      "label": "confusion",
      "count": 6,
      "dreamIds": [
        "1749",
        "1770",
        "2249",
        "2263",
        "2271",
        "2336"
      ]
    },
    {
      "id": "curiosity",
      "label": "curiosity",
      "count": 5,
      "dreamIds": [
        "1770",
        "2306",
        "2311",
        "2309",
        "2336"
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
      "id": "grief",
      "label": "grief",
      "count": 4,
      "dreamIds": [
        "2249",
        "2252",
        "2277",
        "2301"
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
