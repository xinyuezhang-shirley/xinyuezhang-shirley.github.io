import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NommiPhone, type NommiScene } from "@/work/nommi/components/NommiPhone";
import "@/work/nommi/nommi-world.css";

const LIVE = "https://cs278-food-recommender.vercel.app/login";
const GITHUB = "https://github.com/xinyuezhang-shirley/cs278FoodRecommender";

const CHAPTERS: {
  id: string;
  scene: NommiScene;
  label: string;
  title: string;
  body: string[];
}[] = [
  {
    id: "problem",
    scene: "chat",
    label: "Campus problem",
    title: "Useful knowledge dies in the chat.",
    body: [
      "College communities already create local knowledge — free-food sightings, quiet study corners, pop-up events — but it lives in temporary group chats, screenshots, text chains, and stories that scroll away.",
      "Nommi’s argument is social-computing, not “another food app”: turn student-generated tips into shared community infrastructure.",
    ],
  },
  {
    id: "disappear",
    scene: "fade",
    label: "Disappearance",
    title: "New messages bury the tip.",
    body: [
      "Group-chat knowledge is fast and social — and structurally ephemeral. By the time someone needs the same tip tomorrow, the thread has moved on.",
      "Screenshots are a private workaround. They do not become a commons.",
    ],
  },
  {
    id: "structure",
    scene: "compose",
    label: "Structure",
    title: "The same tip becomes a Nommi post.",
    body: [
      "A contribution is captured with place, time, and type so it can travel across surfaces without losing meaning.",
      "Food and free-food sightings are important examples of a larger pattern: local knowledge that should outlive a single conversation.",
    ],
  },
  {
    id: "feed",
    scene: "feed",
    label: "Feed",
    title: "It enters the community feed.",
    body: [
      "The feed is where contributions become visible to peers — using the real Nommi interface from the CS278 deployment, not a generic social mock.",
      "Recommendations and free-food posts share one object model so chronology and trust cues stay consistent.",
    ],
  },
  {
    id: "map",
    scene: "map",
    label: "Map",
    title: "It becomes a map pin.",
    body: [
      "Location is first-class. The same post can be browsed geographically — how students already share campus knowledge in practice.",
      "Open the live app to walk the interactive map; the still here keeps the product’s real visual language.",
    ],
  },
  {
    id: "thread",
    scene: "thread",
    label: "Conversation",
    title: "Peers add context.",
    body: [
      "Comments refine the tip without forcing it back into a private chat. Reciprocity is visible: contribution invites contribution.",
      "Trust is designed through verification, ownership of edits, and community norms — not anonymous dump of listings.",
    ],
  },
  {
    id: "save",
    scene: "save",
    label: "Save",
    title: "It is saved and reused.",
    body: [
      "Saving turns a fleeting tip into a personal resource while keeping the original contribution in the commons.",
      "That loop — contribute, discover, reuse — is the difference between a chat screenshot and community memory.",
    ],
  },
  {
    id: "memory",
    scene: "memory",
    label: "Memory",
    title: "It persists as community knowledge.",
    body: [
      "In the CS278 study, 31 people joined organically; 30 verified; 20 took a real action. Recommendations dominated volume; free-food posts drove engagement per post. Every post carried location.",
      "The hard lesson: shipping schema and features is easier than summoning critical mass. Community is the product.",
    ],
  },
];

/**
 * Nommi — sticky phone + community-knowledge scroll story.
 */
export default function NommiRoom() {
  const [scene, setScene] = useState<NommiScene>("chat");
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.idx);
        const next = CHAPTERS[idx]?.scene;
        if (next) setScene(next);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <article className="nommi-world">
      <div className="nommi-world__bg" aria-hidden="true" />
      <div className="nommi-world__inner">
        <header className="nommi-world__hero">
          <Link to="/work" className="nommi-world__back">
            ← Work
          </Link>
          <img src="/work/nommi/nommi-logo.png" alt="Nommi" className="nommi-world__logo" />
          <p className="nommi-world__eyebrow">CS278 · Stanford · Social computing</p>
          <h1 className="nommi-world__title">Nommi</h1>
          <p className="nommi-world__claim">
            College communities already know things. Nommi keeps that knowledge from disappearing
            into the chat.
          </p>
          <div className="nommi-world__cta">
            <a href={LIVE} target="_blank" rel="noreferrer">
              Open live Nommi app
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              View source on GitHub
            </a>
          </div>
        </header>

        <div className="nommi-world__layout">
          <div className="nommi-world__phone-slot">
            <NommiPhone scene={scene} />
            <p className="nommi-world__phone-note">
              Scroll the story — the phone follows using real Nommi feed stills and product chrome.
            </p>
          </div>

          <div className="nommi-world__chapters">
            {CHAPTERS.map((ch, i) => (
              <section
                key={ch.id}
                className="nommi-chapter"
                data-idx={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
              >
                <div className="nommi-chapter__panel">
                  <p className="nommi-chapter__label">{ch.label}</p>
                  <h2>{ch.title}</h2>
                  {ch.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="nommi-chapter">
              <div className="nommi-chapter__panel">
                <p className="nommi-chapter__label">Design principles</p>
                <h2>Trust, reciprocity, moderation</h2>
                <p>
                  Nommi treats students as authors of local knowledge. Verification and ownership of
                  edits protect trust; contribution loops make reciprocity visible; community norms —
                  not scrapers — decide what belongs in the commons.
                </p>
                <p>
                  Feed, map, conversation, and save are one post object with many queries — so campus
                  knowledge can move without losing its place in community memory.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
