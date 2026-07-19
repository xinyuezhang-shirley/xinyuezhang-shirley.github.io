import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import "@/work/poetry/poetry-zine.css";
import { getPoem } from "@/work/poetry/getPoem";
import { portraits } from "@/work/poetry/portraits";
import {
  Caption,
  EditorialPortrait,
  FullscreenPortrait,
  HandNote,
  LineReveal,
  PageMarker,
  PoemFragment,
  PoemSpread,
  PoemTitle,
  QuoteBlock,
  Reveal,
  Stanza,
} from "@/work/poetry/components/pieces";
import { useInView } from "@/work/art/components/useInView";

function ResolvePortrait({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`zine-resolve${inView ? " is-inview" : ""}${className ? ` ${className}` : ""}`}>
      <EditorialPortrait src={src} alt={alt} fit="contain" className="zine-portrait--fill" />
    </div>
  );
}

/*
  Photo editor notes (orientation → mood → placement):

  Cover       coverReach (L)    — wide landscape plate
  Poetry      crownTriptych (V) — tall plate right of poem
  Flowers     crownSepiaSeat(V) — tall elegy beside sonnet
  Landscape   —                 — dark bilingual atmosphere
  Love        ruffleLean (V)    — tall quiet portrait
  Romantic    candleClose (L)   — wide intimate plate above text
  Birthday    crownCake (V)     — large self-portrait + Claire caption
  Ode         flameTeeth (L)    — wide dramatic plate
  Sleepless   motionBlur (L)    — wide unresolved plate
  Thief       —                 — erasure as silence
  Fear        handReach (V)     — full-bleed abyss
  Renaissance crownShoulder (V) — tall plate beside poem
  Colophon    handsFrame (V)    — closing vertical plate
*/

function Cover() {
  return (
    <PoemSpread tone="cream" className="zine-cover" marker="Issue No. 1">
      <div>
        <Reveal>
          <Link to="/creative" className="zine-cover__back">
            ← Creative
          </Link>
        </Reveal>
        <Reveal delay={1}>
          <p className="zine-cover__meta">Winter Notes · 2020–2024</p>
          <h1 className="zine-cover__title">Poetry</h1>
          <p className="zine-cover__deck">
            Eleven poems. Borrow the notebook for an hour.
          </p>
        </Reveal>
      </div>
      <div className="zine-cover__media">
        <Reveal delay={1}>
          <EditorialPortrait
            src={portraits.coverReach}
            alt="Self-portrait with a hand reaching toward the lens and a geometric paper crown"
            fit="contain"
            priority
            className="zine-cover__main"
          />
        </Reveal>
      </div>
    </PoemSpread>
  );
}

function SpreadPoetry() {
  const poem = getPoem("poetry");
  return (
    <PoemSpread tone="cream" id="poetry" marker="Page 02 · Wonder">
      <div className="spread-poetry">
        <div className="spread-poetry__body">
          <Reveal>
            <Caption>November 2021</Caption>
            <PoemTitle>{poem.title}</PoemTitle>
          </Reveal>
          <Reveal delay={1}>
            <Stanza text={poem.content} />
          </Reveal>
        </div>
        <div className="spread-poetry__aside">
          <Reveal delay={1}>
            <EditorialPortrait
              src={portraits.crownTriptych}
              alt="Triptych self-portrait with a geometric paper crown, hands framing the face"
              fit="contain"
              className="spread-poetry__plate"
            />
          </Reveal>
        </div>
      </div>
    </PoemSpread>
  );
}

function SpreadFlowers() {
  const poem = getPoem("that-flowers-fall");
  return (
    <PoemSpread tone="vellum" id="that-flowers-fall" marker="Page 03 · Mortality">
      <div className="spread-flowers">
        <div className="spread-flowers__visual">
          <Reveal>
            <EditorialPortrait
              src={portraits.crownSepiaSeat}
              alt="Sepia self-portrait with a paper crown, seated"
              fit="contain"
              className="spread-flowers__main"
            />
          </Reveal>
        </div>
        <div className="spread-flowers__text">
          <Reveal delay={1}>
            <Caption>September 2021 · sonnet</Caption>
            <PoemTitle>{poem.title}</PoemTitle>
            <Stanza text={poem.content} />
          </Reveal>
        </div>
      </div>
    </PoemSpread>
  );
}

function SpreadLandscape() {
  const poem = getPoem("alone-in-the-landscape");
  const pinyin = [
    "Yǔ luò jiāng àn mò rén lǚ",
    "yù yǎn yī cháo xìng huā qīng",
    "mò yūn shānshuǐ shī rén yì",
    "lí xià yǐn jiǔ wèn jǐ xīn",
  ].join("\n");
  const chinese = ["雨落江岸没人履", "欲掩一朝杏花清", "墨晕山水湿人意", "篱下饮酒问己心"].join("\n");
  const english = poem.content.split("Translation:\n")[1]?.trim() ?? "";

  return (
    <PoemSpread tone="forest" id="alone-in-the-landscape" marker="Page 04 · Solitude" className="spread-landscape">
      <Reveal>
        <Caption style={{ color: "rgba(220, 232, 222, 0.5)" } satisfies CSSProperties}>
          2020 · 只身山水
        </Caption>
        <PoemTitle style={{ letterSpacing: "0.08em" }}>{poem.title}</PoemTitle>
      </Reveal>
      <Reveal delay={1}>
        <p className="spread-landscape__pinyin">{pinyin}</p>
        <p className="spread-landscape__cn">{chinese}</p>
      </Reveal>
      <Reveal delay={2}>
        <p className="spread-landscape__en">{english}</p>
      </Reveal>
    </PoemSpread>
  );
}

function SpreadLove() {
  const poem = getPoem("love-is-the-language-of-strangers");
  return (
    <PoemSpread tone="blush" id="love-is-the-language-of-strangers" marker="Page 05 · Love">
      <div className="spread-love">
        <Reveal>
          <EditorialPortrait
            src={portraits.ruffleLean}
            alt="Self-portrait in a white ruffled blouse"
            fit="contain"
            className="spread-love__plate"
          />
          <Caption className="mt-3">February 2024</Caption>
        </Reveal>
        <Reveal delay={1}>
          <PoemTitle>{poem.title}</PoemTitle>
          <Stanza text={poem.content} />
        </Reveal>
      </div>
    </PoemSpread>
  );
}

function SpreadRomantic() {
  const poem = getPoem("romantic-death-linguistic-tragedy");
  const stanzas = poem.content.split(/\n\n+/);
  return (
    <PoemSpread
      tone="burgundy"
      id="romantic-death-linguistic-tragedy"
      marker="Page 06 · Language"
      className="spread-romantic"
    >
      <Reveal>
        <EditorialPortrait
          src={portraits.candleClose}
          alt="Self-portrait lit by a thin candle"
          fit="contain"
          className="spread-romantic__plate"
        />
      </Reveal>
      <Reveal delay={1}>
        <Caption>October 2021</Caption>
        <PoemTitle style={{ marginBottom: "2rem" }}>{poem.title}</PoemTitle>
      </Reveal>
      <div className="spread-romantic__grid">
        {stanzas.map((s, i) => (
          <Reveal key={i} delay={(Math.min(i, 2) + 1) as 1 | 2 | 3}>
            <PoemFragment className="spread-romantic__frag">{s}</PoemFragment>
          </Reveal>
        ))}
      </div>
    </PoemSpread>
  );
}

function SpreadBirthday() {
  const poem = getPoem("happy-birthday");
  return (
    <PoemSpread tone="cream" id="happy-birthday" marker="Page 07 · Youth" className="spread-birthday">
      <Reveal>
        <Caption>February 2024 · for Claire</Caption>
        <PoemTitle>{poem.title}</PoemTitle>
      </Reveal>
      <div className="spread-birthday__hero">
        <Reveal delay={1}>
          <EditorialPortrait
            src={portraits.crownCake}
            alt="Self-portrait with paper crown and birthday cake"
            fit="contain"
            className="spread-birthday__cake"
            priority
          />
          <Caption className="spread-birthday__credit">
            Self-portrait. The poem is addressed to Claire.
          </Caption>
        </Reveal>
      </div>
      <div className="spread-birthday__text">
        <Reveal>
          <HandNote className="spread-birthday__dedicate">
            Happy Birthday Claire,
            <br />
            enjoy your twenties.
          </HandNote>
        </Reveal>
        <Reveal delay={1}>
          <Stanza text={poem.content} />
        </Reveal>
      </div>
    </PoemSpread>
  );
}

function SpreadOde() {
  const poem = getPoem("ode-to-life");
  const body = poem.content
    .replace(/^Epigraph:\n/, "")
    .replace(/^"I love that word[\s\S]*?- Viv Albertine\n\n/, "")
    .replace(/^Ode to Life\n/, "");
  return (
    <PoemSpread tone="charcoal" id="ode-to-life" marker="Page 08 · Forever" className="spread-ode">
      <Reveal>
        <EditorialPortrait
          src={portraits.flameTeeth}
          alt="Self-portrait with a lit match held between the teeth"
          fit="contain"
          className="spread-ode__plate"
        />
      </Reveal>
      <div className="spread-ode__copy">
        <Reveal>
          <QuoteBlock attribution="Viv Albertine" className="spread-ode__epigraph">
            I love that word. Forever. I love that forever doesn&apos;t exist, but we have a word for it
            anyway.
          </QuoteBlock>
          <PoemTitle>{poem.title}</PoemTitle>
          <Caption>November 2021</Caption>
        </Reveal>
        <Reveal delay={1}>
          <Stanza text={body.trim()} className="mt-6" />
        </Reveal>
      </div>
    </PoemSpread>
  );
}

function SpreadSleepless() {
  const poem = getPoem("sleepless");
  const lines = poem.content.split("\n");
  return (
    <PoemSpread tone="ink" id="sleepless" marker="Page 09 · Night" className="spread-sleepless">
      <ResolvePortrait
        src={portraits.motionBlur}
        alt="Motion-blurred self-portrait"
        className="spread-sleepless__media"
      />
      <div className="spread-sleepless__text">
        <Reveal>
          <Caption>February 2023 · 2 a.m.</Caption>
          <PoemTitle>{poem.title}</PoemTitle>
        </Reveal>
        <Reveal delay={1}>
          <LineReveal lines={lines} />
        </Reveal>
      </div>
    </PoemSpread>
  );
}

function SpreadThief() {
  const poem = getPoem("the-silent-thief");
  const parts = poem.content.split(/\n\n+/);
  return (
    <PoemSpread tone="cream" id="the-silent-thief" marker="Page 10 · Identity">
      <Reveal>
        <Caption>November 2021</Caption>
        <PoemTitle>{poem.title}</PoemTitle>
      </Reveal>
      <div className="spread-thief__body spread-thief__body--solo">
        <Reveal>
          <Stanza text={parts.slice(0, 2).join("\n\n")} />
        </Reveal>
        <Reveal delay={1}>
          <p className="spread-thief__who">Who am I?</p>
          <Stanza text={parts.slice(2).join("\n\n")} />
        </Reveal>
      </div>
    </PoemSpread>
  );
}

function SpreadFear() {
  const poem = getPoem("fear");
  return (
    <section id="fear" className="zine-spread zine-spread--ink spread-fear-poem">
      <PageMarker label="Page 11 · Abyss" />
      <FullscreenPortrait
        src={portraits.handReach}
        alt="Self-portrait half in shadow behind a blurred hand"
        crop="full"
        priority
      >
        <Reveal>
          <h2 className="spread-fear-poem__title">{poem.title}</h2>
          <p className="spread-fear-poem__tiny">{poem.content}</p>
          <Caption className="mt-4" style={{ color: "rgba(232, 226, 216, 0.45)" } satisfies CSSProperties}>
            February 2024
          </Caption>
        </Reveal>
      </FullscreenPortrait>
    </section>
  );
}

function SpreadRenaissance() {
  const poem = getPoem("the-renaissance-man");
  return (
    <PoemSpread tone="cream" id="the-renaissance-man" marker="Page 12 · Hope">
      <div className="spread-renaissance">
        <div className="spread-renaissance__copy">
          <Reveal>
            <Caption>July 2024</Caption>
            <PoemTitle>{poem.title}</PoemTitle>
          </Reveal>
          <Reveal delay={1}>
            <Stanza text={poem.content} />
          </Reveal>
        </div>
        <div className="spread-renaissance__media">
          <Reveal delay={1}>
            <EditorialPortrait
              src={portraits.crownShoulder}
              alt="Black-and-white self-portrait with a paper crown, glancing over the shoulder"
              fit="contain"
              className="spread-renaissance__plate"
            />
          </Reveal>
        </div>
      </div>
    </PoemSpread>
  );
}

function Colophon() {
  return (
    <PoemSpread tone="vellum" className="zine-colophon" marker="Colophon">
      <Reveal>
        <h2 className="zine-colophon__title">End of issue</h2>
        <p className="zine-colophon__body">
          Eleven poems. If this felt like borrowing a notebook — that was the point.
        </p>
      </Reveal>
      <Reveal delay={1}>
        <EditorialPortrait
          src={portraits.handsFrame}
          alt="Closing self-portrait"
          fit="contain"
          className="zine-colophon__plate"
        />
        <div className="zine-colophon__meta">
          <span>Issue No. 1</span>
          <span>2020 — 2024</span>
          <span>Xinyue Zhang</span>
          <Link to="/creative">← Creative</Link>
        </div>
      </Reveal>
    </PoemSpread>
  );
}

export default function CreativePoetry() {
  return (
    <div className="poetry-zine">
      <Cover />
      <SpreadPoetry />
      <SpreadFlowers />
      <SpreadLandscape />
      <SpreadLove />
      <SpreadRomantic />
      <SpreadBirthday />
      <SpreadOde />
      <SpreadSleepless />
      <SpreadThief />
      <SpreadFear />
      <SpreadRenaissance />
      <Colophon />
    </div>
  );
}
