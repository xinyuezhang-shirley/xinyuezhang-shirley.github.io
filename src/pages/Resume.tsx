import { Eyebrow, Display, Heading, Body } from "@/components/type/Typography";
import { education, skills, experience, projects, resumeUrl } from "@/content/resume";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <Heading as="h2" size={1} className="mb-8">
        {title}
      </Heading>
      <div className="space-y-10">{children}</div>
    </section>
  );
}

export default function Resume() {
  return (
    <div className="container py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
        <div>
          <Eyebrow className="mb-6">Resume</Eyebrow>
          <Display as="h1" className="text-display-2 max-w-2xl">
            Xinyue (Shirley) Zhang
          </Display>
        </div>
        <a
          href={resumeUrl}
          download
          className="font-sans text-sm uppercase tracking-[0.06em] text-accent underline whitespace-nowrap"
        >
          Download PDF ↓
        </a>
      </div>

      <div className="max-w-prose">
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.school}>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h3 className="font-serif text-heading-2 text-ink">{edu.school}</h3>
                <span className="font-sans text-sm text-ink-faint whitespace-nowrap">{edu.dates}</span>
              </div>
              <p className="font-sans text-ink-soft mt-1">{edu.degree}</p>
              <p className="font-sans text-sm text-ink-faint mt-1">{edu.detail}</p>
              <p className="font-sans text-sm text-ink-faint mt-3">{edu.courses.join(" · ")}</p>
            </div>
          ))}
        </Section>

        <Section title="Experience">
          {experience.map((job) => (
            <div key={job.role}>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h3 className="font-serif text-heading-2 text-ink">{job.role}</h3>
                <span className="font-sans text-sm text-ink-faint whitespace-nowrap">{job.dates}</span>
              </div>
              <p className="font-sans text-ink-soft mt-1 mb-3">{job.org}</p>
              <ul className="space-y-2">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="font-sans text-ink-soft leading-relaxed pl-5 border-l border-line">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Projects">
          {projects.map((project) => (
            <div key={project.name}>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h3 className="font-serif text-heading-2 text-ink">{project.name}</h3>
                <span className="font-sans text-sm text-ink-faint whitespace-nowrap">{project.dates}</span>
              </div>
              <p className="font-sans text-ink-soft mt-1 mb-3">{project.org}</p>
              <ul className="space-y-2">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="font-sans text-ink-soft leading-relaxed pl-5 border-l border-line">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Skills">
          <div className="space-y-4">
            <p className="font-sans text-ink-soft">
              <span className="text-ink-faint">Languages — </span>
              {skills.languages.join(", ")}
            </p>
            <p className="font-sans text-ink-soft">
              <span className="text-ink-faint">Tools & frameworks — </span>
              {skills.tools.join(", ")}
            </p>
            <p className="font-sans text-ink-soft">
              <span className="text-ink-faint">Languages spoken — </span>
              {skills.human.join(", ")}
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
