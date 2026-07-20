import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import { dreamsData, type GraphNode } from "@/work/dreams/dreams-data";
import "@/work/dreams/dreams-sky.css";

type SimNode = GraphNode & d3.SimulationNodeDatum;
type SimLink = d3.SimulationLinkDatum<SimNode> & { weight: number };

const KIND_LABEL: Record<string, string> = {
  symbol: "symbol",
  place: "location",
  person: "person",
  motif: "emotional motif",
};

export default function CreativeDreams() {
  const data = dreamsData;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<GraphNode | null>(null);

  const relatedLabels = useMemo(() => {
    if (!active) return [] as string[];
    const id = active.id;
    const labels: string[] = [];
    for (const link of data.graph.links) {
      const other =
        link.source === id ? link.target : link.target === id ? link.source : null;
      if (!other) continue;
      const node = data.graph.nodes.find((n) => n.id === other);
      if (node) labels.push(node.label);
    }
    return [...new Set(labels)].slice(0, 8);
  }, [active, data.graph.links, data.graph.nodes]);

  useEffect(() => {
    const svgEl = svgRef.current;
    const panel = panelRef.current;
    if (!svgEl || !panel) return;

    const nodes: SimNode[] = data.graph.nodes.map((n) => ({ ...n }));
    const links: SimLink[] = data.graph.links.map((l) => ({
      source: l.source,
      target: l.target,
      weight: l.weight,
    }));

    let width = panel.clientWidth;
    let height = panel.clientHeight;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg.append("g");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance(120)
          .strength(0.08),
      )
      .force("charge", d3.forceManyBody().strength(-220))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide<SimNode>().radius((d) => 26 + d.count * 8),
      )
      .force("x", d3.forceX(width / 2).strength(0.02))
      .force("y", d3.forceY(height / 2).strength(0.02));

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", "link")
      .attr("stroke-width", (d) => 0.8 + d.weight * 0.35);

    const node = g
      .append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(nodes)
      .join("g")
      .attr("class", "node-group")
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr(
        "aria-label",
        (d) => `Dream ${KIND_LABEL[d.kind] ?? d.kind} ${d.label}, appears in ${d.count} dreams`,
      )
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.2).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    node
      .append("circle")
      .attr("class", "node-circle")
      .attr("r", (d) => 12 + Math.min(d.count, 8) * 3.5);

    node
      .append("text")
      .attr("class", "node-label")
      .attr("font-size", (d) => `${16 + Math.min(d.count, 6) * 3.5}px`)
      .text((d) => d.label);

    function ticked() {
      link
        .attr("x1", (d) => (d.source as SimNode).x ?? 0)
        .attr("y1", (d) => (d.source as SimNode).y ?? 0)
        .attr("x2", (d) => (d.target as SimNode).x ?? 0)
        .attr("y2", (d) => (d.target as SimNode).y ?? 0);
      node.attr("transform", (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
    }

    simulation.on("tick", ticked);

    function highlight(activeNode: SimNode) {
      const connected = new Set<string>([activeNode.id]);
      links.forEach((l) => {
        const s = typeof l.source === "object" ? (l.source as SimNode).id : String(l.source);
        const t = typeof l.target === "object" ? (l.target as SimNode).id : String(l.target);
        if (s === activeNode.id) connected.add(t);
        if (t === activeNode.id) connected.add(s);
      });

      node
        .classed("is-dimmed", (d) => !connected.has(d.id))
        .classed("is-active", (d) => d.id === activeNode.id);

      link
        .classed("is-dimmed", (d) => {
          const s = typeof d.source === "object" ? (d.source as SimNode).id : String(d.source);
          const t = typeof d.target === "object" ? (d.target as SimNode).id : String(d.target);
          return s !== activeNode.id && t !== activeNode.id;
        })
        .classed("is-active", (d) => {
          const s = typeof d.source === "object" ? (d.source as SimNode).id : String(d.source);
          const t = typeof d.target === "object" ? (d.target as SimNode).id : String(d.target);
          return s === activeNode.id || t === activeNode.id;
        });
    }

    function clearHighlight() {
      node.classed("is-dimmed", false).classed("is-active", false);
      link.classed("is-dimmed", false).classed("is-active", false);
      setActive(null);
    }

    node
      .on("mouseenter", (_, d) => {
        setActive(d);
        highlight(d);
      })
      .on("focus", (_, d) => {
        setActive(d);
        highlight(d);
      })
      .on("mouseleave", clearHighlight)
      .on("blur", clearHighlight);

    const onResize = () => {
      width = panel.clientWidth;
      height = panel.clientHeight;
      svg.attr("viewBox", `0 0 ${width} ${height}`);
      simulation
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.02))
        .force("y", d3.forceY(height / 2).strength(0.02))
        .alpha(0.5)
        .restart();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      simulation.stop();
      svg.selectAll("*").remove();
    };
  }, [data.graph.links, data.graph.nodes]);

  const recurringPeople = data.peopleIndex.slice(0, 6);
  const recurringPlaces = data.placesIndex.slice(0, 6);
  const recurringMotifs = data.emotionIndex.slice(0, 6);

  return (
    <article className="dream-page">
      <Link to="/creative" className="dream-back">
        ← creative foyer
      </Link>

      <header className="dream-header">
        <h1>Dreams</h1>
        <p>{data.subtitle}</p>
        <p className="dream-meta">
          {data.dreamCount} nights · symbols · places · people · motifs
        </p>
      </header>

      <section className="dream-layout">
        <section
          className="graph-panel"
          aria-label="Dream symbol network"
          ref={panelRef}
        >
          <svg
            id="dreamGraph"
            ref={svgRef}
            role="img"
            aria-label="Network map of recurring dream symbols"
          />
        </section>

        <aside className="dream-info" aria-live="polite">
          <p className="info-kicker">
            {active ? KIND_LABEL[active.kind] ?? "selected" : "selected symbol"}
          </p>
          <h2 className="info-title">{active ? active.label : "hover a word"}</h2>

          {active ? (
            <>
              <p className="info-count">
                Appears in {active.count} dream{active.count === 1 ? "" : "s"}.
              </p>
              <p className="info-connections">
                {relatedLabels.length
                  ? `Related: ${relatedLabels.join(" · ")}`
                  : "No related symbols yet."}
              </p>
              {active.analysis ? (
                <p className="info-analysis">{active.analysis}</p>
              ) : null}

              <div className="info-block">
                <h3>example dreams</h3>
                <ul className="info-dreams">
                  {active.excerpts.slice(0, 3).map((ex) => (
                    <li key={`${ex.dreamId}-${ex.text.slice(0, 24)}`}>
                      {ex.dateLabel}: {ex.text}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="info-count">Frequency will appear here.</p>
              <p className="info-connections">Related symbols will appear here.</p>
              <div className="info-secondary">
                <h3>recurring threads</h3>
                <ul>
                  <li>
                    people —{" "}
                    {recurringPeople.map((p) => p.label).join(" · ") || "—"}
                  </li>
                  <li>
                    places —{" "}
                    {recurringPlaces.map((p) => p.label).join(" · ") || "—"}
                  </li>
                  <li>
                    motifs —{" "}
                    {recurringMotifs.map((p) => p.label).join(" · ") || "—"}
                  </li>
                </ul>
              </div>
            </>
          )}
        </aside>
      </section>
    </article>
  );
}
