import { useRef, useEffect, useState, type CSSProperties, type Ref } from "react";
import { printKind, type PhotoPrint, type PrintRole } from "../collections";

export type PrintPose =
  | "none"
  | "tilt-l"
  | "tilt-r"
  | "tilt-l-soft"
  | "tilt-r-soft"
  | "lift"
  | "drop"
  | "nudge-l"
  | "nudge-r";

interface FloatingPrintProps {
  print: PhotoPrint;
  onOpen?: (src: string) => void;
  className?: string;
  role?: PrintRole;
  pose?: PrintPose;
  priority?: boolean;
  delayMs?: number;
  style?: CSSProperties;
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
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
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
  role,
  pose = "none",
  priority = false,
  delayMs = 0,
  style: styleProp,
}: FloatingPrintProps) {
  const { ref, inView } = useReveal<HTMLElement>();
  const resolvedRole = role ?? print.role ?? "frame";
  const kind = printKind(print);
  const canOpen = Boolean(onOpen);

  const style = {
    ...(delayMs ? { transitionDelay: `${delayMs}ms` } : {}),
    ...styleProp,
  } as CSSProperties;

  const media =
    kind === "video" ? (
      <video
        className="photo-frame__media"
        src={print.src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={print.alt}
      />
    ) : (
      <img
        className="photo-frame__media"
        src={print.src}
        alt={print.alt}
        style={print.focus ? { objectPosition: print.focus } : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );

  const body = (
    <>
      <span className="photo-frame__surface">{media}</span>
      {print.caption ? <span className="photo-frame__caption">{print.caption}</span> : null}
    </>
  );

  const classes = [
    "photo-frame",
    `photo-frame--${resolvedRole}`,
    pose !== "none" ? `photo-frame--${pose}` : "",
    kind === "video" ? "photo-frame--video" : "",
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
      aria-label={
        print.caption ? `Open: ${print.caption}` : `Open photograph: ${print.alt}`
      }
    >
      {body}
    </button>
  );
}
