interface MediaEmbedProps {
  url?: string;
  label?: string;
}

export function MediaEmbed({ url, label = "Demo video" }: MediaEmbedProps) {
  return (
    <div className="aspect-video w-full bg-ink/[0.03] border border-line flex items-center justify-center overflow-hidden">
      {url ? (
        <iframe
          src={url}
          title={label}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <span className="font-sans text-sm text-ink-faint uppercase tracking-[0.06em]">
          {label} — coming soon
        </span>
      )}
    </div>
  );
}
