const STEPS = [
  { label: "Evidence", note: "What the manuscript repeats, avoids, or emphasizes" },
  { label: "Pattern", note: "Structural habits across lines and images" },
  { label: "Interpretation", note: "A provisional reading — not a verdict" },
  { label: "Claim", note: "What the piece might be arguing beneath its surface" },
  { label: "Revision", note: "A question that returns the work to the writer" },
] as const;

/** Argument spine made visible — Evidence → Claim → Revision. */
export function InterpretationStack() {
  return (
    <aside
      className="not-prose border-y border-line py-8 my-4"
      aria-label="Interpretation stack"
    >
      <p className="mb-6 font-sans text-eyebrow uppercase tracking-[0.14em] text-ink-faint">
        Argument structure
      </p>
      <ol className="space-y-0">
        {STEPS.map((step, i) => (
          <li
            key={step.label}
            className="grid grid-cols-[2rem_1fr] gap-x-4 py-3 border-t border-line first:border-t-0"
          >
            <span className="font-serif text-ink-faint text-sm pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-serif text-heading-2 text-ink leading-tight">{step.label}</p>
              <p className="mt-1 font-sans text-sm text-ink-faint">{step.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
