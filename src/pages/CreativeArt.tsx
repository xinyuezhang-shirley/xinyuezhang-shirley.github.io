import { Link } from "react-router-dom";
import { Eyebrow, Display, Body } from "@/components/type/Typography";
import { MediaFigure } from "@/components/media/MediaFigure";
import { artworks } from "@/content/creative";

export default function CreativeArt() {
  return (
    <div className="container py-16 md:py-24">
      <Link
        to="/creative"
        className="font-sans text-sm uppercase tracking-[0.06em] text-ink-soft hover:text-accent transition-colors"
      >
        ← Creative
      </Link>

      <Eyebrow className="mt-8 mb-6">Art</Eyebrow>
      <Display as="h1" className="text-display-2 max-w-3xl mb-20 md:mb-28">
        Digital art, fan art, and commissions — myco.to
      </Display>

      <div className="space-y-24 md:space-y-32 max-w-2xl mx-auto">
        {artworks.map((art) => (
          <MediaFigure
            key={art.slug}
            src={art.image}
            alt={art.title}
            caption={`${art.title} — ${art.medium}, ${art.date}. ${art.description}`}
          />
        ))}
      </div>

      <Body className="text-center mt-20">That's everything, for now.</Body>
    </div>
  );
}
