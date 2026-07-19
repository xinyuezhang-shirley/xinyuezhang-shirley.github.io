import { Link } from "react-router-dom";
import { Eyebrow, Display, Body } from "@/components/type/Typography";
import { workProjects, workBySlug } from "@/content/work";

function RailMark({ children }: { children: string }) {
  return (
    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint tabular-nums">
      {children}
    </span>
  );
}

function RailSep() {
  return (
    <span
      className="block w-px h-3 bg-line mx-auto md:mx-0"
      aria-hidden
    />
  );
}

export default function Work() {
  const count = String(workProjects.length).padStart(2, "0");

  return (
    <div className="container py-16 md:py-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 mb-6">
        <Eyebrow>Work</Eyebrow>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint tabular-nums">
          Spec · Index · {count} entries · Rev. 2026.07
        </p>
      </div>

      <Display as="h1" className="text-display-2 max-w-3xl mb-6 md:mb-8">
        Engineering, applied to other people&apos;s problems.
      </Display>

      <div className="flex items-center gap-3 mb-16 md:mb-24 text-ink-faint" aria-hidden>
        <span className="font-mono text-[10px] tracking-[0.14em] tabular-nums">0.0</span>
        <span className="h-px flex-1 max-w-[4.5rem] bg-line" />
        <span className="font-mono text-[10px] tracking-[0.14em]">CATALOGUE</span>
        <span className="h-px w-3 bg-line" />
      </div>

      <ol className="divide-y divide-line">
        {workProjects.map((project, i) => {
          const index = String(i + 1).padStart(2, "0");
          return (
            <li
              key={project.slug}
              className="grid grid-cols-[48px_1fr] md:grid-cols-[120px_1fr] gap-x-6 md:gap-x-10 py-10 md:py-14"
            >
              {/* Left rail — index of engineered object */}
              <div className="flex flex-col items-start gap-2.5 pt-0.5">
                <span className="font-mono text-sm md:text-base text-ink-faint tabular-nums tracking-wide">
                  {index}
                </span>
                <RailSep />
                {project.status ? <RailMark>{project.status}</RailMark> : null}
                {project.type ? (
                  <>
                    <RailSep />
                    <RailMark>{project.type}</RailMark>
                  </>
                ) : null}
                {project.year ? (
                  <>
                    <RailSep />
                    <RailMark>{project.year}</RailMark>
                  </>
                ) : null}
                {project.catalogId ? (
                  <>
                    <RailSep />
                    <RailMark>{project.catalogId}</RailMark>
                  </>
                ) : null}
              </div>

              <Link to={`/work/${project.slug}`} className="group min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                  <p className="font-sans text-xs uppercase tracking-[0.06em] text-ink-faint">
                    {project.org}
                  </p>
                  <span className="text-ink-faint/40 hidden sm:inline" aria-hidden>
                    ·
                  </span>
                  <p className="font-sans text-xs uppercase tracking-[0.06em] text-ink-faint">
                    {project.role}
                  </p>
                  {project.duration ? (
                    <>
                      <span className="text-ink-faint/40 hidden sm:inline" aria-hidden>
                        ·
                      </span>
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint tabular-nums">
                        {project.duration}
                      </p>
                    </>
                  ) : null}
                </div>

                <h2 className="font-serif text-heading-1 text-ink mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h2>

                {project.collaborators?.length ? (
                  <p className="font-serif text-ink-soft mb-3">
                    with {project.collaborators.join(" & ")}
                  </p>
                ) : null}

                <Body lg className="max-w-2xl mb-5">
                  {project.teaser}
                </Body>

                {project.signals?.length ? (
                  <p className="font-sans text-xs uppercase tracking-[0.08em] text-ink-faint mb-3 max-w-xl leading-relaxed">
                    {project.signals.join(" · ")}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                  {project.tools?.length ? (
                    <p className="font-mono text-[11px] tracking-[0.04em] text-ink-faint/90">
                      {project.tools.join(" · ")}
                    </p>
                  ) : null}
                  {project.teamSize ? (
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint tabular-nums">
                      Team {project.teamSize}
                    </p>
                  ) : null}
                </div>

                {project.related?.length ? (
                  <div className="mt-5 pt-4 border-t border-line/70 max-w-md">
                    {project.related.map((rel) => {
                      const target = workBySlug(rel.slug);
                      if (!target) return null;
                      return (
                        <p
                          key={rel.slug}
                          className="font-sans text-xs uppercase tracking-[0.08em] text-ink-faint"
                        >
                          <span className="text-ink-faint/70">{rel.note ?? "Related"}</span>
                          <span className="mx-2 text-ink-faint/35" aria-hidden>
                            ↓
                          </span>
                          <span className="font-serif normal-case tracking-normal text-ink-soft group-hover:text-ink transition-colors">
                            {target.title}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>

      <footer className="mt-16 md:mt-24 pt-6 border-t border-line flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint tabular-nums">
          End of index · {count} systems
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint tabular-nums">
          p. 01 / work
        </p>
      </footer>
    </div>
  );
}
