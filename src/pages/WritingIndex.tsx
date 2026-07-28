import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useOwnerSession } from "@/hooks/useOwnerSession";
import {
  createOwnerWriting,
  fetchPublicWritingIndex,
  listOwnerWriting,
  type WritingIndexItem,
} from "@/lib/archiveApi";
import "@/work/archive/writing-archive.css";

function formatDate(ms: number | null | undefined) {
  if (!ms) return "—";
  const d = new Date(ms);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}.${dd}`;
}

function yearOf(ms: number | null | undefined) {
  if (!ms) return "Drafts";
  return String(new Date(ms).getFullYear());
}

export default function WritingIndex() {
  const { ownerMode } = useOwnerSession();
  const [items, setItems] = useState<WritingIndexItem[]>([]);
  const [ownerItems, setOwnerItems] = useState<
    Array<WritingIndexItem & { status: string }>
  >([]);
  const [tab, setTab] = useState<"published" | "draft" | "private" | "archived">(
    "published",
  );

  useEffect(() => {
    void fetchPublicWritingIndex().then((r) => setItems(r.items || []));
  }, []);

  useEffect(() => {
    if (!ownerMode) return;
    void listOwnerWriting(tab === "published" ? "public" : tab).then((r) =>
      setOwnerItems(r.items || []),
    );
  }, [ownerMode, tab]);

  const byYear = useMemo(() => {
    const map = new Map<string, WritingIndexItem[]>();
    for (const item of items) {
      const y = yearOf(item.published_at || item.updated_at);
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(item);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [items]);

  return (
    <div className="writing-archive">
      <div className="writing-inner">
        <p className="writing-eyebrow">Writing</p>
        <h1 className="writing-title">Filed archive</h1>
        <p className="writing-subtitle">
          Longer pieces, deliberately kept — not a blog feed.
        </p>

        {ownerMode && (
          <div className="writing-owner-bar">
            <button
              type="button"
              className="writing-btn"
              onClick={() => {
                void createOwnerWriting({ title: "Untitled" }).then((r) => {
                  window.location.href = `/writing/edit/${r.writing.id}`;
                });
              }}
            >
              New writing
            </button>
            {(["published", "draft", "private", "archived"] as const).map((t) => (
              <button
                key={t}
                type="button"
                className="writing-btn"
                onClick={() => setTab(t)}
                style={
                  tab === t
                    ? { borderColor: "var(--wr-accent)", color: "var(--wr-ink)" }
                    : undefined
                }
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {ownerMode && tab !== "published" ? (
          <ul className="writing-index">
            {ownerItems.map((item) => (
              <li key={item.id}>
                <Link
                  className="writing-index__item"
                  to={`/writing/edit/${item.id}`}
                >
                  <span className="writing-index__date">
                    {formatDate(item.updated_at)}
                  </span>
                  <span className="writing-index__name">{item.title}</span>
                  <span className="writing-index__type">{item.status}</span>
                </Link>
              </li>
            ))}
            {ownerItems.length === 0 && (
              <li className="writing-index__type">No pieces in this drawer.</li>
            )}
          </ul>
        ) : (
          byYear.map(([year, list]) => (
            <div key={year}>
              <p className="writing-year">Writing / {year}</p>
              <ul className="writing-index">
                {list.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="writing-index__item"
                      to={`/writing/${item.slug}`}
                    >
                      <span className="writing-index__date">
                        {formatDate(item.published_at)}
                      </span>
                      <span className="writing-index__name">{item.title}</span>
                      <span className="writing-index__type">{item.type}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        {!ownerMode && items.length === 0 && (
          <p className="writing-subtitle">The archive is quiet for now.</p>
        )}
      </div>
    </div>
  );
}
