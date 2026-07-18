import { Link } from "react-router-dom";
import { Eyebrow, Display, Body } from "@/components/type/Typography";
import { researchProjects } from "@/content/research";

export default function Research() {
  return (
    <div className="container py-16 md:py-24">
      <Eyebrow className="mb-6">Research</Eyebrow>
      <Display as="h1" className="text-display-2 max-w-3xl mb-20 md:mb-28">
        Questions worth answering carefully.
      </Display>

      <ol className="divide-y divide-line">
        {researchProjects.map((project, i) => (
          <li
            key={project.slug}
            className="grid grid-cols-[48px_1fr] md:grid-cols-[120px_1fr] gap-x-6 md:gap-x-10 py-10 md:py-14"
          >
            <span className="font-serif text-ink-faint text-lg">{String(i + 1).padStart(2, "0")}</span>
            <Link to={`/research/${project.slug}`} className="group">
              <p className="font-sans text-xs uppercase tracking-[0.06em] text-ink-faint mb-3">
                {project.venue}
              </p>
              <h2 className="font-serif text-heading-1 text-ink mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h2>
              <Body lg className="max-w-2xl">
                {project.abstract}
              </Body>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
