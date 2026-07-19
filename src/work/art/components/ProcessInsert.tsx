import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";

interface ProcessInsertProps {
  label?: string;
  works: CatalogueEntry[];
  onOpen: (slug: string) => void;
  className?: string;
}

export function ProcessInsert({
  label = "Process · Album studies",
  works,
  onOpen,
  className,
}: ProcessInsertProps) {
  return (
    <section className={cn("art-process", className)} aria-label={label}>
      <p className="art-process__label">{label}</p>
      <div className="art-process__grid">
        {works.map((work) => (
          <button
            key={work.slug}
            type="button"
            className="art-process__item"
            onClick={() => onOpen(work.slug)}
          >
            <div className="art-process__frame">
              <img src={work.image} alt={work.alt} loading="lazy" decoding="async" />
            </div>
            <div className="art-process__cap">
              <span className="art-mono__plate">Pl. {work.plate}</span>
              <span className="art-archive__name">{work.title}</span>
              <span className="art-mono__meta">
                {work.year} · {work.medium}
              </span>
              {work.note ? <span className="art-mono__note">{work.note}</span> : null}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
