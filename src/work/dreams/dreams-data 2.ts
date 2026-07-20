/** Auto-generated from Notes dream exports — redacted. Do not hand-edit. */
export type DreamPersonRef = { id: string; label: string };

export type DreamRecord = {
  id: string;
  ordinal: number;
  dateLabel: string;
  date: string | null;
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
  "generatedAt": "2026-07-20T02:59:07.192820Z",
  "opening": "Dreams are the only place where memory edits itself in real time.",
  "subtitle": "a private sky of recurring symbols",
  "captureNotes": {
    "notesAppleScript": "timed out (-1712) enumerating Notes.app",
    "notesSqliteTitles": 26,
    "rawExports": 26,
    "archiveSupplement": 7,
    "primarySource": "content/dreams/raw/*.txt (Notes exports; Z_PK ids match NoteStore.sqlite ZTITLE1)",
    "redaction": "Human names \u2192 [friend]/[roommate]/[idol]/[spouse figure]/[clubmate]/[classmate]/[character]/[dog]/[L\u2014]; place/brand/fictional kept"
  },
  "dreamCount": 26,
  "dreams": [
    {
      "id": "1655",
      "ordinal": 1,
      "dateLabel": "Entry 01",
      "date": null,
      "title": "Tourist bus surnames",
      "atmosphere": "fractured kinship",
      "text": "I had a dream I was talking to Beijing grandma in tourist bus and I told them my last name is [L\u2014] and I was a lawyer in training and somewhere in my dream I wanted to go kill this girl who is a social media influencer by putting posinsonous gas where she is going and since she is the only one who would be taking a lot of pictures she would pass out? Something also about dad flying to China but disappearing before the flight and so I canceled his flight so he got mad and disappeared I had a dream I met the guy that Elon slapped in the hotel elevator and he is ex Google or something but I said he was ex Apple because k don t know him except someone else told me lol",
      "excerpt": "On a tourist bus I tell Beijing grandma my last name is [L\u2014]\u2014I am a lawyer in training.",
      "interpretation": "Identity is performed for family in transit. A parallel strand invents hostility toward a public figure and a disappearing parent before a flight\u2014kinship, naming, and disappearance share one night.",
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
      "notesId": "1655"
    },
    {
      "id": "1720",
      "ordinal": 2,
      "dateLabel": "Entry 02",
      "date": null,
      "title": "Cats in cages",
      "atmosphere": "domestic inquiry",
      "text": "I had a dream where I was asking my , who apparently had 3 cats now, if her cats finally got used to being in cages because you need to take them in vets on cages and I think in my dream she posted on social media. She said no but they re betting better. Something something I also dreamed about someone talking about how music is all about the listener and that as an art form the youth and acceptance of the audience is really important ib;",
      "excerpt": "I ask whether the cats have finally gotten used to cages\u2014the ones you need for the vet.",
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
      "notesId": "1720"
    },
    {
      "id": "1742",
      "ordinal": 3,
      "dateLabel": "Entry 03",
      "date": null,
      "title": "Two named dogs",
      "atmosphere": "tender inventory",
      "text": "I had a dream I have two dogs, one named [dog] and done named [dog], [dog] is a small skinny dog and [dog] is a bigger sig eDQ.6A~",
      "excerpt": "Two dogs: [dog] small and skinny, [dog] larger\u2014named, sized, kept.",
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
      "notesId": "1742"
    },
    {
      "id": "1762",
      "ordinal": 4,
      "dateLabel": "Entry 04",
      "date": null,
      "title": "Watermelon neighbor",
      "atmosphere": "parallel childhood",
      "text": "I had a dream maybe in Some parallel universe I have a verge old friend who used to live next door and we did everything together. We would play ball and eat watermelon and I liked watching stars and one day we were watching the stars she left and never came back and we never saw for a long time and I found her contact later in the years and held a grudge that she never found me and one day I found her later and invited her to my house to sit and my mom jokingly asks so who was the one who liked watching stars as a kid. She said it was me and she only watched stars because I liked it and she left because she realized she had fallen in love with me. I broke out in tears and I realized something clicked in me and all the grudge I had been holding disappeared and I hugged her very tightly. I had felt lost and searching randomly in life and I let hobbies come by me but I could never feel as if I was watching stars as a kid again",
      "excerpt": "A verge-old friend next door\u2014ball, watermelon, stars\u2014leaves and never comes back.",
      "interpretation": "A parallel-universe friendship ends in disappearance and grudge. Reunion at home is mediated by a mother\u2019s joke about who liked whom.",
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
      "notesId": "1762"
    },
    {
      "id": "1765",
      "ordinal": 5,
      "dateLabel": "Entry 05",
      "date": null,
      "title": "Grandpa well again",
      "atmosphere": "restored embrace",
      "text": "Had a dream grandpa was well again and he is wearing cosplay with grandma and I hugged grandpa and grandma and in the picture grandpa is in a red suit and grandma in a brown suit and I think geandpa was a comedic actor and we fall over onto and he still looks as that we fall over onto him Had another dream I was part of northwestern club and I had to attend and event that had parents and also students in part of the comedy clubs and [clubmate] from solar asked me if I wanted for age but I was wedged int ehsbwat if whatever I was running in and I hit the table of the end point and fell over. For some reason I think [classmate] s dad was at the event and in running I passed by a white guy in a purple outfit. The event starts with different clubs of people talking and it started with the people, then some sort of club in fancy outfits and then it was and someone else and it was funny because he was acting as a couple and I think his mom was there and he goes and he has to wave at the table in our direction .and then idk what club it is performs and I was like oh that guy is cute",
      "excerpt": "Grandpa is well again in cosplay with grandma\u2014red suit, brown suit\u2014I hug them both.",
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
      "notesId": "1765"
    },
    {
      "id": "1770",
      "ordinal": 6,
      "dateLabel": "Entry 06",
      "date": null,
      "title": "BL mashup",
      "atmosphere": "narrative collage",
      "text": "Dreaming about BL plot lines and somehow I think the main guy is and it s like a mashup of different tropes and one of them he was a",
      "excerpt": "BL plot lines mash into tropes; the main figure keeps shifting roles.",
      "interpretation": "Story logic becomes a collage of romance tropes\u2014the dream watches genre assemble itself.",
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
      "notesId": "1770"
    },
    {
      "id": "1772",
      "ordinal": 7,
      "dateLabel": "Entry 07",
      "date": null,
      "title": "Editor's song",
      "atmosphere": "serious comedy",
      "text": "Had a dream from the point of view of an editor and apparently like you have to put the information of whatever song you use directly in the song or something so it s kind of funny in a very serious situation you hear a song and all the subtext is there and then lykn s charm is stuck in my head so that part with Lego spinning is the song in the is dream lol .",
      "excerpt": "In a very serious situation you hear a song\u2014and all the subtext is already inside it.",
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
      "notesId": "1772"
    },
    {
      "id": "1774",
      "ordinal": 8,
      "dateLabel": "Entry 08",
      "date": null,
      "title": "Roommate packing",
      "atmosphere": "exam anxiety",
      "text": "I had a dream I live in a dorm that looks kind of like an apartment and I live with the same roommate [roommate] and I wake up because I didn t close my door and I hear some noise and I see her packing her luggage s because I guess she doesn t have exams and I have sxams",
      "excerpt": "Dorm door left open\u2014I wake to my roommate packing luggage; she has no exams, I do.",
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
      "notesId": "1774"
    },
    {
      "id": "2200",
      "ordinal": 9,
      "dateLabel": "Entry 09",
      "date": null,
      "title": "California mountains",
      "atmosphere": "vivid custody",
      "text": "I dreamed I lived in the mountains of California and everything was so beautifully vibrant and colorful and I was at some rich friends house and probably friends of my parents and they had cows and I took pictures of cows and they had dogs and I took pictures of them too. I think I had powers to take nightmares off of people but I return when I sleep at night I must ward off the bad spirits and I look in the mirror I would be speaking and it is not what I am saying and I must stare at the mirror in order for me to stop saying by different things and for them to go away. The next day a little bit of that remains and I look at a dog with a little jacket and it looked like it was going to stand up and talk but when I look longer at it it just is a normal dog. I go on a school bus of some sort and outside it is so pretty and I show people the beautiful pictures I took of the dogs with my cameras. Mom talks about some kid who needed a laptop for work and I suggested something and I said something about how you cannot get a super cheap camera for school. Then I reach school and I find a seat and sit down and it was a really cool looking project class with big wooden tables and some of the people look like classmates I had in middle school",
      "excerpt": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror.",
      "interpretation": "Pastoral abundance flips into night duty. The mirror speaks with a voice that is not the dreamer\u2019s; care for others\u2019 nightmares becomes a private ordeal.",
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
      "notesId": "2200"
    },
    {
      "id": "2249",
      "ordinal": 10,
      "dateLabel": "Entry 10",
      "date": null,
      "title": "Fox and bingo rock",
      "atmosphere": "classroom injustice",
      "text": "Had a dream in a class where they give you a fox and I have this shiny golden green rock and they have numbers on it and the goal is when they list out a bunch of numbers you name the ones that are on your rock kind of like bingo and this really mean teacher when he got to me said that can t be right you cheated by writing more numbers and threw my rock away and I was sad and I walked out on him standing in the rain and across the street I see my grandpa and he recognizes me kind of like when I was a kid and walks toward me. There was then some sort of a revenge story on this kind of mean guy and somehow the people involved include ppw and it read like a novel that i was involved in Isn t it odd my dreams have more emotions now? I cry and get mad in them, I used to not feel things or be rage baited in dreams",
      "excerpt": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away.",
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
      "notesId": "2249"
    },
    {
      "id": "2252",
      "ordinal": 11,
      "dateLabel": "Entry 11",
      "date": null,
      "title": "Animals close up",
      "atmosphere": "fragile happiness",
      "text": "Had a dream that I as seeing animals really close up and it made me happy and I took cute pictures of penguins breaking the ice and there are rhinos that look like humans and then are holding peace signs and I posted on my social media saying absurdism popped of today. I tell me mom that looking at the animals make me happy and she holds my hand. She tells me about talking to our grandparents and making the pray and how they re getting better. I know in my heart they are not really getting better",
      "excerpt": "Penguins break ice; rhinos hold peace signs\u2014I tell mom looking at animals makes me happy.",
      "interpretation": "Joy is immediate and photographic. A parent\u2019s prayer for grandparents\u2019 recovery sits beside the dreamer\u2019s private knowledge that they are not really getting better.",
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
      "notesId": "2252"
    },
    {
      "id": "2263",
      "ordinal": 12,
      "dateLabel": "Entry 12",
      "date": null,
      "title": "Twin daughters",
      "atmosphere": "impossible kinship",
      "text": "I had a dream that I had twin daughters with my dad and it is a very weird dream but the kids are very cute. Halfway through the dream I was like is that not incest? That would mean the kids would be extremely disabled. During the dream they said one of the kids would need a wheelchair for the rest of their lives, which I accepted. They were twin girls with little bobs and turns out they were fine, which made no sense to me but they were very smiley and happy",
      "excerpt": "Twin girls with little bobs\u2014mid-dream the logic of kinship collapses, then they are simply happy.",
      "interpretation": "The dream stages an impossible family structure, interrupts itself with ethical alarm, then returns to the children\u2019s smiles as if the contradiction could be lived with.",
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
      "notesId": "2263"
    },
    {
      "id": "2269",
      "ordinal": 13,
      "dateLabel": "Entry 13",
      "date": null,
      "title": "Lotus incense plaza",
      "atmosphere": "curated desire",
      "text": "I dreamed I was shopping and there s this type of artificial flower that blossoms really pretty and it looks like a lotus and releases smell like incense. The shopping plaza also had cool things like bags shaped like torso and they have cool past designs that are like torso bags with different clothing styles btt ur apparently they are known for their crocodile skin shiny designs but whoever i was shopping with said that it was not as good as their past year designs. There was alsp this shop that looked like sanfu ish and it was bare bear branding and i walked in and saw WilliamEst Wesley merch and needed to get some lol. Also mom appeared in my dream driving and i think she was talking me shopping or something",
      "excerpt": "Artificial lotuses release incense; torso-shaped bags with past-year designs outshine this season\u2019s crocodile shine.",
      "interpretation": "Shopping becomes a museum of surfaces. Taste is comparative\u2014what was better last year haunts what is for sale now.",
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
      "notesId": "2269"
    },
    {
      "id": "2271",
      "ordinal": 14,
      "dateLabel": "Entry 14",
      "date": null,
      "title": "Parallel graduation",
      "atmosphere": "tender displacement",
      "text": "I had a dream that I graduated from The same schools in a patrolled universe but somehow I have slightly different geaduation photos and different songs playingin the background/ mom sends me a video of my talking and the tone pitch is higher than I remember having as a kid. I have more pictures from middle school graduation. I look slightly happier. I m in a trip with mom somewhere sunny that starts with a S that s for women and they play music. Mom still complains I used to be a more lovely child. Maybe in a parallel universe I d still be the same",
      "excerpt": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows.",
      "interpretation": "Graduation recurs as a fork in continuity\u2014images and pitch mark a self that is almost the same, almost happier, still accountable to a parent\u2019s complaint.",
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
      "notesId": "2271"
    },
    {
      "id": "2273",
      "ordinal": 15,
      "dateLabel": "Entry 15",
      "date": null,
      "title": "Library aquarium",
      "atmosphere": "civic unease",
      "text": "I dreamed that I was in a library that also was an aquarium that had creepy fish and also had a food court that had a Panda Express and the Panda Express worker was very mean to people",
      "excerpt": "A library that is also an aquarium, with a food court attached\u2014and a worker unkind to everyone.",
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
          "label": "library\u2013aquarium"
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
      "notesId": "2273"
    },
    {
      "id": "2276",
      "ordinal": 16,
      "dateLabel": "Entry 16",
      "date": null,
      "title": "Holiday drink",
      "atmosphere": "small insistence",
      "text": "I have a dream that there s a new type of and I got it and my mom was like there are so lag drinks at home and I was like I just really want this and it s the holidays, and she was like",
      "excerpt": "A new drink I really want\u2014mom says there are already so many at home; I say it\u2019s the holidays.",
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
      "notesId": "2276"
    },
    {
      "id": "2277",
      "ordinal": 17,
      "dateLabel": "Entry 17",
      "date": null,
      "title": "Funeral practice rooms",
      "atmosphere": "anticipatory grief",
      "text": "I had a dream where there are these office rooms that people practice the post death process of their loved ones and they sit there kind of lost and sad as their still alive a loved ones pick out what they d want others to eat at their funeral",
      "excerpt": "Office rooms where people practice the post-death process\u2014living loved ones choose what others would eat at the funeral.",
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
      "notesId": "2277"
    },
    {
      "id": "2282",
      "ordinal": 18,
      "dateLabel": "Entry 18",
      "date": null,
      "title": "Mom at the concert",
      "atmosphere": "fandom intimacy",
      "text": "I had a dream j brought my mom to a seventeen concert that also was like a fandom and when they started getting off from the stage to interact with everyone I high-fived with [idol] and [idol] and told [idol] you re the best and the [idol] came off and I was like and he said hi in Chinese but then he just started talking because there s a line to get back in stage and he was like this reminds me of when I took my mom to the concert and they were making bf me do tongue twisters and whatever and he got shy from laughing to he started talking to other people waiting in line but they were also people I know so I said oh they don t speak Chinese lol and he just waved it off and laughed and said something about tongue twisters and was like maybe we can do and walked away",
      "excerpt": "I bring mom to a Seventeen concert; idols leave the stage\u2014high-fives, Chinese hello, a tongue-twister line.",
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
      "notesId": "2282"
    },
    {
      "id": "2301",
      "ordinal": 19,
      "dateLabel": "Entry 19",
      "date": null,
      "title": "Grandpa young again",
      "atmosphere": "mourning clarity",
      "text": "I had a dream that grandpa has dimentia m. He hasn t talking to me in a long time now, but he talked to me in my dream. He was in his twenties, he remembers mom but does not remember me. He talks ago it everything technology wise being so new. He walks straight like he is still young. I cried in my dream. M\\!2Oh",
      "excerpt": "Grandpa talks\u2014he is in his twenties, remembers mom, does not remember me. I cried in the dream.",
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
      "notesId": "2301"
    },
    {
      "id": "2306",
      "ordinal": 20,
      "dateLabel": "Entry 20",
      "date": null,
      "title": "Pitch and gender",
      "atmosphere": "technical focus",
      "text": "I had a dream where basically I learned that there are different musical effects between a song sang by male va female voice when you raise the key and something technical about a higher pitch distorting the words a little or something like that and I had to write a written response of four examples is songs that either when sang at a female pitch has that result or sang at a male pitch does not have that result",
      "excerpt": "Raising the key changes a song differently in a male voice than in a female one\u2014words begin to distort.",
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
      "notesId": "2306"
    },
    {
      "id": "2309",
      "ordinal": 21,
      "dateLabel": "Entry 21",
      "date": null,
      "title": "Paused park",
      "atmosphere": "suspended curiosity",
      "text": "Had a dream Where I was somewhere with a Mickey mouse club house of sorts and it wasn t Disneyland and I was there for something else but I was like I should check that out. Everything in the amusement park was paused, like literally stopped in the air. I was walking across from somewhere, two guys in a cowboy cat were talking about stuff like stocks and houses and stuff, the houses next to them are majestic condos , and for a second I was like I d like to have one like that. I get to the clubhouse and nothing was there and it was mostly a few kids and I watching tv and there is this guy with cool glasses like the type where the screens has to be far away from the face and he was talking hilariously about how with glare he can t see something right under his face",
      "excerpt": "Everything in the amusement park was paused\u2014literally stopped in the air.",
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
      "notesId": "2309"
    },
    {
      "id": "2311",
      "ordinal": 22,
      "dateLabel": "Entry 22",
      "date": null,
      "title": "Nine-tailed fox drama",
      "atmosphere": "meta-myth",
      "text": "I had the coolest dream where I dreamed this kdrama and it is about religion and questioning and the main character is a nine tailed fox but in this setting she gains a new tail every 50 years so it keeps growing and I am not watching the show but I am at some sort of a fan view thing watching the episodes but then I am inside the episodes and at one episode there is this cool scene where they break the fourth wall and talk about all the shows out there that refer to religion and beliefs and sorcery and they stand on a square stage performing to the camera, but the camera does not move and they move around in the stage almost like they re acting out the scenes that switch one by one and it looks almost like a bboy competition where everyone is on the side lines and they come in and come out. For some reason phuwin was there and he started out with the plot of the story still and a kid acted as pperm where he messes up his dance and at that point it still faced the audience but then they turn around and face the camera and the back of the stage, then scene by scene it flies past showing the different references and the stage itself is a huge led screen and it cuts to the nine tailed fox and the very dramatic and beautiful religious music and everyone on the stage begins chanting very loudly to an almost culty speech it was beautiful",
      "excerpt": "A K-drama about religion\u2014a nine-tailed fox gains a tail every fifty years\u2014then breaks the fourth wall.",
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
      "notesId": "2311"
    },
    {
      "id": "2328",
      "ordinal": 23,
      "dateLabel": "Entry 23",
      "date": null,
      "title": "Worn-out labels",
      "atmosphere": "class observation",
      "text": "Has a dream I was looking through sweatshirts I already wore with labels that says this is worn out don t wear and it has just occurred to me that rich people never have to donate their stuff or remove them because they have all the space and they probably are able to collect everything they want to including every piece of clothing they wore if they wanted",
      "excerpt": "Sweatshirts labeled worn out\u2014don\u2019t wear. Rich people never have to donate; they can keep every piece.",
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
      "notesId": "2328"
    },
    {
      "id": "2336",
      "ordinal": 24,
      "dateLabel": "Entry 24",
      "date": null,
      "title": "Concert interface",
      "atmosphere": "mediated presence",
      "text": "was dreaming about all sorts of interactive uis for videos to the bts concert like clicking on the screen and then dirt would come off and I think it was focusing on the vibrations the concert makes and I also dreamed that [friend] was at the concert because there are visuals of her being confused",
      "excerpt": "Click the screen and dirt comes off; the interface listens for the concert\u2019s vibrations.",
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
      "notesId": "2336"
    },
    {
      "id": "2355",
      "ordinal": 25,
      "dateLabel": "Entry 25",
      "date": null,
      "title": "Temple of rounds",
      "atmosphere": "mythic urgency",
      "text": "I had this dream of this beautiful premise of gods and power where basically the power comes from like this beautiful palace with energy from the sun and moon and they show up as lights in mazes in the temple and the strongest can gather life form and sometimes the most strongest show up as gods that then live longer, but they are also able to kill eachother because over time they evolve powers and stuff and the scene I dreamed is that there is this power to reverse time of some sort and this other person who is like a less powerful god has a lethal bullet that they are merging and shooting and is warning that if he shoot s it is all over and there is really cool slow mow scene of the bullets me merging and shooting over and at the very last second everything reverses and the first person goes - are you kidding you will regret this, and the second person says, you will not remember for me to regret this, and something happens but basically everything still explodes because he adds in his own powers and everyone is gone and they all show up as lights in the temple seams again and all will come another round",
      "excerpt": "At the last second everything reverses\u2014then still explodes. Lights return to the temple seams for another round.",
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
      "notesId": "2355"
    },
    {
      "id": "2357",
      "ordinal": 26,
      "dateLabel": "Entry 26",
      "date": null,
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
      "notesId": "2357"
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
            "dateLabel": "Entry 01",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L\u2014]\u2014I am a lawyer in training."
          },
          {
            "dreamId": "1762",
            "dateLabel": "Entry 04",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door\u2014ball, watermelon, stars\u2014leaves and never comes back."
          },
          {
            "dreamId": "1765",
            "dateLabel": "Entry 05",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma\u2014red suit, brown suit\u2014I hug them both."
          },
          {
            "dreamId": "2200",
            "dateLabel": "Entry 09",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror."
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
            "dateLabel": "Entry 01",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L\u2014]\u2014I am a lawyer in training."
          },
          {
            "dreamId": "1765",
            "dateLabel": "Entry 05",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma\u2014red suit, brown suit\u2014I hug them both."
          },
          {
            "dreamId": "1772",
            "dateLabel": "Entry 07",
            "title": "Editor's song",
            "text": "In a very serious situation you hear a song\u2014and all the subtext is already inside it."
          },
          {
            "dreamId": "2252",
            "dateLabel": "Entry 11",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs\u2014I tell mom looking at animals makes me happy."
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
            "dateLabel": "Entry 02",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages\u2014the ones you need for the vet."
          },
          {
            "dreamId": "1772",
            "dateLabel": "Entry 07",
            "title": "Editor's song",
            "text": "In a very serious situation you hear a song\u2014and all the subtext is already inside it."
          },
          {
            "dreamId": "2271",
            "dateLabel": "Entry 14",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          },
          {
            "dreamId": "2282",
            "dateLabel": "Entry 18",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage\u2014high-fives, Chinese hello, a tongue-twister line."
          }
        ],
        "analysis": "Sound arrives already annotated\u2014songs carry their own footnotes, pitch shifts the words until meaning frays."
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
            "dateLabel": "Entry 02",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages\u2014the ones you need for the vet."
          },
          {
            "dreamId": "1742",
            "dateLabel": "Entry 03",
            "title": "Two named dogs",
            "text": "Two dogs: [dog] small and skinny, [dog] larger\u2014named, sized, kept."
          },
          {
            "dreamId": "2200",
            "dateLabel": "Entry 09",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2249",
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          }
        ],
        "analysis": "Animals witness joy before it is undercut\u2014dogs named, foxes given, penguins breaking ice."
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
            "dateLabel": "Entry 02",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages\u2014the ones you need for the vet."
          },
          {
            "dreamId": "1762",
            "dateLabel": "Entry 04",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door\u2014ball, watermelon, stars\u2014leaves and never comes back."
          },
          {
            "dreamId": "2249",
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2271",
            "dateLabel": "Entry 14",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Appears in 6 nights\u2014the sky keeps placing this word beside the others."
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
            "dateLabel": "Entry 01",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L\u2014]\u2014I am a lawyer in training."
          },
          {
            "dreamId": "1720",
            "dateLabel": "Entry 02",
            "title": "Cats in cages",
            "text": "I ask whether the cats have finally gotten used to cages\u2014the ones you need for the vet."
          },
          {
            "dreamId": "2200",
            "dateLabel": "Entry 09",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2252",
            "dateLabel": "Entry 11",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs\u2014I tell mom looking at animals makes me happy."
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
            "dateLabel": "Entry 06",
            "title": "BL mashup",
            "text": "BL plot lines mash into tropes; the main figure keeps shifting roles."
          },
          {
            "dreamId": "2249",
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2263",
            "dateLabel": "Entry 12",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs\u2014mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2271",
            "dateLabel": "Entry 14",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Appears in 5 nights\u2014the sky keeps placing this word beside the others."
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
            "dateLabel": "Entry 06",
            "title": "BL mashup",
            "text": "BL plot lines mash into tropes; the main figure keeps shifting roles."
          },
          {
            "dreamId": "2306",
            "dateLabel": "Entry 20",
            "title": "Pitch and gender",
            "text": "Raising the key changes a song differently in a male voice than in a female one\u2014words begin to distort."
          },
          {
            "dreamId": "2309",
            "dateLabel": "Entry 21",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused\u2014literally stopped in the air."
          },
          {
            "dreamId": "2311",
            "dateLabel": "Entry 22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion\u2014a nine-tailed fox gains a tail every fifty years\u2014then breaks the fourth wall."
          }
        ],
        "analysis": "You keep walking toward the clubhouse, the fox, the fourth wall\u2014just to see."
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
            "dateLabel": "Entry 01",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L\u2014]\u2014I am a lawyer in training."
          },
          {
            "dreamId": "1765",
            "dateLabel": "Entry 05",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma\u2014red suit, brown suit\u2014I hug them both."
          },
          {
            "dreamId": "2249",
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2252",
            "dateLabel": "Entry 11",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs\u2014I tell mom looking at animals makes me happy."
          }
        ],
        "analysis": "Grandparents restore and refuse recognition\u2014well again in cosplay, or young and unable to remember you."
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
            "dateLabel": "Entry 07",
            "title": "Editor's song",
            "text": "In a very serious situation you hear a song\u2014and all the subtext is already inside it."
          },
          {
            "dreamId": "2249",
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2263",
            "dateLabel": "Entry 12",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs\u2014mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2273",
            "dateLabel": "Entry 15",
            "title": "Library aquarium",
            "text": "A library that is also an aquarium, with a food court attached\u2014and a worker unkind to everyone."
          }
        ],
        "analysis": "Mean counters, poisonous gas plots, classroom shame\u2014civic spaces that smile wrong."
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
            "dateLabel": "Entry 09",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2309",
            "dateLabel": "Entry 21",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused\u2014literally stopped in the air."
          },
          {
            "dreamId": "2311",
            "dateLabel": "Entry 22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion\u2014a nine-tailed fox gains a tail every fifty years\u2014then breaks the fourth wall."
          },
          {
            "dreamId": "2355",
            "dateLabel": "Entry 25",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses\u2014then still explodes. Lights return to the temple seams for another round."
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
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2252",
            "dateLabel": "Entry 11",
            "title": "Animals close up",
            "text": "Penguins break ice; rhinos hold peace signs\u2014I tell mom looking at animals makes me happy."
          },
          {
            "dreamId": "2277",
            "dateLabel": "Entry 17",
            "title": "Funeral practice rooms",
            "text": "Office rooms where people practice the post-death process\u2014living loved ones choose what others would eat at the funeral."
          },
          {
            "dreamId": "2301",
            "dateLabel": "Entry 19",
            "title": "Grandpa young again",
            "text": "Grandpa talks\u2014he is in his twenties, remembers mom, does not remember me. I cried in the dream."
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
            "dateLabel": "Entry 12",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs\u2014mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2271",
            "dateLabel": "Entry 14",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          },
          {
            "dreamId": "2309",
            "dateLabel": "Entry 21",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused\u2014literally stopped in the air."
          }
        ],
        "analysis": "Appears in 3 nights\u2014the sky keeps placing this word beside the others."
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
            "dateLabel": "Entry 05",
            "title": "Grandpa well again",
            "text": "Grandpa is well again in cosplay with grandma\u2014red suit, brown suit\u2014I hug them both."
          },
          {
            "dreamId": "2269",
            "dateLabel": "Entry 13",
            "title": "Lotus incense plaza",
            "text": "Artificial lotuses release incense; torso-shaped bags with past-year designs outshine this season\u2019s crocodile shine."
          },
          {
            "dreamId": "2328",
            "dateLabel": "Entry 23",
            "title": "Worn-out labels",
            "text": "Sweatshirts labeled worn out\u2014don\u2019t wear. Rich people never have to donate; they can keep every piece."
          }
        ],
        "analysis": "Labels say worn out / don\u2019t wear; wealth is the space that never has to donate."
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
            "dateLabel": "Entry 18",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage\u2014high-fives, Chinese hello, a tongue-twister line."
          },
          {
            "dreamId": "2311",
            "dateLabel": "Entry 22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion\u2014a nine-tailed fox gains a tail every fifty years\u2014then breaks the fourth wall."
          },
          {
            "dreamId": "2336",
            "dateLabel": "Entry 24",
            "title": "Concert interface",
            "text": "Click the screen and dirt comes off; the interface listens for the concert\u2019s vibrations."
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
            "dateLabel": "Entry 18",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage\u2014high-fives, Chinese hello, a tongue-twister line."
          },
          {
            "dreamId": "2311",
            "dateLabel": "Entry 22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion\u2014a nine-tailed fox gains a tail every fifty years\u2014then breaks the fourth wall."
          },
          {
            "dreamId": "2336",
            "dateLabel": "Entry 24",
            "title": "Concert interface",
            "text": "Click the screen and dirt comes off; the interface listens for the concert\u2019s vibrations."
          }
        ],
        "analysis": "Appears in 3 nights\u2014the sky keeps placing this word beside the others."
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
            "dateLabel": "Entry 09",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2249",
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2271",
            "dateLabel": "Entry 14",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Appears in 3 nights\u2014the sky keeps placing this word beside the others."
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
            "dateLabel": "Entry 04",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door\u2014ball, watermelon, stars\u2014leaves and never comes back."
          },
          {
            "dreamId": "2249",
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2273",
            "dateLabel": "Entry 15",
            "title": "Library aquarium",
            "text": "A library that is also an aquarium, with a food court attached\u2014and a worker unkind to everyone."
          }
        ],
        "analysis": "Water refuses to stay in one building\u2014libraries become aquariums; rain arrives after public shame."
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
            "dateLabel": "Entry 12",
            "title": "Twin daughters",
            "text": "Twin girls with little bobs\u2014mid-dream the logic of kinship collapses, then they are simply happy."
          },
          {
            "dreamId": "2355",
            "dateLabel": "Entry 25",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses\u2014then still explodes. Lights return to the temple seams for another round."
          }
        ],
        "analysis": "Appears in 2 nights\u2014the sky keeps placing this word beside the others."
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
            "dateLabel": "Entry 01",
            "title": "Tourist bus surnames",
            "text": "On a tourist bus I tell Beijing grandma my last name is [L\u2014]\u2014I am a lawyer in training."
          },
          {
            "dreamId": "2200",
            "dateLabel": "Entry 09",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror."
          }
        ],
        "analysis": "Identity is performed in transit\u2014surnames, professions, and disappearances share one ride."
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
            "dateLabel": "Entry 16",
            "title": "Holiday drink",
            "text": "A new drink I really want\u2014mom says there are already so many at home; I say it\u2019s the holidays."
          },
          {
            "dreamId": "2309",
            "dateLabel": "Entry 21",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused\u2014literally stopped in the air."
          }
        ],
        "analysis": "Appears in 2 nights\u2014the sky keeps placing this word beside the others."
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
            "dateLabel": "Entry 10",
            "title": "Fox and bingo rock",
            "text": "A class fox, a numbered golden-green rock like bingo\u2014then a teacher throws the rock away."
          },
          {
            "dreamId": "2311",
            "dateLabel": "Entry 22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion\u2014a nine-tailed fox gains a tail every fifty years\u2014then breaks the fourth wall."
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
            "dateLabel": "Entry 09",
            "title": "California mountains",
            "text": "Mountains so colorful I photograph cows and dogs\u2014then learn I must ward off spirits in the mirror."
          },
          {
            "dreamId": "2355",
            "dateLabel": "Entry 25",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses\u2014then still explodes. Lights return to the temple seams for another round."
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
            "dateLabel": "Entry 08",
            "title": "Roommate packing",
            "text": "Dorm door left open\u2014I wake to my roommate packing luggage; she has no exams, I do."
          },
          {
            "dreamId": "2271",
            "dateLabel": "Entry 14",
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
            "dateLabel": "Entry 15",
            "title": "Library aquarium",
            "text": "A library that is also an aquarium, with a food court attached\u2014and a worker unkind to everyone."
          },
          {
            "dreamId": "2282",
            "dateLabel": "Entry 18",
            "title": "Mom at the concert",
            "text": "I bring mom to a Seventeen concert; idols leave the stage\u2014high-fives, Chinese hello, a tongue-twister line."
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
            "dateLabel": "Entry 22",
            "title": "Nine-tailed fox drama",
            "text": "A K-drama about religion\u2014a nine-tailed fox gains a tail every fifty years\u2014then breaks the fourth wall."
          },
          {
            "dreamId": "2336",
            "dateLabel": "Entry 24",
            "title": "Concert interface",
            "text": "Click the screen and dirt comes off; the interface listens for the concert\u2019s vibrations."
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
            "dateLabel": "Entry 21",
            "title": "Paused park",
            "text": "Everything in the amusement park was paused\u2014literally stopped in the air."
          },
          {
            "dreamId": "2355",
            "dateLabel": "Entry 25",
            "title": "Temple of rounds",
            "text": "At the last second everything reverses\u2014then still explodes. Lights return to the temple seams for another round."
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
            "dateLabel": "Entry 04",
            "title": "Watermelon neighbor",
            "text": "A verge-old friend next door\u2014ball, watermelon, stars\u2014leaves and never comes back."
          },
          {
            "dreamId": "2271",
            "dateLabel": "Entry 14",
            "title": "Parallel graduation",
            "text": "Same schools, slightly different photos. A childhood voice arrives pitched higher than memory allows."
          }
        ],
        "analysis": "Another version of you keeps living next door\u2014happier photos, unfinished friendships, surnames performed for family."
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
      "id": "photographs",
      "label": "photographs",
      "count": 6,
      "dreamIds": [
        "1655",
        "1720",
        "2200",
        "2252",
        "2271",
        "2336"
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
      "id": "parallel-self",
      "label": "parallel self",
      "count": 2,
      "dreamIds": [
        "1762",
        "2271"
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
      "id": "gods",
      "label": "gods",
      "count": 1,
      "dreamIds": [
        "2355"
      ]
    },
    {
      "id": "idol",
      "label": "idol / performer",
      "count": 1,
      "dreamIds": [
        "2282"
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
    },
    {
      "id": "teacher",
      "label": "teacher",
      "count": 1,
      "dreamIds": [
        "2249"
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
      "label": "library\u2013aquarium",
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
      ]
    },
    {
      "id": "nostalgia",
      "label": "nostalgia",
      "count": 6,
      "dreamIds": [
        "1720",
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
      "count": 5,
      "dreamIds": [
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
        "2309",
        "2311",
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
        "2309",
        "2311",
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
    },
    {
      "id": "urgency",
      "label": "urgency",
      "count": 2,
      "dreamIds": [
        "1765",
        "2355"
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
      "summary": "Spaces refuse single function: library\u2229aquarium\u2229food court; temple\u2229maze; amusement park that is not Disneyland; funeral offices; shopping plazas as museums of surfaces."
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
      "summary": "Music and voice recur as systems\u2014metadata inside songs, pitch distortion, pitch-shifted childhood speech, concert UIs, idol stages, music judged by youth acceptance."
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
      "summary": "Songs, concerts, dramas, and vocal keys become editable or enterable surfaces\u2014clicked, annotated, high-fived, or broken through a fourth wall."
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
      "summary": "Wealth appears as closet space, paused condos, mountain houses with cows, and shopping plazas where last year\u2019s design still wins."
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
