import { Link } from "react-router-dom";
import { catalogue } from "@/work/art/catalogue";
import { poems } from "@/content/creative";
import { dreamCount } from "@/work/dreams/loadCatalog";
import "@/work/creative/creative-foyer.css";

const artCount = catalogue.length;
const poemCount = poems.length;

export default function CreativeIndex() {
  return (
    <div className="creative-foyer">
      <div className="creative-foyer__rail">
        <header className="creative-foyer__head">
          <span className="creative-foyer__eyebrow">Creative</span>
          <h1 className="creative-foyer__statement">
            A gallery,
            <br />
            not a <em>portfolio.</em>
          </h1>
          <div className="creative-foyer__rule" aria-hidden />
          <p className="creative-foyer__deck">
            Four rooms. Digital paintings, photographic essays, poems in English and Chinese,
            and a private sky of recurring dream symbols — entered as exhibitions, not menus.
          </p>
          <p className="creative-foyer__colophon">Foyer · Four rooms · Open</p>
        </header>

        <div className="creative-foyer__rooms">
          {/* ART */}
          <Link to="/creative/art" className="foyer-room foyer-room--art">
            <div className="foyer-room__stage" aria-hidden>
              <div className="foyer-bleed">
                <img
                  src="/art/goddess.PNG"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="foyer-swatch">
                <img
                  src="/art/light.JPEG"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <p className="foyer-room__meta">
              <span>{artCount} plates</span>
              <span>2023 — 2026</span>
              <span>myco.to</span>
            </p>
            <h2 className="foyer-room__title">Art</h2>
            <p className="foyer-room__desc">
              Digital paintings, original characters, and design studies — a quiet monograph.
            </p>
            <p className="foyer-room__enter">Enter exhibition →</p>
          </Link>

          {/* PHOTOGRAPHY */}
          <Link to="/creative/photography" className="foyer-room foyer-room--photo">
            <div className="foyer-room__stage" aria-hidden>
              <div className="foyer-print">
                <img
                  src="/photography/Zhang_Portal.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="foyer-contact">
                <span>
                  <img
                    src="/photography/hello.JPG"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span>
                  <img
                    src="/photography/Zhang_MichelleAtBeach-min.png"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </div>
            </div>
            <p className="foyer-room__meta">
              <span>Visual essays</span>
              <span>California · Shanghai · Chicago</span>
            </p>
            <h2 className="foyer-room__title">Photography</h2>
            <p className="foyer-room__desc">
              Glass, coast, film, stage, stone, faces — prints arranged as studies.
            </p>
            <p className="foyer-room__enter">Enter exhibition →</p>
          </Link>

          {/* POETRY */}
          <Link to="/creative/poetry" className="foyer-room foyer-room--poetry">
            <div className="foyer-room__stage" aria-hidden>
              <p className="foyer-annotate">from 只身山水</p>
              <p className="foyer-cn">
                <span>雨落江岸没人履</span>
                <span>欲掩一朝杏花清</span>
              </p>
              <p className="foyer-stanza">
                Like autumn comes and leaves begin to blush
                <br />
                Like rains confess the wild&apos;s restraining souls…
              </p>
            </div>
            <p className="foyer-room__meta">
              <span>{poemCount} poems</span>
              <span>English / 中文</span>
              <span>2020 — 2024</span>
            </p>
            <h2 className="foyer-room__title">Poetry</h2>
            <p className="foyer-room__desc">
              {poemCount} poems written between 2020 and 2024, in English and Chinese.
            </p>
            <p className="foyer-room__enter">Enter exhibition →</p>
          </Link>

          {/* DREAMS */}
          <Link to="/creative/dreams" className="foyer-room foyer-room--dreams">
            <div className="foyer-room__stage" aria-hidden>
              <p className="foyer-dreams-margin">semantic atlas</p>
              <p className="foyer-dreams-word">Dreams</p>
              <p className="foyer-dreams-symbols">music · water · temple · parent</p>
            </div>
            <p className="foyer-room__meta">
              <span>{dreamCount} nights</span>
              <span>semantic atlas</span>
              <span>Grave of Ideas</span>
            </p>
            <h2 className="foyer-room__title">Dreams</h2>
            <p className="foyer-room__desc">
              An atlas of the subconscious — symbols rising into themes under blue sky glass.
            </p>
            <p className="foyer-room__enter">Enter exhibition →</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
