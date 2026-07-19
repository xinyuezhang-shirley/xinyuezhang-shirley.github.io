import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";

type PlateTone = "paper" | "mist" | "ink" | "flush";
type PlateSize = "spread" | "wide" | "column" | "narrow" | "thumb";

interface ArtworkPlateProps {
  work: CatalogueEntry;
  onOpen?: () => void;
  /** Never cover for full artwork — contain / natural height only. */
  size?: PlateSize;
  tone?: PlateTone;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Full artwork presentation. Preserves intrinsic aspect ratio.
 * Detail crops use DetailCrop — not this component.
 */
export function ArtworkPlate({
  work,
  onOpen,
  size = "column",
  tone = "paper",
  className,
  imgClassName,
  priority = false,
}: ArtworkPlateProps) {
  const frame = (
    <div
      className={cn(
        "art-plate",
        `art-plate--${size}`,
        `art-plate--${tone}`,
        className
      )}
    >
      <img
        src={work.image}
        alt={work.alt}
        width={work.width}
        height={work.height}
        className={cn("art-plate__img", imgClassName)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );

  if (!onOpen) return frame;

  return (
    <button
      type="button"
      className="art-object-btn"
      onClick={onOpen}
      aria-label={`Open ${work.title}`}
    >
      {frame}
    </button>
  );
}
