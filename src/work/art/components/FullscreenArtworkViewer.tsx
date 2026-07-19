import { useEffect, useId, useRef } from "react";
import type { CatalogueEntry } from "../catalogue";

interface FullscreenArtworkViewerProps {
  works: CatalogueEntry[];
  index: number;
  open: boolean;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function FullscreenArtworkViewer({
  works,
  index,
  open,
  onClose,
  onChange,
}: FullscreenArtworkViewerProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const work = works[index];

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onChange(Math.min(works.length - 1, index + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onChange(Math.max(0, index - 1));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, works.length, onClose, onChange]);

  if (!open || !work) return null;

  const hasPrev = index > 0;
  const hasNext = index < works.length - 1;

  return (
    <div
      className="art-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="art-viewer__top">
        <div className="art-viewer__meta">
          <span className="art-mono__plate" style={{ color: "rgba(247,245,242,0.55)" }}>
            Pl. {work.plate}
          </span>
          <h2 id={titleId} className="art-viewer__title">
            {work.title}
          </h2>
          <span className="art-mono__meta" style={{ color: "rgba(247,245,242,0.55)" }}>
            {work.year} · {work.medium}
          </span>
          {work.note ? <p className="art-viewer__note">{work.note}</p> : null}
        </div>
        <button
          ref={closeRef}
          type="button"
          className="art-viewer__btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="art-viewer__stage">
        <img src={work.image} alt={work.alt} />
      </div>

      <div className="art-viewer__bottom">
        <div className="art-viewer__nav">
          <button
            type="button"
            className="art-viewer__btn"
            onClick={() => onChange(index - 1)}
            disabled={!hasPrev}
          >
            Prev
          </button>
          <button
            type="button"
            className="art-viewer__btn"
            onClick={() => onChange(index + 1)}
            disabled={!hasNext}
          >
            Next
          </button>
        </div>
        <span className="art-mono__plate" style={{ color: "rgba(247,245,242,0.45)" }}>
          {String(index + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
