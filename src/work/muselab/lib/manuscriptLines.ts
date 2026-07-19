/** Physical poem lines (\n-split), 1-based indexing for gutters + anchors */

export function getPhysicalLines(text: string): string[] {
  return text.split('\n')
}

export function physicalLineCount(text: string): number {
  return getPhysicalLines(text).length
}

export function normalizeLemma(token: string): string {
  return token.toLowerCase().replace(/[^a-z']/g, '')
}

/** All 1-based line numbers whose raw text contains lemma as a standalone-ish token chunk */
export function linesWhereLemmaOccurs(text: string, lemmaNorm: string): Set<number> {
  const lines = getPhysicalLines(text)
  const out = new Set<number>()
  const target = lemmaNorm.toLowerCase()
  if (!target) return out

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (!line) continue
    const parts = line.toLowerCase().split(/([^a-z']+)/)
    for (const p of parts) {
      if (normalizeLemma(p) === target) {
        out.add(i + 1)
        break
      }
    }
  }
  return out
}
