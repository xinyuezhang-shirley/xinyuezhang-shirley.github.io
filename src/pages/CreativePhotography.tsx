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

      {photoCollections.map((collection) => (
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
