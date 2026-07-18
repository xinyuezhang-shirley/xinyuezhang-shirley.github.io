import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/work", label: "Work" },
  { to: "/research", label: "Research" },
  { to: "/creative", label: "Creative" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

export function Nav() {
  return (
    <header className="w-full">
      <div className="container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-6 md:py-8">
        <NavLink
          to="/"
          className="font-serif text-lg md:text-xl text-ink hover:text-accent transition-colors"
        >
          Shirley Zhang
        </NavLink>
        <nav className="flex items-center flex-wrap gap-x-4 gap-y-1 md:gap-x-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "font-sans text-sm uppercase tracking-[0.06em] text-ink-soft transition-colors hover:text-ink",
                  isActive && "text-ink underline underline-offset-[6px] decoration-accent"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
