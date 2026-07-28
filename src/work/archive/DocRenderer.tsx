/**
 * Render Tiptap JSON for public/preview reading — no raw HTML injection of editor output.
 */

import type { ReactNode } from "react";

type Mark = { type: string; attrs?: Record<string, unknown> };
type Node = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: Node[];
  marks?: Mark[];
  text?: string;
};

function renderText(node: Node, key: string | number): ReactNode {
  if (node.type !== "text" || node.text == null) return null;
  let el: ReactNode = node.text;
  for (const mark of node.marks || []) {
    if (mark.type === "bold") el = <strong key={`${key}-b`}>{el}</strong>;
    if (mark.type === "italic") el = <em key={`${key}-i`}>{el}</em>;
    if (mark.type === "link" && typeof mark.attrs?.href === "string") {
      const href = mark.attrs.href;
      if (/^https?:\/\//i.test(href) || href.startsWith("/")) {
        el = (
          <a key={`${key}-a`} href={href} rel="noopener noreferrer">
            {el}
          </a>
        );
      }
    }
  }
  return <span key={key}>{el}</span>;
}

function renderInline(nodes: Node[] | undefined): ReactNode[] {
  return (nodes || []).map((n, i) =>
    n.type === "text" ? renderText(n, i) : renderBlock(n, i),
  );
}

function renderBlock(node: Node, key: string | number): ReactNode {
  switch (node.type) {
    case "doc":
      return (
        <div key={key} className="writing-prose">
          {(node.content || []).map((c, i) => renderBlock(c, i))}
        </div>
      );
    case "paragraph":
      return <p key={key}>{renderInline(node.content)}</p>;
    case "heading": {
      const level = Number(node.attrs?.level) === 3 ? 3 : 2;
      if (level === 3) return <h3 key={key}>{renderInline(node.content)}</h3>;
      return <h2 key={key}>{renderInline(node.content)}</h2>;
    }
    case "blockquote":
      return <blockquote key={key}>{renderInline(node.content)}</blockquote>;
    case "horizontalRule":
      return <hr key={key} />;
    case "image": {
      const src = String(node.attrs?.src || "");
      const alt = String(node.attrs?.alt || "");
      const caption = node.attrs?.caption ? String(node.attrs.caption) : "";
      if (!src || !/^https?:\/\//i.test(src) && !src.startsWith("/")) return null;
      return (
        <figure key={key}>
          <img src={src} alt={alt} loading="lazy" />
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      );
    }
    case "text":
      return renderText(node, key);
    default:
      if (node.content) {
        return <div key={key}>{node.content.map((c, i) => renderBlock(c, i))}</div>;
      }
      return null;
  }
}

export function DocRenderer({
  doc,
}: {
  doc: unknown;
}) {
  if (!doc || typeof doc !== "object") {
    return <div className="writing-prose"><p>—</p></div>;
  }
  return <>{renderBlock(doc as Node, "root")}</>;
}
