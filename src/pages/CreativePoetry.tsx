import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import "@/work/poetry/poetry-zine.css";
import { getPoem } from "@/work/poetry/getPoem";
import { portraits, scraps } from "@/work/poetry/portraits";
import {
  Caption,
  Collage,
  EditorialPortrait,
  FullscreenPortrait,
  HandNote,
  LineReveal,
  NotebookMargin,
  PageMarker,
  PaperLayer,
  PoemFragment,
  PoemSpread,
  PoemTitle,
  QuoteBlock,
  Reveal,
  Stamp,
  Stanza,
} from "@/work/poetry/components/pieces";
import { useInView } from "@/work/art/components/useInView";

function ResolvePortrait({
  src,
  alt,
  crop,
  className = "",
}: {
  src: string;
  alt: string;
  crop?: "full" | "eyes" | "face" | "shadow" | "crown";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`zine-resolve${inView ? " is-inview" : ""}${className ? ` ${className}` : ""}`}>
      <EditorialPortrait src={src} alt={alt} crop={crop} scale={1.08} className="zine-portrait--fill" />
    </div>
  );
}

/* Emotional sequence:
   Cover → wonder (Poetry) → mortality (Flowers) → solitude (Landscape)
   → love → intoxicating language → birthday/youth → forever
   → sleepless → identity/anger → fear → renaissance hope → colophon */

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
          <p className="zine-cover__meta">Winter Notes · Notebook III · Draft 4</p>
          <h1 className="zine-cover__title">Poetry</h1>
          <p className="zine-cover__deck">
            A handmade zine of eleven poems, 2020–2024. Borrow the notebook for an hour.
          </p>
          <Stamp>Personal copy</Stamp>
        </Reveal>
      </div>
      <div className="zine-cover__media">
        <Reveal delay={1}>
          <EditorialPortrait
            src={portraits.crownClose}
            alt="Self-portrait with paper crown — hand reaching toward the lens"
            crop="face"
            priority
            className="zine-cover__main"
          />
        </Reveal>
        <Reveal delay={2}>
          <EditorialPortrait
            src={portraits.sepiaCrown}
            alt="Grainy crop — paper crown"
            crop="crown"
            className="zine-cover__crop"
          />
        </Reveal>
        <HandNote className="zine-cover__note">the crown is paper — still counts</HandNote>
      </div>
    </PoemSpread>
  );
}

function SpreadPoetry() {
  const poem = getPoem("poetry");
  return (
    <PoemSpread tone="newsprint" id="poetry" marker="Page 02 · Wonder">
      <div className="spread-poetry">
        <div className="spread-poetry__body">
          <Reveal>
            <Caption>Nov 2021 · lead editor, here and there</Caption>
            <PoemTitle>{poem.title}</PoemTitle>
          </Reveal>
          <Reveal delay={1}>
            <Stanza text={poem.content} />
          </Reveal>
        </div>
        <div className="spread-poetry__aside">
          <Reveal delay={1}>
            <EditorialPortrait
              src={portraits.closeEyes}
              alt="Eyes looking away — mint bedspread crop"
              crop="eyes"
              className="spread-poetry__eyes"
            />
          </Reveal>
          <Reveal delay={2}>
            <NotebookMargin>
              not diction
              <br />
              not rhyme —
              <br />
              creativity.
            </NotebookMargin>
            <p className="spread-poetry__vertical">music for the soul</p>
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
              src={portraits.handReach}
              alt="Shadowed face, paper crown tip, blurred hand"
              crop="face"
              className="spread-flowers__main"
            />
          </Reveal>
          <Reveal delay={1}>
            <EditorialPortrait
              src={scraps.butterfly}
              alt="Butterfly photograph"
              crop="full"
              className="spread-flowers__scrap"
            />
          </Reveal>
          <span className="spread-flowers__word" aria-hidden>
            fall
          </span>
        </div>
        <div className="spread-flowers__text">
          <Reveal delay={1}>
            <Caption rotate={-2}>Sept 2021 · sonnet</Caption>
            <PoemTitle>{poem.title}</PoemTitle>
            <HandNote strike className="mb-4">
              forever spring
            </HandNote>
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
      <div className="spread-landscape__ink" aria-hidden>
        <EditorialPortrait src={scraps.deer} alt="" crop="left" scale={1.3} />
      </div>
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
        <HandNote style={{ marginTop: "2rem", opacity: 0.75 }}>篱下饮酒问己心</HandNote>
      </Reveal>
    </PoemSpread>
  );
}

function SpreadLove() {
  const poem = getPoem("love-is-the-language-of-strangers");
  return (
    <PoemSpread tone="blush" id="love-is-the-language-of-strangers" marker="Page 05 · Love">
      <HandNote className="spread-love__float spread-love__float--a">not flutter — drops</HandNote>
      <HandNote className="spread-love__float spread-love__float--b">dimples like wounds</HandNote>
      <div className="spread-love">
        <Reveal>
          <EditorialPortrait
            src={portraits.closeEyes}
            alt="Reclining with paper crown — editorial crop"
            crop="face"
            className="spread-love__eyes"
          />
          <Caption rotate={3} className="mt-3">
            Feb 2024 · strangers
          </Caption>
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
    <PoemSpread tone="burgundy" id="romantic-death-linguistic-tragedy" marker="Page 06 · Language" className="spread-romantic">
      <Reveal>
        <EditorialPortrait
          src={portraits.handReach}
          alt="Hand overlay reaching through the frame"
          crop="hands"
          className="spread-romantic__media"
        />
      </Reveal>
      <Reveal>
        <Caption>Oct 2021 · linguistic tragedy</Caption>
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
        <Caption>Feb 2024 · for Claire</Caption>
        <PoemTitle>{poem.title}</PoemTitle>
      </Reveal>
      <div className="spread-birthday__hero">
        <Reveal delay={1}>
          <EditorialPortrait
            src={portraits.crownCake}
            alt="Paper crown and birthday cake — nested editorial frame"
            crop="full"
            className="spread-birthday__cake"
            priority
          />
        </Reveal>
        <div className="spread-birthday__stack">
          <Reveal delay={2}>
            <EditorialPortrait
              src={portraits.layeredCollage}
              alt="Cake, headphones, staggered film strips"
              crop="top"
              className="spread-birthday__strip"
            />
          </Reveal>
          <Reveal delay={3}>
            <EditorialPortrait
              src={portraits.shadowTurn}
              alt="Three frames — hands framing the crown"
              crop="face"
              className="spread-birthday__triptych"
            />
          </Reveal>
        </div>
      </div>
      <div className="spread-birthday__text">
        <Reveal>
          <PaperLayer>
            <Stamp>c&apos;est la vie</Stamp>
            <HandNote className="spread-birthday__dedicate">
              Happy Birthday Claire,
              <br />
              enjoy your twenties.
            </HandNote>
            <Caption className="mt-4">Count 1 → ∞ · don&apos;t look back</Caption>
          </PaperLayer>
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
      <span className="spread-ode__forever" aria-hidden>
        Forever
      </span>
      <Reveal>
        <EditorialPortrait
          src={portraits.candleGaze}
          alt="Birthday candle held near the face — diptych"
          crop="candle"
          className="spread-ode__candle"
        />
      </Reveal>
      <div>
        <Reveal>
          <QuoteBlock attribution="Viv Albertine" className="spread-ode__epigraph">
            I love that word. Forever. I love that forever doesn&apos;t exist, but we have a word for it
            anyway.
          </QuoteBlock>
          <PoemTitle>{poem.title}</PoemTitle>
          <Caption>Nov 2021 · golden-crowned sparrow</Caption>
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
        src={portraits.shadowTurn}
        alt="Portrait resolving from blur — paper crown"
        crop="shadow"
        className="spread-sleepless__media"
      />
      <div className="spread-sleepless__text">
        <Reveal>
          <p className="spread-sleepless__clock">02:00 · Feb 2023</p>
          <PoemTitle>{poem.title}</PoemTitle>
        </Reveal>
        <Reveal delay={1}>
          <LineReveal lines={lines} />
        </Reveal>
        <Reveal delay={2}>
          <HandNote className="mt-6">lock it in a box named discipline</HandNote>
        </Reveal>
      </div>
    </PoemSpread>
  );
}

function SpreadThief() {
  const poem = getPoem("the-silent-thief");
  const parts = poem.content.split(/\n\n+/);
  return (
    <PoemSpread tone="newsprint" id="the-silent-thief" marker="Page 10 · Identity">
      <Reveal>
        <Caption>Nov 2021 · his honor Success</Caption>
        <PoemTitle>{poem.title}</PoemTitle>
      </Reveal>
      <Collage className="spread-thief__collage">
        <Reveal delay={1}>
          <EditorialPortrait
            src={portraits.flashBw}
            alt="Looking back over the shoulder — B&W flash"
            crop="face"
            className="spread-thief__a"
            mono
          />
        </Reveal>
        <Reveal delay={2}>
          <EditorialPortrait
            src={portraits.layeredCollage}
            alt="Fragmented cake sequence"
            crop="eyes"
            className="spread-thief__b"
            mono
          />
        </Reveal>
        <Reveal delay={3}>
          <EditorialPortrait
            src={portraits.crownClose}
            alt="Direct gaze — top frame"
            crop="eyes"
            className="spread-thief__c"
          />
        </Reveal>
      </Collage>
      <div className="spread-thief__body">
        <Reveal>
          <Stanza text={parts.slice(0, 2).join("\n\n")} />
        </Reveal>
        <Reveal delay={1}>
          <p className="spread-thief__who">Who am I?</p>
          <Stanza text={parts.slice(2).join("\n\n")} />
          <HandNote strike className="mt-4">
            complete thought;
          </HandNote>
          <HandNote>complete distraught.</HandNote>
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
        alt="Face half in shadow — looking through the hand"
        crop="shadow"
        priority
      >
        <Reveal>
          <h2 className="spread-fear-poem__title">{poem.title}</h2>
          <p className="spread-fear-poem__tiny">{poem.content}</p>
          <Caption className="mt-4" style={{ color: "rgba(232, 226, 216, 0.45)" } satisfies CSSProperties}>
            Feb 2024 · God&apos;s unloved orphan
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
      <Reveal>
        <Caption>July 2024 · Il Divino</Caption>
        <PoemTitle>{poem.title}</PoemTitle>
      </Reveal>
      <div className="spread-renaissance__wall">
        <Reveal delay={1}>
          <EditorialPortrait src={scraps.goddess} alt="Surrender — digital painting" crop="face" />
        </Reveal>
        <Reveal delay={2}>
          <EditorialPortrait
            src={portraits.sepiaCrown}
            alt="Sepia paper crown — recurring motif"
            crop="crown"
          />
        </Reveal>
        <Reveal delay={3}>
          <EditorialPortrait src={scraps.light} alt="Fear Me — halo study" crop="full" />
        </Reveal>
      </div>
      <div className="spread-renaissance__text">
        <Reveal>
          <NotebookMargin side="left">
            free the vision
            <br />
            from the vaulted sky
          </NotebookMargin>
          <Stamp className="mt-6">The Master</Stamp>
        </Reveal>
        <Reveal delay={1}>
          <Stanza text={poem.content} />
        </Reveal>
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
          Eleven poems. One paper crown. If this felt like borrowing a notebook — that was the point.
        </p>
      </Reveal>
      <Reveal delay={1}>
        <EditorialPortrait
          src={portraits.candleGaze}
          alt="Candle — closing motif"
          crop="bottom"
          className="zine-colophon__thumb"
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
