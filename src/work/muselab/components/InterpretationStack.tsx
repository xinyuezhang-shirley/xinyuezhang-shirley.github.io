import type { InterpretationLayer } from "../lib/literaryInterpretation";

export function InterpretationStack({
  layers,
  compact = false,
}: {
  layers: InterpretationLayer
  compact?: boolean
}) {
  const rows: { key: string; label: string; text: string; emphasis?: boolean }[] = [
    { key: 'evidence', label: 'Evidence', text: layers.evidence },
    { key: 'pattern', label: 'Pattern', text: layers.pattern },
    { key: 'interpretation', label: 'Interpretation', text: layers.interpretation },
    { key: 'claim', label: 'Claim', text: layers.claim, emphasis: true },
    { key: 'revisionQuestion', label: 'Revision question', text: layers.revisionQuestion },
  ]

  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      {rows.map((row) => (
        <div key={row.key}>
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#917a62]">{row.label}</p>
          <p
            className={`mt-1 font-display leading-relaxed text-[#3f372f] ${
              compact ? 'text-[13px]' : 'text-[14px] md:text-[15px]'
            } ${row.emphasis ? 'font-medium text-[#2a241c]' : ''} ${
              row.key === 'revisionQuestion' ? 'italic text-[#5e564d]' : ''
            }`}
          >
            {row.text}
          </p>
        </div>
      ))}
    </div>
  )
}
