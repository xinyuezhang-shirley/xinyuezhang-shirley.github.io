import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";
import { ArtworkPlate } from "./ArtworkPlate";
import { CaptionBlock } from "./CaptionBlock";
import { useInView } from "./useInView";

interface FullBleedArtworkProps {
  work: CatalogueEntry;
  onOpen?: () => void;
  caption?: boolean;
  className?: string;
  /** Optional pull lines shown with the museum label under the plate. */
  lines?: string[];
}

/**
 * Full-spread plate: edge-to-edge width, natural height — never cropped to fill a viewport.
 * Title sits as a museum label immediately under the artwork.
 */
export function FullBleedArtwork({
  work,
  onOpen,
  caption = true,
  className,
  lines,
}: FullBleedArtworkProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const dark = work.orientation === "landscape" || work.image.includes("zion");

  return (
    <figure
      ref={ref}
      className={cn(
        "art-spread-plate",
        dark && "art-spread-plate--ink",
        inView && "is-inview",
        className
      )}
    >
      <div className={cn("art-spread-plate__media art-reveal", inView && "is-inview")}>
        <ArtworkPlate
          work={work}
          onOpen={onOpen}
          size="spread"
          tone="flush"
          priority
        />
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "art-spread-plate__caption art-reveal art-reveal--delay-1",
            inView && "is-inview"
          )}
        >
          <CaptionBlock
            work={work}
            lines={lines}
            showPlate
            tone={dark ? "dark" : "light"}
            onOpen={onOpen}
          />
        </figcaption>
      ) : null}
    </figure>
  );
}
