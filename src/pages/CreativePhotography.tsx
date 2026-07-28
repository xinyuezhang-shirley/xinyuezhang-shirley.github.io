import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/photography/photo-box.css";
import {
  photoCollections,
  type PhotoCollectionData,
} from "@/work/photography/collections";
import { FullscreenViewer } from "@/work/photography/components/FullscreenViewer";
import { PhotoCollection } from "@/work/photography/components/PhotoCollection";
import { fetchPublishedPhotoCollections } from "@/lib/studioApi";

export default function CreativePhotography() {
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);
  const [studioCollections, setStudioCollections] = useState<PhotoCollectionData[]>(
    [],
  );

  useEffect(() => {
    let cancelled = false;
    void fetchPublishedPhotoCollections().then(({ items }) => {
      if (cancelled) return;
      const existing = new Set(photoCollections.map((c) => c.id));
      const mapped: PhotoCollectionData[] = [];
      for (const col of items) {
        if (!col.slug || existing.has(col.slug) || existing.has(col.id)) continue;
        const prints = (col.photos || [])
          .map((p, i) => {
            const src = p.optimized_url || p.thumbnail_url;
            if (!src) return null;
            return {
              id: p.id || `${col.slug}-${i}`,
              src,
              alt: p.caption || col.title,
              caption: p.caption || undefined,
              role: (i === 0 ? "hero" : "sequence") as "hero" | "sequence",
            };
          })
          .filter((p): p is NonNullable<typeof p> => p !== null);
        if (prints.length === 0) continue;
        mapped.push({
          id: col.slug,
          title: col.title,
          rationale: col.description || "Published from Studio.",
          layout: prints.length === 1 ? "single-hero" : "hero-sequence",
          prints,
        });
      }
      setStudioCollections(mapped);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const collections = useMemo(
    () => [...photoCollections, ...studioCollections],
    [studioCollections],
  );

  const open = useCallback((src: string) => setViewerSrc(src), []);
  const close = useCallback(() => setViewerSrc(null), []);

  return (
    <div className="photo-box">
      <header className="photo-box__intro">
        <div className="photo-rail">
          <Link to="/creative" className="photo-box__back">
            ← Creative
          </Link>
          <p className="photo-box__eyebrow">Photography</p>
          <h1 className="photo-box__title">Selected photographs</h1>
          <p className="photo-box__lede">
            Series grouped by what I was studying — light through glass, coastal color,
            performance motion, campus structure — shown large enough to read.
          </p>
        </div>
      </header>

      {collections.map((collection) => (
        <PhotoCollection key={collection.id} collection={collection} onOpen={open} />
      ))}

      <footer className="photo-box__closer">
        <div className="photo-rail">
          <p className="photo-box__closer-meta">End of selection</p>
          <p className="photo-box__closer-line">
            The book stops here — more rolls stay in the archive.
          </p>
        </div>
      </footer>

      <FullscreenViewer
        src={viewerSrc}
        open={viewerSrc !== null}
        onClose={close}
        onChange={setViewerSrc}
      />
    </div>
  );
}
