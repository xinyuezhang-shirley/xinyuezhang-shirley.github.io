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
    story: ["Authored room — live Pulse, hybrid pipeline, walkthrough."],
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
    story: ["Authored room — live Constellation, soundtrack, live studio link."],
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
      "Campus food discovery as a shared resource — and an honest lesson about community critical mass.",
    claim: "Community is the hard part.",
    story: ["Authored study room — live product, demo, shipped metrics."],
    liveUrl: "https://cs278-food-recommender.vercel.app/login",
    githubUrl: "https://github.com/xinyuezhang-shirley/cs278FoodRecommender",
    demoVideoUrl:
      "https://drive.google.com/file/d/1cKhn_LGc8OKSMK_N_nMVoV6_aah97AK8/preview",
  },
  {
    slug: "systems-signals",
    title: "Systems & Signals",
    role: "Engineer",
    org: "Tesla · PwC · NU Solar",
    dates: "2023–2025",
    tags: ["ai-ml", "data-systems", "data-viz"],
    teaser:
      "Fleet telemetry, multi-agent RAG, and solar-car dashboards — fidelity under time pressure.",
    claim: "Make uncertainty legible to the person who has to act.",
    story: ["Quiet archival room grouping three production-facing chapters."],
  },
];
