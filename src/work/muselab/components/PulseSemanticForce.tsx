/**
 * Semantic force-directed field — links only encode honest co-presence on the manuscript
 * (same physical line or adjacent lines) plus a sparing “both repeated anchors co-present” cue.
 */

import * as d3 from "d3";
import type { SimulationNodeDatum } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ParsedFeatures } from "../lib/poeticFeatures";
import {
  getPhysicalLines,
  linesWhereLemmaOccurs,
  normalizeLemma,
} from "../lib/manuscriptLines";

const W = 960
const H = 560

function highlightNetwork(
  mergedNodes: d3.Selection<SVGGElement, SemanticNode, SVGGElement, unknown>,
  mergedLinks: d3.Selection<SVGLineElement, PulseLinkDatum, SVGGElement, unknown>,
  active: SemanticNode,
) {
  const connected = new Set<string>([active.id])
  active.connections?.forEach((l) => {
    const s = typeof l.source === 'object' ? (l.source as SemanticNode).id : String(l.source)
    const t = typeof l.target === 'object' ? (l.target as SemanticNode).id : String(l.target)
    connected.add(s)
    connected.add(t)
  })

  mergedNodes.attr('opacity', (d) => (connected.has(d.id) ? 1 : 0.22))

  mergedLinks
    .attr('stroke-opacity', (d) => {
      const s = typeof d.source === 'object' ? (d.source as SemanticNode).id : String(d.source)
      const t = typeof d.target === 'object' ? (d.target as SemanticNode).id : String(d.target)
      return s === active.id || t === active.id ? 0.72 : 0.06
    })
    .attr('stroke-width', (d) => {
      const s = typeof d.source === 'object' ? (d.source as SemanticNode).id : String(d.source)
      const t = typeof d.target === 'object' ? (d.target as SemanticNode).id : String(d.target)
      return s === active.id || t === active.id ? 0.8 + d.weight * 0.9 : 0.4
    })
}

function clearNetworkHighlight(
  mergedNodes: d3.Selection<SVGGElement, SemanticNode, SVGGElement, unknown>,
  mergedLinks: d3.Selection<SVGLineElement, PulseLinkDatum, SVGGElement, unknown>,
) {
  mergedNodes.attr('opacity', 1)
  mergedLinks.attr('stroke-opacity', 0.28).attr('stroke-width', (d) => 0.65 + d.weight * 0.55)
}

export type Cat = 'repeat' | 'emotion' | 'abstract' | 'sensory'

export type SemanticNode = SimulationNodeDatum & {
  id: string
  label: string
  cat: Cat
  nodeKind: 'manuscript' | 'echo'
  echoSource?: string
  echoScore?: number
  r: number
  occurrences: readonly number[]
  connections?: PulseLinkDatum[]
}

export type PulseLinkDatum = {
  /** string ids until simulation binds */
  source: string | SemanticNode
  target: string | SemanticNode
  reason: string
  weight: number
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function deterministicJitter(key: string, spread: number) {
  let h = 0
  for (let i = 0; i < key.length; i += 1) h = ((h << 5) - h + key.charCodeAt(i)) | 0
  const nx = ((((h >>> 0) % 97) / 97) - 0.5) * spread
  const ny = ((((h >> 11) >>> 0) % 89) / 89 - 0.5) * spread * 0.65
  return { dx: nx, dy: ny }
}

function rankWeight(cat: Cat): number {
  switch (cat) {
    case 'repeat':
      return 4
    case 'emotion':
      return 3
    case 'abstract':
      return 2
    case 'sensory':
      return 2
    default:
      return 1
  }
}

function rankCategory(lemma: string, parsed: ParsedFeatures): Cat | null {
  const low = lemma
  const rep = parsed.repeated.get(low)
  if ((rep ?? 0) >= 2) return 'repeat'
  if (parsed.emotional.has(low)) return 'emotion'
  if (parsed.abstract.has(low)) return 'abstract'
  if (parsed.sensory.has(low)) return 'sensory'
  return null
}

/** Surface token from manuscript (preserves-ish casing punctuation from first hit) */
function displayTokenForLemma(text: string, lemma: string): string {
  const lines = getPhysicalLines(text)
  for (const line of lines) {
    const chunks = line.split(/([^a-zA-Z']+)/)
    for (const ch of chunks) {
      const n = normalizeLemma(ch)
      if (n === lemma && ch.trim()) return ch.trim().replace(/^[^\w]+|[^\w]+$/g, '')
    }
  }
  return lemma
}

export function buildSemanticGraphFromPoem(text: string, parsed: ParsedFeatures): {
  nodes: Omit<SemanticNode, 'vx' | 'vy' | 'fx' | 'fy' | 'index'>[]
  links: PulseLinkDatum[]
} {
  const rawLines = getPhysicalLines(text)
  const lineLemmas: string[][] = rawLines.map((line) => {
    const lemmas = (line.toLowerCase().match(/[a-z']+/g) ?? []).map((t) =>
      normalizeLemma(t),
    )
    const ok = lemmas.filter((l) => l.length >= 2)
    return [...new Set(ok)]
  })

  /** Lemmas appearing in manuscript with a poetic-features class */
  const scored = new Map<
    string,
    { cat: Cat; lines: Set<number>; repStrength: number }
  >()

  for (let li = 0; li < lineLemmas.length; li += 1) {
    for (const lemma of lineLemmas[li]!) {
      const cat = rankCategory(lemma, parsed)
      if (!cat) continue
      const occLines = linesWhereLemmaOccurs(text, lemma)
      if (occLines.size === 0) continue

      const prev = scored.get(lemma)
      const repStrength = parsed.repeated.get(lemma) ?? 1

      if (!prev) {
        scored.set(lemma, {
          cat,
          lines: new Set(occLines),
          repStrength,
        })
      } else {
        prev.lines = new Set([...prev.lines, ...occLines])
        prev.repStrength = Math.max(prev.repStrength, repStrength)
      }
    }
  }

  const sorted = [...scored.entries()].sort((a, b) => {
    const ra = parsed.repeated.get(a[0]) ?? 1
    const rb = parsed.repeated.get(b[0]) ?? 1
    if (rb !== ra) return rb - ra
    const ca = rankWeight(a[1].cat)
    const cb = rankWeight(b[1].cat)
    if (cb !== ca) return cb - ca
    return b[1].lines.size - a[1].lines.size
  })

  const top = sorted.slice(0, 42)
  const topIds = new Set(top.map(([id]) => id))

  type RawEdge = { s: string; t: string; w: number; reason: string }

  const edges: RawEdge[] = []

  const pushEdge = (a: string, b: string, w: number, reason: string) => {
    if (a === b) return
    if (!topIds.has(a) || !topIds.has(b)) return
    const s = a < b ? a : b
    const t = a < b ? b : a
    edges.push({ s, t, w, reason })
  }

  lineLemmas.forEach((row, idx) => {
    const present = [...new Set(row)].filter((l) => topIds.has(l))
    const ln = idx + 1
    const sortedRow = [...present].sort()
    for (let i = 0; i < sortedRow.length; i += 1) {
      for (let j = i + 1; j < sortedRow.length; j += 1) {
        const ia = sortedRow[i]!
        const ib = sortedRow[j]!
        const iaRep = (parsed.repeated.get(ia) ?? 1) >= 2
        const ibRep = (parsed.repeated.get(ib) ?? 1) >= 2
        const anchorBonus = iaRep && ibRep ? 6 : 0
        pushEdge(
          ia,
          ib,
          14 + anchorBonus + rankWeight(scored.get(ia)!.cat) + rankWeight(scored.get(ib)!.cat),
          anchorBonus ? `anchors meet · line ${ln}` : `semantic co-field · line ${ln}`,
        )
      }
    }
  })

  lineLemmas.forEach((rowA, idx) => {
    if (idx >= lineLemmas.length - 1) return
    const rowB = lineLemmas[idx + 1]!
    const aSet = [...new Set(rowA)].filter((l) => topIds.has(l))
    const bSet = [...new Set(rowB)].filter((l) => topIds.has(l))
    const lo = idx + 1
    const hi = idx + 2
    aSet.forEach((aL) => {
      bSet.forEach((bL) => {
        if (aL === bL) return
        const ca = scored.get(aL)?.cat
        const cb = scored.get(bL)?.cat
        if (!ca || !cb) return
        pushEdge(
          aL,
          bL,
          6 + rankWeight(ca) + rankWeight(cb),
          `neighbor lines · ${lo}↔${hi}`,
        )
      })
    })
  })

  const dedupe = new Map<string, RawEdge>()
  edges
    .sort((x, y) => y.w - x.w)
    .forEach((e) => {
      const k = `${e.s}|${e.t}`
      if (!dedupe.has(k)) dedupe.set(k, e)
    })

  const maxLinks = 120
  const linkRows = [...dedupe.values()].slice(0, maxLinks)

  const nodes: Omit<SemanticNode, 'vx' | 'vy' | 'fx' | 'fy' | 'index'>[] = top.map(
    ([lemma, info], idx) => {
      const occNums = [...info.lines].sort((a, b) => a - b)
      const baseR =
        info.cat === 'repeat'
          ? 10 + Math.sqrt(info.repStrength) * 5.5
          : info.cat === 'emotion'
            ? 9.5
            : info.cat === 'abstract'
              ? 9
              : 8.5

      const angle = (idx / Math.max(top.length, 1)) * Math.PI * 2
      const jitter = deterministicJitter(`${lemma}:${occNums.join(':')}`, 88)

      return {
        id: lemma,
        label: displayTokenForLemma(text, lemma),
        cat: info.cat,
        nodeKind: 'manuscript' as const,
        r: clamp(baseR, 7.2, 26),
        occurrences: occNums,
        x: W / 2 + Math.cos(angle) * (168 + jitter.dx),
        y: H / 2 + Math.sin(angle) * (122 + jitter.dy),
      }
    },
  )

  const links: PulseLinkDatum[] = linkRows.map((row) => ({
    source: row.s,
    target: row.t,
    reason: row.reason,
    weight: clamp(row.w / 18, 0.35, 2.4),
  }))

  return { nodes, links }
}

const palette: Record<Cat, { fill: string; stroke: string }> = {
  repeat: { fill: '#c9c4bb', stroke: '#6e6860' },
  emotion: { fill: '#c8bdb8', stroke: '#766a65' },
  abstract: { fill: '#bfbab2', stroke: '#656058' },
  sensory: { fill: '#b8bfb5', stroke: '#5a6258' },
}

const catExplain: Record<Cat, string> = {
  repeat: 'Repeated lexical anchor',
  emotion: 'Emotional diction',
  abstract: 'Abstract concept strand',
  sensory: 'Image / sensory echo',
}

function nodeById(nodes: SemanticNode[], id: string): SemanticNode | undefined {
  return nodes.find((n) => n.id === id)
}

export function PulseSemanticForce({
  poemText,
  parsed,
  highlightLemmaId,
  onLemmaSelect,
  onGraphReady,
}: {
  poemText: string
  parsed: ParsedFeatures
  highlightLemmaId?: string | null
  onLemmaSelect?: (lemma: string) => void
  onGraphReady?: (ctx: {
    nodes: SemanticNode[]
    links: PulseLinkDatum[]
    enriching: boolean
  }) => void
}) {
  const graphKey = `${poemText.length}|${poemText.slice(0, 40)}|${parsed.repeated.size}`
  const bundle = useMemo(
    () => buildSemanticGraphFromPoem(poemText, parsed),
    [poemText, parsed],
  )

  useEffect(() => {
    onGraphReady?.({
      nodes: bundle.nodes as SemanticNode[],
      links: bundle.links,
      enriching: false,
    })
  }, [bundle, onGraphReady])

  const svgRef = useRef<SVGSVGElement | null>(null)
  const zoomGRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const simRef = useRef<d3.Simulation<SemanticNode, PulseLinkDatum> | null>(null)
  const pickRef = useRef<string | null>(null)
  const hoverRef = useRef<string | null>(null)
  const hiliteRef = useRef<string | null>(null)
  const paintCirclesRef = useRef<(() => void) | null>(null)
  const [dims, setDims] = useState({ w: W, h: H })

  const [linkHover, setLinkHover] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)

  const displayNode = useMemo(() => {
    const id = pinnedId ?? hoverId
    if (!id) return null
    return bundle.nodes.find((n) => n.id === id) ?? null
  }, [bundle.nodes, pinnedId, hoverId])

  const isPinned = !!(pinnedId && displayNode && pinnedId === displayNode.id)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined
    const sync = () => {
      const r = el.getBoundingClientRect()
      setDims({
        w: Math.max(320, Math.round(r.width || W)),
        h: Math.max(300, Math.round(r.height || 520)),
      })
    }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    hiliteRef.current = highlightLemmaId ? normalizeLemma(highlightLemmaId) : null
    paintCirclesRef.current?.()
  }, [highlightLemmaId])

  useEffect(() => {
    setPinnedId(null)
    setHoverId(null)
    pickRef.current = null
    hoverRef.current = null
    setLinkHover(null)
    paintCirclesRef.current?.()
  }, [graphKey])

  useEffect(() => {
    if (pinnedId && !bundle.nodes.some((n) => n.id === pinnedId)) {
      setPinnedId(null)
      pickRef.current = null
    }
    if (hoverId && !bundle.nodes.some((n) => n.id === hoverId)) {
      setHoverId(null)
      hoverRef.current = null
    }
  }, [bundle.nodes, pinnedId, hoverId])

  useEffect(() => {
    if (!svgRef.current || !zoomGRef.current) return

    if (bundle.nodes.length === 0) {
      zoomGRef.current.innerHTML = ''
      simRef.current?.stop()
      paintCirclesRef.current = null
      return undefined
    }

    simRef.current?.stop()
    zoomGRef.current.innerHTML = ''
    paintCirclesRef.current = null

    const viewW = dims.w
    const viewH = dims.h

    const svg = d3.select(svgRef.current)
    svg.attr('viewBox', `0 0 ${viewW} ${viewH}`)
    const zoomG = d3.select(zoomGRef.current)

    const nodes = bundle.nodes.map((d) => ({ ...d }) as SemanticNode)
    const links = bundle.links.map((l) => ({
      source: l.source,
      target: l.target,
      reason: l.reason,
      weight: l.weight,
    })) as PulseLinkDatum[]

    nodes.forEach((n) => {
      n.connections = links.filter((l) => {
        const s = typeof l.source === 'string' ? l.source : (l.source as SemanticNode).id
        const t = typeof l.target === 'string' ? l.target : (l.target as SemanticNode).id
        return s === n.id || t === n.id
      })
    })

    const charge = parsed.repeated.size + parsed.emotional.size + parsed.abstract.size
    const manyBody = -120 - clamp(charge, 8, 80) * 1.1

    const sim = d3
      .forceSimulation<SemanticNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<SemanticNode, PulseLinkDatum>(links)
          .id((d) => d.id)
          .distance(118)
          .strength(0.28),
      )
      .force('charge', d3.forceManyBody<SemanticNode>().strength(manyBody))
      .force('center', d3.forceCenter(viewW / 2, viewH / 2))
      .force('collide', d3.forceCollide<SemanticNode>().radius((d) => d.r + 8))
      .force('x', d3.forceX(viewW / 2).strength(0.012))
      .force('y', d3.forceY(viewH / 2).strength(0.012))
      .alphaDecay(0.028)
      .velocityDecay(0.38)

    simRef.current = sim

    const linkKey = (d: PulseLinkDatum) => {
      const s = typeof d.source === 'string' ? d.source : ((d.source as SemanticNode).id ?? '')
      const t = typeof d.target === 'string' ? d.target : ((d.target as SemanticNode).id ?? '')
      return `${s}|${t}`
    }

    const drag = d3
      .drag<SVGGElement, SemanticNode>()
      .on('start', (event, d) => {
        if (event.sourceEvent) event.sourceEvent.stopPropagation()
        d3.select(event.sourceEvent?.target as Element).raise()
        if (!event.active) sim.alphaTarget(0.22).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active) sim.alphaTarget(0)
        d.fx = null
        d.fy = null
      })

    zoomG.attr('pointer-events', 'all')

    zoomG
      .append('rect')
      .attr('class', 'pulse-network-bg')
      .attr('width', viewW)
      .attr('height', viewH)
      .attr('fill', 'transparent')

    const linkSel = zoomG
      .append('g')
      .attr('class', 'pulse-links')
      .selectAll<SVGLineElement, PulseLinkDatum>('line')
      .data(links, linkKey)

    linkSel.exit().remove()

    const linkEnter = linkSel
      .enter()
      .append('line')
      .attr('stroke', '#6e6259')
      .attr('stroke-opacity', 0.28)
      .attr('stroke-width', (d) => 0.65 + d.weight * 0.55)
      .attr('stroke-linecap', 'round')
      .on('pointerenter', (ev, d) => {
        const sNode =
          typeof d.source === 'object' ? (d.source as SemanticNode) : nodeById(nodes, d.source)!
        const tNode =
          typeof d.target === 'object' ? (d.target as SemanticNode) : nodeById(nodes, d.target)!
        setLinkHover(`${sNode.label} ↔ ${tNode.label} · ${d.reason}`)
        d3.select(ev.currentTarget).attr('stroke-opacity', 0.68).attr('stroke-width', 1.2 + d.weight * 0.4)
      })
      .on('pointerleave', (ev, d) => {
        setLinkHover(null)
        d3.select(ev.currentTarget).attr('stroke-opacity', 0.28).attr('stroke-width', 0.65 + d.weight * 0.55)
      })

    const mergedLinks = linkEnter.merge(linkSel)

    const nodeLayer = zoomG.append('g').attr('class', 'pulse-nodes')

    let nodeSel = nodeLayer.selectAll<SVGGElement, SemanticNode>('g.node').data(nodes, (d) => d.id)
    nodeSel.exit().remove()

    const nodeEnter = nodeSel
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'grab')
      .call(drag)

    nodeEnter
      .append('circle')
      .attr('class', 'node-hit')
      .attr('r', (d) => d.r + 14)
      .attr('fill', 'transparent')
      .attr('pointer-events', 'all')

    nodeEnter
      .append('circle')
      .attr('data-node-circle', true)
      .attr('r', (d) => d.r)
      .attr('fill', (d) => palette[d.cat].fill)
      .attr('stroke', (d) => palette[d.cat].stroke)
      .attr('stroke-width', (d) => (d.nodeKind === 'echo' ? 0.85 : 1.1))
      .attr('stroke-dasharray', (d) => (d.nodeKind === 'echo' ? '2 2.5' : null))
      .attr('opacity', (d) => (d.nodeKind === 'echo' ? 0.62 : 0.94))

    nodeEnter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .attr('fill', (d) => (d.nodeKind === 'echo' ? '#3d3830' : '#2a241c'))
      .attr('dy', '0.35em')
      .style('font-size', (d) =>
        `${Math.max(8.5, Math.min(13, d.r * (d.nodeKind === 'echo' ? 0.9 : 0.85)))}px`,
      )
      .style('font-family', '"Cormorant Garamond", Georgia, serif')
      .style('font-style', (d) => (d.nodeKind === 'echo' ? 'italic' : 'normal'))
      .text((d) => (d.label.length > 14 ? `${d.label.slice(0, 13)}…` : d.label))

    const mergedNodes = nodeEnter.merge(nodeSel)

    mergedNodes
      .on('pointerenter', (_ev, d) => {
        highlightNetwork(mergedNodes, mergedLinks, d)
        hoverRef.current = d.id
        setHoverId(d.id)
      })
      .on('pointerleave', (_ev, d) => {
        clearNetworkHighlight(mergedNodes, mergedLinks)
        if (hoverRef.current === d.id) {
          hoverRef.current = null
          setHoverId(null)
        }
      })
      .on('click', (ev, d) => {
        ev.stopPropagation()
        pickRef.current = d.id
        hoverRef.current = d.id
        setPinnedId(d.id)
        setHoverId(d.id)
        paintCirclesRef.current?.()
      })

    const paintCircles = () => {
      const hi = hiliteRef.current
      mergedNodes.selectAll('[data-node-circle]').each(function paintOne() {
        const el = this as SVGCircleElement
        const parent = el.parentElement
        if (!parent) return
        const g = d3.select(parent)
        const dat = g.datum() as SemanticNode
        const active = !!(hi && hi === dat.id)
        const picked = pickRef.current === dat.id
        d3.select(el)
          .attr('r', dat.r + (picked ? 2.8 : 0))
          .attr('stroke-width', active || picked ? 2.2 : 1.1)
          .attr('stroke', picked ? '#f2ebe0' : active ? '#e8dfd2' : palette[dat.cat].stroke)
      })
    }

    paintCirclesRef.current = paintCircles
    paintCircles()

    sim.on('tick', () => {
      mergedLinks
        .attr('x1', (d) => (d.source as SemanticNode).x ?? 0)
        .attr('y1', (d) => (d.source as SemanticNode).y ?? 0)
        .attr('x2', (d) => (d.target as SemanticNode).x ?? 0)
        .attr('y2', (d) => (d.target as SemanticNode).y ?? 0)

      mergedNodes.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
    })

    const isBackground = (target: EventTarget | null) => {
      let el = target as Element | null
      while (el && el !== svgRef.current) {
        if (el.classList?.contains('node') || el.classList?.contains('pulse-links')) return false
        el = el.parentElement
      }
      return true
    }

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .filter((ev) => {
        if (ev.type === 'wheel') return true
        if ((ev.type === 'mousedown' || ev.type === 'touchstart') && !isBackground(ev.target)) return false
        return true
      })
      .on('zoom', (ev) => {
        zoomG.attr('transform', ev.transform.toString())
      })

    svg.call(zoomBehavior)
    svg.call(zoomBehavior.transform as never, d3.zoomIdentity)

    const svgNode = svgRef.current
    const wheelPrevent = (ev: WheelEvent) => {
      ev.preventDefault()
    }
    svgNode?.addEventListener('wheel', wheelPrevent, { passive: false })

    mergedNodes.raise()

    sim.alpha(1).restart()

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const drift = reduceMotion
      ? 0
      : window.setInterval(() => {
          if (!simRef.current) return
          simRef.current.alphaTarget(0.12).restart()
          window.setTimeout(() => simRef.current?.alphaTarget(0), 380)
        }, 2400)

    return () => {
      if (drift) window.clearInterval(drift)
      sim.stop()
      svg.on('.zoom', null)
      sim.on('tick', null)
      svgNode?.removeEventListener('wheel', wheelPrevent)
      paintCirclesRef.current = null
    }
  }, [bundle, dims, parsed.repeated.size, parsed.emotional.size, parsed.abstract.size])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-sm border border-[#4a423866] bg-[#17130f] shadow-[inset_0_0_90px_rgba(22,14,10,0.65)]"
    >
      {bundle.nodes.length === 0 ? (
        <div className="relative flex min-h-[min(420px,60vh)] items-center justify-center overflow-hidden rounded-sm border border-dashed border-[#5c534852] bg-[radial-gradient(ellipse_52%_48%_at_50%_45%,rgba(118,106,82,0.09),transparent_70%)] px-10 py-14 text-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#83786f]">
              Topology idle
            </p>
            <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-[#958c82]">
              Not enough recurrence in this pass for a web—not yet.
            </p>
          </div>
        </div>
      ) : (
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        className="min-h-[min(52vh,640px)] h-[min(52vh,640px)] w-full touch-none select-none sm:h-[min(56vh,680px)]"
        role="img"
        aria-label="Semantic lexical network"
      >
        <title>Lexical network · manuscript co-presence</title>
        <rect width={dims.w} height={dims.h} fill="#17130f" />
        <g ref={zoomGRef} data-zoom-layer />
      </svg>
      )}

      {linkHover ? (
        <div className="pointer-events-none absolute bottom-28 left-4 z-[5] max-w-[min(620px,90%)] font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-[#837b72]/90">
          {linkHover}
        </div>
      ) : null}

      {displayNode ? (
        <aside className="pointer-events-none absolute bottom-12 left-3 z-10 max-w-[min(480px,92%)] rounded-sm border border-[#dfd6cbb0] bg-[#1b1915e8] px-4 py-3 backdrop-blur-sm">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#917a62]">
            {displayNode.nodeKind === 'echo'
              ? 'Semantic echo · not in manuscript'
              : catExplain[displayNode.cat]}
          </p>
          <p className="mt-1 font-display text-lg text-[#eee7de]">{displayNode.label}</p>
          <p className="mt-3 font-display text-[13px] leading-snug text-[#c9bfb0]">
            {displayNode.nodeKind === 'echo'
              ? `Tethered to “${displayNode.echoSource ?? '…'}” · suggested by lexical field`
              : `Occurs on manuscript lines · ${displayNode.occurrences.slice(0, 12).join(', ')}${displayNode.occurrences.length > 12 ? ' …' : ''}`}
          </p>
          {isPinned ? (
          <div className="pointer-events-auto mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                pickRef.current = null
                setPinnedId(null)
                paintCirclesRef.current?.()
              }}
              className="border border-transparent px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#83786f] underline decoration-[#554a4188]"
            >
              Clear pick
            </button>
          </div>
          ) : null}
        </aside>
      ) : null}
    </div>
  )
}
