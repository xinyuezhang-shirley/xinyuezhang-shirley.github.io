import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";

interface ArchiveSheetProps {
  works: CatalogueEntry[];
  onOpen: (slug: string) => void;
  className?: string;
  title?: string;
  deck?: string;
}

export function ArchiveSheet({
  works,
  onOpen,
  className,
  title = "Catalogue",
  deck = "All plates. Contact sheet.",
}: ArchiveSheetProps) {
  return (
    <section className={cn("art-archive", className)} aria-label={title}>
      <header className="art-archive__head">
        <p className="art-mono__meta">{title}</p>
        <h2 className="art-mono__title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          {deck}
        </h2>
      </header>

      <div className="art-archive__grid">
        {works.map((work) => (
          <button
            key={work.slug}
            type="button"
            className="art-archive__cell"
            onClick={() => onOpen(work.slug)}
            aria-label={`${work.title}, ${work.year}`}
          >
            <div className="art-archive__thumb">
              <img src={work.image} alt={work.alt} loading="lazy" decoding="async" />
            </div>
            <div className="art-archive__meta">
              <span className="art-mono__plate">Pl. {work.plate}</span>
              <span className="art-archive__name">{work.title}</span>
              <span className="art-mono__meta">
                {work.year} · {work.medium}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
