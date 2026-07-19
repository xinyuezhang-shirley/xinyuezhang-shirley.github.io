import type { PhotoCollectionData, PhotoPrint } from "../collections";
import { ContactSheet } from "./ContactSheet";
import { EditorialCluster } from "./EditorialCluster";
import { FloatingPrint } from "./FloatingPrint";
import { PhotoNote } from "./PhotoCaption";
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

export function PhotoCollection({ collection, onOpen }: PhotoCollectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.08);
  const toneClass = collection.tone ? `photo-collection--${collection.tone}` : "";
  const p = collection.prints;

  return (
    <section
      ref={ref}
      className={`photo-collection ${toneClass}`.trim()}
      aria-labelledby={`photo-col-${collection.id}`}
      data-in={inView ? "1" : "0"}
    >
      <header className="photo-collection__head">
        <h2 id={`photo-col-${collection.id}`} className="photo-collection__title">
          {collection.title}
        </h2>
        <p className="photo-collection__whisper">{collection.whisper}</p>
      </header>

      {collection.layout === "glass-stack" ? (
        <EditorialCluster className="layout-glass">
          <div className="layout-glass__anchor">
            <FloatingPrint print={byId(p, "portal")} onOpen={onOpen} priority />
          </div>
          <div className="layout-glass__mirror">
            <FloatingPrint print={byId(p, "hello")} onOpen={onOpen} delayMs={80} />
          </div>
          <div className="layout-glass__window">
            <FloatingPrint print={byId(p, "coca-cola")} onOpen={onOpen} delayMs={140} />
          </div>
          <div className="layout-glass__note">
            <PhotoNote>Windows. Fog. A hand asking to be seen.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "macro-sheet" ? (
        <EditorialCluster className="layout-macro">
          <div className="layout-macro__anchor">
            <FloatingPrint print={byId(p, "cabbage")} onOpen={onOpen} priority />
            <div style={{ marginTop: "1.25rem" }}>
              <PhotoNote>Still life, if you lean in.</PhotoNote>
            </div>
          </div>
          <div>
            <ContactSheet
              prints={[byId(p, "pepper"), byId(p, "bok-choy"), byId(p, "cupcake")]}
              onOpen={onOpen}
              label="Proofs"
              sheetClassName="layout-macro__sheet"
            />
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "coastal" ? (
        <EditorialCluster className="layout-coastal">
          <div className="layout-coastal__anchor">
            <FloatingPrint print={byId(p, "michelle-beach")} onOpen={onOpen} priority />
          </div>
          <div className="layout-coastal__second">
            <FloatingPrint print={byId(p, "shiny-beach")} onOpen={onOpen} delayMs={90} />
          </div>
          <div className="layout-coastal__note">
            <PhotoNote warm>Salt. Glitter. Someone facing the water.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "festival-pin" ? (
        <EditorialCluster className="layout-festival">
          <div className="layout-festival__anchor">
            <FloatingPrint print={byId(p, "characters")} onOpen={onOpen} priority />
          </div>
          <div className="layout-festival__pin">
            <FloatingPrint print={byId(p, "dragon-boat")} onOpen={onOpen} delayMs={100} />
          </div>
          <div className="layout-festival__note">
            <PhotoNote warm>Night. Paper. Passing silhouettes.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "rhythm-strip" ? (
        <EditorialCluster className="layout-rhythm">
          <div className="layout-rhythm__color">
            <FloatingPrint print={byId(p, "red-dancers")} onOpen={onOpen} priority />
          </div>
          <ContactSheet
            prints={[
              byId(p, "dance-again"),
              byId(p, "dance-cluster"),
              byId(p, "dance-leap"),
              byId(p, "dance-trail"),
              byId(p, "dance-arc"),
            ]}
            onOpen={onOpen}
            label="Contact — stage"
          />
          <div className="layout-rhythm__note">
            <PhotoNote>Same breath. Different frames.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "suspended" ? (
        <EditorialCluster className="layout-suspended">
          <div className="layout-suspended__anchor">
            <FloatingPrint print={byId(p, "pool-jump")} onOpen={onOpen} priority />
          </div>
          <div className="layout-suspended__a">
            <FloatingPrint print={byId(p, "butterfly")} onOpen={onOpen} delayMs={80} />
          </div>
          <div className="layout-suspended__b">
            <FloatingPrint print={byId(p, "car-blur")} onOpen={onOpen} delayMs={140} />
          </div>
          <div className="layout-suspended__c">
            <FloatingPrint print={byId(p, "blurry-petals")} onOpen={onOpen} delayMs={200} />
          </div>
          <div className="layout-suspended__note">
            <PhotoNote>Held in air — then gone.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "city-scatter" ? (
        <EditorialCluster className="layout-city">
          <div className="layout-city__train">
            <FloatingPrint print={byId(p, "train")} onOpen={onOpen} priority />
          </div>
          <div className="layout-city__texture">
            <FloatingPrint print={byId(p, "texture")} onOpen={onOpen} delayMs={90} />
          </div>
          <div className="layout-city__anna">
            <FloatingPrint print={byId(p, "anna")} onOpen={onOpen} delayMs={150} />
          </div>
          <div className="layout-city__note">
            <PhotoNote>Rust. Fence. Looking down at a camera.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "facing-wall" ? (
        <EditorialCluster className="layout-facing">
          <div className="layout-facing__molly">
            <FloatingPrint print={byId(p, "molly")} onOpen={onOpen} priority />
          </div>
          <div className="layout-facing__people">
            <FloatingPrint print={byId(p, "we-the-people")} onOpen={onOpen} delayMs={70} />
          </div>
          <div className="layout-facing__shutter">
            <FloatingPrint print={byId(p, "portrait-shutter")} onOpen={onOpen} delayMs={120} />
          </div>
          <div className="layout-facing__deer">
            <FloatingPrint print={byId(p, "deer")} onOpen={onOpen} delayMs={160} />
          </div>
          <div className="layout-facing__hero">
            <FloatingPrint print={byId(p, "hero-portrait")} onOpen={onOpen} delayMs={200} />
          </div>
          <div className="layout-facing__note">
            <PhotoNote>Light on a face. Someone looking back.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "film-roll" ? (
        <EditorialCluster className="layout-film">
          <div className="layout-film__anchor">
            <FloatingPrint print={p[0]} onOpen={onOpen} priority />
          </div>
          <div className="layout-film__pair">
            {p.slice(1, 3).map((print, i) => (
              <FloatingPrint
                key={print.id}
                print={print}
                onOpen={onOpen}
                delayMs={60 + i * 50}
              />
            ))}
          </div>
          <ContactSheet
            prints={p.slice(3).map((print) => ({ ...print, size: print.size ?? "proof" }))}
            onOpen={onOpen}
            label={
              collection.id === "one-roll"
                ? "Contact — film"
                : collection.id === "shore-light"
                  ? "Contact — shore"
                  : "Contact"
            }
            sheetClassName="layout-film__sheet"
          />
          <div className="layout-film__note">
            <PhotoNote warm>{collection.whisper}</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "concert-haze" ? (
        <EditorialCluster className="layout-concert">
          <div className="layout-concert__anchor">
            <FloatingPrint print={byId(p, "raye-02")} onOpen={onOpen} priority />
          </div>
          <div className="layout-concert__second">
            <FloatingPrint print={byId(p, "raye-06")} onOpen={onOpen} delayMs={90} />
          </div>
          <div className="layout-concert__third">
            <FloatingPrint print={byId(p, "raye-01")} onOpen={onOpen} delayMs={140} />
          </div>
          <ContactSheet
            prints={[byId(p, "raye-03"), byId(p, "raye-04"), byId(p, "raye-05")]}
            onOpen={onOpen}
            label="Contact — Raye"
            sheetClassName="layout-concert__sheet"
          />
          <div className="layout-concert__note">
            <PhotoNote>From the floor. Purple air.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}

      {collection.layout === "campus-quad" ? (
        <EditorialCluster className="layout-campus">
          <div className="layout-campus__anchor">
            <FloatingPrint print={byId(p, "stanford-11")} onOpen={onOpen} priority />
          </div>
          <div className="layout-campus__row">
            <FloatingPrint print={byId(p, "stanford-01")} onOpen={onOpen} delayMs={70} />
            <FloatingPrint print={byId(p, "stanford-10")} onOpen={onOpen} delayMs={110} />
            <FloatingPrint print={byId(p, "stanford-13")} onOpen={onOpen} delayMs={150} />
          </div>
          <div className="layout-campus__modern">
            <FloatingPrint print={byId(p, "stanford-04")} onOpen={onOpen} delayMs={120} />
            <FloatingPrint print={byId(p, "stanford-06")} onOpen={onOpen} delayMs={160} />
            <FloatingPrint print={byId(p, "stanford-12")} onOpen={onOpen} delayMs={200} />
          </div>
          <ContactSheet
            prints={[
              byId(p, "stanford-02"),
              byId(p, "stanford-03"),
              byId(p, "stanford-05"),
              byId(p, "stanford-07"),
              byId(p, "stanford-08"),
              byId(p, "stanford-09"),
            ]}
            onOpen={onOpen}
            label="Contact — campus"
            sheetClassName="layout-campus__sheet"
          />
          <div className="layout-campus__note">
            <PhotoNote warm>Stone remembers the sun.</PhotoNote>
          </div>
        </EditorialCluster>
      ) : null}
    </section>
  );
}
