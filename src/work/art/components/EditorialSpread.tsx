import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";
import { ArtworkPlate } from "./ArtworkPlate";
import { CaptionBlock } from "./CaptionBlock";
import { useInView } from "./useInView";

type Layout =
  | "split"
  | "split-reverse"
  | "wide-left"
  | "tall-right"
  | "offset"
  | "stack"
  | "anchor";

type FigureSize = "wide" | "column" | "narrow";
type Ground = "paper" | "mist" | "ink";

interface EditorialSpreadProps {
  work: CatalogueEntry;
  layout?: Layout;
  figureSize?: FigureSize;
  ground?: Ground;
  lines?: string[];
  annotation?: string;
  onOpen?: () => void;
  className?: string;
}

/**
 * Editorial spread: artwork dictates column width; caption docks to the plate.
 * No forced aspect-ratio boxes. No object-fit: cover.
 */
export function EditorialSpread({
  work,
  layout = "split",
  figureSize,
  ground = "paper",
  lines,
  annotation,
  onOpen,
  className,
}: EditorialSpreadProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const size: FigureSize =
    figureSize ??
    (work.orientation === "landscape"
      ? "wide"
      : work.orientation === "square"
        ? "column"
        : "narrow");

  return (
    <section
      ref={ref}
      className={cn(
        "art-spread",
        `art-spread--${ground}`,
        className
      )}
      aria-label={work.title}
    >
      <div className={cn("art-editorial", `art-editorial--${layout}`)}>
        <div
          className={cn(
            "art-editorial__figure art-reveal",
            inView && "is-inview",
            `art-editorial__figure--${size}`
          )}
        >
          <ArtworkPlate
            work={work}
            onOpen={onOpen}
            size={size}
            tone={ground === "ink" ? "ink" : "paper"}
          />
          {annotation ? (
            <p className="art-annotation">{annotation}</p>
          ) : null}
        </div>

        <aside
          className={cn(
            "art-editorial__side art-reveal art-reveal--delay-1",
            inView && "is-inview"
          )}
        >
          <CaptionBlock work={work} lines={lines} onOpen={onOpen} />
        </aside>
      </div>
    </section>
  );
}
