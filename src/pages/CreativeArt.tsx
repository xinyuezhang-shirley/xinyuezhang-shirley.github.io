import { useCallback, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "@/work/art/art-monograph.css";
import {
  catalogue,
  catalogueBySlug,
  getCatalogueIndex,
  type CatalogueEntry,
} from "@/work/art/catalogue";
import { ArchiveSheet } from "@/work/art/components/ArchiveSheet";
import { FullscreenArtworkViewer } from "@/work/art/components/FullscreenArtworkViewer";
import { useInView } from "@/work/art/components/useInView";

/** Thin contain wrapper — not a layout factory. */
function Plate({
  work,
  onOpen,
  className = "",
  priority = false,
}: {
  work: CatalogueEntry;
  onOpen?: () => void;
  className?: string;
  priority?: boolean;
}) {
  const img = (
    <img
      src={work.image}
      alt={work.alt}
      width={work.width}
      height={work.height}
      className="art-plate__img"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );

  if (!onOpen) {
    return <div className={`art-plate art-plate--flush ${className}`.trim()}>{img}</div>;
  }

  return (
    <button
      type="button"
      className="art-object-btn"
      onClick={onOpen}
      aria-label={`Open ${work.title}`}
    >
      <div className={`art-plate art-plate--flush ${className}`.trim()}>{img}</div>
    </button>
  );
}

function MuseumLabel({
  work,
  lines,
  tone = "light",
  onOpen,
}: {
  work: CatalogueEntry;
  lines?: string[];
  tone?: "light" | "dark";
  onOpen?: () => void;
}) {
  const body = (
    <>
      <div className="art-caption__row">
        <span className="art-mono__plate">Pl. {work.plate}</span>
        <span className="art-mono__meta">
          {work.year} · {work.medium}
        </span>
      </div>
      <h2 className="art-mono__title">{work.title}</h2>
      {work.edition ? (
        <p className="art-mono__meta art-caption__edition">{work.edition}</p>
      ) : null}
      {lines?.length ? (
        <div className="art-mono__lore">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
    </>
  );

  return (
    <div className={tone === "dark" ? "art-caption art-caption--dark" : "art-caption"}>
      {onOpen ? (
        <button type="button" onClick={onOpen} aria-label={`View ${work.title} fullscreen`}>
          {body}
        </button>
      ) : (
        body
      )}
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delayClass = delay === 1 ? " art-reveal--delay-1" : delay === 2 ? " art-reveal--delay-2" : "";
  return (
    <div
      ref={ref}
      className={`art-reveal${delayClass}${inView ? " is-inview" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
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
  const c1 = catalogueBySlug["commission-1"];
  const c2 = catalogueBySlug["commission-2"];
  const c3 = catalogueBySlug["commission-3"];
  const c4 = catalogueBySlug["commission-4"];

  return (
    <div className="art-mono">
      {/* Half-title — then straight into Zion */}
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

      {/*
        Pl. 01 Zion — complete landscape composition.
        Restraint: the painting alone, edge-to-edge on ink. No companion image.
      */}
      <figure className="spread-zion" aria-label={zion.title}>
        <Reveal className="spread-zion__media">
          <Plate work={zion} onOpen={() => openSlug(zion.slug)} priority />
        </Reveal>
        <figcaption className="spread-zion__label">
          <Reveal delay={1}>
            <MuseumLabel
              work={zion}
              lines={zion.lore}
              tone="dark"
              onOpen={() => openSlug(zion.slug)}
            />
          </Reveal>
        </figcaption>
      </figure>

      {/*
        Zion hinge — one detail crop alone (the bloodied apple).
        Not a duo. The tear is already in the full plate; this is the narrative hinge only.
      */}
      <section className="spread-zion-hinge" aria-label="Detail from Zion">
        <Reveal className="spread-zion-hinge__crop">
          <button
            type="button"
            className="art-object-btn"
            onClick={() => openSlug(zion.slug)}
            aria-label="Zion: the apple"
          >
            <div className="spread-zion-hinge__frame">
              <img src={zion.image} alt={zion.alt} loading="lazy" decoding="async" />
            </div>
          </button>
        </Reveal>
        <Reveal delay={1}>
          <p className="spread-zion-hinge__note">{zion.note}</p>
        </Reveal>
      </section>

      {/*
        Pl. 02 Surrender — intimate rose portrait, already finished.
        Alone, narrow, caption docked under. No second visual.
      */}
      <figure className="spread-surrender" aria-label={surrender.title}>
        <Reveal className="spread-surrender__plate">
          <Plate work={surrender} onOpen={() => openSlug(surrender.slug)} />
        </Reveal>
        <figcaption className="spread-surrender__label">
          <Reveal delay={1}>
            <MuseumLabel
              work={surrender}
              lines={surrender.lore}
              onOpen={() => openSlug(surrender.slug)}
            />
          </Reveal>
        </figcaption>
      </figure>

      {/*
        Pl. 03 Fear Me — iconographic; the halo needs darkness.
        Site disappears into ink. Painting alone; one line of lore under.
      */}
      <figure className="spread-fear" aria-label={fearMe.title}>
        <Reveal className="spread-fear__plate">
          <Plate work={fearMe} onOpen={() => openSlug(fearMe.slug)} />
        </Reveal>
        <figcaption className="spread-fear__label">
          <Reveal delay={1}>
            <MuseumLabel
              work={fearMe}
              lines={fearMe.lore}
              tone="dark"
              onOpen={() => openSlug(fearMe.slug)}
            />
          </Reveal>
        </figcaption>
      </figure>

      {/*
        Pl. 04 Mycoto — greeting character.
        Painting + one sentence. The sentence is the dialogue; no second image.
      */}
      <section className="spread-mycoto" aria-label={mycoto.title}>
        <Reveal className="spread-mycoto__plate">
          <Plate work={mycoto} onOpen={() => openSlug(mycoto.slug)} />
        </Reveal>
        <Reveal delay={1} className="spread-mycoto__voice">
          <p className="art-mono__plate">Pl. {mycoto.plate}</p>
          <p className="spread-mycoto__hello">Hi there.</p>
          <p className="spread-mycoto__hello">I am Mycoto.</p>
          <button
            type="button"
            className="spread-mycoto__name"
            onClick={() => openSlug(mycoto.slug)}
          >
            {mycoto.title}
          </button>
          <p className="art-mono__meta">
            {mycoto.year} · {mycoto.medium}
          </p>
        </Reveal>
      </section>

      <div className="art-interlude">
        <Reveal>
          <p>Fan studies.</p>
          <p>Borrowed names, kept hands.</p>
        </Reveal>
      </div>

      {/*
        Pl. 05 Ivan — violent, complete, needs silence.
        Alone on ink. No lore. The website should almost not be there.
      */}
      <figure className="spread-ivan" aria-label={ivan.title}>
        <Reveal className="spread-ivan__plate">
          <Plate work={ivan} onOpen={() => openSlug(ivan.slug)} />
        </Reveal>
        <figcaption className="spread-ivan__label">
          <Reveal delay={1}>
            <div className="art-caption art-caption--dark">
              <span className="art-mono__plate">Pl. {ivan.plate}</span>
              <button
                type="button"
                className="spread-ivan__title"
                onClick={() => openSlug(ivan.slug)}
              >
                {ivan.title}
              </button>
              <span className="art-mono__meta">
                {ivan.year} · {ivan.medium}
              </span>
            </div>
          </Reveal>
        </figcaption>
      </figure>

      {/*
        Pl. 06 Xue — narrative diptych already inside the painting (two figures, one sword).
        Do not invent a second plate. Dedication only.
      */}
      <figure className="spread-xue" aria-label={xue.title}>
        <Reveal className="spread-xue__plate">
          <Plate work={xue} onOpen={() => openSlug(xue.slug)} />
        </Reveal>
        <figcaption className="spread-xue__label">
          <Reveal delay={1}>
            <MuseumLabel work={xue} onOpen={() => openSlug(xue.slug)} />
            <p className="art-annotation">雪迷宫</p>
            {xue.note ? <p className="art-mono__note">{xue.note}</p> : null}
          </Reveal>
        </figcaption>
      </figure>

      <div className="art-interlude">
        <Reveal>
          <p>Album studies.</p>
          <p>Each square is already a cover.</p>
        </Reveal>
      </div>

      {/*
        Pl. 07 Jeonghan — dense square collage; already a magazine cover.
        Alone. Never paired with Vernon just because both are square.
      */}
      <figure className="spread-square spread-square--jeonghan" aria-label={jeonghan.title}>
        <Reveal className="spread-square__plate">
          <Plate work={jeonghan} onOpen={() => openSlug(jeonghan.slug)} />
        </Reveal>
        <figcaption className="spread-square__label">
          <Reveal delay={1}>
            <MuseumLabel
              work={jeonghan}
              lines={jeonghan.note ? [jeonghan.note] : undefined}
              onOpen={() => openSlug(jeonghan.slug)}
            />
          </Reveal>
        </figcaption>
      </figure>

      {/*
        Pl. 08 Vernon — square alone; the prompt is already painted into the work.
      */}
      <figure className="spread-square spread-square--vernon" aria-label={vernon.title}>
        <Reveal className="spread-square__plate">
          <Plate work={vernon} onOpen={() => openSlug(vernon.slug)} />
        </Reveal>
        <figcaption className="spread-square__label">
          <Reveal delay={1}>
            <MuseumLabel
              work={vernon}
              lines={vernon.note ? [vernon.note] : undefined}
              onOpen={() => openSlug(vernon.slug)}
            />
          </Reveal>
        </figcaption>
      </figure>

      {/*
        Pl. 09–12 Commissions — four portraits for friends.
        Not a matched card row. Four solitary beats in sequence, each breathing differently.
      */}
      <header className="spread-commissions-head">
        <Reveal>
          <p className="art-mono__meta">Commissions</p>
          <h2 className="art-mono__title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Four portraits
          </h2>
          <p className="art-mono__note">
            For online friends. August 2024. Natural plates — not a matched set.
          </p>
        </Reveal>
      </header>

      <figure className="spread-commission spread-commission--a" aria-label={c1.title}>
        <Reveal className="spread-commission__plate">
          <Plate work={c1} onOpen={() => openSlug(c1.slug)} />
        </Reveal>
        <figcaption className="spread-commission__cap">
          <span className="art-mono__plate">Pl. {c1.plate}</span>
          <span className="art-archive__name">{c1.title}</span>
          <span className="art-mono__meta">{c1.year}</span>
        </figcaption>
      </figure>

      <figure className="spread-commission spread-commission--b" aria-label={c2.title}>
        <Reveal className="spread-commission__plate">
          <Plate work={c2} onOpen={() => openSlug(c2.slug)} />
        </Reveal>
        <figcaption className="spread-commission__cap">
          <span className="art-mono__plate">Pl. {c2.plate}</span>
          <span className="art-archive__name">{c2.title}</span>
          <span className="art-mono__meta">{c2.year}</span>
        </figcaption>
      </figure>

      <figure className="spread-commission spread-commission--c" aria-label={c3.title}>
        <Reveal className="spread-commission__plate">
          <Plate work={c3} onOpen={() => openSlug(c3.slug)} />
        </Reveal>
        <figcaption className="spread-commission__cap">
          <span className="art-mono__plate">Pl. {c3.plate}</span>
          <span className="art-archive__name">{c3.title}</span>
          <span className="art-mono__meta">{c3.year}</span>
        </figcaption>
      </figure>

      <figure className="spread-commission spread-commission--d" aria-label={c4.title}>
        <Reveal className="spread-commission__plate">
          <Plate work={c4} onOpen={() => openSlug(c4.slug)} />
        </Reveal>
        <figcaption className="spread-commission__cap">
          <span className="art-mono__plate">Pl. {c4.plate}</span>
          <span className="art-archive__name">{c4.title}</span>
          <span className="art-mono__meta">{c4.year}</span>
        </figcaption>
      </figure>

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
