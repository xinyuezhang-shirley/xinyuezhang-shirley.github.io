import { cn } from "@/lib/utils";
import type { CatalogueEntry, CropFocus } from "../catalogue";
import { useInView } from "./useInView";

interface DetailCropProps {
  work: CatalogueEntry;
  focus?: CropFocus;
  wide?: boolean;
  caption?: string;
  onOpen?: () => void;
  className?: string;
}

function CropFrame({
  work,
  focus,
  wide,
  onOpen,
  caption,
}: {
  work: CatalogueEntry;
  focus: CropFocus;
  wide?: boolean;
  onOpen?: () => void;
  caption?: string;
}) {
  const crop = (
    <div
      className={cn(
        "art-detail__crop",
        `art-detail__crop--${focus}`,
        wide && "art-detail__crop--wide"
      )}
    >
      <img src={work.image} alt={work.alt} loading="lazy" decoding="async" />
    </div>
  );

  if (!onOpen) return crop;

  return (
    <button
      type="button"
      className="art-object-btn"
      onClick={onOpen}
      aria-label={caption ? `${work.title}: ${caption}` : `Detail from ${work.title}`}
    >
      {crop}
    </button>
  );
}

export function DetailCrop({
  work,
  focus = "center",
  wide = false,
  caption,
  onOpen,
  className,
}: DetailCropProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={cn("art-detail", inView && "is-inview", className)}
    >
      <CropFrame
        work={work}
        focus={focus}
        wide={wide}
        onOpen={onOpen}
        caption={caption}
      />
      {caption ? (
        <figcaption
          className={cn(
            "art-mono__meta art-reveal art-reveal--delay-1",
            inView && "is-inview"
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

interface DetailDuoProps {
  left: DetailCropProps;
  right: DetailCropProps;
  className?: string;
}

export function DetailDuo({ left, right, className }: DetailDuoProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn("art-spread art-spread--tight", className)}
      aria-label="Details"
    >
      <div className={cn("art-detail art-detail--duo", inView && "is-inview")}>
        <div>
          <CropFrame
            work={left.work}
            focus={left.focus ?? "center"}
            wide={left.wide}
            onOpen={left.onOpen}
            caption={left.caption}
          />
          {left.caption ? (
            <p className="art-mono__meta" style={{ marginTop: "0.65rem" }}>
              {left.caption}
            </p>
          ) : null}
        </div>
        <div>
          <CropFrame
            work={right.work}
            focus={right.focus ?? "center"}
            wide={right.wide}
            onOpen={right.onOpen}
            caption={right.caption}
          />
          {right.caption ? (
            <p className="art-mono__meta" style={{ marginTop: "0.65rem" }}>
              {right.caption}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
