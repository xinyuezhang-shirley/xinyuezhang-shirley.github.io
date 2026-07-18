interface MediaFigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function MediaFigure({ src, alt, caption, className }: MediaFigureProps) {
  return (
    <figure className={className}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto" />
      {caption && (
        <figcaption className="mt-3 font-sans text-sm text-ink-faint">{caption}</figcaption>
      )}
    </figure>
  );
}
