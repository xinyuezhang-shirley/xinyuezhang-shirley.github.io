import { contact } from "@/content/contact";
import "./contact-section.css";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-section__inner">
        <header className="contact-section__head">
          <p className="contact-section__eyebrow" id="contact-heading">
            Contact
          </p>
          <p className="contact-section__lede">
            For opportunities and collaboration.
          </p>
        </header>

        <div className="contact-section__grid">
          <div className="contact-section__channels">
            <p className="contact-section__label">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="contact-section__email"
              aria-label={`Send email to ${contact.email}`}
            >
              {contact.email}
            </a>
          </div>

          <nav className="contact-section__public" aria-label="Public profiles">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-section__link"
            >
              LinkedIn ↗
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-section__link"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
