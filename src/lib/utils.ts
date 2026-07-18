import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tailwind overloads the "text-" prefix for both font-size and text-color.
// tailwind-merge's default config only disambiguates stock values, so the
// custom font-size/color scale from tailwind.config.ts needs to be
// registered explicitly or the two groups collide and silently drop classes.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-1", "display-2", "heading-1", "heading-2", "eyebrow"] },
      ],
      "text-color": [{ text: ["ink", "ink-soft", "ink-faint", "accent", "paper"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
