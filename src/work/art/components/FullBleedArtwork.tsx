import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";
import { CaptionBlock } from "./CaptionBlock";
import { useInView } from "./useInView";

interface FullBleedArtworkProps {
  work: CatalogueEntry;
  onOpen?: () => void;
  caption?: boolean;
  objectPosition?: string;
  className?: string;
}

export function FullBleedArtwork({
  work,
  onOpen,
  caption = true,
  objectPosition,
  className,
}: FullBleedArtworkProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={cn("art-fullbleed", inView && "is-inview", className)}
    >
      <div className="art-fullbleed__media">
        {onOpen ? (
          <button
            type="button"
            className="art-fullbleed__hit"
            onClick={onOpen}
            aria-label={`Open ${work.title}`}
          >
            <img
              src={work.image}
              alt={work.alt}
              style={objectPosition ? { objectPosition } : undefined}
              loading="lazy"
              decoding="async"
            />
          </button>
        ) : (
          <img
            src={work.image}
            alt={work.alt}
            style={objectPosition ? { objectPosition } : undefined}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      {caption ? (
        <figcaption className="art-fullbleed__caption">
          <CaptionBlock work={work} lines={[]} showPlate tone="dark" onOpen={onOpen} />
        </figcaption>
      ) : null}
    </figure>
  );
}
