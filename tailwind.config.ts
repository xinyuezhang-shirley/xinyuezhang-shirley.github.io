import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        paper: "#FAF9F6",
        ink: {
          DEFAULT: "#16140F",
          soft: "#56534C",
          faint: "#8C887E",
        },
        line: "#E3DFD4",
        accent: "#8A3324",
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 9vw, 8rem)", { lineHeight: "0.96", letterSpacing: "-0.01em" }],
        "display-2": ["clamp(2.25rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "heading-1": ["clamp(1.75rem, 3.4vw, 2.75rem)", { lineHeight: "1.1" }],
        "heading-2": ["clamp(1.375rem, 2.2vw, 1.875rem)", { lineHeight: "1.2" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        prose: "42rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#16140F",
            "--tw-prose-headings": "#16140F",
            "--tw-prose-links": "#8A3324",
            "--tw-prose-bold": "#16140F",
            "--tw-prose-quotes": "#56534C",
            "--tw-prose-quote-borders": "#E3DFD4",
            maxWidth: "none",
          },
        },
      }),
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config;
