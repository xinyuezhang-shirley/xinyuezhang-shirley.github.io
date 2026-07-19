import { useRef, useEffect, useState, type CSSProperties, type Ref } from "react";
import type { PhotoPrint } from "../collections";
import { PhotoCaption } from "./PhotoCaption";

interface FloatingPrintProps {
  print: PhotoPrint;
  onOpen?: (src: string) => void;
  className?: string;
  priority?: boolean;
  delayMs?: number;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function FloatingPrint({
  print,
  onOpen,
  className = "",
  priority = false,
  delayMs = 0,
}: FloatingPrintProps) {
  const { ref, inView } = useReveal<HTMLElement>();
  const size = print.size ?? "md";
  const orient = print.orient ?? "landscape";
  const rotate = print.rotate ?? 0;
  const isCrop = Boolean(print.crop);
  const canOpen = Boolean(onOpen) && !print.inert;

  const style = {
    "--print-rot": `${rotate}deg`,
    ...(isCrop && print.crop ? { "--crop-aspect": print.crop.aspect } : {}),
    ...(delayMs ? { animationDelay: `${delayMs}ms` } : {}),
  } as CSSProperties;

  const wrapClass = [
    "photo-print__img-wrap",
    isCrop ? "" : `photo-print__img-wrap--${orient}`,
  ]
    .filter(Boolean)
    .join(" ");

  const imgStyle: CSSProperties = {
    objectPosition: print.crop?.objectPosition ?? print.focus ?? "center",
  };

  const body = (
    <span className="photo-print__paper">
      <span
        className={wrapClass}
        style={
          isCrop && print.crop
            ? ({ aspectRatio: print.crop.aspect } as CSSProperties)
            : undefined
        }
      >
        <img
          className="photo-print__img"
          src={print.src}
          alt={print.alt}
          style={imgStyle}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </span>
      {print.note ? <PhotoCaption>{print.note}</PhotoCaption> : null}
    </span>
  );

  const classes = [
    "photo-print",
    `photo-print--${size}`,
    isCrop ? "photo-print--crop" : "",
    inView ? "is-in" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!canOpen) {
    return (
      <div ref={ref as Ref<HTMLDivElement>} className={classes} style={style}>
        {body}
      </div>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      style={style}
      onClick={() => onOpen?.(print.src)}
      aria-label={print.note ? `Open: ${print.note}` : `Open photograph: ${print.alt}`}
    >
      {body}
    </button>
  );
}
