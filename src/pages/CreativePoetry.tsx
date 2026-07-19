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
  Curated contact sheet (each file once; composites whole):
  crownHeld        → Cover
  crownHands       → That Flowers Fall
  ruffleLean       → Love is the Language of Strangers
  crownCakeSingle  → Happy Birthday
  headphonesSmile  → Silence (image-only)
  flameTeeth       → Ode to Life
  motionBlur       → Sleepless
  stanfordProfile  → The Silent Thief
  handReach        → Fear (prior batch — still the strongest for abyss)

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
          src={portraits.crownHeld}
          alt="Self-portrait holding a ring of folded paper stars around the face"
          priority
          className="zine-cover__plate"
        />
      </Reveal>
    </PoemSpread>
  );
}

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

function SpreadFlowers() {
  const poem = getPoem("that-flowers-fall");
  return (
    <PoemSpread tone="cream" id="that-flowers-fall" className="spread-duo">
      <Reveal>
        <Plate
          src={portraits.crownHands}
          alt="Grainy sepia self-portrait, hands framing the face under a paper crown"
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
          src={portraits.ruffleLean}
          alt="Self-portrait in a white ruffled blouse, leaning into the frame"
          className="spread-duo__plate"
        />
      </Reveal>
    </PoemSpread>
  );
}

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

function SpreadBirthday() {
  const poem = getPoem("happy-birthday");
  return (
    <PoemSpread tone="cream" id="happy-birthday" className="spread-birthday">
      <Reveal>
        <Plate
          src={portraits.crownCakeSingle}
          alt="Paper crown and strawberry cake — a single complete portrait"
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

/** Image silence — headphones candid, no poem */
function SpreadSilence() {
  return (
    <PoemSpread tone="cream" className="spread-image" aria-label="Portrait">
      <Reveal>
        <Plate
          src={portraits.headphonesSmile}
          alt="Self-portrait smiling in headphones"
          className="spread-image__plate"
        />
      </Reveal>
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
    <PoemSpread tone="charcoal" id="ode-to-life" className="spread-duo">
      <Reveal>
        <Plate
          src={portraits.flameTeeth}
          alt="Self-portrait with a lit flame held between the teeth"
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

function SpreadSleepless() {
  const poem = getPoem("sleepless");
  return (
    <PoemSpread tone="ink" id="sleepless" className="spread-sleepless">
      <Reveal>
        <Plate
          src={portraits.motionBlur}
          alt="Motion-blurred self-portrait in a black bow blouse"
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
          src={portraits.stanfordProfile}
          alt="Profile self-portrait in a dorm room with a Stanford pennant"
          className="spread-duo__plate"
        />
      </Reveal>
    </PoemSpread>
  );
}

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
