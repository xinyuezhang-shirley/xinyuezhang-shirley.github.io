import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/art/art-monograph.css";
import { catalogue, catalogueBySlug, getCatalogueIndex } from "@/work/art/catalogue";
import { FullBleedArtwork } from "@/work/art/components/FullBleedArtwork";
import { EditorialSpread } from "@/work/art/components/EditorialSpread";
import { DetailDuo } from "@/work/art/components/DetailCrop";
import { CaptionBlock } from "@/work/art/components/CaptionBlock";
import { ProcessInsert } from "@/work/art/components/ProcessInsert";
import { ArchiveSheet } from "@/work/art/components/ArchiveSheet";
import { FullscreenArtworkViewer } from "@/work/art/components/FullscreenArtworkViewer";
import { useInView } from "@/work/art/components/useInView";

function LoreInterlude({ lines }: { lines: string[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="art-interlude">
      <div className={inView ? "art-reveal is-inview" : "art-reveal"}>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default function CreativeArt() {
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  const openSlug = useCallback((slug: string) => {
    const idx = getCatalogueIndex(slug);
    if (idx < 0) return;
    setViewerIndex(idx);
    setViewerOpen(true);
  }, []);

  const zion = catalogueBySlug["zion-introduction"];
  const surrender = catalogueBySlug.surrender;
  const fearMe = catalogueBySlug["fear-me"];
  const mycoto = catalogueBySlug.mycoto;
  const ivan = catalogueBySlug.ivan;
  const xue = catalogueBySlug["zheng-bei-x-jiang-xiaohai"];
  const jeonghan = catalogueBySlug["love-me-hate-me"];
  const vernon = catalogueBySlug["describe-what-you-see"];
  const commissions = catalogue.filter((w) => w.tags.includes("commission"));

  return (
    <div className="art-mono">
      {/* Opening — catalogue title page */}
      <header className="art-open">
        <Link to="/creative" className="art-mono__back">
          ← Creative
        </Link>
        <div>
          <p className="art-mono__meta" style={{ marginBottom: "1.25rem" }}>
            Creative Art · myco.to
          </p>
          <h1 className="art-mono__display">Art</h1>
        </div>
        <div className="art-open__rule" aria-hidden />
        <p className="art-open__deck">
          A quiet monograph of digital paintings, original characters, and design studies.
          Scroll slowly.
        </p>
        <div className="art-open__colophon">
          <span className="art-mono__meta">12 plates</span>
          <span className="art-mono__meta">2023 — 2025</span>
          <span className="art-mono__meta">Digital</span>
        </div>
      </header>

      {/* Zion — hero landscape full bleed */}
      <FullBleedArtwork
        work={zion}
        onOpen={() => openSlug(zion.slug)}
        objectPosition="center 42%"
      />

      <LoreInterlude lines={zion.lore ?? []} />

      {/* Zion details — controlled crops */}
      <DetailDuo
        left={{
          work: zion,
          focus: "face",
          caption: "The tear",
          onOpen: () => openSlug(zion.slug),
        }}
        right={{
          work: zion,
          focus: "hands",
          caption: "The apple",
          onOpen: () => openSlug(zion.slug),
        }}
      />

      <section className="art-spread art-spread--tight" aria-label="Zion caption">
        <div style={{ maxWidth: "20rem", marginInline: "auto" }}>
          <CaptionBlock
            work={zion}
            lines={zion.note ? [zion.note] : undefined}
            onOpen={() => openSlug(zion.slug)}
          />
        </div>
      </section>

      {/* Surrender — offset editorial */}
      <EditorialSpread
        work={surrender}
        layout="offset"
        figureSize="default"
        lines={surrender.lore}
        onOpen={() => openSlug(surrender.slug)}
      />

      {/* Fear Me — tall right, dark presence */}
      <EditorialSpread
        work={fearMe}
        layout="tall-right"
        figureSize="narrow"
        lines={fearMe.lore}
        onOpen={() => openSlug(fearMe.slug)}
        aspect="3 / 4"
      />

      {/* Mycoto — character greeting */}
      <EditorialSpread
        work={mycoto}
        layout="split-reverse"
        figureSize="default"
        lines={mycoto.lore}
        onOpen={() => openSlug(mycoto.slug)}
      />

      <LoreInterlude lines={["Fan studies.", "Borrowed names, kept hands."]} />

      {/* Ivan */}
      <EditorialSpread
        work={ivan}
        layout="wide-left"
        figureSize="wide"
        lines={[]}
        onOpen={() => openSlug(ivan.slug)}
      />

      {/* Xue Mi Gong */}
      <EditorialSpread
        work={xue}
        layout="split"
        figureSize="default"
        lines={xue.note ? [xue.note] : []}
        onOpen={() => openSlug(xue.slug)}
      />

      {/* Album design studies as process inserts */}
      <ProcessInsert
        label="Process · Album studies"
        works={[jeonghan, vernon]}
        onOpen={openSlug}
      />

      {/* Commission cluster — denser supporting rhythm before archive */}
      <section className="art-spread" aria-label="Commissions">
        <div className="art-editorial art-editorial--stack">
          <div className="art-editorial__side" style={{ marginBottom: "1.5rem" }}>
            <p className="art-mono__meta">Commissions</p>
            <h2 className="art-mono__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              Four portraits
            </h2>
            <p className="art-mono__note">For online friends. August 2024.</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "clamp(0.75rem, 2vw, 1.5rem)",
              width: "100%",
              maxWidth: "52rem",
            }}
          >
            {commissions.map((work, i) => (
              <button
                key={work.slug}
                type="button"
                className="art-object-btn"
                onClick={() => openSlug(work.slug)}
                aria-label={`Open ${work.title}`}
                style={{
                  transform: i % 2 === 1 ? "translateY(1.75rem)" : undefined,
                }}
              >
                <div className="art-object" style={{ aspectRatio: "3 / 4" }}>
                  <img src={work.image} alt={work.alt} loading="lazy" decoding="async" />
                </div>
                <div style={{ marginTop: "0.65rem" }}>
                  <span className="art-mono__plate">Pl. {work.plate}</span>
                  <div className="art-archive__name">{work.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dense archive / contact sheet */}
      <ArchiveSheet
        works={catalogue}
        onOpen={openSlug}
        title="Archive"
        deck="All plates. Contact sheet."
      />

      <footer
        style={{
          padding: "clamp(2rem, 6vw, 4rem) clamp(1.25rem, 4vw, 3rem) clamp(4rem, 10vw, 7rem)",
          borderTop: "1px solid var(--art-line)",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem 2rem",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <p className="art-mono__meta">End of monograph</p>
        <p className="art-mono__note" style={{ margin: 0 }}>
          myco.to
        </p>
      </footer>

      <FullscreenArtworkViewer
        works={catalogue}
        index={viewerIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onChange={setViewerIndex}
      />
    </div>
  );
}
