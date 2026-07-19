import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/work/art/components/useInView";

export function Reveal({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delayClass =
    delay === 1 ? " zine-reveal--d1" : delay === 2 ? " zine-reveal--d2" : delay === 3 ? " zine-reveal--d3" : "";
  return (
    <div
      ref={ref}
      className={`zine-reveal${delayClass}${inView ? " is-inview" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}

export function PoemSpread({
  children,
  tone = "cream",
  className = "",
  id,
  marker,
}: {
  children: ReactNode;
  tone?: "cream" | "newsprint" | "charcoal" | "burgundy" | "forest" | "blush" | "ink" | "vellum";
  className?: string;
  id?: string;
  marker?: string;
}) {
  return (
    <section id={id} className={`zine-spread zine-spread--${tone}${className ? ` ${className}` : ""}`}>
      {marker ? <PageMarker label={marker} /> : null}
      {children}
    </section>
  );
}

export function PageMarker({ label, className = "" }: { label: string; className?: string }) {
  return <p className={`zine-page-marker${className ? ` ${className}` : ""}`}>{label}</p>;
}

export function Caption({
  children,
  rotate,
  className = "",
  style,
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const merged: CSSProperties = {
    ...style,
    ...(rotate != null ? { ["--zine-rot" as string]: `${rotate}deg` } : null),
  };
  return (
    <p
      className={`zine-caption${rotate != null ? " zine-caption--tilt" : ""}${className ? ` ${className}` : ""}`}
      style={Object.keys(merged).length ? merged : undefined}
    >
      {children}
    </p>
  );
}

export function NotebookMargin({
  children,
  side = "right",
  className = "",
}: {
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <aside className={`zine-margin zine-margin--${side}${className ? ` ${className}` : ""}`}>{children}</aside>
  );
}

export function PoemFragment({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "blockquote";
}) {
  return <Tag className={`zine-fragment${className ? ` ${className}` : ""}`}>{children}</Tag>;
}

export function QuoteBlock({
  children,
  attribution,
  className = "",
}: {
  children: ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <blockquote className={`zine-quote${className ? ` ${className}` : ""}`}>
      <p>{children}</p>
      {attribution ? <cite>{attribution}</cite> : null}
    </blockquote>
  );
}

export function PaperLayer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`zine-paper${className ? ` ${className}` : ""}`}>{children}</div>;
}

type Crop =
  | "full"
  | "eyes"
  | "crown"
  | "hands"
  | "candle"
  | "cake"
  | "shadow"
  | "face"
  | "top"
  | "bottom"
  | "left"
  | "right";

const cropMap: Record<Crop, string> = {
  full: "50% 50%",
  eyes: "50% 28%",
  crown: "50% 8%",
  hands: "70% 75%",
  candle: "35% 55%",
  cake: "50% 78%",
  shadow: "40% 40%",
  face: "50% 35%",
  top: "50% 15%",
  bottom: "50% 85%",
  left: "20% 40%",
  right: "80% 40%",
};

export function EditorialPortrait({
  src,
  alt,
  crop = "full",
  className = "",
  scale = 1,
  priority = false,
  mono,
  /** `contain` shows the whole photograph; `cover` fills a frame (full-bleed only). */
  fit = "contain",
}: {
  src: string;
  alt: string;
  crop?: Crop;
  className?: string;
  scale?: number;
  priority?: boolean;
  mono?: boolean;
  fit?: "contain" | "cover";
}) {
  return (
    <div
      className={`zine-portrait zine-portrait--${fit}${mono ? " zine-portrait--mono" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          ["--zine-crop" as string]: cropMap[crop],
          ["--zine-scale" as string]: String(scale),
        } as CSSProperties
      }
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="zine-portrait__img"
      />
    </div>
  );
}

export function FullscreenPortrait({
  src,
  alt,
  crop = "full",
  children,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  crop?: Crop;
  children?: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`zine-fullbleed${className ? ` ${className}` : ""}`}>
      <EditorialPortrait
        src={src}
        alt={alt}
        crop={crop}
        scale={1.02}
        fit="cover"
        priority={priority}
        className="zine-fullbleed__media"
      />
      {children ? <div className="zine-fullbleed__overlay">{children}</div> : null}
    </div>
  );
}

export function Collage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`zine-collage${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function Stanza({
  text,
  className = "",
  align = "left",
}: {
  text: string;
  className?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <p className={`zine-stanza zine-stanza--${align}${className ? ` ${className}` : ""}`}>{text}</p>
  );
}

export function PoemTitle({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <h2 className={`zine-poem-title${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </h2>
  );
}

export function HandNote({
  children,
  className = "",
  strike,
  style,
}: {
  children: ReactNode;
  className?: string;
  strike?: boolean;
  style?: CSSProperties;
}) {
  return (
    <p
      className={`zine-hand${strike ? " zine-hand--strike" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </p>
  );
}

export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`zine-stamp${className ? ` ${className}` : ""}`}>{children}</span>;
}

export function LineReveal({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`zine-line-reveal${inView ? " is-inview" : ""}${className ? ` ${className}` : ""}`}>
      {lines.map((line, i) => (
        <p key={`${i}-${line.slice(0, 12)}`} style={{ ["--i" as string]: i } as CSSProperties}>
          {line || "\u00A0"}
        </p>
      ))}
    </div>
  );
}
