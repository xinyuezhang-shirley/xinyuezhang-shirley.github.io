import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/work/art/components/useInView";

export function Reveal({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delayClass = delay === 1 ? " zine-reveal--d1" : delay === 2 ? " zine-reveal--d2" : "";
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
}: {
  children: ReactNode;
  tone?: "cream" | "charcoal" | "burgundy" | "forest" | "blush" | "ink";
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`zine-spread zine-spread--${tone}${className ? ` ${className}` : ""}`}>
      {children}
    </section>
  );
}

/** Show the entire photograph/composite. Never crop. */
export function Plate({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`zine-plate${className ? ` ${className}` : ""}`}>
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
    </figure>
  );
}

export function PoemTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={`zine-poem-title${className ? ` ${className}` : ""}`}>{children}</h2>;
}

export function Stanza({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return <p className={`zine-stanza${className ? ` ${className}` : ""}`}>{text}</p>;
}

export function Meta({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p className={`zine-meta${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </p>
  );
}

export function HandNote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`zine-hand${className ? ` ${className}` : ""}`}>{children}</p>;
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
