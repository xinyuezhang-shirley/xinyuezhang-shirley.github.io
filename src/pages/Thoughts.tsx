import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useOwnerSession } from "@/hooks/useOwnerSession";
import {
  createOwnerThought,
  fetchPublicThoughts,
  listOwnerThoughts,
  markThoughtEncountered,
  patchOwnerThought,
  reportThoughtEncounter,
  thoughtVisibilityAction,
  type OwnerThought,
  type PublicThought,
} from "@/lib/archiveApi";
import "@/work/archive/thoughts-archive.css";

const DESK_SLOTS = [
  { left: "6%", top: "12%", rotate: -3.5, variant: "plain" },
  { left: "38%", top: "8%", rotate: 2.2, variant: "typed" },
  { left: "68%", top: "18%", rotate: -1.5, variant: "plain" },
  { left: "18%", top: "48%", rotate: 4, variant: "plain" },
  { left: "52%", top: "42%", rotate: -2.8, variant: "typed" },
  { left: "74%", top: "55%", rotate: 1.8, variant: "plain" },
  { left: "8%", top: "72%", rotate: -4, variant: "typed" },
] as const;

const FILTERS = [
  "all",
  "private",
  "passing",
  "public",
  "permanent",
  "dormant",
  "archived",
] as const;

function previewText(text: string, max = 140) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

export default function Thoughts() {
  const { ownerMode } = useOwnerSession();
  const reduceMotion = useReducedMotion();
  const [scraps, setScraps] = useState<PublicThought[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<PublicThought | null>(null);
  const [exiting, setExiting] = useState(false);

  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [ownerItems, setOwnerItems] = useState<OwnerThought[]>([]);
  const [compose, setCompose] = useState("");
  const [composeVis, setComposeVis] = useState("private");
  const [search, setSearch] = useState("");
  const [advancedId, setAdvancedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadPublic = useCallback(async () => {
    setLoading(true);
    const limit = window.matchMedia("(max-width: 720px)").matches ? 3 : 6;
    const items = await fetchPublicThoughts({ limit });
    setScraps(items);
    setLoading(false);
  }, []);

  const loadOwner = useCallback(async () => {
    if (!ownerMode) return;
    try {
      const { items } = await listOwnerThoughts({
        visibility: filter,
        q: search || undefined,
      });
      setOwnerItems(items);
    } catch {
      setOwnerItems([]);
    }
  }, [ownerMode, filter, search]);

  useEffect(() => {
    void loadPublic();
  }, [loadPublic]);

  useEffect(() => {
    void loadOwner();
  }, [loadOwner]);

  const closeAndEncounter = useCallback(async () => {
    if (!open || exiting) return;
    setExiting(true);
    const id = open.id;
    markThoughtEncountered(id);
    void reportThoughtEncounter(id);
    const delay = reduceMotion ? 180 : 520;
    window.setTimeout(() => {
      setScraps((prev) => prev.filter((s) => s.id !== id));
      setOpen(null);
      setExiting(false);
      // Soft refill if desk empties
      void fetchPublicThoughts({ limit: 2 }).then((more) => {
        setScraps((prev) => {
          const ids = new Set(prev.map((p) => p.id));
          const add = more.filter((m) => !ids.has(m.id));
          return [...prev, ...add].slice(0, 6);
        });
      });
    }, delay);
  }, [open, exiting, reduceMotion]);

  const placed = useMemo(
    () =>
      scraps.map((scrap, i) => ({
        scrap,
        slot: DESK_SLOTS[i % DESK_SLOTS.length]!,
      })),
    [scraps],
  );

  return (
    <div className="thoughts-archive">
      <div className="thoughts-inner">
        <p className="thoughts-eyebrow">
          <Link to="/thoughts" className="thoughts-crumb">
            Thoughts
          </Link>
          <span aria-hidden="true"> · </span>
          Temporary
        </p>
        <h1 className="thoughts-title">A few scraps on the desk</h1>
        <p className="thoughts-lede">
          Not a feed. Encounter what surfaces — opening a note takes it from this
          visit&apos;s table.
        </p>

        <div
          className={`thoughts-desk${
            !loading && scraps.length === 0 ? " thoughts-desk--empty" : ""
          }`}
          aria-label="Thought desk"
        >
          {loading && (
            <p className="thoughts-desk--empty" style={{ position: "static" }}>
              Settling…
            </p>
          )}
          {!loading && scraps.length === 0 && (
            <p>Nothing on the desk right now. Return later.</p>
          )}
          {placed.map(({ scrap, slot }, i) => (
            <motion.button
              key={scrap.id}
              type="button"
              className={`thought-scrap${
                scrap.type === "question" ? " thought-scrap--question" : ""
              }${slot.variant === "typed" ? " thought-scrap--typed" : ""}`}
              style={{
                left: slot.left,
                top: slot.top,
                transform: `rotate(${slot.rotate}deg)`,
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              onClick={() => setOpen(scrap)}
              aria-label={`Open thought: ${previewText(scrap.text, 60)}`}
            >
              <p className="thought-scrap__meta">
                {scrap.type} · {scrap.visibility}
              </p>
              <p className="thought-scrap__text">{previewText(scrap.text)}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {open && (
            <div className="thought-reader" role="dialog" aria-modal="true">
              <button
                type="button"
                className="thought-reader__backdrop"
                aria-label="Close thought"
                onClick={() => void closeAndEncounter()}
              />
              <motion.div
                className="thought-reader__sheet"
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 40, scale: 0.96, rotate: -1 }
                }
                animate={
                  exiting
                    ? reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 80, x: 40, rotate: 6, scale: 0.92 }
                    : { opacity: 1, y: 0, scale: 1, rotate: 0 }
                }
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.45 }}
              >
                <p className="thought-scrap__meta">
                  {open.type} · {open.visibility}
                </p>
                {open.title ? <h2>{open.title}</h2> : null}
                <p>{open.text}</p>
                <button
                  type="button"
                  className="thought-reader__close"
                  onClick={() => void closeAndEncounter()}
                >
                  Set aside
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {ownerMode && (
          <section className="thoughts-owner" aria-label="Owner thought archive">
            <p className="thoughts-eyebrow">Owner archive</p>
            <h2 className="thoughts-title" style={{ fontSize: "1.75rem" }}>
              All thoughts
            </h2>

            <form
              className="thoughts-owner__compose"
              onSubmit={(e) => {
                e.preventDefault();
                if (!compose.trim() || busy) return;
                setBusy(true);
                void createOwnerThought({
                  text: compose.trim(),
                  visibility: composeVis,
                })
                  .then(() => {
                    setCompose("");
                    return loadOwner();
                  })
                  .finally(() => setBusy(false));
              }}
            >
              <textarea
                value={compose}
                onChange={(e) => setCompose(e.target.value)}
                placeholder="Capture a thought…"
                aria-label="New thought"
              />
              <div className="thoughts-owner__compose-row">
                <select
                  value={composeVis}
                  onChange={(e) => setComposeVis(e.target.value)}
                  aria-label="Visibility"
                >
                  {FILTERS.filter((f) => f !== "all").map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <button type="submit" disabled={busy || !compose.trim()}>
                  Add thought
                </button>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search…"
                  aria-label="Search thoughts"
                  style={{
                    flex: 1,
                    minWidth: "8rem",
                    border: "1px solid var(--th-line)",
                    padding: "0.4rem 0.6rem",
                    fontFamily: "var(--font-th-mono)",
                    fontSize: "0.75rem",
                    background: "var(--th-paper)",
                  }}
                />
              </div>
            </form>

            <div className="thoughts-owner__filters" role="tablist">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  className={`thoughts-owner__filter${filter === f ? " is-active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {ownerItems.map((t) => (
                <li key={t.id} className="thought-row">
                  <p className="thought-row__meta">
                    {t.visibility} · {t.type} ·{" "}
                    {new Date(t.created_at).toLocaleDateString()} · encounters{" "}
                    {t.public_encounter_count ?? 0}
                    {t.tags?.length ? ` · ${t.tags.join(", ")}` : ""}
                  </p>
                  <p className="thought-row__text">
                    {t.display_text || t.text}
                  </p>
                  <div className="thought-row__actions">
                    {(
                      [
                        "private",
                        "passing",
                        "publish",
                        "permanent",
                        "dormant",
                        "archive",
                        "resurface",
                      ] as const
                    ).map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => {
                          void thoughtVisibilityAction(t.id, action).then(loadOwner);
                        }}
                      >
                        {action === "publish" ? "public" : action}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setAdvancedId((id) => (id === t.id ? null : t.id))
                      }
                    >
                      Behavior
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Delete this thought permanently?")) {
                          void thoughtVisibilityAction(t.id, "delete", {
                            confirm: true,
                          }).then(loadOwner);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  {advancedId === t.id && (
                    <div className="thought-row__advanced">
                      <label>
                        Per-visitor once
                        <input
                          type="checkbox"
                          defaultChecked={t.per_visitor_once === 1}
                          onChange={(e) => {
                            void patchOwnerThought(t.id, {
                              perVisitorOnce: e.target.checked,
                            }).then(loadOwner);
                          }}
                        />
                      </label>
                      <label>
                        Max encounters
                        <input
                          type="number"
                          defaultValue={t.max_public_encounters ?? ""}
                          onBlur={(e) => {
                            const v = e.target.value;
                            void patchOwnerThought(t.id, {
                              maxPublicEncounters: v === "" ? null : Number(v),
                            }).then(loadOwner);
                          }}
                        />
                      </label>
                      <label>
                        Resurface after days
                        <input
                          type="number"
                          defaultValue={t.resurface_after_days ?? ""}
                          onBlur={(e) => {
                            const v = e.target.value;
                            void patchOwnerThought(t.id, {
                              resurfaceAfterDays: v === "" ? null : Number(v),
                            }).then(loadOwner);
                          }}
                        />
                      </label>
                      <label>
                        Weight
                        <input
                          type="number"
                          step="0.1"
                          defaultValue={t.manual_weight ?? 0}
                          onBlur={(e) => {
                            void patchOwnerThought(t.id, {
                              manualWeight: Number(e.target.value),
                            }).then(loadOwner);
                          }}
                        />
                      </label>
                      <label>
                        Tags (comma)
                        <input
                          type="text"
                          style={{ width: "12rem" }}
                          defaultValue={(t.tags || []).join(", ")}
                          onBlur={(e) => {
                            const tags = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            void patchOwnerThought(t.id, { tags }).then(loadOwner);
                          }}
                        />
                      </label>
                    </div>
                  )}
                </li>
              ))}
              {ownerItems.length === 0 && (
                <li className="thought-row__meta">No thoughts in this filter.</li>
              )}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
