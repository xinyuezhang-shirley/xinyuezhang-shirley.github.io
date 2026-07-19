import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/photography/photo-box.css";
import { photoCollections } from "@/work/photography/collections";
import { FullscreenViewer } from "@/work/photography/components/FullscreenViewer";
import { PhotoCollection } from "@/work/photography/components/PhotoCollection";

export default function CreativePhotography() {
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  const open = useCallback((src: string) => setViewerSrc(src), []);
  const close = useCallback(() => setViewerSrc(null), []);

  return (
    <div className="photo-box">
      <header className="photo-box__intro">
        <Link to="/creative" className="photo-box__back">
          ← Creative
        </Link>
        <p className="photo-box__eyebrow">Photography</p>
        <h1 className="photo-box__title">A box of photographs.</h1>
        <p className="photo-box__lede">
          Things noticed — sorted by light, mood, and the way one print leans toward another.
        </p>
      </header>

      {photoCollections.map((collection) => (
        <PhotoCollection
          key={collection.id}
          collection={collection}
          onOpen={open}
        />
      ))}

      <footer className="photo-box__closer">
        <p>That&apos;s the box, for now.</p>
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
