import { Link } from "react-router-dom";
import "@/work/systems/systems.css";

/** Quiet archival chapter for NU Solar — Tesla/PwC now have their own worlds. */
export default function SystemsSignalsRoom() {
  return (
    <article className="systems-room">
      <div className="systems-inner">
        <Link to="/work" className="systems-back">
          ← Work
        </Link>
        <header>
          <p className="systems-eyebrow">Archive · Vehicle systems</p>
          <h1 className="systems-title">NU Solar · Telemetry</h1>
        </header>
        <p className="systems-claim">
          Same CAN bus stream — two audiences, two temporalities: glanceable for the driver, deep
          for engineering.
        </p>
        <div className="systems-prose">
          <p>
            As software team lead, I led integration of the system that parses CAN data onto AWS,
            then two visualization pipelines on the same underlying signals: a real-time driver
            dashboard and backend time-series diagnostics. SQL for query, Python for processing,
            distributed systems for the car that never sits still.
          </p>
          <p>
            This chapter stays quieter on purpose. Tesla and PwC have full immersive rooms; NU Solar
            remains an archival signal in the exhibition — gold borrowed from instrumentation, not
            marketing.
          </p>
        </div>
      </div>
    </article>
  );
}
