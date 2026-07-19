import { useRef } from "react";
import { Link } from "react-router-dom";
import { Eyebrow, Body, Heading } from "@/components/type/Typography";
import { FloatingCircles } from "@/components/decor/FloatingCircles";

const featured = [
  {
    eyebrow: "Work",
    title: "Nommi",
    description: "Scroll the story. The phone stays alive.",
    href: "/work/nommi",
  },
  {
    eyebrow: "Research",
    title: "Differ",
    description: "Play the instrument — where meaning breaks.",
    href: "/research/differ",
  },
  {
    eyebrow: "Work",
    title: "Echo",
    description: "Words that continue breathing across five afterlives.",
    href: "/work/echo",
  },
];

const PHOTO_SRC = "/photography/Zhang_hero-portrait.jpg";
const PHOTO_OBJECT_POSITION = { x: 38, y: 18 }; // must match object-[38%_18%] on the <img> below
const PHOTO_NATURAL_SIZE = { width: 1920, height: 1080 };

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <section ref={heroRef} className="relative w-full overflow-hidden md:h-[85vh] md:min-h-[600px]">
        {/* Editorial photograph — full-bleed to the viewport edge, sits behind
            the floating circles so they drift across it instead of stopping
            at a clean rectangle. */}
        <div
          ref={photoRef}
          className="relative z-0 w-full aspect-[4/3] md:aspect-auto md:absolute md:inset-y-0 md:right-0 md:w-[46%] overflow-hidden bg-ink/5"
        >
          <img
            src={PHOTO_SRC}
            alt="Shirley Zhang"
            className="w-full h-full object-cover object-[38%_18%]"
          />
        </div>

        <div className="hidden md:block">
          <FloatingCircles
            heroRef={heroRef}
            photoRef={photoRef}
            photoSrc={PHOTO_SRC}
            objectPosition={PHOTO_OBJECT_POSITION}
            naturalSize={PHOTO_NATURAL_SIZE}
          />
        </div>

        {/* Text — the name is treated as the dominant visual object, not a heading */}
        <div className="container relative z-20 pt-10 md:pt-16 pb-12 md:pb-0 md:absolute md:inset-y-0 md:left-0 md:flex md:flex-col md:justify-center">
          <p className="pointer-events-none font-sans text-xs uppercase tracking-[0.08em] text-ink-faint leading-relaxed mb-8 md:mb-10">
            Stanford University
            <br />
            M.S. Computer Science
          </p>

          <h1 className="pointer-events-none font-serif font-semibold uppercase leading-[0.8] tracking-tight text-ink text-[clamp(4.5rem,15vw,13.5rem)]">
            <span className="block">Shirley</span>
            <span className="block font-sans text-sm md:text-base normal-case tracking-[0.14em] text-ink-soft mt-3 md:mt-5 ml-1">
              Engineer, Researcher, Daydreamer
            </span>
            <span className="block ml-[6vw] md:ml-[8vw] mt-3 md:mt-5">
              Zhang
              <span className="font-serif italic text-ink-faint text-[0.18em] tracking-normal normal-case ml-3 align-middle">
                (Xinyue)
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="container pb-32 md:pb-40">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {featured.map((item) => (
            <Link key={item.href} to={item.href} className="group block">
              <Eyebrow className="mb-3 group-hover:text-accent transition-colors">
                {item.eyebrow}
              </Eyebrow>
              <Heading size={2} className="mb-3 group-hover:text-accent transition-colors">
                {item.title}
              </Heading>
              <Body>{item.description}</Body>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
