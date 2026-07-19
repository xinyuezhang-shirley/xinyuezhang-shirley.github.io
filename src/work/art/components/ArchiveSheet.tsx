import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";
import { ArtworkPlate } from "./ArtworkPlate";

interface ArchiveSheetProps {
  works: CatalogueEntry[];
  onOpen: (slug: string) => void;
  className?: string;
  title?: string;
  deck?: string;
}

/**
 * Museum catalogue sheet — not a gallery grid.
 * Thumbs keep intrinsic aspect; landscape / portrait / square read differently.
 */
export function ArchiveSheet({
  works,
  onOpen,
  className,
  title = "Archive",
  deck = "All plates. Catalogue.",
}: ArchiveSheetProps) {
  return (
    <section className={cn("art-archive", className)} aria-label={title}>
      <header className="art-archive__head">
        <p className="art-mono__meta">{title}</p>
        <h2 className="art-mono__title art-archive__title">{deck}</h2>
        <p className="art-mono__note">
          Contact sheet · aspect ratios preserved · click any plate to enlarge
        </p>
      </header>

      <ol className="art-archive__sheet">
        {works.map((work) => (
          <li
            key={work.slug}
            className={cn(
              "art-archive__entry",
              `art-archive__entry--${work.orientation}`
            )}
          >
            <button
              type="button"
              className="art-archive__cell"
              onClick={() => onOpen(work.slug)}
              aria-label={`${work.title}, ${work.year}`}
            >
              <span className="art-mono__plate art-archive__plate">
                Pl. {work.plate}
              </span>
              <ArtworkPlate work={work} size="thumb" tone="mist" />
              <span className="art-archive__meta">
                <span className="art-archive__name">{work.title}</span>
                <span className="art-mono__meta">
                  {work.year} · {work.medium}
                </span>
                {work.edition ? (
                  <span className="art-archive__edition">{work.edition}</span>
                ) : null}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
