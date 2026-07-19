import { cn } from "@/lib/utils";
import type { CatalogueEntry } from "../catalogue";
import { CaptionBlock } from "./CaptionBlock";
import { useInView } from "./useInView";

type Layout =
  | "split"
  | "split-reverse"
  | "wide-left"
  | "tall-right"
  | "offset"
  | "stack";

type FigureSize = "default" | "wide" | "narrow";

interface EditorialSpreadProps {
  work: CatalogueEntry;
  layout?: Layout;
  figureSize?: FigureSize;
  lines?: string[];
  onOpen?: () => void;
  className?: string;
  objectFit?: "cover" | "contain";
  aspect?: string;
}

export function EditorialSpread({
  work,
  layout = "split",
  figureSize = "default",
  lines,
  onOpen,
  className,
  objectFit = "cover",
  aspect = "3 / 4",
}: EditorialSpreadProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn("art-spread", className)}
      aria-label={work.title}
    >
      <div className={cn("art-editorial", `art-editorial--${layout}`)}>
        <div
          className={cn(
            "art-editorial__figure art-reveal",
            inView && "is-inview",
            figureSize === "wide" && "art-editorial__figure--wide",
            figureSize === "narrow" && "art-editorial__figure--narrow"
          )}
        >
          {onOpen ? (
            <button
              type="button"
              className={cn("art-object-btn", objectFit === "contain" && "art-object--flush")}
              onClick={onOpen}
              aria-label={`Open ${work.title}`}
            >
              <div
                className={cn("art-object", objectFit === "contain" && "art-object--flush")}
                style={{ aspectRatio: aspect }}
              >
                <img
                  src={work.image}
                  alt={work.alt}
                  style={{ objectFit }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </button>
          ) : (
            <div
              className={cn("art-object", objectFit === "contain" && "art-object--flush")}
              style={{ aspectRatio: aspect }}
            >
              <img
                src={work.image}
                alt={work.alt}
                style={{ objectFit }}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
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
