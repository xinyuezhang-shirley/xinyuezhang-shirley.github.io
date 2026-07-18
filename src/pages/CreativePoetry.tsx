import { Link } from "react-router-dom";
import { Eyebrow, Display } from "@/components/type/Typography";
import { PoemBlock } from "@/components/media/PoemBlock";
import { poems } from "@/content/creative";

export default function CreativePoetry() {
  return (
    <div className="container py-16 md:py-24">
      <Link
        to="/creative"
        className="font-sans text-sm uppercase tracking-[0.06em] text-ink-soft hover:text-accent transition-colors"
      >
        ← Creative
      </Link>

      <Eyebrow className="mt-8 mb-6">Poetry</Eyebrow>
      <Display as="h1" className="text-display-2 max-w-3xl mb-20 md:mb-28">
        Eleven poems, 2020–2024.
      </Display>

      <div className="space-y-24 md:space-y-32 mx-auto">
        {poems.map((poem) => (
          <PoemBlock key={poem.slug} poem={poem} />
        ))}
      </div>
    </div>
  );
}
