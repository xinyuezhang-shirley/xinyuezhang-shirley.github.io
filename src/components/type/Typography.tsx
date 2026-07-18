import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: BaseProps) {
  return (
    <span
      className={cn(
        "block font-sans text-eyebrow uppercase tracking-[0.08em] text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Display({
  children,
  className,
  as: Tag = "h1",
}: BaseProps & { as?: ElementType }) {
  return (
    <Tag className={cn("font-serif text-display-1 font-light text-ink", className)}>
      {children}
    </Tag>
  );
}

export function Heading({
  children,
  className,
  as: Tag = "h2",
  size = 1,
}: BaseProps & { as?: ElementType; size?: 1 | 2 }) {
  return (
    <Tag
      className={cn(
        "font-serif text-ink",
        size === 1 ? "text-heading-1" : "text-heading-2",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Body({
  children,
  className,
  lg = false,
}: BaseProps & { lg?: boolean }) {
  return (
    <p
      className={cn(
        "font-sans text-ink-soft leading-relaxed",
        lg ? "text-lg md:text-xl" : "text-base",
        className
      )}
    >
      {children}
    </p>
  );
}

export function PullQuote({ children, className }: BaseProps) {
  return (
    <blockquote
      className={cn(
        "font-serif italic text-heading-2 text-ink leading-snug border-l border-line pl-6",
        className
      )}
    >
      {children}
    </blockquote>
  );
}
