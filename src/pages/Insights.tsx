/**
 * Owner-only Site Insights dashboard.
 * Data loaded only after server-validated owner session.
 */

import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useOwnerSession } from "@/hooks/useOwnerSession";
import { askShirleyEndpointBase } from "@/lib/askShirleyOwnerApi";
import "@/styles/insights.css";

type Range = "today" | "7d" | "30d" | "month" | "all";

async function ownerGet<T>(path: string): Promise<T> {
  const base = askShirleyEndpointBase();
  if (!base) throw new Error("no_endpoint");
  const res = await fetch(`${base}${path}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  if (res.status === 401) throw new Error("unauthorized");
  if (!res.ok) throw new Error(`http_${res.status}`);
  return (await res.json()) as T;
}

async function ownerMutate(path: string, init: RequestInit): Promise<void> {
  const base = askShirleyEndpointBase();
  if (!base) throw new Error("no_endpoint");
  const res = await fetch(`${base}${path}`, {
    ...init,
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`http_${res.status}`);
}

function formatMs(ms: number): string {
  if (!ms || ms < 1000) return "0s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}m ${rem}s`;
}

type Tab =
  | "overview"
  | "traffic"
  | "pages"
  | "interactions"
  | "chat"
  | "questions"
  | "usage"
  | "controls";

export default function Insights() {
  const owner = useOwnerSession();
  const [range, setRange] = useState<Range>("7d");
  const [tab, setTab] = useState<Tab>("overview");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<Record<string, unknown> | null>(null);
  const [traffic, setTraffic] = useState<Record<string, unknown> | null>(null);
  const [pages, setPages] = useState<Array<Record<string, unknown>>>([]);
  const [interactions, setInteractions] = useState<Array<Record<string, unknown>>>([]);
  const [chat, setChat] = useState<Record<string, unknown> | null>(null);
  const [questions, setQuestions] = useState<Array<Record<string, unknown>>>([]);
  const [usage, setUsage] = useState<Record<string, unknown> | null>(null);
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);

  const load = useCallback(async () => {
    if (!owner.ownerMode) return;
    setLoading(true);
    setError(null);
    try {
      const q = `?range=${range}`;
      if (tab === "overview") setOverview(await ownerGet(`/api/owner/analytics/overview${q}`));
      if (tab === "traffic") setTraffic(await ownerGet(`/api/owner/analytics/traffic${q}`));
      if (tab === "pages") {
        const data = await ownerGet<{ pages: Array<Record<string, unknown>> }>(
          `/api/owner/analytics/pages${q}`,
        );
        setPages(data.pages || []);
      }
      if (tab === "interactions") {
        const data = await ownerGet<{ interactions: Array<Record<string, unknown>> }>(
          `/api/owner/analytics/interactions${q}`,
        );
        setInteractions(data.interactions || []);
      }
      if (tab === "chat") setChat(await ownerGet(`/api/owner/analytics/chat${q}`));
      if (tab === "questions") {
        const data = await ownerGet<{ messages: Array<Record<string, unknown>> }>(
          `/api/owner/analytics/chat/questions${q}`,
        );
        setQuestions(data.messages || []);
      }
      if (tab === "usage") setUsage(await ownerGet(`/api/owner/analytics/model-usage${q}`));
      if (tab === "controls") {
        const data = await ownerGet<{ settings: Record<string, unknown> }>(
          `/api/owner/analytics/settings`,
        );
        setSettings(data.settings);
      }
    } catch (e) {
      setError(e instanceof Error && e.message === "unauthorized" ? "Session expired." : "Couldn’t load insights.");
    } finally {
      setLoading(false);
    }
  }, [owner.ownerMode, range, tab]);

  useEffect(() => {
    void load();
  }, [load]);

  if (owner.loading) {
    return (
      <div className="insights">
        <p className="insights__muted">Checking owner session…</p>
      </div>
    );
  }

  if (!owner.ownerMode) {
    return <Navigate to="/ask" replace />;
  }

  const totals = (overview?.totals || {}) as Record<string, number>;
  const topPages = (overview?.topPages || []) as Array<{ page_path: string; views: number; active_ms: number }>;

  return (
    <div className="insights">
      <header className="insights__header">
        <div>
          <p className="insights__eyebrow">Owner only</p>
          <h1 className="insights__title">Site Insights</h1>
          <p className="insights__lede">
            First-party analytics — approximate location, estimated costs, redacted visitor questions.
          </p>
        </div>
        <div className="insights__header-actions">
          <Link to="/ask" className="insights__link">
            ← Ask Shirley
          </Link>
          <button
            type="button"
            className="insights__btn insights__btn--ghost"
            onClick={() => void owner.endSession()}
          >
            End session
          </button>
        </div>
      </header>

      <div className="insights__toolbar">
        <label className="insights__label">
          Range
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as Range)}
            aria-label="Date range"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="month">This month</option>
            <option value="all">All time</option>
          </select>
        </label>
        <nav className="insights__tabs" aria-label="Insights sections">
          {(
            [
              ["overview", "Overview"],
              ["traffic", "Traffic"],
              ["pages", "Pages"],
              ["interactions", "Interactions"],
              ["chat", "Chatbot"],
              ["questions", "Visitor questions"],
              ["usage", "AI usage"],
              ["controls", "Data controls"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`insights__tab${tab === id ? " is-active" : ""}`}
              aria-selected={tab === id}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {error && (
        <p className="insights__error" role="alert">
          {error}
        </p>
      )}
      {loading && <p className="insights__muted">Loading…</p>}

      {!loading && tab === "overview" && overview && (
        <section className="insights__section" aria-label="Overview">
          <div className="insights__cards">
            <div className="insights__card">
              <span>Views</span>
              <strong>{totals.views ?? 0}</strong>
            </div>
            <div className="insights__card">
              <span>Chat messages</span>
              <strong>{totals.chat_messages ?? 0}</strong>
            </div>
            <div className="insights__card">
              <span>GPT requests</span>
              <strong>{totals.model_requests ?? 0}</strong>
            </div>
            <div className="insights__card">
              <span>Est. cost</span>
              <strong>${Number(totals.cost || 0).toFixed(4)}</strong>
            </div>
            <div className="insights__card">
              <span>Active time</span>
              <strong>{formatMs(Number(totals.active_ms || 0))}</strong>
            </div>
          </div>
          {topPages[0] && (
            <p className="insights__insight">
              Most viewed: <code>{topPages[0].page_path}</code> ({topPages[0].views} views
              {topPages[0].active_ms
                ? `, ~${formatMs(Number(topPages[0].active_ms) / Math.max(1, topPages[0].views))} avg active`
                : ""}
              ).
            </p>
          )}
          <p className="insights__muted">{String(overview.note || "")}</p>
        </section>
      )}

      {!loading && tab === "traffic" && traffic && (
        <section className="insights__section">
          <h2>Sources</h2>
          <ul className="insights__list">
            {((traffic.sources as Array<{ acquisition: string; views: number }>) || []).map((s) => (
              <li key={s.acquisition}>
                <strong>{s.acquisition}</strong> — {s.views} views
              </li>
            ))}
          </ul>
          <h2>Daily</h2>
          <div className="insights__table-wrap">
            <table className="insights__table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Views</th>
                  <th>Chat</th>
                  <th>Est. $</th>
                </tr>
              </thead>
              <tbody>
                {((traffic.daily as Array<Record<string, number | string>>) || []).map((d) => (
                  <tr key={String(d.day)}>
                    <td>{String(d.day)}</td>
                    <td>{Number(d.human_views || 0)}</td>
                    <td>{Number(d.chat_messages || 0)}</td>
                    <td>${Number(d.estimated_cost_usd || 0).toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {!loading && tab === "pages" && (
        <section className="insights__section">
          <div className="insights__table-wrap">
            <table className="insights__table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Active</th>
                  <th>Exits</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={String(p.page_path)}>
                    <td>
                      <code>{String(p.page_path)}</code>
                    </td>
                    <td>{Number(p.views || 0)}</td>
                    <td>{formatMs(Number(p.active_ms_total || 0))}</td>
                    <td>{Number(p.exits || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {!loading && tab === "interactions" && (
        <section className="insights__section">
          <ul className="insights__list">
            {interactions.length === 0 && (
              <li className="insights__muted">No tracked clicks yet. Add data-analytics-id to controls.</li>
            )}
            {interactions.map((i) => (
              <li key={`${i.analytics_id}-${i.label}`}>
                <strong>{String(i.label || i.analytics_id)}</strong>{" "}
                <span className="insights__muted">({String(i.category)})</span> — {Number(i.clicks)} clicks
              </li>
            ))}
          </ul>
        </section>
      )}

      {!loading && tab === "chat" && chat && (
        <section className="insights__section">
          <ul className="insights__list">
            {((chat.usage as Array<Record<string, number | string>>) || []).map((u) => (
              <li key={String(u.mode)}>
                <strong>{String(u.mode)}</strong> — {Number(u.requests)} requests,{" "}
                {Number(u.input_tokens) + Number(u.output_tokens)} tokens, $
                {Number(u.cost || 0).toFixed(4)}, avg latency {Math.round(Number(u.avg_latency_ms || 0))}ms
              </li>
            ))}
          </ul>
        </section>
      )}

      {!loading && tab === "questions" && (
        <section className="insights__section">
          <p className="insights__muted">
            Visitor-submitted text only (redacted). Owner chats never appear here.
          </p>
          <ul className="insights__list">
            {questions.map((m) => (
              <li key={String(m.id)} className="insights__question">
                <span className="insights__pill">{String(m.role)}</span>
                <pre>{String(m.content_redacted)}</pre>
                <button
                  type="button"
                  className="insights__btn insights__btn--ghost"
                  onClick={() => {
                    if (!window.confirm("Delete this visitor conversation?")) return;
                    void ownerMutate(
                      `/api/owner/analytics/chat/conversations/${encodeURIComponent(String(m.conversation_id))}`,
                      { method: "DELETE" },
                    ).then(load);
                  }}
                >
                  Delete conversation
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!loading && tab === "usage" && usage && (
        <section className="insights__section">
          <p className="insights__muted">{String(usage.note || "")}</p>
          <ul className="insights__list">
            {((usage.byModel as Array<Record<string, number | string>>) || []).map((m) => (
              <li key={String(m.model)}>
                <strong>{String(m.model)}</strong> — {Number(m.requests)} req,{" "}
                {Number(m.input_tokens) + Number(m.output_tokens)} tokens, $
                {Number(m.cost || 0).toFixed(4)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {!loading && tab === "controls" && settings && (
        <section className="insights__section">
          <p>
            Transcript storage:{" "}
            <strong>{Number(settings.store_visitor_transcripts) === 1 ? "on" : "off"}</strong>
          </p>
          <p>
            Raw event retention: {Number(settings.raw_event_retention_days)} days · Transcripts:{" "}
            {Number(settings.transcript_retention_days)} days · Email every{" "}
            {Number(settings.email_every_n_views)} views
          </p>
          <div className="insights__actions">
            <button
              type="button"
              className="insights__btn"
              onClick={() => {
                void ownerMutate("/api/owner/analytics/settings", {
                  method: "PATCH",
                  body: JSON.stringify({
                    store_visitor_transcripts: Number(settings.store_visitor_transcripts) !== 1,
                  }),
                }).then(load);
              }}
            >
              Toggle transcript storage
            </button>
            <button
              type="button"
              className="insights__btn"
              onClick={() => {
                void ownerMutate("/api/owner/analytics/cleanup", {
                  method: "POST",
                  body: "{}",
                }).then(load);
              }}
            >
              Run retention cleanup
            </button>
            <button
              type="button"
              className="insights__btn insights__btn--danger"
              onClick={() => {
                if (!window.confirm("Clear all analytics aggregates and visitor transcripts?")) return;
                void ownerMutate("/api/owner/analytics/clear", {
                  method: "POST",
                  body: JSON.stringify({ confirm: true }),
                }).then(load);
              }}
            >
              Clear analytics
            </button>
            <button
              type="button"
              className="insights__btn insights__btn--ghost"
              onClick={async () => {
                const data = await ownerGet(`/api/owner/analytics/export?range=${range}`);
                const blob = new Blob([JSON.stringify(data, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `insights-export-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Export JSON
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
