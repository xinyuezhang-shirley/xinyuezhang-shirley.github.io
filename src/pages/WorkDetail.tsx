import { useParams, Navigate } from "react-router-dom";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { MediaEmbed } from "@/components/media/MediaEmbed";
import { PlateFigure } from "@/components/media/PlateFigure";
import { InterpretationStack } from "@/components/media/InterpretationStack";
import { Body, PullQuote } from "@/components/type/Typography";
import { workProjects } from "@/content/work";

export default function WorkDetail() {
  const { slug } = useParams();
  const project = workProjects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const hasLinks = project.liveUrl || project.githubUrl;
  const hasFigures = (project.figures?.length ?? 0) > 0;

  return (
    <CaseStudyLayout
      eyebrow="Work"
      title={project.title}
      meta={`${project.role} · ${project.org} · ${project.dates}`}
      tags={project.tags}
      backHref="/work"
      backLabel="Work"
      wide={hasFigures}
    >
      {project.claim && (
        <PullQuote className="mb-10 md:mb-14">{project.claim}</PullQuote>
      )}

      <div className="max-w-prose space-y-6">
        {project.story.map((paragraph, i) => (
          <Body key={i} lg>
            {paragraph}
          </Body>
        ))}
      </div>

      {hasFigures && (
        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24 max-w-4xl">
          {project.figures!.map((figure, i) => (
            <PlateFigure
              key={figure.plate}
              plate={figure.plate}
              src={figure.src}
              alt={figure.alt}
              caption={figure.caption}
              priority={i === 0}
            />
          ))}
        </div>
      )}

      {project.showInterpretationStack && (
        <div className="mt-16 md:mt-24 max-w-prose">
          <InterpretationStack />
        </div>
      )}

      {project.closing && project.closing.length > 0 && (
        <div className="mt-12 md:mt-16 max-w-prose space-y-6">
          {project.closing.map((paragraph, i) => (
            <Body key={i} lg>
              {paragraph}
            </Body>
          ))}
        </div>
      )}

      {project.demoVideoUrl && (
        <div className="pt-10 max-w-prose">
          <MediaEmbed url={project.demoVideoUrl} label={`${project.title} — demo video`} />
        </div>
      )}

      {hasLinks && (
        <div className="flex flex-wrap gap-6 pt-10 max-w-prose">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm uppercase tracking-[0.06em] text-accent underline"
            >
              Visit live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm uppercase tracking-[0.06em] text-accent underline"
            >
              View code ↗
            </a>
          )}
        </div>
      )}
    </CaseStudyLayout>
  );
}
