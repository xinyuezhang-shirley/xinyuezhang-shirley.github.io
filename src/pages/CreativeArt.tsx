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
  const zionAgain = catalogueBySlug["zion-again"];
  const surrender = catalogueBySlug.surrender;
  const fearMe = catalogueBySlug["fear-me"];
  const creep = catalogueBySlug.creep;
  const soulRotting = catalogueBySlug["soul-rotting"];
  const empty = catalogueBySlug["empty-empty-empty"];
  const mycoto = catalogueBySlug.mycoto;
  const mycotoShift = catalogueBySlug["mycoto-shapeshift"];
  const ivan = catalogueBySlug.ivan;
  const pretty = catalogueBySlug["am-i-pretty-now"];
  const oceanEyes = catalogueBySlug["ocean-eyes"];
  const xue = catalogueBySlug["zheng-bei-x-jiang-xiaohai"];
  const journey = catalogueBySlug["journey-towards-death"];
  const liQi = catalogueBySlug["li-qi"];
  const jeonghan = catalogueBySlug["love-me-hate-me"];
  const vernon = catalogueBySlug["describe-what-you-see"];
  const ageYounger = catalogueBySlug["age-younger"];
  const bside = catalogueBySlug["my-bside"];
  const romemok = catalogueBySlug.romemok;
  const twoFifty = catalogueBySlug["two-hundred-fifty"];
  const emblems = catalogueBySlug["oc-emblems"];
  const marks = catalogueBySlug["ioakun-mycoto-marks"];
  const c1 = catalogueBySlug["commission-1"];
  const c2 = catalogueBySlug["commission-2"];
  const c3 = catalogueBySlug["commission-3"];
  const c4 = catalogueBySlug["commission-4"];

  return (
    <div className="art-mono">
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
          <span className="art-mono__meta">{catalogue.length} plates</span>
          <span className="art-mono__meta">2023 — 2026</span>
          <span className="art-mono__meta">Digital</span>
        </div>
        <p className="art-open__hint">Begins with Zion.</p>
      </header>

      {/* Hero — Zion alone, full composition */}
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

      {/* Aftermath — hinge detail + Zion, Again as one room */}
      <section className="spread-zion-room" aria-label="After Zion">
        <Reveal className="spread-zion-room__detail">
          <button
            type="button"
            className="art-object-btn"
            onClick={() => openSlug(zion.slug)}
            aria-label="Zion: the apple"
          >
            <div className="spread-zion-room__crop">
              <img src={zion.image} alt={zion.alt} loading="lazy" decoding="async" />
            </div>
          </button>
          <p className="spread-zion-room__note">{zion.note}</p>
        </Reveal>
        <Reveal delay={1} className="spread-zion-room__again">
          <Plate work={zionAgain} onOpen={() => openSlug(zionAgain.slug)} />
          <MuseumLabel
            work={zionAgain}
            lines={zionAgain.lore}
            tone="dark"
            onOpen={() => openSlug(zionAgain.slug)}
          />
        </Reveal>
      </section>

      {/* OC pair — Surrender dominant, Fear Me supporting */}
      <section className="spread-oc-pair" aria-label="Original characters">
        <Reveal className="spread-oc-pair__main">
          <Plate work={surrender} onOpen={() => openSlug(surrender.slug)} />
          <MuseumLabel
            work={surrender}
            lines={surrender.lore}
            onOpen={() => openSlug(surrender.slug)}
          />
        </Reveal>
        <Reveal delay={1} className="spread-oc-pair__side">
          <Plate work={fearMe} onOpen={() => openSlug(fearMe.slug)} />
          <MuseumLabel
            work={fearMe}
            lines={fearMe.lore}
            tone="dark"
            onOpen={() => openSlug(fearMe.slug)}
          />
        </Reveal>
      </section>

      <div className="art-interlude">
        <Reveal>
          <p>Self studies.</p>
          <p>Whole sheets. Quieter confessions.</p>
        </Reveal>
      </div>

      {/* Salon — Creep, Soul, Empty as one wall */}
      <section className="spread-salon" aria-label="Self studies">
        <Reveal className="spread-salon__a">
          <Plate work={creep} onOpen={() => openSlug(creep.slug)} />
          <MuseumLabel work={creep} lines={creep.lore} onOpen={() => openSlug(creep.slug)} />
        </Reveal>
        <Reveal delay={1} className="spread-salon__b">
          <Plate work={soulRotting} onOpen={() => openSlug(soulRotting.slug)} />
          <MuseumLabel
            work={soulRotting}
            lines={soulRotting.lore}
            onOpen={() => openSlug(soulRotting.slug)}
          />
        </Reveal>
        <Reveal delay={2} className="spread-salon__c">
          <Plate work={empty} onOpen={() => openSlug(empty.slug)} />
          <MuseumLabel work={empty} lines={empty.lore} onOpen={() => openSlug(empty.slug)} />
        </Reveal>
      </section>

      {/* Mycoto — greeting + shapeshift landscape */}
      <section className="spread-mycoto-suite" aria-label="Mycoto">
        <div className="spread-mycoto-suite__intro">
          <Reveal className="spread-mycoto-suite__plate">
            <Plate work={mycoto} onOpen={() => openSlug(mycoto.slug)} />
          </Reveal>
          <Reveal delay={1} className="spread-mycoto-suite__voice">
            <p className="art-mono__plate">Pl. {mycoto.plate}</p>
            <p className="spread-mycoto-suite__hello">Hi there.</p>
            <p className="spread-mycoto-suite__hello">I am Mycoto.</p>
            <button
              type="button"
              className="spread-mycoto-suite__name"
              onClick={() => openSlug(mycoto.slug)}
            >
              {mycoto.title}
            </button>
            <p className="art-mono__meta">
              {mycoto.year} · {mycoto.medium}
            </p>
          </Reveal>
        </div>
        <figure className="spread-mycoto-suite__shift" aria-label={mycotoShift.title}>
          <Reveal>
            <Plate work={mycotoShift} onOpen={() => openSlug(mycotoShift.slug)} />
          </Reveal>
          <figcaption>
            <Reveal delay={1}>
              <MuseumLabel
                work={mycotoShift}
                lines={mycotoShift.lore}
                tone="dark"
                onOpen={() => openSlug(mycotoShift.slug)}
              />
            </Reveal>
          </figcaption>
        </figure>
      </section>

      <div className="art-interlude">
        <Reveal>
          <p>Fan studies.</p>
          <p>Borrowed names, kept hands.</p>
        </Reveal>
      </div>

      {/* Quiet hero — Ivan alone */}
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

      {/* Kin — Pretty + Ocean Eyes */}
      <section className="spread-kin" aria-label="Stage kin">
        <Reveal className="spread-kin__portrait">
          <Plate work={pretty} onOpen={() => openSlug(pretty.slug)} />
          <MuseumLabel
            work={pretty}
            lines={pretty.lore}
            onOpen={() => openSlug(pretty.slug)}
          />
        </Reveal>
        <Reveal delay={1} className="spread-kin__wide">
          <Plate work={oceanEyes} onOpen={() => openSlug(oceanEyes.slug)} />
          <MuseumLabel
            work={oceanEyes}
            lines={oceanEyes.lore}
            tone="dark"
            onOpen={() => openSlug(oceanEyes.slug)}
          />
        </Reveal>
      </section>

      {/* Narrative pair — Xue + Journey */}
      <section className="spread-narrative" aria-label="Narrative studies">
        <Reveal className="spread-narrative__a">
          <Plate work={xue} onOpen={() => openSlug(xue.slug)} />
          <div className="spread-narrative__cap">
            <MuseumLabel work={xue} onOpen={() => openSlug(xue.slug)} />
            <p className="art-annotation">雪迷宫</p>
            {xue.note ? <p className="art-mono__note">{xue.note}</p> : null}
          </div>
        </Reveal>
        <Reveal delay={1} className="spread-narrative__b">
          <Plate work={journey} onOpen={() => openSlug(journey.slug)} />
          <MuseumLabel
            work={journey}
            lines={journey.lore}
            tone="dark"
            onOpen={() => openSlug(journey.slug)}
          />
        </Reveal>
      </section>

      {/* Li Qi — warm pause, single sheet */}
      <figure className="spread-sheet spread-sheet--liqi" aria-label={liQi.title}>
        <Reveal className="spread-sheet__media">
          <Plate work={liQi} onOpen={() => openSlug(liQi.slug)} />
        </Reveal>
        <figcaption className="spread-sheet__label">
          <Reveal delay={1}>
            <MuseumLabel work={liQi} lines={liQi.lore} onOpen={() => openSlug(liQi.slug)} />
          </Reveal>
        </figcaption>
      </figure>

      <div className="art-interlude">
        <Reveal>
          <p>Album studies.</p>
          <p>Each square is already a cover.</p>
        </Reveal>
      </div>

      {/* Album covers — two squares as a pair */}
      <section className="spread-albums" aria-label="Album studies">
        <Reveal className="spread-albums__item">
          <Plate work={jeonghan} onOpen={() => openSlug(jeonghan.slug)} />
          <MuseumLabel
            work={jeonghan}
            lines={jeonghan.note ? [jeonghan.note] : undefined}
            onOpen={() => openSlug(jeonghan.slug)}
          />
        </Reveal>
        <Reveal delay={1} className="spread-albums__item">
          <Plate work={vernon} onOpen={() => openSlug(vernon.slug)} />
          <MuseumLabel
            work={vernon}
            lines={vernon.note ? [vernon.note] : undefined}
            onOpen={() => openSlug(vernon.slug)}
          />
        </Reveal>
      </section>

      {/* Vernon suite — Age Younger (portrait) + My B-Side (landscape) */}
      <section className="spread-vernon-suite" aria-label="Vernon studies">
        <Reveal className="spread-vernon-suite__portrait">
          <Plate work={ageYounger} onOpen={() => openSlug(ageYounger.slug)} />
          <MuseumLabel
            work={ageYounger}
            lines={ageYounger.lore}
            tone="dark"
            onOpen={() => openSlug(ageYounger.slug)}
          />
        </Reveal>
        <Reveal delay={1} className="spread-vernon-suite__wide">
          <Plate work={bside} onOpen={() => openSlug(bside.slug)} />
          <MuseumLabel
            work={bside}
            lines={bside.lore}
            tone="dark"
            onOpen={() => openSlug(bside.slug)}
          />
        </Reveal>
      </section>

      {/* Romemok — vinyl landscape hero */}
      <figure className="spread-romemok" aria-label={romemok.title}>
        <Reveal className="spread-romemok__media">
          <Plate work={romemok} onOpen={() => openSlug(romemok.slug)} />
        </Reveal>
        <figcaption className="spread-romemok__label">
          <Reveal delay={1}>
            <MuseumLabel
              work={romemok}
              lines={romemok.lore}
              tone="dark"
              onOpen={() => openSlug(romemok.slug)}
            />
          </Reveal>
        </figcaption>
      </figure>

      {/* Quiet hero — Two Hundred Fifty */}
      <figure className="spread-twofifty" aria-label={twoFifty.title}>
        <Reveal className="spread-twofifty__plate">
          <Plate work={twoFifty} onOpen={() => openSlug(twoFifty.slug)} />
        </Reveal>
        <figcaption className="spread-twofifty__label">
          <Reveal delay={1}>
            <MuseumLabel
              work={twoFifty}
              lines={twoFifty.lore}
              onOpen={() => openSlug(twoFifty.slug)}
            />
          </Reveal>
        </figcaption>
      </figure>

      <div className="art-interlude">
        <Reveal>
          <p>Marks.</p>
          <p>Whole sheets — nothing cropped.</p>
        </Reveal>
      </div>

      {/* Logo sheets — paired */}
      <section className="spread-marks" aria-label="Marks">
        <Reveal className="spread-marks__item spread-marks__item--emblems">
          <Plate work={emblems} onOpen={() => openSlug(emblems.slug)} />
          <MuseumLabel
            work={emblems}
            lines={emblems.lore}
            tone="dark"
            onOpen={() => openSlug(emblems.slug)}
          />
        </Reveal>
        <Reveal delay={1} className="spread-marks__item spread-marks__item--ioakun">
          <Plate work={marks} onOpen={() => openSlug(marks.slug)} />
          <MuseumLabel
            work={marks}
            lines={marks.lore}
            tone="dark"
            onOpen={() => openSlug(marks.slug)}
          />
        </Reveal>
      </section>

      {/* Commissions — salon wall, not four lonely columns */}
      <section className="spread-commissions" aria-label="Commissions">
        <header className="spread-commissions__head">
          <Reveal>
            <p className="art-mono__meta">Commissions</p>
            <h2 className="art-mono__title spread-commissions__title">Four portraits</h2>
            <p className="art-mono__note">
              For online friends. August 2024. Natural plates — not a matched set.
            </p>
          </Reveal>
        </header>
        <div className="spread-commissions__wall">
          <Reveal className="spread-commissions__cell spread-commissions__cell--a">
            <Plate work={c1} onOpen={() => openSlug(c1.slug)} />
            <figcaption className="spread-commissions__cap">
              <span className="art-mono__plate">Pl. {c1.plate}</span>
              <span className="art-archive__name">{c1.title}</span>
            </figcaption>
          </Reveal>
          <Reveal delay={1} className="spread-commissions__cell spread-commissions__cell--b">
            <Plate work={c2} onOpen={() => openSlug(c2.slug)} />
            <figcaption className="spread-commissions__cap">
              <span className="art-mono__plate">Pl. {c2.plate}</span>
              <span className="art-archive__name">{c2.title}</span>
            </figcaption>
          </Reveal>
          <Reveal delay={1} className="spread-commissions__cell spread-commissions__cell--c">
            <Plate work={c3} onOpen={() => openSlug(c3.slug)} />
            <figcaption className="spread-commissions__cap">
              <span className="art-mono__plate">Pl. {c3.plate}</span>
              <span className="art-archive__name">{c3.title}</span>
            </figcaption>
          </Reveal>
          <Reveal delay={2} className="spread-commissions__cell spread-commissions__cell--d">
            <Plate work={c4} onOpen={() => openSlug(c4.slug)} />
            <figcaption className="spread-commissions__cap">
              <span className="art-mono__plate">Pl. {c4.plate}</span>
              <span className="art-archive__name">{c4.title}</span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* Closing folio — final page of the catalogue */}
      <section className="art-close" aria-label="End of exhibition">
        <Reveal>
          <p className="art-mono__meta">End of hanging</p>
          <p className="art-close__line">Twenty-seven plates.</p>
          <p className="art-close__line">The work continues offline.</p>
          <div className="art-close__rule" aria-hidden />
          <p className="art-mono__note art-close__note">
            Catalogue follows — a contact sheet of every plate in order.
          </p>
        </Reveal>
      </section>

      <ArchiveSheet
        works={catalogue}
        onOpen={openSlug}
        title="Archive"
        deck="Catalogue of plates"
      />

      <footer className="art-footer">
        <div>
          <p className="art-mono__meta">myco.to</p>
          <p className="art-mono__note" style={{ margin: "0.5rem 0 0" }}>
            Thank you for walking through.
          </p>
        </div>
        <a href="#contact" className="art-footer__link">
          Contact →
        </a>
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
