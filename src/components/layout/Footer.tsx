import { ContactSection } from "@/components/contact/ContactSection";

export function Footer() {
  return (
    <footer className="w-full mt-32">
      <ContactSection />
      <div className="border-t border-line">
        <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8 text-sm">
          <span className="font-sans text-ink-faint">
            © {new Date().getFullYear()} Xinyue (Shirley) Zhang
          </span>
          <span className="font-sans text-xs text-ink-faint tracking-[0.04em]">
            Reading room
          </span>
        </div>
      </div>
    </footer>
  );
}
