import { useEffect, useId, useRef } from "react";
import {
  collectionForSrc,
  getViewerPrints,
  printKind,
  type PhotoPrint,
} from "../collections";

interface FullscreenViewerProps {
  src: string | null;
  open: boolean;
  onClose: () => void;
  onChange: (src: string) => void;
}

export function FullscreenViewer({
  src,
  open,
  onClose,
  onChange,
}: FullscreenViewerProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const prints = getViewerPrints();
  const index = src ? prints.findIndex((p) => p.src === src) : -1;
  const print: PhotoPrint | undefined = index >= 0 ? prints[index] : undefined;
  const collection = print ? collectionForSrc(print.src) : undefined;

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight" && index >= 0 && index < prints.length - 1) {
        event.preventDefault();
        onChange(prints[index + 1].src);
      } else if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        onChange(prints[index - 1].src);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, prints, onClose, onChange]);

  if (!open || !print) return null;

  const hasPrev = index > 0;
  const hasNext = index < prints.length - 1;

  return (
    <div
      className="photo-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="photo-viewer__bar">
        <span id={titleId} className="photo-viewer__collection">
          {collection?.title ?? "Photograph"}
        </span>
        <button
          ref={closeRef}
          type="button"
          className="photo-viewer__btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="photo-viewer__stage">
        {printKind(print) === "video" ? (
          <video
            key={print.src}
            src={print.src}
            controls
            autoPlay
            playsInline
            loop
            aria-label={print.alt}
          />
        ) : (
          <img src={print.src} alt={print.alt} />
        )}
      </div>

      <div className="photo-viewer__bar">
        <div className="photo-viewer__nav">
          <button
            type="button"
            className="photo-viewer__btn"
            onClick={() => hasPrev && onChange(prints[index - 1].src)}
            disabled={!hasPrev}
          >
            Prev
          </button>
          <button
            type="button"
            className="photo-viewer__btn"
            onClick={() => hasNext && onChange(prints[index + 1].src)}
            disabled={!hasNext}
          >
            Next
          </button>
        </div>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(prints.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
