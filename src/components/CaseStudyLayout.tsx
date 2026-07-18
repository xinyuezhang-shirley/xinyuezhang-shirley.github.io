import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Eyebrow, Heading } from "@/components/type/Typography";

interface CaseStudyLayoutProps {
  eyebrow: string;
  title: string;
  meta: string;
  tags?: string[];
  backHref: string;
  backLabel: string;
  children: ReactNode;
  /** When true, children control their own measure (figures may exceed prose width). */
  wide?: boolean;
}

export function CaseStudyLayout({
  eyebrow,
  title,
  meta,
  tags,
  backHref,
  backLabel,
  children,
  wide = false,
}: CaseStudyLayoutProps) {
  return (
    <article className="container py-16 md:py-24">
      <Link
        to={backHref}
        className="font-sans text-sm uppercase tracking-[0.06em] text-ink-soft hover:text-accent transition-colors"
      >
        ← {backLabel}
      </Link>

      <header className="mt-8 mb-16 max-w-3xl">
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <Heading as="h1" size={1} className="mb-4">
          {title}
        </Heading>
        <p className="font-sans text-sm text-ink-faint">{meta}</p>
        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-3 mt-4">
            {tags.map((tag) => (
              <li
                key={tag}
                className="font-sans text-xs uppercase tracking-[0.06em] text-ink-soft border border-line px-2.5 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {wide ? (
        <div>{children}</div>
      ) : (
        <div className="max-w-prose space-y-6">{children}</div>
      )}
    </article>
  );
}
