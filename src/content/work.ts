import type { WorkProject } from "./types";

export const workProjects: WorkProject[] = [
  {
    slug: "muselab",
    title: "MuseLab",
    role: "Designer & Developer",
    org: "Independent project",
    dates: "2025–2026",
    tags: ["ai-ml", "generative-systems", "writing", "nlp"],
    teaser:
      "A literary workshop that returns a dossier, not a chat — interpretation over generation.",
    claim: "Charts and graphs are evidence. The reading is the product.",
    story: [
      "Authored room at /work/muselab — live Pulse figure, hybrid pipeline, walkthrough. Not a screenshot gallery.",
    ],
  },
  {
    slug: "echo",
    title: "Echo",
    role: "Designer & Developer",
    org: "Independent project",
    dates: "2024–2025",
    tags: ["generative-systems", "nlp", "data-viz", "frontend", "writing"],
    teaser:
      "A computational text art studio — words that continue breathing across five afterlives.",
    claim: "Language is not static information. It is movement.",
    story: [
      "Authored room at /work/echo — live Constellation figure, Echo dialect, soundtrack, walkthrough. Live studio linked.",
    ],
    liveUrl: "https://cs146j-finalproject.onrender.com/",
    demoVideoUrl: "https://youtu.be/DXuX2TFZ5ro",
  },
  {
    slug: "nommi",
    title: "Nommi",
    role: "Co-creator",
    org: "CS278: Social Computing, Stanford University",
    dates: "Spring 2026",
    tags: ["social-computing", "frontend", "data-systems"],
    teaser:
      "A social food-discovery platform for Stanford students, deployed to real users and evaluated against social computing theory.",
    story: [
      "Food discovery on a college campus runs almost entirely on social networks — group chats, screenshots of Google Maps pins, word of mouth — and almost none of it is searchable, organized, or built to surface free food before it's gone. With Aditya Garg and Alexis Young, I built Nommi: a platform that treats food recommendations and free-food sightings as a shared, community-owned resource instead of a thread that disappears into a group chat. A single post — a restaurant recommendation, a free-food sighting, an event — can show up as a feed post, a map pin, a discussion thread, and a saved item, because the same piece of campus food knowledge is genuinely useful in all four forms.",
      "We designed it to feel like the apps students already use for this — Instagram, RedNote, group chats — rather than a review site, because our early piggyback prototyping showed people sharing recommendations quickly and informally, not writing reviews. Location turned out to matter as much as the recommendation itself, so the map (built on Leaflet with Google Places and OpenStreetMap) is a first-class way to browse, not an afterthought. Smaller \"circles\" — Coffee & Quiet Corners, Stanford Free Food Radar — gave repeat interaction a home alongside the public feed.",
      "Underneath, Nommi is a React, TypeScript, and Vite frontend on Supabase, deployed on Vercel. Posts are the central content object — a Postgres schema connects profiles, posts, comments, reactions, circles, and saved items so the same post can be queried chronologically for the feed and geospatially for the map without maintaining two systems. Supabase Auth with email verification and row-level security ensured users could only modify their own content, which took more effort than any feature in the app. AI tools — ChatGPT, Claude, Cursor — accelerated implementation throughout, while the architecture, UX, and taste decisions stayed ours.",
      "We launched to 31 organic users; 30 verified, 20 took a real action — posting, commenting, reacting, or saving. Recommendations made up 74% of posts, free-food sightings only 16%, but free-food posts drew the highest engagement per post by a clear margin — exactly the asymmetry we expected going in. Every single post carried location data, and the platform never reached the critical mass needed for the more ambitious community features — circles, friendships — to take off. That's the most useful finding of the whole project: the hardest part of a social platform isn't the features, it's the community that has to exist before the features mean anything.",
    ],
    liveUrl: "https://cs278-food-recommender.vercel.app/login",
    githubUrl: "https://github.com/xinyuezhang-shirley/cs278FoodRecommender",
    demoVideoUrl:
      "https://drive.google.com/file/d/1cKhn_LGc8OKSMK_N_nMVoV6_aah97AK8/preview",
  },
  {
    slug: "pwc",
    title: "Multi-agent RAG tooling",
    role: "Software Engineering Intern",
    org: "PwC (PricewaterhouseCoopers)",
    dates: "Jun 2025 – Aug 2025",
    tags: ["ai-ml", "data-systems", "frontend"],
    teaser:
      "Routing queries through a multi-agent Langflow system wrapped around an internal retrieval-augmented generation pipeline.",
    story: [
      "I worked inside an internal AI platform built around retrieval-augmented generation — the kind of system meant to let people ask plain questions of dense, hierarchical document sets and get back something trustworthy. My main contribution was a multi-agent system in Langflow that sat in front of the RAG pipeline, routing each incoming query between a retrieval agent and a conversational agent depending on what the question actually needed, with translation and response post-processing layered on top.",
      "The rest of the internship split between two things that don't usually share a sentence: evaluation logic and rendering bugs. I wrote backend evaluation code for the RAG prototypes to check whether the system was retrieving the right documents and producing answers worth trusting, and separately tracked down full-stack bugs where deeply nested, hierarchical data was breaking the frontend's rendering logic and causing cascading UI failures. Fixing both halves taught the same lesson twice: what makes an AI feature feel reliable usually has nothing to do with the model.",
    ],
  },
  {
    slug: "tesla",
    title: "Fleet-scale brake health detection",
    role: "Data Analyst Intern, ML & Data Engineering",
    org: "Tesla",
    dates: "Mar 2025 – Jun 2025",
    tags: ["ai-ml", "data-systems"],
    teaser:
      "A production ML pipeline that reads fleet telemetry for the early signs of brake system degradation.",
    story: [
      "Every Model 3 on the road constantly reports telemetry back to Tesla, and somewhere in that fleet-scale stream of time-series data are the early signs of a brake system wearing out before anyone would notice from the driver's seat. I designed and deployed the production ML pipeline that looks for those signs — a model trained on fleet telemetry to predict brake system degradation, with its outputs wired directly into the live monitoring and diagnostics tools engineers actually use.",
      "Prediction alone isn't useful without a way to act on it, so I built the surrounding pipeline as a human-in-the-loop workflow: the model surfaces high-risk vehicles, and an engineer's judgment decides what happens next, which made thermal-related issue detection and root-cause investigation considerably faster. A good amount of the internship was less glamorous than \"deployed an ML model\" suggests — cross-functional debugging of production data and firmware regressions, working with firmware and engineering teams to find the systemic issues actually causing the noise in the data the model was trained on.",
    ],
  },
  {
    slug: "nu-solar",
    title: "Telemetry & diagnostics platform",
    role: "Software Team Lead",
    org: "NU Solar, Northwestern University",
    dates: "Sep 2023 – Mar 2025",
    tags: ["data-systems", "data-viz"],
    teaser:
      "Turning a solar car's raw CAN bus signal into a real-time driver dashboard and a backend diagnostics pipeline.",
    story: [
      "A solar car generates a constant stream of CAN bus data — battery state, motor temperature, panel output, dozens of other signals — and that data is only useful once it reaches somewhere a person can read it, fast enough to matter. As software team lead, I led the integration of the system that parses that CAN data and automates its storage and processing onto AWS, turning a stream of raw vehicle signals into something the rest of the team could build on.",
      "From there I led two visualization pipelines built on the same underlying data for two very different audiences: one feeds the driver dashboard in real time, where a glance has to be enough; the other supports backend time-series analysis for engineering diagnostics, where the goal is depth rather than speed. Both ran on SQL for querying and Python for processing, built to operate across distributed systems rather than a single machine — the kind of infrastructure work that's invisible when it's working and is the entire story when it isn't.",
    ],
  },
];
