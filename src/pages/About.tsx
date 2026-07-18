import { Eyebrow, Display, Body, PullQuote } from "@/components/type/Typography";
import { philosophy, amateurismEssay } from "@/content/about";

export default function About() {
  return (
    <div className="container py-16 md:py-24">
      <Eyebrow className="mb-6">About</Eyebrow>
      <Display as="h1" className="text-display-2 max-w-3xl mb-16">
        {philosophy.statement}
      </Display>

      <div className="max-w-prose space-y-6 mb-32">
        {philosophy.intro.map((paragraph, i) => (
          <Body key={i} lg>
            {paragraph}
          </Body>
        ))}
      </div>

      <div className="max-w-prose">
        <PullQuote className="mb-4">{amateurismEssay.title}</PullQuote>
        <p className="font-sans text-sm text-ink-faint mb-10">{amateurismEssay.note}</p>
        <div className="space-y-6">
          {amateurismEssay.paragraphs.map((paragraph, i) => (
            <Body key={i} lg>
              {paragraph}
            </Body>
          ))}
        </div>
      </div>
    </div>
  );
}
