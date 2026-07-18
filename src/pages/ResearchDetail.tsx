import { useParams, Navigate } from "react-router-dom";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { Body, Heading } from "@/components/type/Typography";
import { researchProjects } from "@/content/research";

export default function ResearchDetail() {
  const { slug } = useParams();
  const project = researchProjects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/research" replace />;

  const meta = [project.venue, project.authors && `with ${project.authors.join(", ")}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <CaseStudyLayout
      eyebrow="Research"
      title={project.title}
      meta={meta}
      tags={project.tags}
      backHref="/research"
      backLabel="Research"
    >
      <Body lg>{project.abstract}</Body>

      <div className="pt-6">
        <Heading as="h2" size={2} className="mb-4">
          Key findings
        </Heading>
        <ul className="space-y-3">
          {project.keyFindings.map((finding, i) => (
            <li key={i} className="font-sans text-ink-soft leading-relaxed pl-5 border-l border-line">
              {finding}
            </li>
          ))}
        </ul>
      </div>

      {project.story?.map((paragraph, i) => (
        <Body key={i} lg className="pt-2">
          {paragraph}
        </Body>
      ))}

      {project.pdfUrl && (
        <div className="pt-4">
          <a
            href={project.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm uppercase tracking-[0.06em] text-accent underline"
          >
            View paper / poster (PDF) ↗
          </a>
        </div>
      )}
    </CaseStudyLayout>
  );
}
