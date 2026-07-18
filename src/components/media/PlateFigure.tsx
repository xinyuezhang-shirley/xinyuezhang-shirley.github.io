import { cn } from "@/lib/utils";

export interface PlateFigureProps {
  src: string;
  alt: string;
  plate: string;
  caption: string;
  className?: string;
  priority?: boolean;
}

/** Editorial plate: tracked micro-label + full-bleed image + caption. */
export function PlateFigure({
  src,
  alt,
  plate,
  caption,
  className,
  priority = false,
}: PlateFigureProps) {
  return (
    <figure className={cn("not-prose", className)}>
      <p className="mb-3 font-sans text-eyebrow uppercase tracking-[0.14em] text-ink-faint">
        {plate}
      </p>
      <div className="border border-line bg-paper overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-auto block"
        />
      </div>
      <figcaption className="mt-3 max-w-prose font-sans text-sm text-ink-faint leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
