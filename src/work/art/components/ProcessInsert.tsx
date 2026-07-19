import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";
import { ArtworkPlate } from "./ArtworkPlate";
import { useInView } from "./useInView";

interface ProcessInsertProps {
  label?: string;
  deck?: string;
  works: CatalogueEntry[];
  onOpen: (slug: string) => void;
  className?: string;
}

/**
 * Diptych / process insert — each piece at its true aspect (squares stay square).
 */
export function ProcessInsert({
  label = "Process · Album studies",
  deck,
  works,
  onOpen,
  className,
}: ProcessInsertProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn("art-process", className)}
      aria-label={label}
    >
      <header className="art-process__head">
        <p className="art-process__label">{label}</p>
        {deck ? <p className="art-mono__note">{deck}</p> : null}
      </header>
      <div
        className={cn(
          "art-process__grid",
          works.length === 2 && "art-process__grid--diptych",
          inView && "is-inview"
        )}
      >
        {works.map((work, i) => (
          <figure
            key={work.slug}
            className={cn(
              "art-process__item art-reveal",
              i === 1 && "art-reveal--delay-1",
              inView && "is-inview"
            )}
          >
            <ArtworkPlate
              work={work}
              onOpen={() => onOpen(work.slug)}
              size="column"
              tone="mist"
            />
            <figcaption className="art-process__cap">
              <span className="art-mono__plate">Pl. {work.plate}</span>
              <span className="art-archive__name">{work.title}</span>
              <span className="art-mono__meta">
                {work.year} · {work.medium}
              </span>
              {work.note ? <span className="art-mono__note">{work.note}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
