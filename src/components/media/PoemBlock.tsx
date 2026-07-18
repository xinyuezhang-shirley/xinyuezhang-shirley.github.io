import type { Poem } from "@/content/types";

export function PoemBlock({ poem }: { poem: Poem }) {
  return (
    <article className="max-w-prose">
      <div className="flex items-baseline justify-between gap-6 mb-6">
        <h2 className="font-serif text-heading-2 text-ink">{poem.title}</h2>
        <span className="font-sans text-sm text-ink-faint whitespace-nowrap">{poem.date}</span>
      </div>
      <p className="font-serif text-lg leading-[1.85] text-ink whitespace-pre-line">
        {poem.content}
      </p>
    </article>
  );
}
