import { Link } from "react-router-dom";
import { workProjects, workBySlug } from "@/content/work";
import "@/work/work/work-catalogue.css";

function formatDuration(duration?: string): string | undefined {
  if (!duration) return undefined;
  // "18 mo" → "18 months", "10 wk" → "10 weeks", "4 mo" → "4 months"
  return duration
    .replace(/\bmo\b/i, "months")
    .replace(/\bwk\b/i, "weeks")
    .replace(/\bTeam\b/i, "Team");
}

function formatTeam(teamSize?: string): string | undefined {
  if (!teamSize) return undefined;
  if (/^\d+$/.test(teamSize)) return `Team of ${teamSize}`;
  if (/^team$/i.test(teamSize)) return "Team";
  return teamSize.startsWith("Team") ? teamSize : `Team ${teamSize}`;
}

export default function Work() {
  const count = String(workProjects.length).padStart(2, "0");

  return (
    <div className="work-catalogue">
      <header className="wc-hero">
        <p className="wc-hero__eyebrow">Work</p>

        <p className="wc-hero__spec wc-hero__top-spec" aria-label="Catalogue specification">
          <span>Spec · Index</span>
          <span>
            {count} entries · Rev. 2026.07
          </span>
        </p>

        <h1 className="wc-hero__title">
          Engineering, applied to other people&apos;s problems.
        </h1>

        <div className="wc-hero__catalogue">
          <p className="wc-hero__label">
            <span>0.0</span>
            <span className="wc-hero__label-rule" aria-hidden />
            <span>Catalogue</span>
          </p>
          <p
            className="wc-hero__spec wc-hero__catalogue-spec"
            aria-label="Catalogue specification"
          >
            <span>Spec · Index</span>
            <span>
              {count} entries · Rev. 2026.07
            </span>
          </p>
        </div>
      </header>

      <ol className="wc-list">
        {workProjects.map((project, i) => {
          const index = String(i + 1).padStart(2, "0");
          const duration = formatDuration(project.duration);
          const team = formatTeam(project.teamSize);
          const railMarks = [
            project.status,
            project.type,
            project.year,
            project.catalogId,
          ].filter(Boolean) as string[];

          return (
            <li key={project.slug} className="wc-entry">
              <aside className="wc-rail" aria-hidden="true">
                <span className="wc-rail__index">{index}</span>
                {railMarks.flatMap((mark) => [
                  <span key={`${mark}-sep`} className="wc-rail__sep" />,
                  <span key={mark} className="wc-rail__mark">
                    {mark}
                  </span>,
                ])}
              </aside>

              <Link to={`/work/${project.slug}`} className="wc-card">
                <header className="wc-card__index-head">
                  <span className="wc-card__index">{index}</span>
                  <ul className="wc-card__index-meta">
                    {project.status ? <li>{project.status}</li> : null}
                    {project.type ? <li>{project.type}</li> : null}
                    {project.year ? <li>{project.year}</li> : null}
                  </ul>
                </header>

                <div className="wc-card__project-meta">
                  <p className="wc-card__org">{project.org}</p>
                  <p className="wc-card__role-line">
                    <span>{project.role}</span>
                    {duration ? (
                      <span className="wc-duration">{duration}</span>
                    ) : null}
                  </p>
                </div>

                <h2 className="wc-card__title">{project.title}</h2>

                {project.collaborators?.length ? (
                  <p className="wc-card__with">
                    with {project.collaborators.join(" & ")}
                  </p>
                ) : null}

                <p className="wc-card__teaser">{project.teaser}</p>

                {project.signals?.length ? (
                  <p className="wc-card__signals">
                    {project.signals.join(" · ")}
                  </p>
                ) : null}

                <div className="wc-card__tech">
                  {project.tools?.length ? (
                    <ul className="wc-card__tools">
                      {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  ) : null}
                  {team ? <p className="wc-card__team">{team}</p> : null}
                </div>

                {project.related?.length ? (
                  <div className="wc-card__related">
                    {project.related.map((rel) => {
                      const target = workBySlug(rel.slug);
                      if (!target) return null;
                      return (
                        <div key={rel.slug}>
                          <span className="wc-card__related-label">
                            {rel.note ?? "Related"}
                          </span>
                          <span className="wc-card__related-link">
                            {target.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>

      <footer className="wc-foot">
        <p>End of index · {count} systems</p>
        <p>p. 01 / work</p>
      </footer>
    </div>
  );
}
