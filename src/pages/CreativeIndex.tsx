import { Link } from "react-router-dom";
import { Eyebrow, Display, Body, Heading } from "@/components/type/Typography";

const strands = [
  {
    title: "Art",
    href: "/creative/art",
    description: "Digital illustration, fan art, and commission work, under the handle myco.to.",
  },
  {
    title: "Photography",
    href: "/creative/photography",
    description: "Visual essays — glass, coast, film, stage, stone, faces.",
  },
  {
    title: "Poetry",
    href: "/creative/poetry",
    description: "Eleven poems written between 2020 and 2024, in English and Chinese.",
  },
];

export default function CreativeIndex() {
  return (
    <div className="container py-16 md:py-24">
      <Eyebrow className="mb-6">Creative</Eyebrow>
      <Display as="h1" className="text-display-2 max-w-3xl mb-20 md:mb-28">
        A gallery, not a portfolio.
      </Display>

      <div className="grid md:grid-cols-3 gap-16 md:gap-10">
        {strands.map((strand) => (
          <Link key={strand.href} to={strand.href} className="group block">
            <Heading size={1} className="mb-4 group-hover:text-accent transition-colors">
              {strand.title}
            </Heading>
            <Body lg>{strand.description}</Body>
          </Link>
        ))}
      </div>
    </div>
  );
}
