import { contact } from "@/content/contact";
import { RevealContact } from "./RevealContact";
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
            Contact information is hidden by default to reduce automated
            scraping.
          </p>
        </header>

        <div className="contact-section__grid">
          <div className="contact-section__private">
            <RevealContact
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
              analyticsEvent="email"
              copyEnabled
            />
            <RevealContact
              label="Phone"
              value={contact.phone}
              href={`tel:${contact.phoneTel}`}
              analyticsEvent="phone"
              copyEnabled
            />
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
