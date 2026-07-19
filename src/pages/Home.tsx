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
const PHOTO_OBJECT_POSITION = { x: 38, y: 18 };
const PHOTO_NATURAL_SIZE = { width: 1920, height: 1080 };

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden md:h-[86vh] md:min-h-[620px]"
      >
        <div className="hidden md:block">
          <FloatingCircles
            heroRef={heroRef}
            photoRef={photoRef}
            photoSrc={PHOTO_SRC}
            objectPosition={PHOTO_OBJECT_POSITION}
            naturalSize={PHOTO_NATURAL_SIZE}
            layer="back"
          />
        </div>

        <div
          ref={photoRef}
          className="relative z-[1] w-full aspect-[4/3] md:aspect-auto md:absolute md:inset-y-[-1.5%] md:right-[-1.25%] md:w-[47%] overflow-visible bg-transparent"
        >
          <img
            src={PHOTO_SRC}
            alt="Shirley Zhang"
            className="w-full h-full object-cover object-[38%_18%] md:shadow-[0_18px_48px_rgba(28,27,25,0.14)]"
          />
        </div>

        <div className="hidden md:block">
          <FloatingCircles
            heroRef={heroRef}
            photoRef={photoRef}
            photoSrc={PHOTO_SRC}
            objectPosition={PHOTO_OBJECT_POSITION}
            naturalSize={PHOTO_NATURAL_SIZE}
            layer="front"
          />
        </div>

        <div className="container relative z-20 pt-8 md:pt-12 pb-14 md:pb-0 md:absolute md:inset-y-0 md:left-0 md:flex md:flex-col md:justify-center md:pt-[6vh]">
          <p className="pointer-events-none font-sans text-xs uppercase tracking-[0.1em] text-ink-faint leading-relaxed mb-7 md:mb-9">
            Stanford University
            <br />
            M.S. Computer Science
          </p>

          <h1 className="pointer-events-none font-serif font-semibold uppercase leading-[0.78] text-ink text-[clamp(4.5rem,15vw,13.5rem)]">
            <span className="block tracking-[-0.02em]">Shirley</span>
            <span className="block font-sans text-sm md:text-[0.95rem] font-medium normal-case tracking-[0.1em] text-ink-soft mt-4 md:mt-6 ml-0.5">
              Engineer, Researcher, Daydreamer
            </span>
            <span className="block ml-[6vw] md:ml-[8vw] mt-4 md:mt-6 tracking-[0.01em]">
              Zhang
              <span className="font-serif italic text-ink-faint/70 text-[0.16em] tracking-normal normal-case ml-2.5 align-middle">
                (Xinyue)
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="container pb-32 md:pb-40 pt-6 md:pt-14">
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
