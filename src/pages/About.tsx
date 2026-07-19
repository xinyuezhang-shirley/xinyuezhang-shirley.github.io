import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { philosophy, amateurismEssay } from "@/content/about";
import {
  tokenizeConcepts,
  type ConceptId,
} from "@/work/about/conceptAnchors";
import "@/work/about/about-field.css";

/** Composition splits only — source strings in content/about.ts stay untouched. */
function beforeAfter(text: string, marker: string): [string, string] {
  const i = text.indexOf(marker);
  if (i === -1) return [text, ""];
  return [text.slice(0, i).trimEnd(), text.slice(i).trimStart()];
}

function throughAfter(text: string, marker: string): [string, string] {
  const i = text.indexOf(marker);
  if (i === -1) return [text, ""];
  const end = i + marker.length;
  return [text.slice(0, end).trimEnd(), text.slice(end).trimStart()];
}

const [intersection, afterIntersection] = throughAfter(
  philosophy.intro[0],
  "on the other.",
);
const [examples, question] = beforeAfter(
  afterIntersection,
  "what does it take",
);

const [instinctSetup, instinctClose] = beforeAfter(
  philosophy.intro[1],
  "They're the same instinct",
);

const amateurPara = amateurismEssay.paragraphs[0];
const [, afterAmateurWord] = throughAfter(amateurPara, "Amateur, n.");
const [amateurCritic, afterAmateurCritic] = throughAfter(
  afterAmateurWord.replace(/^[\s—–-]+/, ""),
  "unprofessional performance.",
);
const [amateurEtymology, amateurDefinition] = beforeAfter(
  afterAmateurCritic,
  "To be an amateur literally means",
);

const competitionPara = amateurismEssay.paragraphs[1];
const [competitionBody, competitionShame] = beforeAfter(
  competitionPara,
  "I had never felt good enough",
);

const closePara = amateurismEssay.paragraphs[2];
const closeLoveSentence =
  "one could be bad at what they love and still love it.";
const closeLead = closePara
  .slice(0, closePara.indexOf(closeLoveSentence))
  .trimEnd();
const closeJourney = closePara
  .slice(closePara.indexOf(closeLoveSentence) + closeLoveSentence.length)
  .trimStart();

function useFineHover(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return fine;
}

function useInViewProgressive<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPending(false);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPending(false);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, pending };
}

function AnchoredText({
  text,
  active,
  enableHover,
  onActivate,
  onClear,
}: {
  text: string;
  active: ConceptId | null;
  enableHover: boolean;
  onActivate: (id: ConceptId) => void;
  onClear: () => void;
}) {
  const parts = tokenizeConcepts(text);

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "text") {
          return <span key={`t-${i}`}>{part.value}</span>;
        }

        return (
          <span
            key={`a-${i}-${part.concept}`}
            className="af-anchor"
            data-concept={part.concept}
            data-active={active === part.concept ? "true" : undefined}
            onMouseEnter={
              enableHover ? () => onActivate(part.concept) : undefined
            }
            onMouseLeave={enableHover ? onClear : undefined}
          >
            {part.value}
          </span>
        );
      })}
    </>
  );
}

function Room({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const { ref, pending } = useInViewProgressive<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`af-room ${className}${pending ? " is-pending" : ""}`}
    >
      {children}
    </section>
  );
}

export default function About() {
  const [active, setActive] = useState<ConceptId | null>(null);
  const fineHover = useFineHover();

  const onActivate = useCallback((id: ConceptId) => setActive(id), []);
  const onClear = useCallback(() => setActive(null), []);

  const bind = {
    active,
    enableHover: fineHover,
    onActivate,
    onClear,
  };

  return (
    <article className="about-field" data-concept={active ?? undefined}>
      <div className="about-field__board">
        <Room className="af-room--threshold">
          <p className="af-kicker">About</p>
          <h1 className="af-lede">
            <AnchoredText text={philosophy.statement} {...bind} />
          </h1>
        </Room>

        <Room className="af-room--intersection">
          <p className="af-prose">
            <AnchoredText text={intersection} {...bind} />
          </p>
        </Room>

        <Room className="af-room--examples">
          <p className="af-prose af-prose--quiet">
            <AnchoredText text={examples} {...bind} />
          </p>
        </Room>

        <Room className="af-room--question">
          <aside className="af-margin" aria-hidden="true">
            same question
          </aside>
          <p className="af-landmark">
            <AnchoredText text={question} {...bind} />
          </p>
        </Room>

        <Room className="af-room--instinct">
          <p className="af-prose">
            <AnchoredText text={instinctSetup} {...bind} />
          </p>
          <p className="af-pull">
            <AnchoredText text={instinctClose} {...bind} />
          </p>
        </Room>

        <Room className="af-room--essay-head">
          <h2 className="af-essay-title">
            <AnchoredText text={amateurismEssay.title} {...bind} />
          </h2>
          <aside className="af-margin af-margin--essay">
            {amateurismEssay.note}
          </aside>
        </Room>

        <Room className="af-room--definition">
          <p className="af-word" aria-hidden="true">
            Amateur
          </p>
          <div className="af-definition">
            <p className="af-prose af-prose--lemma">
              <span className="af-lemma">
                <AnchoredText text="Amateur, n." {...bind} />
              </span>
              {" — "}
              <AnchoredText text={amateurCritic.trim()} {...bind} />
            </p>
            <p className="af-prose">
              <AnchoredText text={amateurEtymology} {...bind} />
            </p>
            <p className="af-pull af-pull--compact">
              <AnchoredText text={amateurDefinition} {...bind} />
            </p>
          </div>
        </Room>

        <Room className="af-room--competition">
          <p className="af-prose">
            <AnchoredText text={competitionBody} {...bind} />
          </p>
          <p className="af-pull af-pull--end">
            <AnchoredText text={competitionShame} {...bind} />
          </p>
        </Room>

        <Room className="af-room--close">
          <p className="af-prose">
            <AnchoredText text={closeLead} {...bind} />
          </p>
          <p className="af-landmark af-landmark--soft">
            <AnchoredText text={closeLoveSentence} {...bind} />
          </p>
          <p className="af-prose af-prose--close">
            <AnchoredText text={closeJourney} {...bind} />
          </p>
        </Room>

        <p className="af-sign">Xinyue (Shirley) Zhang</p>
      </div>
    </article>
  );
}
