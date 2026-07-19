import type { Cat, PulseLinkDatum, SemanticNode } from "../components/PulseSemanticForce";
import type { ParsedFeatures } from "./poeticFeatures";
import { getPhysicalLines, normalizeLemma } from "./manuscriptLines";

export type InterpretationLayer = {
  evidence: string
  pattern: string
  interpretation: string
  claim: string
  revisionQuestion: string
}

export type InterpretationReading = {
  anchorTitle: string
  layers: InterpretationLayer
}

export type LiteraryAnchor = {
  id: string
  title: string
  layers: InterpretationLayer
  tokens: string[]
}

export type StructuralCluster = {
  id: string
  title: string
  layers: InterpretationLayer
  tokens: string[]
}

export type MissingVocabularyNote = {
  id: string
  observation: string
  claim: string
}

export type StructuralReading = {
  dominant: {
    title: string
    layers: InterpretationLayer
  }
  clusters: StructuralCluster[]
  absences: MissingVocabularyNote[]
}

type ThemeSpec = {
  id: string
  essayTitle: string
  lexicon: Set<string>
  pattern: (tokens: string[], count: number, spread: number) => string
  interpretation: (tokens: string[], count: number, spread: number, totalLines: number) => string
  claim: (tokens: string[], count: number) => string
  revisionQuestion: (tokens: string[]) => string
}

/** Agent field labels, document scaffolding — never valid anchor titles. */
const STRUCTURAL_LABEL =
  /^(system\s*\d+|metaphor\s*system\s*\d+|revision\s*\d+|paragraph\s*\d+|chapter\s*[a-z0-9ivx]+|section\s*[a-z0-9]+|part\s*[a-z0-9]+|q\d+|path\s*\d+|shift\s*\d+|summary|structure|pacing|imagery|clarity|tone|arc|consistency|rationale|assessment|overview|feedback|highlight|opportunities?|questions?|paths?)$/i

const STRUCTURAL_INLINE =
  /\b(system|revision|paragraph|chapter|section|part)\s*[\dIVXLC]+/gi

const POOR_SINGLE_WORD = new Set([
  'who', 'what', 'when', 'where', 'why', 'how', 'queen', 'king', 'love', 'death', 'time',
  'self', 'body', 'heart', 'mind', 'word', 'line', 'stanza', 'poem', 'draft',
])

/** Stop expanding a title side when prose continues into analysis. */
const TITLE_TAIL_STOP = new Set([
  'remains', 'remain', 'suggests', 'suggest', 'creates', 'create', 'reveals', 'reveal',
  'shows', 'show', 'indicates', 'indicate', 'appears', 'appear', 'seems', 'seem',
  'could', 'would', 'should', 'might', 'must', 'that', 'which', 'when', 'where', 'while',
  'because', 'making', 'without', 'within', 'through', 'during', 'into', 'onto', 'from',
  'consistent', 'consistency', 'however', 'although', 'though', 'rather', 'instead',
  'also', 'still', 'just', 'even', 'being', 'becomes', 'become', 'this', 'these', 'those',
  'considers', 'consider', 'toward', 'towards', 'across', 'between',
  'under', 'over', 'about', 'with', 'have', 'has', 'had', 'were', 'was', 'are', 'is',
])

const MAX_TITLE_CHARS = 52
const MAX_TITLE_WORDS = 6
const MAX_PAIR_SIDE_WORDS = 2

function titleCaseWord(w: string): string {
  const bare = w.replace(/[^a-zA-Z'-]/g, '')
  if (!bare) return ''
  return bare.charAt(0).toUpperCase() + bare.slice(1).toLowerCase()
}

function takeConceptWords(raw: string, maxWords: number): string {
  const words = raw.replace(/[^a-zA-Z'\s-]/g, ' ').trim().split(/\s+/).filter(Boolean)
  const kept: string[] = []
  for (const w of words) {
    const bare = w.toLowerCase().replace(/[^a-z'-]/g, '')
    if (bare.length < 2) continue
    if (kept.length > 0 && TITLE_TAIL_STOP.has(bare)) break
    kept.push(titleCaseWord(bare))
    if (kept.length >= maxWords) break
  }
  return kept.join(' ')
}

function truncateAtWordBoundary(text: string, maxChars: number): string {
  const t = text.trim()
  if (t.length <= maxChars) return t
  const slice = t.slice(0, maxChars)
  const lastSpace = slice.lastIndexOf(' ')
  if (lastSpace > Math.floor(maxChars * 0.4)) return slice.slice(0, lastSpace).trim()
  return slice.trim()
}

/** Ensure titles are semantically complete — never mid-word or mid-phrase clips. */
function finalizeAnchorTitle(raw: string): string {
  const t = raw.replace(/\s+/g, ' ').trim()
  if (!t) return 'Latent Thematic Pressure'

  const pairMatch = t.match(/^(.+?)\s+(?:&|vs\.?|versus|↔|\/)\s+(.+)$/i)
  if (pairMatch) {
    const a = takeConceptWords(pairMatch[1]!, MAX_PAIR_SIDE_WORDS)
    const b = takeConceptWords(pairMatch[2]!, MAX_PAIR_SIDE_WORDS)
    if (a.length >= 3 && b.length >= 3) {
      const joiner = /vs/i.test(t) ? ' vs ' : ' & '
      return truncateAtWordBoundary(`${a}${joiner}${b}`, MAX_TITLE_CHARS)
    }
  }

  const words = t.split(/\s+/).filter(Boolean)
  const kept: string[] = []
  for (const w of words) {
    const bare = w.toLowerCase().replace(/[^a-z'-]/g, '')
    if (!bare || bare.length < 2) continue
    if (kept.length > 0 && TITLE_TAIL_STOP.has(bare)) break
    kept.push(titleCaseWord(bare))
    if (kept.length >= MAX_TITLE_WORDS) break
  }

  const out = kept.join(' ')
  if (out.length < 3) return 'Latent Thematic Pressure'
  return truncateAtWordBoundary(out, MAX_TITLE_CHARS)
}

const PRONOUN_OTHER = new Set([
  'he', 'him', 'his', 'she', 'her', 'hers', 'they', 'them', 'their', 'you', 'your', 'we', 'us', 'our',
])
const PRONOUN_SELF = new Set(['i', 'me', 'my', 'mine', 'myself', 'who'])
const FUTURE_MARKERS = new Set(['will', 'shall', 'tomorrow', 'soon', 'later', 'future', 'next'])
const ACTION_MARKERS = new Set([
  'run', 'walk', 'take', 'give', 'hold', 'break', 'open', 'close', 'leave', 'come', 'go', 'speak',
  'write', 'touch', 'move', 'turn', 'fall', 'rise', 'call', 'reach', 'pull', 'push', 'drive', 'build',
])

const THEME_SPECS: ThemeSpec[] = [
  {
    id: 'identity',
    essayTitle: 'The Search for a Stable Self',
    lexicon: new Set([
      'who', 'myself', 'self', 'identity', 'role', 'name', 'face', 'mirror', 'version', 'person',
      'someone', 'nobody', 'become', 'found', 'recognize', 'recognise', 'voice', 'body',
    ]),
    pattern: (_tokens, _count, spread) =>
      `Identity language recurs throughout the manuscript${spread > 1 ? ` across ${spread} lines` : ''}.`,
    interpretation: (tokens, count, spread, totalLines) => {
      if (count >= 4 && spread >= Math.max(2, totalLines * 0.25))
        return 'The narrator repeatedly attempts to stabilize a sense of self but encounters only temporary identities.'
      if (tokens.some((t) => t.toLowerCase() === 'who'))
        return 'Questions of who the speaker is outweigh assertions of who they are; the poem keeps reopening self-definition instead of closing it.'
      return 'Selfhood is under negotiation: the manuscript keeps naming the speaker without letting that naming harden into certainty.'
    },
    claim: () =>
      'The manuscript is organized around uncertainty of identity rather than certainty of experience.',
    revisionQuestion: () =>
      'What version of the self, if any, survives the end of the draft?',
  },
  {
    id: 'limitation',
    essayTitle: 'Language of Limitation',
    lexicon: new Set([
      'cannot', 'cant', 'unable', 'never', 'forget', 'forgot', 'remember', 'unknown',
      'uncertain', 'lost', 'missing', 'fail', 'failed', 'impossible', 'without', 'empty', 'blank',
      'nothing', 'nowhere', 'unseen', 'unheard',
    ]),
    pattern: () =>
      'Negation, blockage, and unknowing recur as the manuscript’s primary syntax—not as occasional mood.',
    interpretation: (tokens) => {
      if (tokens.some((t) => ['cannot', 'cant', 'unable'].includes(t.toLowerCase())))
        return 'Many major connections pass through what the speaker cannot do, remember, or determine—limitation organizes the argument more than action does.'
      if (tokens.some((t) => ['forget', 'forgot', 'remember'].includes(t.toLowerCase())))
        return 'Memory failure and incomplete recall function as structural forces; the poem advances by withholding access rather than by disclosure.'
      return 'The text repeatedly turns toward absence and impasse, making constraint feel central rather than incidental.'
    },
    claim: () =>
      'The manuscript is organized around inability rather than action—what cannot be held, known, or felt shapes forward motion.',
    revisionQuestion: () =>
      'Is the poem arguing from what is missing, or merely describing absence without yet making it mean something?',
  },
  {
    id: 'regality_mortality',
    essayTitle: 'Regality & Mortality',
    lexicon: new Set([
      'queen', 'king', 'crown', 'throne', 'royal', 'regal', 'majesty', 'worship', 'altar', 'gold',
      'death', 'dead', 'die', 'grave', 'tomb', 'decay', 'rot', 'mortal', 'mortality', 'ruin', 'fallen',
    ]),
    pattern: () =>
      'Royal or elevated imagery repeatedly appears beside images of death, decay, or loss.',
    interpretation: () =>
      'The poem places symbols of power beside symbols of mortality, creating anxiety about whether greatness can survive time.',
    claim: () =>
      'The queen—or whatever regal figure appears—functions less as a character than as a symbol of impermanence.',
    revisionQuestion: () =>
      'Is the regal figure meant to be a person, an ideal, or a warning?',
  },
  {
    id: 'emotional_distance',
    essayTitle: 'Emotional Distance',
    lexicon: new Set([
      'hurt', 'hurts', 'ache', 'aching', 'empty', 'numb', 'cold', 'pain', 'feel', 'feeling', 'felt',
      'hollow', 'distant', 'far', 'silence', 'quiet', 'still', 'flat', 'dry', 'dead', 'gone',
    ]),
    pattern: (tokens) => {
      const narrow = new Set(tokens.map((t) => t.toLowerCase())).size <= 3 && tokens.length >= 2
      return narrow
        ? 'Emotional vocabulary stays narrow but persistent—few feelings, many returns.'
        : 'Feeling-words recur without resolving into comfort or release.'
    },
    interpretation: (tokens) => {
      if (tokens.some((t) => ['numb', 'empty', 'hollow', 'cold'].includes(t.toLowerCase())))
        return 'Suffering is named but often remains emotionally inaccessible—the poem describes wound without granting full sensation.'
      if (tokens.some((t) => ['ache', 'hurt', 'hurts', 'pain'].includes(t.toLowerCase())))
        return 'Pain is intellectually present yet repeatedly distanced; the same hurts return instead of deepening into new feeling.'
      return 'The emotional register favors restraint and recurrence over expansion—feeling is acknowledged more than inhabited.'
    },
    claim: () =>
      'The manuscript describes suffering that remains intellectually present but emotionally inaccessible.',
    revisionQuestion: () =>
      'Where should the poem allow feeling to become visceral rather than reported?',
  },
  {
    id: 'longing',
    essayTitle: 'The Cost of Want',
    lexicon: new Set([
      'love', 'want', 'wanted', 'wish', 'long', 'longing', 'desire', 'need', 'yearn', 'miss',
      'missing', 'reach', 'wait', 'waiting', 'hope', 'hunger', 'thirst', 'dear', 'beloved',
    ]),
    pattern: () => 'Desire-language outruns possession—the poem names want more often than arrival.',
    interpretation: () =>
      'The poem keeps naming what is wanted or missed without securing it; longing persists as structure rather than mood.',
    claim: () => 'At its core, the draft is a poem of unsatisfied want—the argument lives in appetite, not fulfillment.',
    revisionQuestion: () =>
      'What would it cost the speaker to receive what they want—and does the draft dare to imagine that cost?',
  },
  {
    id: 'memory_time',
    essayTitle: 'Memory Against Oblivion',
    lexicon: new Set([
      'memory', 'memories', 'remember', 'forgot', 'forget', 'past', 'before', 'after', 'then',
      'once', 'again', 'still', 'always', 'never', 'years', 'day', 'night', 'time', 'moment',
      'history', 'childhood', 'ago',
    ]),
    pattern: () => 'Temporal and memorial diction pulls the poem backward as often as forward.',
    interpretation: () =>
      'The speaker orients by what was or what persists; present tense is constantly qualified by what cannot be recovered.',
    claim: () => 'Time in this manuscript is primarily retrospective—the poem thinks by returning, not by projecting.',
    revisionQuestion: () =>
      'Is memory here a refuge, a trap, or the poem’s actual subject?',
  },
  {
    id: 'performance_identity',
    essayTitle: 'Performance Versus Identity',
    lexicon: new Set([
      'perform', 'performance', 'stage', 'mask', 'play', 'acted', 'audience', 'show', 'pretend',
      'costume', 'role', 'part', 'script', 'theater', 'theatre',
    ]),
    pattern: () => 'Language of staging and role-playing sits beside questions of authentic selfhood.',
    interpretation: () =>
      'Identity appears something performed rather than possessed—the self is rehearsed, watched, or worn.',
    claim: () =>
      'The manuscript may be less about who someone is than about what it costs to appear as someone at all.',
    revisionQuestion: () =>
      'When the speaker performs, who is the audience—and what happens if that audience disappears?',
  },
  {
    id: 'embodiment',
    essayTitle: 'The Body as Argument',
    lexicon: new Set([
      'body', 'skin', 'blood', 'bone', 'hand', 'hands', 'mouth', 'breath', 'heart', 'flesh',
      'touch', 'warm', 'cold', 'eyes', 'face', 'hair', 'teeth', 'lips', 'arm', 'chest',
    ]),
    pattern: () => 'Physical diction grounds abstract thought in corporeal detail.',
    interpretation: () =>
      'When the poem risks abstraction, it returns to the body—the most reliable way it makes meaning concrete.',
    claim: () => 'Embodiment is not ornament here; it is how the draft earns belief.',
    revisionQuestion: () =>
      'Which moments still float in abstraction when the body could carry the argument?',
  },
]

export function isStructuralLabel(label: string): boolean {
  const t = label.trim()
  if (!t) return true
  if (STRUCTURAL_LABEL.test(t)) return true
  if (/^\d+$/.test(t)) return true
  STRUCTURAL_INLINE.lastIndex = 0
  if (STRUCTURAL_INLINE.test(t) && t.length < 40) return true
  return false
}

function isPoorAnchorTitle(title: string): boolean {
  const t = title.trim()
  if (!t || isStructuralLabel(t)) return true
  const words = t.split(/\s+/).filter(Boolean)
  if (words.length === 1 && POOR_SINGLE_WORD.has(t.toLowerCase())) return true
  if (words.length === 1 && t.length <= 4) return true
  return false
}

function manuscriptTokens(text: string): { lemma: string; display: string }[] {
  const out: { lemma: string; display: string }[] = []
  getPhysicalLines(text).forEach((line) => {
    line.split(/([^a-zA-Z']+)/).forEach((chunk) => {
      const lemma = normalizeLemma(chunk)
      if (lemma.length >= 2) out.push({ lemma, display: chunk.trim() || lemma })
    })
  })
  return out
}

function displayForLemma(text: string, lemma: string): string {
  const hit = manuscriptTokens(text).find((t) => t.lemma === lemma)
  return hit?.display.replace(/^[^\w]+|[^\w]+$/g, '') || lemma
}

function lineSpread(text: string, lemmas: Set<string>): number {
  const lines = getPhysicalLines(text)
  let n = 0
  lines.forEach((line) => {
    const row = (line.toLowerCase().match(/[a-z']+/g) ?? []).map(normalizeLemma)
    if (row.some((l) => lemmas.has(l))) n += 1
  })
  return n
}

function scoreTheme(text: string, spec: ThemeSpec, parsed: ParsedFeatures) {
  const hits = new Map<string, number>()

  manuscriptTokens(text).forEach(({ lemma }) => {
    if (spec.lexicon.has(lemma)) hits.set(lemma, (hits.get(lemma) ?? 0) + 1)
  })

  parsed.repeated.forEach((count, word) => {
    if (spec.lexicon.has(word)) hits.set(word, Math.max(hits.get(word) ?? 0, count))
  })
  parsed.abstract.forEach((word) => {
    if (spec.lexicon.has(word)) hits.set(word, (hits.get(word) ?? 0) + 1)
  })
  if (spec.id === 'emotional_distance') {
    parsed.emotional.forEach((word) => {
      hits.set(word, (hits.get(word) ?? 0) + 1)
    })
  }

  if (hits.size === 0) return null

  const tokens = [...hits.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([lemma]) => displayForLemma(text, lemma))

  const count = [...hits.values()].reduce((s, n) => s + n, 0)
  const spread = lineSpread(text, new Set(hits.keys()))
  const score = count * 2 + spread * 3 + hits.size

  return { score, tokens, count, spread, hitLemmas: [...hits.keys()] }
}

function scoreThemeAgainstProse(prose: string, spec: ThemeSpec): number {
  const low = prose.toLowerCase()
  let score = 0
  spec.lexicon.forEach((lemma) => {
    if (low.includes(lemma)) score += lemma.length > 4 ? 3 : 2
  })
  return score
}

function buildLayersFromTheme(
  spec: ThemeSpec,
  tokens: string[],
  count: number,
  spread: number,
  totalLines: number,
): InterpretationLayer {
  return {
    evidence: tokens.slice(0, 6).join(', '),
    pattern: spec.pattern(tokens, count, spread),
    interpretation: spec.interpretation(tokens, count, spread, totalLines),
    claim: spec.claim(tokens, count),
    revisionQuestion: spec.revisionQuestion(tokens),
  }
}

export function buildLiteraryAnchors(text: string, parsed: ParsedFeatures, max = 5): LiteraryAnchor[] {
  const totalLines = Math.max(1, getPhysicalLines(text).filter((l) => l.trim()).length)

  const ranked = THEME_SPECS.map((spec) => {
    const scored = scoreTheme(text, spec, parsed)
    if (!scored) return null
    return { spec, ...scored }
  })
    .filter(Boolean)
    .sort((a, b) => b!.score - a!.score)
    .slice(0, max) as {
    spec: ThemeSpec
    score: number
    tokens: string[]
    count: number
    spread: number
  }[]

  return ranked.map(({ spec, tokens, count, spread }) => ({
    id: spec.id,
    title: spec.essayTitle,
    tokens: tokens.slice(0, 8),
    layers: buildLayersFromTheme(spec, tokens, count, spread, totalLines),
  }))
}

/** Best thematic match for agent prose or card content — never returns structural labels. */
export function matchThemeFromProse(
  prose: string,
  text: string,
  parsed: ParsedFeatures,
): { spec: ThemeSpec; tokens: string[]; layers: InterpretationLayer } | null {
  const totalLines = Math.max(1, getPhysicalLines(text).filter((l) => l.trim()).length)
  const blob = prose.toLowerCase()

  let best: { spec: ThemeSpec; score: number; tokens: string[]; count: number; spread: number } | null =
    null

  for (const spec of THEME_SPECS) {
    const proseScore = scoreThemeAgainstProse(blob, spec)
    const manuscript = scoreTheme(text, spec, parsed)
    const score = proseScore * 4 + (manuscript?.score ?? 0)
    if (score < 4) continue

    const tokens =
      manuscript?.tokens.filter((t) => blob.includes(t.toLowerCase())) ??
      [...spec.lexicon].filter((l) => blob.includes(l)).map((l) => displayForLemma(text, l))

    if (tokens.length === 0) continue

    if (!best || score > best.score) {
      best = {
        spec,
        score,
        tokens,
        count: manuscript?.count ?? tokens.length,
        spread: manuscript?.spread ?? 1,
      }
    }
  }

  if (!best) return null

  return {
    spec: best.spec,
    tokens: best.tokens,
    layers: buildLayersFromTheme(best.spec, best.tokens, best.count, best.spread, totalLines),
  }
}

function extractManuscriptEvidenceWords(prose: string, text: string, parsed: ParsedFeatures, max = 6): string[] {
  const manuscript = manuscriptTokens(text)
  const seen = new Set<string>()
  const out: string[] = []

  for (const { lemma, display } of manuscript) {
    if (seen.has(lemma)) continue
    const d = display.replace(/^[^\w]+|[^\w]+$/g, '')
    if (d.length < 2) continue
    if (isStructuralLabel(d)) continue
    if (!prose.toLowerCase().includes(lemma) && !prose.toLowerCase().includes(d.toLowerCase())) continue
    seen.add(lemma)
    out.push(d)
    if (out.length >= max) break
  }

  if (out.length >= 2) return out

  const ranked = buildLiteraryAnchors(text, parsed, 1)
  if (ranked[0]?.tokens.length) return ranked[0].tokens.slice(0, max)

  return out
}

function titleFromTension(prose: string): string | null {
  const patterns = [
    /\bbetween\s+([a-z][a-z'\s-]{0,36}?)\s+and\s+([a-z][a-z'\s-]{0,36}?)(?=[\s,.;:!?]|$)/i,
    /\b([a-z][a-z'-]{2,22})\s+(?:and|vs\.?|versus|↔|\/)\s+([a-z][a-z'-]{2,22})\b/i,
    /(?:tension|conflict|juxtapos\w+|oppose\w+)\s+(?:between\s+)?([a-z][a-z'-]{2,22})\s+(?:and|vs\.?|versus)\s+([a-z][a-z'-]{2,22})\b/i,
  ]

  for (const re of patterns) {
    const m = re.exec(prose)
    if (!m) continue
    const a = takeConceptWords(m[1]!, MAX_PAIR_SIDE_WORDS)
    const b = takeConceptWords(m[2]!, MAX_PAIR_SIDE_WORDS)
    if (a.length >= 3 && b.length >= 3) {
      return finalizeAnchorTitle(`${a} & ${b}`)
    }
  }

  return null
}

function titleFromKeyInsight(keyInsight: string): string | null {
  const tension = titleFromTension(keyInsight)
  if (tension) return tension

  const first = keyInsight.split(/[.!?]/)[0]?.trim() ?? ''
  if (first.length < 12) return null
  if (isStructuralLabel(first)) return null
  if (/^(the draft|this poem|the manuscript|consider|try|perhaps)\b/i.test(first)) return null

  const finalized = finalizeAnchorTitle(first)
  if (finalized === 'Latent Thematic Pressure') return null
  if (finalized.split(/\s+/).length < 2 && finalized.length < 10) return null
  return finalized
}

/** Derive a literary-essay anchor title — never a section label or bare keyword. */
export function deriveConceptualAnchorTitle(
  source: { label: string; keyInsight: string; rawText: string; evidence: string | null },
  text: string,
  parsed: ParsedFeatures,
): string {
  const prose = `${source.label} ${source.keyInsight} ${source.rawText} ${source.evidence ?? ''}`

  if (!isStructuralLabel(source.label) && !isPoorAnchorTitle(source.label)) {
    const words = source.label.trim().split(/\s+/)
    if (words.length >= 2 && words.length <= 8) {
      return finalizeAnchorTitle(source.label.trim())
    }
  }

  const themeMatch = matchThemeFromProse(prose, text, parsed)
  if (themeMatch) return themeMatch.spec.essayTitle

  const tension = titleFromTension(prose) ?? titleFromKeyInsight(source.keyInsight)
  if (tension && !isPoorAnchorTitle(tension)) return finalizeAnchorTitle(tension)

  return 'Latent Thematic Pressure'
}

function catEssayTitle(cat: Cat, tokens: string[], text: string, parsed: ParsedFeatures): string {
  const prose = tokens.join(' ')
  const theme = matchThemeFromProse(prose, text, parsed)
  if (theme) return theme.spec.essayTitle

  switch (cat) {
    case 'repeat':
      return 'What the Draft Refuses to Stop Saying'
    case 'emotion':
      return tokens.length <= 3 ? 'A Narrow Band of Feeling' : 'Distributed Emotion'
    case 'abstract':
      return 'The Intellectual Spine'
    case 'sensory':
      return 'Image as Argument'
    default:
      return 'Latent Thematic Pressure'
  }
}

function catPattern(cat: Cat, tokens: string[]): string {
  switch (cat) {
    case 'repeat':
      return `The same diction (${tokens.slice(0, 5).join(', ')}) returns across separate lines—as if the poem keeps retesting one argument.`
    case 'emotion':
      return `Feeling-words (${tokens.slice(0, 5).join(', ')}) cluster together, suggesting mood organizes the draft before plot does.`
    case 'abstract':
      return `Abstract terms (${tokens.slice(0, 5).join(', ')}) dominate connected regions—ideas travel by concept more than by scene.`
    case 'sensory':
      return `Image and sense words (${tokens.slice(0, 5).join(', ')}) form a perceptual strand the poem keeps revisiting.`
    default:
      return `Connected diction (${tokens.slice(0, 5).join(', ')}) forms a coherent pressure within the manuscript.`
  }
}

function catInterpretation(cat: Cat, tokens: string[]): string {
  switch (cat) {
    case 'repeat':
      return 'Recurrence here is argumentative: the poem keeps testing the same words to see whether they still mean what they did.'
    case 'emotion':
      return tokens.length <= 3
        ? 'The emotional vocabulary is narrow but persistent—instead of many feelings, the manuscript revisits a small set of unresolved ones.'
        : 'Feeling is distributed rather than concentrated; emotion leaks across the network instead of resolving in a single cathartic moment.'
    case 'abstract':
      return 'The text thinks in abstractions first—concrete events are filtered through conceptual language before they become scene.'
    case 'sensory':
      return 'When the poem grounds itself, it does so through sense-data—these images carry more argumentative weight than expository lines.'
    default:
      return 'This cluster suggests a latent thematic pressure the draft has not yet fully dramatized.'
  }
}

function catClaim(cat: Cat): string {
  switch (cat) {
    case 'repeat':
      return 'The poem’s center of gravity lives in what it refuses to stop saying.'
    case 'emotion':
      return 'Feeling is structurally load-bearing here—not decorative atmosphere but how the poem knows itself.'
    case 'abstract':
      return 'The manuscript’s intellectual spine may matter more than its narrative surface.'
    case 'sensory':
      return 'Image is doing conceptual work; the poem thinks through what can be seen, heard, or touched.'
    default:
      return 'This cluster marks a pressure point worth dramatizing rather than annotating.'
  }
}

function catRevisionQuestion(cat: Cat): string {
  switch (cat) {
    case 'repeat':
      return 'What would happen if the poem said this once—with full force—instead of circling it?'
    case 'emotion':
      return 'Where should feeling deepen, and where is distance the actual subject?'
    case 'abstract':
      return 'Which abstractions still need a scene to earn their weight?'
    case 'sensory':
      return 'Which image could carry the poem’s central claim if everything else were stripped away?'
    default:
      return 'What is this cluster trying to become if you let it fully dramatize?'
  }
}

function hubOrganizingConcept(
  hub: SemanticNode,
  neighbors: SemanticNode[],
  text: string,
  parsed: ParsedFeatures,
): { title: string; layers: InterpretationLayer } {
  const neighborLabels = neighbors.slice(0, 8).map((n) => n.label)
  const prose = [hub.label, ...neighborLabels].join(' ')
  const theme = matchThemeFromProse(prose, text, parsed)

  if (theme) {
    return { title: theme.spec.essayTitle, layers: theme.layers }
  }

  const limitationWords = new Set([
    'cannot', 'cant', 'never', 'forget', 'unknown', 'unable', 'empty', 'nothing', 'without',
  ])
  const tokens = [hub.label, ...neighborLabels].slice(0, 6)

  if (limitationWords.has(hub.id) || neighbors.some((n) => limitationWords.has(n.id))) {
    return {
      title: 'Language of Limitation',
      layers: {
        evidence: tokens.join(', '),
        pattern:
          'Major paths in the network pass through negation, blockage, and unknowing—not through action or arrival.',
        interpretation:
          'The manuscript is organized around inability rather than action. Many ideas connect through what the narrator cannot remember, determine, or feel.',
        claim:
          'Uncertainty and blockage are not background mood—they are the poem’s primary syntax for moving thought forward.',
        revisionQuestion:
          'Is the poem arguing from what is missing, or merely describing absence without yet making it mean something?',
      },
    }
  }

  if (hub.cat === 'repeat') {
    return {
      title: 'What the Draft Refuses to Stop Saying',
      layers: {
        evidence: tokens.join(', '),
        pattern: 'Recurrence pulls disparate lines into one ongoing argument.',
        interpretation:
          'The draft keeps folding new material back through the same lexical returns; recurrence is how the poem thinks, not a stylistic tic.',
        claim: 'What repeats is not noise—it is the poem’s most honest statement of what it cannot leave alone.',
        revisionQuestion: 'What would happen if the poem said this once—with full force—instead of circling it?',
      },
    }
  }

  return {
    title: 'Latent Thematic Pressure',
    layers: {
      evidence: tokens.join(', '),
      pattern: 'Network gravity collects around a shared field of diction—the manuscript keeps returning to the same company of words.',
      interpretation:
        'These words gain meaning by proximity; the poem argues through association more than through explicit statement.',
      claim: 'The draft’s implicit argument may live in what keeps appearing together—not in any single line.',
      revisionQuestion: 'Which of these recurring words is doing the real work—and which are only keeping it company?',
    },
  }
}

function detectAbsences(text: string, parsed: ParsedFeatures): MissingVocabularyNote[] {
  const toks = manuscriptTokens(text).map((t) => t.lemma)
  const notes: MissingVocabularyNote[] = []

  const otherPronouns = toks.filter((t) => PRONOUN_OTHER.has(t)).length
  const selfPronouns = toks.filter((t) => PRONOUN_SELF.has(t)).length
  if (selfPronouns >= 2 && otherPronouns <= 1) {
    notes.push({
      id: 'inward',
      observation: 'Few references to other people—pronouns skew toward first person and self-interrogation.',
      claim: 'The manuscript remains overwhelmingly inward-facing; other minds enter rarely, if at all.',
    })
  }

  if (parsed.sensory.size <= 1 && toks.length > 40) {
    notes.push({
      id: 'sensory',
      observation: 'Little sensory description—few sight, sound, or touch anchors.',
      claim: 'The poem may be thinking in abstraction or emotion without grounding itself in physical scene.',
    })
  }

  if (toks.filter((t) => FUTURE_MARKERS.has(t)).length === 0 && toks.length > 30) {
    notes.push({
      id: 'future',
      observation: 'Scarcely any future-oriented language (will, tomorrow, next, later).',
      claim: 'The draft lives in present and memory—it does not yet argue toward what might happen.',
    })
  }

  if (toks.filter((t) => ACTION_MARKERS.has(t)).length <= 1 && toks.length > 35) {
    notes.push({
      id: 'action',
      observation: 'Few concrete action verbs—movement and event are largely implied rather than enacted.',
      claim: 'The poem describes states more than actions; drama may need to enter through verb and scene.',
    })
  }

  if (parsed.emotional.size >= 3 && parsed.sensory.size === 0) {
    notes.push({
      id: 'feeling_without_image',
      observation: 'Emotional diction without matching sensory imagery.',
      claim: 'Feeling is named but rarely embodied—the poem tells hurt without always showing where it lives.',
    })
  }

  return notes.slice(0, 4)
}

export function buildStructuralReading(
  text: string,
  parsed: ParsedFeatures,
  nodes: readonly SemanticNode[],
  links: readonly PulseLinkDatum[],
): StructuralReading | null {
  if (nodes.length === 0) return null

  const degree = new Map<string, number>()
  const adjacency = new Map<string, Set<string>>()
  links.forEach((l) => {
    const s = typeof l.source === 'string' ? l.source : l.source.id
    const t = typeof l.target === 'string' ? l.target : l.target.id
    degree.set(s, (degree.get(s) ?? 0) + 1)
    degree.set(t, (degree.get(t) ?? 0) + 1)
    if (!adjacency.has(s)) adjacency.set(s, new Set())
    if (!adjacency.has(t)) adjacency.set(t, new Set())
    adjacency.get(s)!.add(t)
    adjacency.get(t)!.add(s)
  })

  const core = nodes.filter((n) => n.nodeKind !== 'echo')
  const hubNode =
    [...core].sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0))[0] ?? core[0]

  const neighborIds = hubNode ? [...(adjacency.get(hubNode.id) ?? [])] : []
  const neighbors = neighborIds
    .map((id) => nodes.find((n) => n.id === id))
    .filter(Boolean) as SemanticNode[]

  const dominant = hubNode
    ? hubOrganizingConcept(hubNode, neighbors, text, parsed)
    : {
        title: 'Latent Thematic Pressure',
        layers: {
          evidence: '—',
          pattern: 'No clear organizing field emerged in the lexical network.',
          interpretation: 'The draft’s diction may still be too sparse for a single thematic argument to dominate.',
          claim: 'The next pass might need one recurring strand to make the poem’s center legible.',
          revisionQuestion: 'What single concern, if named clearly, could organize this draft?',
        },
      }

  const clusters: StructuralCluster[] = []
  const seenTitles = new Set<string>([dominant.title])

  ;(['repeat', 'emotion', 'abstract', 'sensory'] as Cat[]).forEach((cat) => {
    const catNodes = core.filter((n) => n.cat === cat)
    if (catNodes.length === 0) return
    const tokens = catNodes
      .sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0))
      .map((n) => n.label)
      .slice(0, 8)

    const title = catEssayTitle(cat, tokens, text, parsed)
    if (seenTitles.has(title)) return
    seenTitles.add(title)

    clusters.push({
      id: `struct-${cat}`,
      title,
      tokens,
      layers: {
        evidence: tokens.slice(0, 6).join(', '),
        pattern: catPattern(cat, tokens.slice(0, 5)),
        interpretation: catInterpretation(cat, tokens),
        claim: catClaim(cat),
        revisionQuestion: catRevisionQuestion(cat),
      },
    })
  })

  buildLiteraryAnchors(text, parsed, 4).forEach((anchor) => {
    if (seenTitles.has(anchor.title)) return
    seenTitles.add(anchor.title)
    clusters.push({
      id: `theme-${anchor.id}`,
      title: anchor.title,
      tokens: anchor.tokens,
      layers: anchor.layers,
    })
  })

  return {
    dominant,
    clusters: clusters.slice(0, 6),
    absences: detectAbsences(text, parsed),
  }
}

export function layersFromMarginCard(
  card: {
    label: string
    rawText: string
    keyInsight: string
    evidence: string | null
    revisionCue: string | null
    strand: string
  },
  text: string,
  parsed: ParsedFeatures,
): InterpretationReading {
  const prose = `${card.label} ${card.keyInsight} ${card.rawText}`
  const themeMatch = matchThemeFromProse(prose, text, parsed)
  const anchorTitle = deriveConceptualAnchorTitle(
    { label: card.label, keyInsight: card.keyInsight, rawText: card.rawText, evidence: card.evidence },
    text,
    parsed,
  )

  let evidence = themeMatch?.layers.evidence ?? ''
  if (!evidence && card.evidence && !isStructuralLabel(card.evidence.slice(0, 40))) {
    evidence = card.evidence.length > 80 ? card.evidence.slice(0, 120).trim() : card.evidence
  }
  if (!evidence || isStructuralLabel(evidence)) {
    evidence = extractManuscriptEvidenceWords(prose, text, parsed, 6).join(', ')
  }
  if (!evidence) {
    evidence = themeMatch?.tokens.slice(0, 6).join(', ') ?? '—'
  }

  const pattern =
    themeMatch?.layers.pattern ??
    (card.keyInsight.length >= 20 && !isStructuralLabel(card.keyInsight.split(':')[0] ?? '')
      ? card.keyInsight.split(/[.!?]/)[0]!.trim() + '.'
      : 'This note surfaces a recurring pressure in the draft—not a local glitch but a structural habit.')

  const interpretation =
    themeMatch?.layers.interpretation ??
    (card.keyInsight.length >= 24
      ? card.keyInsight
      : 'Read against the manuscript, this is less a local fix than a signal about where the poem keeps circling without yet naming its stake.')

  const claim =
    themeMatch?.layers.claim ??
    (card.revisionCue && card.revisionCue.length >= 20
      ? card.revisionCue.split(/[.!?]/)[0]!.trim() + '.'
      : 'The draft may be asking you to decide whether this pressure is symptom or subject—and revise accordingly.')

  const revisionQuestion =
    themeMatch?.layers.revisionQuestion ??
    (card.revisionCue && /\?/.test(card.revisionCue)
      ? card.revisionCue
      : card.revisionCue
        ? `What would change if you took seriously: ${card.revisionCue.slice(0, 120)}?`
        : 'What is this note asking you to decide about the poem’s center of gravity?')

  return {
    anchorTitle,
    layers: { evidence, pattern, interpretation, claim, revisionQuestion },
  }
}
