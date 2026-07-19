import { Link } from "react-router-dom";
import "@/work/systems/systems.css";

/**
 * Quiet archival room — fidelity under time pressure.
 * Company cues are whispered (green / terracotta / gold), not logo cosplay.
 */
export default function SystemsSignalsRoom() {
  return (
    <article className="systems-room">
      <div className="systems-inner">
        <Link to="/work" className="systems-back">
          ← Work
        </Link>

        <header>
          <p className="systems-eyebrow">Archive · Fidelity under constraint</p>
          <h1 className="systems-title">Systems &amp; Signals</h1>
        </header>

        <p className="systems-claim">
          Three internships and a solar-car lab — different domains, one habit: make uncertainty
          legible to the person who has to act.
        </p>

        <div className="systems-prose">
          <p>
            These are quieter rooms on purpose. They sit behind the authored instruments (Echo,
            MuseLab, Differ) as proof that the same mind shows up in production telemetry, RAG
            evaluation, and CAN-bus dashboards — without forcing each into a product showcase.
          </p>
        </div>

        <section className="systems-entry tesla" aria-labelledby="sy-tesla">
          <p className="systems-signal">Fleet telemetry</p>
          <h2 id="sy-tesla">Brake health detection</h2>
          <p className="org">Tesla · ML &amp; Data Engineering · 2025</p>
          <p>
            A production pipeline that reads Model 3 fleet telemetry for early signs of brake
            degradation — model outputs wired into the monitoring tools engineers already use.
            Prediction without a human-in-the-loop workflow is noise; the useful system surfaces
            risk and leaves judgment with the engineer.
          </p>
          <p>
            Much of the work was less glamorous than “deployed an ML model” suggests: debugging
            production data and firmware regressions so the signal the model sees is the signal the
            car actually has.
          </p>
        </section>

        <section className="systems-entry pwc" aria-labelledby="sy-pwc">
          <p className="systems-signal">Multi-agent RAG</p>
          <h2 id="sy-pwc">Routing queries through judgment</h2>
          <p className="org">PwC · Software Engineering Intern · 2025</p>
          <p>
            Inside an internal RAG platform, a Langflow multi-agent layer routed each query between
            retrieval and conversation — with translation and post-processing on top. Evaluation
            logic asked whether the system retrieved the right documents; frontend work chased
            hierarchical data that broke rendering when nested too deep.
          </p>
          <p>
            What makes an AI feature feel reliable usually has nothing to do with the model. The
            terracotta accent is a quiet nod to PwC&apos;s own identity — present, not costume.
          </p>
        </section>

        <section className="systems-entry solar" aria-labelledby="sy-solar">
          <p className="systems-signal">CAN bus → human</p>
          <h2 id="sy-solar">Telemetry &amp; diagnostics</h2>
          <p className="org">NU Solar · Software Team Lead · 2023–2025</p>
          <p>
            A solar car streams CAN bus data — battery, motor, panels — that only matters once a
            person can read it in time. One pipeline fed the driver dashboard (glanceable); another
            fed engineering diagnostics (deep). Same underlying signals, two audiences, two
            temporalities.
          </p>
          <p>
            Gold is borrowed from solar-engineering instrumentation, not from a marketing deck.
            Videos and galleries for this era stay archived — the room is text-led on purpose.
          </p>
        </section>
      </div>
    </article>
  );
}
