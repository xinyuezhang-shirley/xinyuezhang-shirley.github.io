import { contact } from "@/content/contact";

const links = [
  { label: "Email", href: `mailto:${contact.email}` },
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "Instagram", href: contact.instagram },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-line mt-32">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-10 text-sm">
        <span className="font-sans text-ink-faint">
          © {new Date().getFullYear()} Xinyue (Shirley) Zhang
        </span>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-sans text-ink-soft hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
