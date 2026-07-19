import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";

interface CaptionBlockProps {
  work: CatalogueEntry;
  lines?: string[];
  showPlate?: boolean;
  onOpen?: () => void;
  className?: string;
  tone?: "light" | "dark";
}

export function CaptionBlock({
  work,
  lines,
  showPlate = true,
  onOpen,
  className,
  tone = "light",
}: CaptionBlockProps) {
  const body = lines ?? work.lore;

  const inner = (
    <>
      <div className="art-caption__row">
        {showPlate && <span className="art-mono__plate">Pl. {work.plate}</span>}
        <span className="art-mono__meta">
          {work.year} · {work.medium}
        </span>
      </div>
      <h2 className="art-mono__title">{work.title}</h2>
      {work.edition ? <p className="art-mono__meta art-caption__edition">{work.edition}</p> : null}
      {body?.length ? (
        <div className="art-mono__lore">
          {body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      {work.note && !body?.length ? <p className="art-mono__note">{work.note}</p> : null}
      {work.note && body?.length ? (
        <p className="art-mono__note art-caption__margin">{work.note}</p>
      ) : null}
    </>
  );

  return (
    <div
      className={cn("art-caption", tone === "dark" && "art-caption--dark", className)}
    >
      {onOpen ? (
        <button type="button" onClick={onOpen} aria-label={`View ${work.title} fullscreen`}>
          {inner}
        </button>
      ) : (
        inner
      )}
    </div>
  );
}
