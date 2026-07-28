import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DocRenderer } from "@/work/archive/DocRenderer";
import {
  fetchPublicWriting,
  type WritingAnnotation,
} from "@/lib/archiveApi";
import "@/work/archive/writing-archive.css";

export default function WritingArticle() {
  const { slug = "" } = useParams();
  const [data, setData] = useState<Awaited<
    ReturnType<typeof fetchPublicWriting>
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openAnn, setOpenAnn] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    void fetchPublicWriting(slug)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setError("not_found");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="writing-archive">
        <div className="writing-inner">
          <p className="writing-eyebrow">Longer thoughts</p>
          <h1 className="writing-title">Not found</h1>
          <Link to="/thoughts/longer" className="writing-btn">
            ← Longer thoughts
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="writing-archive">
        <div className="writing-inner">
          <p className="writing-subtitle">Opening the file…</p>
        </div>
      </div>
    );
  }

  const { item, origin } = data;
  const annotations: WritingAnnotation[] = item.annotations || [];

  return (
    <div className="writing-archive">
      <div className="writing-inner">
        <Link to="/thoughts/longer" className="writing-eyebrow" style={{ display: "inline-block" }}>
          ← Longer thoughts
        </Link>
        <article className="writing-article">
          <p className="writing-article__meta">
            {item.type}
            {item.published_at
              ? ` · ${new Date(item.published_at).toLocaleDateString()}`
              : ""}
          </p>
          <h1 className="writing-title">{item.title}</h1>
          {item.subtitle ? (
            <p className="writing-subtitle">{item.subtitle}</p>
          ) : null}

          <DocRenderer doc={item.structured_content} />

          {annotations.length > 0 && (
            <section aria-label="Marginalia">
              {annotations.map((a) => (
                <div key={a.id} className="writing-margin">
                  <button
                    type="button"
                    className="writing-margin__label"
                    style={{
                      background: "transparent",
                      border: 0,
                      padding: 0,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setOpenAnn((id) => (id === a.id ? null : a.id))
                    }
                  >
                    Margin note · {new Date(a.created_at).toLocaleDateString()}
                  </button>
                  {(openAnn === a.id || annotations.length <= 2) && (
                    <p>{a.body}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {item.show_origin && origin.length > 0 && (
            <section className="writing-origin" aria-label="Origin">
              <p className="writing-eyebrow">Origin</p>
              {origin.map((step, i) => (
                <div key={step.id}>
                  <p className="writing-origin__step">
                    {new Date(step.created_at).toLocaleDateString()} — “
                    {step.text}”
                  </p>
                  {i < origin.length - 1 && (
                    <p className="writing-origin__arrow">↓</p>
                  )}
                </div>
              ))}
              <p className="writing-origin__arrow">↓</p>
              <p className="writing-origin__step">{item.title}</p>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
