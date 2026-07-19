import { Link } from "react-router-dom";
import "@/work/nommi/nommi.css";

const LIVE = "https://cs278-food-recommender.vercel.app/login";
const GITHUB = "https://github.com/xinyuezhang-shirley/cs278FoodRecommender";
const DEMO =
  "https://drive.google.com/file/d/1cKhn_LGc8OKSMK_N_nMVoV6_aah97AK8/preview";

export default function NommiRoom() {
  return (
    <article className="nommi-room">
      <div className="nommi-inner">
        <Link to="/work" className="nommi-back">
          ← Work
        </Link>

        <img
          className="nommi-logo"
          src="/work/nommi/nommi-logo.png"
          alt="Nommi"
          width={160}
          height={160}
        />

        <header>
          <p className="nommi-eyebrow">Study · Social computing</p>
          <h1 className="nommi-title">Nommi</h1>
          <p className="nommi-meta">
            CS278 · Stanford · with Aditya Garg &amp; Alexis Young · Spring 2026
          </p>
        </header>

        <p className="nommi-claim">
          The hardest part of a social platform isn&apos;t the features — it&apos;s the community
          that has to exist before the features mean anything.
        </p>

        <div className="nommi-prose">
          <p>
            Campus food discovery runs on group chats and screenshots. Nommi treats
            recommendations and free-food sightings as a shared resource — one post can be a feed
            item, a map pin, a thread, and a save — because the same piece of knowledge is useful
            in all four forms.
          </p>
          <p>
            We designed it to feel like the apps students already use, not a review site. Location
            is first-class. Circles gave repeat interaction a home. Underneath: React, Supabase,
            Leaflet, row-level security that took more care than any feature.
          </p>
        </div>

        <div className="nommi-stats" aria-label="Launch metrics">
          <div className="nommi-stat">
            <strong>31</strong>
            <span>organic users</span>
          </div>
          <div className="nommi-stat">
            <strong>74%</strong>
            <span>recommendation posts</span>
          </div>
          <div className="nommi-stat">
            <strong>16%</strong>
            <span>free-food posts — highest engagement</span>
          </div>
        </div>

        <div className="nommi-links">
          <a className="nommi-link" href={LIVE} target="_blank" rel="noopener noreferrer">
            Visit live ↗
          </a>
          <a className="nommi-link" href={GITHUB} target="_blank" rel="noopener noreferrer">
            View code ↗
          </a>
        </div>

        <section className="nommi-section" aria-labelledby="nm-demo">
          <h2 id="nm-demo" className="nommi-section-title">
            Interaction
          </h2>
          <div className="nommi-video">
            <iframe
              src={DEMO}
              title="Nommi demo video"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
          <p className="nommi-caption">
            Product walkthrough. Pattern and logo above are from the shipped app&apos;s graphics —
            the room borrows Nommi&apos;s warmth instead of inventing a third palette.
          </p>
        </section>

        <section className="nommi-learn" aria-labelledby="nm-learn">
          <h2 id="nm-learn">What I learned · why remember it</h2>
          <div className="nommi-prose">
            <p>
              Free-food posts were rare and disproportionately engaging — exactly the asymmetry we
              expected. Circles and friendships never reached critical mass. Shipping a correct
              schema is easier than summoning a community. That honesty is the reason this study
              stays in the exhibition.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
