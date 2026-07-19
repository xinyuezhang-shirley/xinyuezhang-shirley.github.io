import { Link } from "react-router-dom";
import "@/work/poetry/poetry-zine.css";
import { getPoem } from "@/work/poetry/getPoem";
import { portraits } from "@/work/poetry/portraits";
import {
  HandNote,
  Meta,
  Plate,
  PoemSpread,
  PoemTitle,
  QuoteBlock,
  Reveal,
  Stanza,
} from "@/work/poetry/components/pieces";

/*
  Portrait usage (each once, composites shown whole):
  crownClose     → Cover
  sepiaCrown     → That Flowers Fall
  closeEyes      → Love is the Language of Strangers
  crownCake      → Happy Birthday
  layeredCollage → Silence (image-only page)
  candleGaze     → Ode to Life
  shadowTurn     → Sleepless
  flashBw        → The Silent Thief
  handReach      → Fear

  Text / silence (no photo):
  Poetry · Alone in the Landscape · Romantic Death · The Renaissance Man · Colophon
*/

function Cover() {
  return (
    <PoemSpread tone="cream" className="zine-cover">
      <div>
        <Reveal>
          <Link to="/creative" className="zine-cover__back">
            ← Creative
          </Link>
        </Reveal>
        <Reveal delay={1}>
          <Meta>Issue No. 1 · 2020–2024</Meta>
          <h1 className="zine-cover__title">Poetry</h1>
          <p className="zine-cover__deck">Eleven poems. A paper crown. Borrow the notebook for an hour.</p>
        </Reveal>
      </div>
      <Reveal delay={1}>
        <Plate
          src={portraits.crownClose}
          alt="Two self-portraits: a direct gaze, and a paper crown behind a blurred hand"
          priority
          className="zine-cover__plate"
        />
      </Reveal>
    </PoemSpread>
  );
}

/** Text only — wonder / craft */
function SpreadPoetry() {
  const poem = getPoem("poetry");
  return (
    <PoemSpread tone="cream" id="poetry" className="spread-text spread-text--wide">
      <Reveal>
        <Meta>November 2021</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={poem.content} />
      </Reveal>
    </PoemSpread>
  );
}

/** Small plate + sonnet */
function SpreadFlowers() {
  const poem = getPoem("that-flowers-fall");
  return (
    <PoemSpread tone="cream" id="that-flowers-fall" className="spread-duo">
      <Reveal>
        <Plate
          src={portraits.sepiaCrown}
          alt="Sepia self-portrait wearing a paper crown"
          className="spread-duo__plate"
        />
      </Reveal>
      <Reveal delay={1}>
        <Meta>September 2021</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={poem.content} />
      </Reveal>
    </PoemSpread>
  );
}

/** Chinese aesthetic — typography only */
function SpreadLandscape() {
  const poem = getPoem("alone-in-the-landscape");
  const chinese = ["雨落江岸没人履", "欲掩一朝杏花清", "墨晕山水湿人意", "篱下饮酒问己心"].join("\n");
  const english = poem.content.split("Translation:\n")[1]?.trim() ?? "";

  return (
    <PoemSpread tone="forest" id="alone-in-the-landscape" className="spread-landscape">
      <Reveal>
        <Meta>2020</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
      </Reveal>
      <Reveal delay={1}>
        <p className="spread-landscape__cn">{chinese}</p>
        <p className="spread-landscape__en">{english}</p>
      </Reveal>
    </PoemSpread>
  );
}

/** Plate + love poem */
function SpreadLove() {
  const poem = getPoem("love-is-the-language-of-strangers");
  return (
    <PoemSpread tone="blush" id="love-is-the-language-of-strangers" className="spread-duo spread-duo--flip">
      <Reveal>
        <Meta>February 2024</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={poem.content} />
      </Reveal>
      <Reveal delay={1}>
        <Plate
          src={portraits.closeEyes}
          alt="Self-portrait reclining in a paper crown, with a detail of the hand"
          className="spread-duo__plate"
        />
      </Reveal>
    </PoemSpread>
  );
}

/** Text only — burgundy */
function SpreadRomantic() {
  const poem = getPoem("romantic-death-linguistic-tragedy");
  const stanzas = poem.content.split(/\n\n+/);
  return (
    <PoemSpread tone="burgundy" id="romantic-death-linguistic-tragedy" className="spread-romantic">
      <Reveal>
        <Meta>October 2021</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
      </Reveal>
      <Reveal delay={1}>
        {stanzas.map((s) => (
          <p key={s.slice(0, 24)} className="spread-romantic__body">
            {s}
          </p>
        ))}
      </Reveal>
    </PoemSpread>
  );
}

/** Birthday plate + poem */
function SpreadBirthday() {
  const poem = getPoem("happy-birthday");
  return (
    <PoemSpread tone="cream" id="happy-birthday" className="spread-birthday">
      <Reveal>
        <Plate
          src={portraits.crownCake}
          alt="Paper crown and birthday cake — nested portrait"
          className="spread-birthday__plate"
        />
      </Reveal>
      <Reveal delay={1}>
        <Meta>February 2024 · for Claire</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={poem.content} />
        <HandNote className="spread-birthday__note">enjoy your twenties.</HandNote>
      </Reveal>
    </PoemSpread>
  );
}

/** Image silence — complete collage, no poem */
function SpreadSilence() {
  return (
    <PoemSpread tone="cream" className="spread-image" aria-label="Editorial collage">
      <Reveal>
        <Plate
          src={portraits.layeredCollage}
          alt="Black-and-white collage of cake, headphones, and a wide-eyed bite"
          className="spread-image__plate"
        />
      </Reveal>
    </PoemSpread>
  );
}

/** Candle diptych + ode */
function SpreadOde() {
  const poem = getPoem("ode-to-life");
  const body = poem.content
    .replace(/^Epigraph:\n/, "")
    .replace(/^"I love that word[\s\S]*?- Viv Albertine\n\n/, "")
    .replace(/^Ode to Life\n/, "");

  return (
    <PoemSpread tone="charcoal" id="ode-to-life" className="spread-duo">
      <Reveal>
        <Plate
          src={portraits.candleGaze}
          alt="Two frames with a birthday candle — looking away, then holding the flame"
          className="spread-duo__plate"
        />
      </Reveal>
      <Reveal delay={1}>
        <QuoteBlock attribution="Viv Albertine">
          I love that word. Forever. I love that forever doesn&apos;t exist, but we have a word for it
          anyway.
        </QuoteBlock>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={body.trim()} />
      </Reveal>
    </PoemSpread>
  );
}

/** Night triptych + sleepless */
function SpreadSleepless() {
  const poem = getPoem("sleepless");
  return (
    <PoemSpread tone="ink" id="sleepless" className="spread-sleepless">
      <Reveal>
        <Plate
          src={portraits.shadowTurn}
          alt="Three frames of a paper crown — sharp, colored, then blurred"
          className="spread-sleepless__plate"
        />
      </Reveal>
      <Reveal delay={1}>
        <Meta>February 2023 · 2 a.m.</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={poem.content} />
      </Reveal>
    </PoemSpread>
  );
}

/** Identity — one B&W plate */
function SpreadThief() {
  const poem = getPoem("the-silent-thief");
  return (
    <PoemSpread tone="cream" id="the-silent-thief" className="spread-duo spread-duo--flip">
      <Reveal>
        <Meta>November 2021</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={poem.content} />
      </Reveal>
      <Reveal delay={1}>
        <Plate
          src={portraits.flashBw}
          alt="Black-and-white self-portrait looking back, wearing a paper crown"
          className="spread-duo__plate"
        />
      </Reveal>
    </PoemSpread>
  );
}

/** Dark page — hand/shadow plate + poem */
function SpreadFear() {
  const poem = getPoem("fear");
  return (
    <PoemSpread tone="ink" id="fear" className="spread-fear">
      <Reveal>
        <Plate
          src={portraits.handReach}
          alt="Face in shadow behind a blurred hand, tip of a paper crown visible"
          className="spread-fear__plate"
        />
      </Reveal>
      <Reveal delay={1}>
        <Meta>February 2024</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <p className="spread-fear__poem">{poem.content}</p>
      </Reveal>
    </PoemSpread>
  );
}

/** Text only — hope */
function SpreadRenaissance() {
  const poem = getPoem("the-renaissance-man");
  return (
    <PoemSpread tone="cream" id="the-renaissance-man" className="spread-text">
      <Reveal>
        <Meta>July 2024</Meta>
        <PoemTitle>{poem.title}</PoemTitle>
        <Stanza text={poem.content} />
      </Reveal>
    </PoemSpread>
  );
}

function Colophon() {
  return (
    <PoemSpread tone="cream" className="zine-colophon">
      <Reveal>
        <h2 className="zine-colophon__title">End of issue</h2>
        <p className="zine-colophon__body">Eleven poems. If this felt like borrowing a notebook — that was the point.</p>
        <div className="zine-colophon__meta">
          <span>Issue No. 1</span>
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
      <SpreadSilence />
      <SpreadOde />
      <SpreadSleepless />
      <SpreadThief />
      <SpreadFear />
      <SpreadRenaissance />
      <Colophon />
    </div>
  );
}
