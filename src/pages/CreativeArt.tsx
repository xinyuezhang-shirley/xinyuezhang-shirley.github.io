import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/art/art-monograph.css";
import { catalogue, catalogueBySlug, getCatalogueIndex } from "@/work/art/catalogue";
import { FullBleedArtwork } from "@/work/art/components/FullBleedArtwork";
import { EditorialSpread } from "@/work/art/components/EditorialSpread";
import { DetailDuo } from "@/work/art/components/DetailCrop";
import { ProcessInsert } from "@/work/art/components/ProcessInsert";
import { ArchiveSheet } from "@/work/art/components/ArchiveSheet";
import { FullscreenArtworkViewer } from "@/work/art/components/FullscreenArtworkViewer";
import { ArtworkPlate } from "@/work/art/components/ArtworkPlate";
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

function CommissionSequence({
  works,
  onOpen,
}: {
  works: typeof catalogue;
  onOpen: (slug: string) => void;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="art-commissions" aria-label="Commissions">
      <header className="art-commissions__head">
        <p className="art-mono__meta">Commissions</p>
        <h2 className="art-mono__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
          Four portraits
        </h2>
        <p className="art-mono__note">For online friends. August 2024. Natural plates — not a matched set.</p>
      </header>
      <div className="art-commissions__row">
        {works.map((work, i) => (
          <figure
            key={work.slug}
            className={
              inView
                ? `art-commissions__item art-reveal is-inview${i ? ` art-reveal--delay-${Math.min(i, 2)}` : ""}`
                : "art-commissions__item art-reveal"
            }
          >
            <ArtworkPlate
              work={work}
              onOpen={() => onOpen(work.slug)}
              size="narrow"
              tone="paper"
            />
            <figcaption className="art-commissions__cap">
              <span className="art-mono__plate">Pl. {work.plate}</span>
              <span className="art-archive__name">{work.title}</span>
              <span className="art-mono__meta">{work.year}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
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
      {/* Title page — complete as a half-title, then straight into Pl. 01 */}
      <header className="art-open">
        <Link to="/creative" className="art-mono__back">
          ← Creative
        </Link>
        <div>
          <p className="art-mono__meta" style={{ marginBottom: "1rem" }}>
            Creative Art · myco.to
          </p>
          <h1 className="art-mono__display">Art</h1>
        </div>
        <div className="art-open__rule" aria-hidden />
        <p className="art-open__deck">
          A quiet monograph of digital paintings, original characters, and design studies.
        </p>
        <div className="art-open__colophon">
          <span className="art-mono__meta">12 plates</span>
          <span className="art-mono__meta">2023 — 2025</span>
          <span className="art-mono__meta">Digital</span>
        </div>
        <p className="art-open__hint">Begins with Zion.</p>
      </header>

      {/* Pl. 01 Zion — full-spread landscape, natural aspect, label docked under */}
      <FullBleedArtwork
        work={zion}
        onOpen={() => openSlug(zion.slug)}
        lines={zion.lore}
      />

      {/* Second appearance: intentional detail crops only — never the full painting again */}
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
        note={zion.note}
      />

      {/* Pl. 02 Surrender — narrow rose portrait, caption docked to plate */}
      <EditorialSpread
        work={surrender}
        layout="offset"
        figureSize="narrow"
        ground="paper"
        lines={surrender.lore}
        onOpen={() => openSlug(surrender.slug)}
      />

      {/* Pl. 03 Fear Me — ink ground, tall narrow presence */}
      <EditorialSpread
        work={fearMe}
        layout="tall-right"
        figureSize="narrow"
        ground="ink"
        lines={fearMe.lore}
        onOpen={() => openSlug(fearMe.slug)}
      />

      {/* Pl. 04 Mycoto — greeting, caption beside portrait */}
      <EditorialSpread
        work={mycoto}
        layout="split-reverse"
        figureSize="column"
        ground="mist"
        lines={mycoto.lore}
        onOpen={() => openSlug(mycoto.slug)}
      />

      <LoreInterlude lines={["Fan studies.", "Borrowed names, kept hands."]} />

      {/* Pl. 05 Ivan — dark portrait, label anchored to plate */}
      <EditorialSpread
        work={ivan}
        layout="anchor"
        figureSize="narrow"
        ground="ink"
        lines={[]}
        onOpen={() => openSlug(ivan.slug)}
      />

      {/* Pl. 06 Xue — dedication annotation by the plate */}
      <EditorialSpread
        work={xue}
        layout="split"
        figureSize="column"
        ground="paper"
        lines={xue.note ? [xue.note] : []}
        annotation="雪迷宫"
        onOpen={() => openSlug(xue.slug)}
      />

      {/* Pl. 07–08 — square diptych; squares stay square */}
      <ProcessInsert
        label="Process · Album studies"
        deck="Square plates. Design first, then character."
        works={[jeonghan, vernon]}
        onOpen={openSlug}
      />

      {/* Pl. 09–12 — commission sequence at natural heights */}
      <CommissionSequence works={commissions} onOpen={openSlug} />

      {/* Catalogue — museum sheet, not gallery grid */}
      <ArchiveSheet
        works={catalogue}
        onOpen={openSlug}
        title="Archive"
        deck="Catalogue of plates"
      />

      <footer className="art-footer">
        <p className="art-mono__meta">End of monograph</p>
        <p className="art-mono__note" style={{ margin: 0 }}>
          myco.to
        </p>
      </footer>

      <FullscreenArtworkViewer
        works={catalogue}
        index={viewerIndex}
        open={viewerOpen}
        onChange={setViewerIndex}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
}
