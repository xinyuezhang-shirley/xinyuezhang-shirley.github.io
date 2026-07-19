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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
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

function FieldBlock({
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
      className={`af-block ${className}${pending ? " is-pending" : ""}`}
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
    <article
      className="about-field"
      data-concept={active ?? undefined}
    >
      <div className="about-field__board">
        <FieldBlock className="af-block--open">
          <p className="af-kicker">About</p>
          <h1 className="af-lede">
            <AnchoredText text={philosophy.statement} {...bind} />
          </h1>
        </FieldBlock>

        <FieldBlock className="af-block--body">
          <p className="af-prose">
            <AnchoredText text={philosophy.intro[0]} {...bind} />
          </p>
        </FieldBlock>

        <FieldBlock className="af-block--pause">
          <p className="af-pause">
            <AnchoredText text={philosophy.intro[1]} {...bind} />
          </p>
        </FieldBlock>

        <FieldBlock className="af-block--essay-head">
          <h2 className="af-essay-title">
            <AnchoredText text={amateurismEssay.title} {...bind} />
          </h2>
          <p className="af-essay-note">{amateurismEssay.note}</p>
        </FieldBlock>

        <FieldBlock className="af-block--essay">
          <p className="af-prose">
            <AnchoredText text={amateurismEssay.paragraphs[0]} {...bind} />
          </p>
        </FieldBlock>

        <FieldBlock className="af-block--essay-shift">
          <p className="af-prose">
            <AnchoredText text={amateurismEssay.paragraphs[1]} {...bind} />
          </p>
        </FieldBlock>

        <FieldBlock className="af-block--close">
          <p className="af-prose">
            <AnchoredText text={amateurismEssay.paragraphs[2]} {...bind} />
          </p>
        </FieldBlock>

        <p className="af-sign">Xinyue (Shirley) Zhang</p>
      </div>
    </article>
  );
}
