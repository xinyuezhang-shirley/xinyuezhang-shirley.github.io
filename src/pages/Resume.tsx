import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { RevealContact } from "@/components/contact/RevealContact";
import {
  contact,
  education,
  skills,
  experience,
  projects,
  resumeUrl,
  previewFor,
  type ResumeAction,
  type ResumePreview,
} from "@/content/resume";
import "@/work/resume/resume-living.css";

function Cite({ action }: { action?: ResumeAction }) {
  if (!action) return null;
  if (action.external) {
    return (
      <a
        className="cv-cite"
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {action.label}&nbsp;↗
      </a>
    );
  }
  return (
    <Link className="cv-cite" to={action.href}>
      {action.label}&nbsp;↗
    </Link>
  );
}

function Section({
  index,
  id,
  title,
  children,
}: {
  index: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="cv-section" id={id} aria-labelledby={`${id}-title`}>
      <header className="cv-section__head">
        <span className="cv-section__num" aria-hidden>
          {index}
        </span>
        <h2 id={`${id}-title`} className="cv-section__title">
          {title}
        </h2>
        <span className="cv-section__rule" aria-hidden />
        <span className="cv-section__cat">Cat.&nbsp;{index}</span>
      </header>
      <div className="cv-section__body">{children}</div>
    </section>
  );
}

function Margin({ preview }: { preview: ResumePreview | null }) {
  return (
    <aside className="cv-margin" aria-live="polite">
      <div className="cv-margin__inner">
        <p className="cv-margin__running">
          <span>CV</span>
          <span className="cv-reg" aria-hidden />
          <span>2026.07</span>
        </p>
        {preview ? (
          <>
            <p className="cv-margin__label">Annotation</p>
            <p className="cv-margin__title">{preview.title}</p>
            {preview.caption ? (
              <p className="cv-margin__note">{preview.caption}</p>
            ) : null}
            {preview.destination ? (
              <Link className="cv-cite" to={preview.destination}>
                {preview.title}&nbsp;↗
              </Link>
            ) : null}
          </>
        ) : (
          <p className="cv-margin__idle">
            Margin notes appear beside verified portfolio counterparts.
          </p>
        )}
        <p className="cv-margin__page" aria-hidden>
          p.&nbsp;01
        </p>
      </div>
    </aside>
  );
}

export default function Resume() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const activate = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll<HTMLElement>("[data-cv-id]");
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.getAttribute("data-cv-id");
        if (id && previewFor(id)) activate(id);
      },
      { threshold: [0.35, 0.55], rootMargin: "-10% 0px -40% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [activate]);

  const preview = activeId ? previewFor(activeId) ?? null : null;

  return (
    <div className="cv" ref={rootRef}>
      <div className="cv__sheet">
        {/* Masthead */}
        <header className="cv-mast">
          <div className="cv-mast__meta">
            <span>Curriculum Vitae</span>
            <span className="cv-reg" aria-hidden />
            <span>Archive&nbsp;01</span>
            <span className="cv-reg" aria-hidden />
            <span>Version&nbsp;2026</span>
            <span className="cv-reg" aria-hidden />
            <span>Updated&nbsp;July&nbsp;2026</span>
          </div>

          <div className="cv-mast__grid">
            <div className="cv-mast__identity">
              <p className="cv-mast__kicker">Xinyue</p>
              <h1 className="cv-mast__name">
                Shirley
                <br />
                Zhang
              </h1>
            </div>
            <div className="cv-mast__colophon">
              <p className="cv-mast__role">
                M.S. Computer Science
                <br />
                Stanford University
              </p>
              <div className="cv-mast__contact">
                <RevealContact
                  label="Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                  analyticsEvent="email"
                  copyEnabled
                  compact
                />
                <RevealContact
                  label="Phone"
                  value={contact.phone}
                  href={`tel:${contact.phoneTel}`}
                  analyticsEvent="phone"
                  copyEnabled
                  compact
                />
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-mast__link"
                >
                  LinkedIn ↗
                </a>
              </div>
              <a href={resumeUrl} download className="cv-mast__archive">
                Archival PDF ↓
              </a>
            </div>
          </div>

          <div className="cv-mast__baseline" aria-hidden>
            <span>+</span>
            <span className="cv-mast__line" />
            <span>01 / CV</span>
            <span className="cv-mast__line" />
            <span>+</span>
          </div>
        </header>

        <div className="cv__layout">
          <div className="cv__main">
            <Section index="01" id="education" title="Education">
              {education.map((edu) => (
                <article key={edu.id} className="cv-entry">
                  <div className="cv-entry__row">
                    <h3 className="cv-entry__org">{edu.school}</h3>
                    <time className="cv-entry__date">{edu.dates}</time>
                  </div>
                  <p className="cv-entry__role">{edu.degree}</p>
                  <p className="cv-entry__detail">{edu.detail}</p>
                  <ul className="cv-entry__bullets">
                    <li>Relevant Courses: {edu.courses.join(", ")}</li>
                  </ul>
                </article>
              ))}
            </Section>

            <Section index="02" id="skills" title="Skills">
              <div className="cv-skills">
                <div className="cv-skills__row">
                  <span className="cv-skills__label">Programming Languages</span>
                  <p className="cv-skills__value">{skills.programming.join(" · ")}</p>
                </div>
                <div className="cv-skills__row">
                  <span className="cv-skills__label">Cloud Infrastructure</span>
                  <p className="cv-skills__value">{skills.cloud.join(" · ")}</p>
                </div>
                <div className="cv-skills__row">
                  <span className="cv-skills__label">AI Infrastructure</span>
                  <p className="cv-skills__value">{skills.ai.join(" · ")}</p>
                </div>
                <div className="cv-skills__row">
                  <span className="cv-skills__label">Web & Application Development</span>
                  <p className="cv-skills__value">{skills.web.join(" · ")}</p>
                </div>
              </div>
            </Section>

            <Section index="03" id="experience" title="Experience">
              {experience.map((job) => (
                <article
                  key={job.id}
                  className={`cv-entry${activeId === job.id ? " is-active" : ""}`}
                  data-cv-id={job.id}
                  onMouseEnter={() => activate(job.id)}
                >
                  <div className="cv-entry__row">
                    <h3 className="cv-entry__org">
                      {job.org ?? job.role}
                      {job.org ? (
                        <span className="cv-entry__role-inline"> — {job.role}</span>
                      ) : null}
                    </h3>
                    <time className="cv-entry__date">{job.dates}</time>
                  </div>
                  <Cite action={job.action} />
                  <ul className="cv-entry__bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </Section>

            <Section index="04" id="projects" title="Projects">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className={`cv-entry${activeId === project.id ? " is-active" : ""}`}
                  data-cv-id={project.id}
                  onMouseEnter={() => activate(project.id)}
                >
                  <div className="cv-entry__row">
                    <h3 className="cv-entry__org">{project.name}</h3>
                    <time className="cv-entry__date">{project.dates}</time>
                  </div>
                  {project.org ? (
                    <p className="cv-entry__detail">{project.org}</p>
                  ) : null}
                  <Cite action={project.action} />
                  <ul className="cv-entry__bullets">
                    {project.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </Section>
          </div>

          <Margin preview={preview} />
        </div>

        <footer className="cv-foot" aria-hidden>
          <span>+</span>
          <span className="cv-mast__line" />
          <span>End of curriculum vitae</span>
          <span className="cv-mast__line" />
          <span>Archive 01</span>
          <span className="cv-mast__line" />
          <span>+</span>
        </footer>
      </div>
    </div>
  );
}
