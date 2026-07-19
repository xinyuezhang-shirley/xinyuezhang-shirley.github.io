import type { PhotoCollectionData, PhotoPrint } from "../collections";
import { FloatingPrint, type PrintPose } from "./FloatingPrint";
import { useInView } from "./useInView";

interface PhotoCollectionProps {
  collection: PhotoCollectionData;
  onOpen: (src: string) => void;
}

function byId(prints: PhotoPrint[], id: string): PhotoPrint {
  const found = prints.find((p) => p.id === id);
  if (!found) throw new Error(`Missing print: ${id}`);
  return found;
}

const stripPoses: PrintPose[] = [
  "tilt-l-soft",
  "drop",
  "tilt-r-soft",
  "lift",
  "tilt-l-soft",
  "nudge-r",
  "tilt-r-soft",
  "drop",
  "tilt-l-soft",
  "lift",
  "nudge-l",
  "tilt-r-soft",
];

function OffsetStrip({
  prints,
  onOpen,
  className = "",
}: {
  prints: PhotoPrint[];
  onOpen: (src: string) => void;
  className?: string;
}) {
  if (!prints.length) return null;
  return (
    <div className={`photo-strip photo-strip--alive ${className}`.trim()}>
      {prints.map((print, i) => (
        <FloatingPrint
          key={print.id}
          print={print}
          role="sequence"
          pose={stripPoses[i % stripPoses.length]}
          onOpen={onOpen}
          delayMs={40 + i * 40}
        />
      ))}
    </div>
  );
}

export function PhotoCollection({ collection, onOpen }: PhotoCollectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.06);
  const toneClass = collection.tone ? `photo-collection--${collection.tone}` : "";
  const p = collection.prints;
  const [hero, ...rest] = p;

  return (
    <section
      ref={ref}
      className={`photo-collection photo-collection--${collection.id} ${toneClass}`.trim()}
      aria-labelledby={`photo-col-${collection.id}`}
      data-in={inView ? "1" : "0"}
    >
      <div className="photo-rail">
        <header className="photo-collection__head">
          <h2 id={`photo-col-${collection.id}`} className="photo-collection__title">
            {collection.title}
          </h2>
          <p className="photo-collection__rationale">{collection.rationale}</p>
        </header>

        {/* Through Glass — wide triangular collage (hero UL, mirror UR, cola LC) */}
        {collection.id === "through-glass" ? (
          <div className="collage collage--satellite">
            <FloatingPrint
              print={byId(p, "portal")}
              role="hero"
              pose="none"
              onOpen={onOpen}
              priority
              className="collage__main"
            />
            <FloatingPrint
              print={byId(p, "hello")}
              role="support"
              pose="tilt-r-soft"
              onOpen={onOpen}
              delayMs={90}
              className="collage__sat"
            />
            <FloatingPrint
              print={byId(p, "coca-cola")}
              role="sequence"
              pose="none"
              onOpen={onOpen}
              delayMs={140}
              className="collage__trail"
            />
          </div>
        ) : null}

        {/* Salt Light — uneven 60/40 with vertical tension */}
        {collection.id === "salt-light" ? (
          <div className="collage collage--uneven">
            <FloatingPrint
              print={byId(p, "michelle-beach")}
              role="hero"
              pose="tilt-l-soft"
              onOpen={onOpen}
              priority
              className="collage__wide"
            />
            <FloatingPrint
              print={byId(p, "shiny-beach")}
              role="support"
              pose="tilt-r"
              onOpen={onOpen}
              delayMs={80}
              className="collage__narrow"
            />
          </div>
        ) : null}

        {/* One Roll — tilted hero, then offset film strip */}
        {collection.id === "one-roll" && hero ? (
          <div className="collage collage--film">
            <FloatingPrint
              print={hero}
              role="hero"
              pose="tilt-l-soft"
              onOpen={onOpen}
              priority
              className="collage__film-hero"
            />
            <OffsetStrip prints={rest} onOpen={onOpen} className="collage__film-strip" />
          </div>
        ) : null}

        {/* Shore Light — hero overhang + stepped strip */}
        {collection.id === "shore-light" && hero ? (
          <div className="collage collage--overhang">
            <FloatingPrint
              print={hero}
              role="hero"
              pose="tilt-r-soft"
              onOpen={onOpen}
              priority
              className="collage__overhang-hero"
            />
            <OffsetStrip prints={rest} onOpen={onOpen} className="collage__step-strip" />
          </div>
        ) : null}

        {/* Close Looking — hero + stacked pair overlapping edge */}
        {collection.id === "close-looking" ? (
          <div className="collage collage--stack">
            <FloatingPrint
              print={byId(p, "cabbage")}
              role="hero"
              pose="tilt-l-soft"
              onOpen={onOpen}
              priority
              className="collage__stack-main"
            />
            <div className="collage__stack-side">
              <FloatingPrint
                print={byId(p, "pepper")}
                role="support"
                pose="tilt-r"
                onOpen={onOpen}
                delayMs={70}
              />
              <FloatingPrint
                print={byId(p, "bok-choy")}
                role="sequence"
                pose="tilt-l"
                onOpen={onOpen}
                delayMs={120}
              />
              <FloatingPrint
                print={byId(p, "cupcake")}
                role="sequence"
                pose="drop"
                onOpen={onOpen}
                delayMs={160}
              />
            </div>
          </div>
        ) : null}

        {/* Lantern Night — support crossing hero corner */}
        {collection.id === "lantern-night" ? (
          <div className="collage collage--cross">
            <FloatingPrint
              print={byId(p, "characters")}
              role="hero"
              pose="tilt-l-soft"
              onOpen={onOpen}
              priority
              className="collage__cross-main"
            />
            <FloatingPrint
              print={byId(p, "dragon-boat")}
              role="support"
              pose="tilt-r"
              onOpen={onOpen}
              delayMs={100}
              className="collage__cross-pin"
            />
          </div>
        ) : null}

        {/* Raye — left hero, stacked pair, then offset strip */}
        {collection.id === "raye" ? (
          <div className="collage collage--pair-stack">
            <div className="collage__pair-top">
              <FloatingPrint
                print={byId(p, "raye-02")}
                role="hero"
                pose="tilt-l-soft"
                onOpen={onOpen}
                priority
                className="collage__pair-main"
              />
              <div className="collage__pair-stack">
                <FloatingPrint
                  print={byId(p, "raye-06")}
                  role="support"
                  pose="tilt-r"
                  onOpen={onOpen}
                  delayMs={70}
                />
                <FloatingPrint
                  print={byId(p, "raye-01")}
                  role="sequence"
                  pose="tilt-l"
                  onOpen={onOpen}
                  delayMs={120}
                />
              </div>
            </div>
            <OffsetStrip
              prints={[byId(p, "raye-03"), byId(p, "raye-04"), byId(p, "raye-05")]}
              onOpen={onOpen}
            />
          </div>
        ) : null}

        {/* Bodies — hero then diagonal path strip */}
        {collection.id === "bodies-keep-time" && hero ? (
          <div className="collage collage--path">
            <FloatingPrint
              print={hero}
              role="hero"
              pose="tilt-r-soft"
              onOpen={onOpen}
              priority
              className="collage__path-hero"
            />
            <OffsetStrip prints={rest} onOpen={onOpen} className="collage__path-strip" />
          </div>
        ) : null}

        {/* Suspended — hero with overlapping motion studies */}
        {collection.id === "suspended" ? (
          <div className="collage collage--overlap-row">
            <FloatingPrint
              print={byId(p, "pool-jump")}
              role="hero"
              pose="tilt-l-soft"
              onOpen={onOpen}
              priority
              className="collage__overlap-hero"
            />
            <div className="collage__overlap-band">
              <FloatingPrint
                print={byId(p, "butterfly")}
                role="sequence"
                pose="tilt-r"
                onOpen={onOpen}
                delayMs={60}
              />
              <FloatingPrint
                print={byId(p, "car-blur")}
                role="sequence"
                pose="lift"
                onOpen={onOpen}
                delayMs={110}
              />
              <FloatingPrint
                print={byId(p, "blurry-petals")}
                role="sequence"
                pose="tilt-l"
                onOpen={onOpen}
                delayMs={160}
              />
            </div>
          </div>
        ) : null}

        {/* City Lines — stepped diagonal triptych */}
        {collection.id === "city-lines" ? (
          <div className="collage collage--steps">
            <FloatingPrint
              print={byId(p, "train")}
              role="frame"
              pose="tilt-l"
              onOpen={onOpen}
              priority
              className="collage__step collage__step--a"
            />
            <FloatingPrint
              print={byId(p, "texture")}
              role="frame"
              pose="tilt-r-soft"
              onOpen={onOpen}
              delayMs={70}
              className="collage__step collage__step--b"
            />
            <FloatingPrint
              print={byId(p, "anna")}
              role="frame"
              pose="tilt-l-soft"
              onOpen={onOpen}
              delayMs={130}
              className="collage__step collage__step--c"
            />
          </div>
        ) : null}

        {/* Stanford — full-bleed hero, then loose contact strip */}
        {collection.id === "stanford" && hero ? (
          <div className="collage collage--campus">
            <FloatingPrint
              print={hero}
              role="hero"
              pose="tilt-l-soft"
              onOpen={onOpen}
              priority
              className="collage__campus-hero"
            />
            <OffsetStrip prints={rest} onOpen={onOpen} className="collage__campus-strip" />
          </div>
        ) : null}

        {/* Facing — loose closing contact sheet */}
        {collection.id === "facing" ? (
          <div className="collage collage--loose-sheet">
            {p.map((print, i) => (
              <FloatingPrint
                key={print.id}
                print={print}
                role="frame"
                pose={stripPoses[i % stripPoses.length]}
                onOpen={onOpen}
                priority={i === 0}
                delayMs={i * 50}
                className={`collage__loose collage__loose--${i + 1}`}
              />
            ))}
          </div>
        ) : null}

        {/* Fallback for any other layout */}
        {!["through-glass", "salt-light", "one-roll", "shore-light", "close-looking", "lantern-night", "raye", "bodies-keep-time", "suspended", "city-lines", "stanford", "facing"].includes(
          collection.id
        ) && hero ? (
          <div className="collage collage--film">
            <FloatingPrint print={hero} role="hero" pose="tilt-l-soft" onOpen={onOpen} priority />
            <OffsetStrip prints={rest} onOpen={onOpen} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
