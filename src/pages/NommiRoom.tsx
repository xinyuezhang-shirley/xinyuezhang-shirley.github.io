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
  float?: string;
}[] = [
  {
    id: "context",
    scene: "feed",
    label: "Context",
    title: "Food knowledge dies in the chat.",
    body: [
      "On campus, recommendations and free-food sightings live in screenshots and group threads that scroll away. Nommi treats that knowledge as a shared resource — one post that can be a feed card, a map pin, a conversation, and a save.",
    ],
    float: "Same post · four surfaces",
  },
  {
    id: "problem",
    scene: "chat",
    label: "Problem",
    title: "Speed without memory.",
    body: [
      "Students already share food the way they share memes — fast, informal, social. A review site would kill that energy. The problem wasn’t “more listings.” It was keeping the signal alive after the chat moved on.",
    ],
    float: "Conversations become durable posts",
  },
  {
    id: "design",
    scene: "map",
    label: "Design",
    title: "Location is first-class.",
    body: [
      "Piggyback prototyping showed people share pins, not essays. So the map isn’t a sidebar — it’s how you browse. Free-food posts pulse. Circles like Free Food Radar give repeat interaction a home beside the public feed.",
    ],
    float: "Leaflet · Places · campus geography",
  },
  {
    id: "tech",
    scene: "insight",
    label: "Technical decisions",
    title: "One post object, many queries.",
    body: [
      "React + Vite on Supabase. Posts sit at the center of the schema so the same row can power chronology for the feed and geospatial reads for the map. Auth, email verification, and row-level security took more care than any feature — users can only rewrite their own history.",
    ],
  },
  {
    id: "outcome",
    scene: "insight",
    label: "Outcome",
    title: "31 people. One hard lesson.",
    body: [
      "30 verified. 20 took a real action. Recommendations dominated volume; free-food dominated engagement per post. Every post carried location. The ambitious social graph — circles, friendships — never reached the density it needed.",
    ],
  },
  {
    id: "reflect",
    scene: "reflect",
    label: "Reflection",
    title: "Community is the product.",
    body: [
      "Shipping a correct schema is easier than summoning a critical mass. Nommi stays in the exhibition because it is honest about that: the hardest part of a social platform isn’t the features — it’s the community that has to exist before the features mean anything.",
    ],
  },
];

/**
 * Nommi world — sticky living phone; chapters drive the scene.
 */
export default function NommiRoom() {
  const [scene, setScene] = useState<NommiScene>("feed");
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
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <article className="nommi-world">
      <div className="nommi-world__top">
        <Link to="/work" className="nommi-world__back">
          ← Work
        </Link>
        <header className="nommi-world__hero">
          <p className="nommi-world__eyebrow">Social computing · Stanford CS278</p>
          <h1 className="nommi-world__title">Nommi</h1>
          <p className="nommi-world__tag">
            Scroll the story. The phone stays — and stays alive.
          </p>
        </header>
      </div>

      <div className="nommi-world__layout">
        <aside className="nommi-world__phone-col">
          <NommiPhone scene={scene} />
        </aside>

        <div className="nommi-chapters">
          {CHAPTERS.map((ch, i) => (
            <section
              key={ch.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-idx={i}
              className="nommi-chapter"
              aria-labelledby={`nm-${ch.id}`}
            >
              <p className="nommi-chapter__label">{ch.label}</p>
              <h2 id={`nm-${ch.id}`}>{ch.title}</h2>
              {ch.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {ch.float ? <div className="nommi-float">{ch.float}</div> : null}
              {ch.id === "reflect" ? (
                <div className="nommi-links">
                  <a href={LIVE} target="_blank" rel="noopener noreferrer">
                    Open live app
                  </a>
                  <a className="ghost" href={GITHUB} target="_blank" rel="noopener noreferrer">
                    View code
                  </a>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
