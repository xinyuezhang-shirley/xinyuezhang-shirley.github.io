#!/usr/bin/env python3
"""Sync src/ask-shirley/knowledge/*.md into embedded.ts for bundlers."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KD = ROOT / "src" / "ask-shirley" / "knowledge"
FILES = [
    "echo",
    "nommi",
    "muselab",
    "differ",
    "ironclad",
    "tesla",
    "research",
    "portfolio",
    "about",
]

out = [
    "/** Auto-synced string embeds of knowledge/*.md for Vite + Worker bundling. */",
    "/** Regenerate: python3 scripts/sync-ask-shirley-knowledge.py */",
    "",
]
for name in FILES:
    text = (KD / f"{name}.md").read_text()
    out.append(f"export const {name}Markdown = {repr(text)};")
    out.append("")

(KD / "embedded.ts").write_text("\n".join(out))
print(f"Synced {len(FILES)} knowledge files → {KD / 'embedded.ts'}")
