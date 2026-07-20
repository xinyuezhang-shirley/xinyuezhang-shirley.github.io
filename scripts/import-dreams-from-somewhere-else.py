#!/usr/bin/env python3
"""Split 'Dreams from somewhere else.md' into individual archive entries + site data."""
from __future__ import annotations

import json
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_MD = Path("/Users/shirleyzhang/Downloads/Dreams from somewhere else/Dreams from somewhere else.md")
ARCHIVE_JSON = ROOT / "content/dreams/archive/dreams-full.json"
BY_DATE = ROOT / "content/dreams/archive/by-date"
SOURCES_DIR = ROOT / "content/dreams/sources"
SOURCE_OUT = SOURCES_DIR / "dreams-from-somewhere-else.md"
DREAMS_DATA = ROOT / "src/work/dreams/dreams-data.ts"
CATALOG = ROOT / "src/content/dreams/catalog.json"
LEXICON = ROOT / "content/dreams/lexicon.json"
ATLAS = ROOT / "src/work/dreams/dreams-atlas.ts"
README = ROOT / "content/dreams/README.md"
CAPTURE = ROOT / "content/dreams/CAPTURE.md"

MONTHS = {
    "jan": 1, "january": 1,
    "feb": 2, "february": 2,
    "mar": 3, "march": 3,
    "apr": 4, "april": 4,
    "may": 5,
    "jun": 6, "june": 6,
    "jul": 7, "july": 7,
    "aug": 8, "august": 8,
    "sep": 9, "sept": 9, "september": 9,
    "oct": 10, "october": 10,
    "nov": 11, "november": 11,
    "dec": 12, "december": 12,
}

DATE_RE = re.compile(
    r"^(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
    r"Jul(?:y)?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|"
    r"Dec(?:ember)?)\s+(\d{1,2})\s+(20\d{2})\s*$",
    re.I,
)

# New-dream cues at the start of a paragraph/sentence (over-split friendly).
DREAM_START_RE = re.compile(
    r"^(?:"
    r"I had (?:a |another )?dream|"
    r"I have panicked dreams|"
    r"I dreamt|"
    r"I dreamed|"
    r"I dream\b|"
    r"Had a (?:very )?(?:practical )?dream|"
    r"Had another dream|"
    r"Dreamt\b|"
    r"Dreaming\b|"
    r"was dreaming|"
    r"There(?:'|’)s also|"
    r"There was this|"
    r"Was dreaming|"
    r"i had a dream|"
    r"我梦到|"
    r"梦见|"
    r"我是个毒贩"  # comedy bit starts as its own fragment
    r")",
    re.I,
)

# Split before a new dream cue after end punctuation OR a line break.
SECONDARY_SPLIT_RE = re.compile(
    r"(?:(?<=[.!?。])\s+|\n+)\s*(?="
    r"(?:I had (?:a |another )?dream|I also (?:had|dreamed|dreamt)|"
    r"There(?:'|’)s also|I dreamt|I dreamed|"
    r"Had (?:a |another )?dream|Then I dreamed|"
    r"Was dreaming|I believe there was also another dream|"
    r"there was also another dream|"
    r"梦见|我梦到|我是个毒贩)"
    r")",
    re.I,
)

REDACTIONS = [
    (re.compile(r"\bGoldie\b", re.I), "[friend]"),
    (re.compile(r"\bBree\b", re.I), "[friend]"),
    (re.compile(r"\bBrennan\b", re.I), "[friend]"),
    (re.compile(r"\bMaria\b", re.I), "[friend]"),
    (re.compile(r"\bUlysses\b", re.I), "[friend]"),
    (re.compile(r"\bGrace(?:'s)?\b", re.I), "[friend]"),
    (re.compile(r"\bAndrew\b", re.I), "[friend]"),
    (re.compile(r"\bKelly\b", re.I), "[friend]"),
    (re.compile(r"\bIsabella?\b", re.I), "[friend]"),
    (re.compile(r"\bJulia\b", re.I), "[roommate]"),
    (re.compile(r"朱仁俊"), "[friend]"),
    (re.compile(r"张仁宇"), "[relative]"),
    (re.compile(r"丁真"), "[idol]"),
    (re.compile(r"\blast name is Li\b", re.I), "last name is [L—]"),
    # spacing after CJK→token redaction abutting Latin letters
    (re.compile(r"(\[[^\]]+\])([A-Za-z])"), r"\1 \2"),
]


def parse_date(label: str) -> str:
    m = DATE_RE.match(label.strip())
    if not m:
        raise ValueError(f"bad date: {label!r}")
    month = MONTHS[m.group(1).lower().rstrip(".")]
    day = int(m.group(2))
    year = int(m.group(3))
    # Obvious typo in source: Sept 25 2026 amid 2025 entries
    if year == 2026 and month == 9 and day == 25:
        year = 2025
    return f"{year:04d}-{month:02d}-{day:02d}"


def redact(text: str) -> str:
    out = text
    for pat, repl in REDACTIONS:
        out = pat.sub(repl, out)
    # collapse weird markdown trailing spaces but keep paragraph breaks
    out = re.sub(r"[ \t]+\n", "\n", out)
    out = re.sub(r"\n{3,}", "\n\n", out)
    return out.strip()


def normalize_for_dup(text: str) -> str:
    t = re.sub(r"\[.*?\]", " ", text.lower())
    t = re.sub(r"[^a-z0-9\u4e00-\u9fff]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def split_day_body(body: str) -> list[str]:
    """Prefer over-splitting: blank-line blocks, then secondary dream cues."""
    body = body.strip()
    if not body:
        return []
    blocks = [b.strip() for b in re.split(r"\n\s*\n+", body) if b.strip()]
    pieces: list[str] = []
    for block in blocks:
        # If a block itself starts with a dream cue, try secondary splits.
        parts = SECONDARY_SPLIT_RE.split(block)
        if len(parts) == 1:
            pieces.append(block)
            continue
        # Keep only non-empty; if a mid fragment doesn't look like a dream start,
        # glue it back to previous (rare).
        for i, part in enumerate(parts):
            part = part.strip()
            if not part:
                continue
            if i == 0 or DREAM_START_RE.match(part) or len(part) > 40:
                pieces.append(part)
            elif pieces:
                pieces[-1] = pieces[-1] + " " + part
            else:
                pieces.append(part)
    # Further over-split "I dreamt of A. I dreamt of B." style lists when each
    # sentence is a distinct dream cue.
    refined: list[str] = []
    for piece in pieces:
        sentences = re.split(r"(?<=[.!?。])\s+", piece)
        if len(sentences) >= 2 and sum(1 for s in sentences if DREAM_START_RE.match(s.strip())) >= 2:
            buf: list[str] = []
            for s in sentences:
                s = s.strip()
                if not s:
                    continue
                if DREAM_START_RE.match(s) and buf:
                    refined.append(" ".join(buf))
                    buf = [s]
                else:
                    buf.append(s)
            if buf:
                refined.append(" ".join(buf))
        else:
            refined.append(piece)
    # Keep short CJK fragments (e.g. 「梦见我在写喜剧稿子」).
    return [p for p in refined if len(p) >= 6 or re.search(r"[\u4e00-\u9fff]", p)]


def parse_source(md: str) -> list[dict]:
    lines = md.replace("\r\n", "\n").split("\n")
    # Drop title
    i = 0
    while i < len(lines) and (not lines[i].strip() or lines[i].strip().startswith("#")):
        i += 1
    entries: list[dict] = []
    current_date_label = None
    current_iso = None
    buf: list[str] = []

    def flush_day():
        nonlocal buf
        if not current_iso or not buf:
            buf = []
            return
        body = "\n".join(buf).strip()
        buf = []
        for idx, text in enumerate(split_day_body(body), start=1):
            entries.append(
                {
                    "dateLabel": current_date_label,
                    "date": current_iso,
                    "seqInDay": idx,
                    "rawText": text,
                }
            )

    for line in lines[i:]:
        stripped = line.strip().rstrip("\\").strip()
        # markdown soft-break lines often end with two spaces
        stripped = re.sub(r"\s+$", "", line).strip()
        if DATE_RE.match(stripped):
            flush_day()
            current_date_label = stripped
            current_iso = parse_date(stripped)
            continue
        buf.append(line.rstrip())
    flush_day()
    return entries


def title_from(text: str) -> str:
    t = re.sub(r"\s+", " ", text).strip()
    # Prefer a concrete noun phrase after dream cue; keep role tokens readable.
    m = re.search(
        r"(?:dream(?:t|ed)?|梦见|我梦到)\s+(?:that\s+|of\s+|about\s+|I\s+)?(.{12,56})",
        t,
        re.I,
    )
    chunk = (m.group(1) if m else t[:56]).strip(" .,:;—-")
    chunk = re.sub(r"\[([^\]]+)\]", r"\1", chunk)  # [friend] → friend in titles
    chunk = re.sub(r"\s+", " ", chunk).strip()
    if len(chunk) < 4:
        chunk = re.sub(r"\[([^\]]+)\]", r"\1", t[:48])
    words = chunk.split()
    if words and words[0][:1].islower() and not re.search(r"[\u4e00-\u9fff]", words[0]):
        words[0] = words[0][:1].upper() + words[0][1:]
    title = " ".join(words)[:52].rstrip()
    return title or "Untitled dream"


def excerpt_from(text: str) -> str:
    t = re.sub(r"\s+", " ", text).strip()
    if len(t) <= 140:
        return t
    cut = t[:140].rsplit(" ", 1)[0]
    return cut + "…"


def atmosphere_from(text: str) -> str:
    low = text.lower()
    if any(w in low for w in ("nightmare", "kill", "died", "poison", "毒")):
        return "uneasy night"
    if any(w in low for w in ("happy", "laugh", "cute", "fun", "carefree")):
        return "light buoyancy"
    if any(w in low for w in ("proof", "bayes", "school", "homework", "exam")):
        return "academic residue"
    if any(w in low for w in ("mom", "dad", "grandma", "grandpa", "姑奶", "叔叔")):
        return "family weather"
    if any(w in low for w in ("game", "musical", "anime", "动漫", "comic", "pokémon", "pokemon")):
        return "playful staging"
    return "drifting recall"


def interpretation_from(text: str, symbols: list, places: list) -> str:
    motifs = ", ".join(x["label"] for x in (symbols + places)[:4]) or "sparse imagery"
    return f"Motifs observed: {motifs}. Night fragment from the compilation note."


def match_lexicon(body: str, entries: list) -> list[dict]:
    hay = body.lower()
    hits = []
    for entry in entries:
        for term in entry["terms"]:
            t = term.lower()
            if " " in t:
                ok = t in hay
            else:
                ok = re.search(rf"(?:^|[^a-z0-9]){re.escape(t)}(?:[^a-z0-9]|$)", hay) is not None
            if ok:
                hits.append({"id": entry["id"], "label": entry["label"]})
                break
    return hits


def jaccard(a: str, b: str) -> float:
    sa, sb = set(a.split()), set(b.split())
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def load_existing_norms(archive: dict) -> list[tuple[str, str]]:
    out = []
    for d in archive["dreams"]:
        out.append((d["id"], normalize_for_dup(d["fullText"])))
    return out


def find_duplicate(norm: str, existing: list[tuple[str, str]]) -> str | None:
    for eid, en in existing:
        if not en:
            continue
        # prefix / containment for short overlaps
        if len(norm) >= 40 and (norm[:80] in en or en[:80] in norm):
            return eid
        if jaccard(norm, en) >= 0.72:
            return eid
        # strong shared head
        if len(norm) >= 60 and jaccard(norm[:120], en[:120]) >= 0.85:
            return eid
    return None


def write_by_date(rec: dict) -> Path:
    path = BY_DATE / f"{rec['date']}_{rec['id']}.txt"
    header = "\n".join(
        [
            f"id: {rec['id']}",
            f"date: {rec['date']}",
            f"dateSource: {rec['dateSource']}",
            f"dateProvenance: {rec['dateProvenance']}",
            f"title: {rec['title']}",
            f"sourceNote: {rec['sourceNote']}",
            f"importedAt: {rec['importedAt']}",
            "---",
            "",
            rec["fullText"],
            "",
        ]
    )
    path.write_text(header, encoding="utf-8")
    return path


def rebuild_indexes(dreams: list[dict]) -> dict:
    def build(field: str):
        m: dict[str, dict] = {}
        for d in dreams:
            for item in d.get(field, []):
                row = m.setdefault(
                    item["id"],
                    {"id": item["id"], "label": item["label"], "count": 0, "dreamIds": []},
                )
                row["count"] += 1
                if d["id"] not in row["dreamIds"]:
                    row["dreamIds"].append(d["id"])
        return sorted(m.values(), key=lambda r: (-r["count"], r["label"]))

    symbol_index = build("symbols")
    people_index = build("people")
    places_index = build("places")
    emotion_index = build("emotions")

    # Simple co-occurrence graph from people/symbols/places
    node_map: dict[str, dict] = {}
    for kind, index in (
        ("symbol", symbol_index),
        ("person", people_index),
        ("place", places_index),
        ("emotion", emotion_index),
    ):
        for row in index:
            nid = f"{kind}:{row['id']}"
            node_map[nid] = {
                "id": nid,
                "kind": kind,
                "label": row["label"],
                "count": row["count"],
                "dreamIds": row["dreamIds"],
                "excerpts": [],
                "analysis": "",
            }

    # links: shared dreams between nodes
    links = []
    ids = list(node_map)
    for i, a in enumerate(ids):
        sa = set(node_map[a]["dreamIds"])
        for b in ids[i + 1 :]:
            shared = sa & set(node_map[b]["dreamIds"])
            if len(shared) >= 2:
                links.append({"source": a, "target": b, "weight": len(shared)})
    links.sort(key=lambda x: -x["weight"])

    return {
        "graph": {"nodes": list(node_map.values()), "links": links[:200]},
        "symbolIndex": symbol_index,
        "peopleIndex": people_index,
        "placesIndex": places_index,
        "emotionIndex": emotion_index,
    }


def extract_ts_data_object(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    m = re.search(r"const data = (\{.*\}) as const;", text, re.S)
    if not m:
        raise RuntimeError("could not find dreams-data const data object")
    return json.loads(m.group(1))


def write_dreams_data(data: dict) -> None:
    header = "/** Auto-generated from Notes dream exports — redacted. Do not hand-edit. */\n"
    types = DREAMS_DATA.read_text(encoding="utf-8")
    # Keep type definitions from existing file
    type_part = types.split("const data = ", 1)[0]
    body = json.dumps(data, ensure_ascii=False, indent=2)
    out = (
        type_part
        + "const data = "
        + body
        + " as const;\n\nexport const dreamsData: DreamsData = data as unknown as DreamsData;\nexport default dreamsData;\n"
    )
    # Ensure header comment present once
    if not out.startswith("/**"):
        out = header + out
    DREAMS_DATA.write_text(out, encoding="utf-8")


def update_atlas(new_ids_by_theme: dict[str, list[str]]) -> None:
    """Append new dream ids onto matching atlas node dreamIds arrays."""
    text = ATLAS.read_text(encoding="utf-8")
    for node_id, ids in new_ids_by_theme.items():
        if not ids:
            continue
        pat = re.compile(
            rf'(id:\s*"{re.escape(node_id)}",[\s\S]*?dreamIds:\s*\[)([^\]]*?)(\])',
            re.M,
        )

        def repl(m: re.Match) -> str:
            existing = m.group(2)
            have = set(re.findall(r'"([^"]+)"', existing))
            add = [i for i in ids if i not in have]
            if not add:
                return m.group(0)
            # insert before closing
            suffix = ", ".join(f'"{i}"' for i in add)
            mid = existing.rstrip()
            if mid.strip():
                if not mid.rstrip().endswith(","):
                    # last element may not have trailing comma
                    pass
                insertion = (", " if mid.strip() else "") + suffix
            else:
                insertion = suffix
            return m.group(1) + existing + insertion + m.group(3)

        new_text, n = pat.subn(repl, text, count=1)
        if n:
            text = new_text
    ATLAS.write_text(text, encoding="utf-8")


def strip_previous_dfse_batch(archive: dict) -> None:
    """Idempotent re-import: drop prior dreams-from-somewhere-else rows + by-date files."""
    keep = []
    removed_ids = []
    for d in archive["dreams"]:
        if d.get("fromBatch") == "dreams-from-somewhere-else" or str(d.get("id", "")).startswith("dfse"):
            removed_ids.append(d["id"])
        else:
            keep.append(d)
    archive["dreams"] = keep
    for path in BY_DATE.glob("*_dfse*.txt"):
        path.unlink(missing_ok=True)
    for path in BY_DATE.glob("dfse*.txt"):
        path.unlink(missing_ok=True)
    # also remove by id match
    for rid in removed_ids:
        for path in BY_DATE.glob(f"*_{rid}.txt"):
            path.unlink(missing_ok=True)


def main() -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    md = SRC_MD.read_text(encoding="utf-8")
    redacted_source = redact(md)
    # Keep source date typo note? Keep corrected in archive; source copy redacted as-is dates.
    SOURCES_DIR.mkdir(parents=True, exist_ok=True)
    SOURCE_OUT.write_text(redacted_source, encoding="utf-8")

    parsed = parse_source(md)
    lexicon = json.loads(LEXICON.read_text(encoding="utf-8"))
    archive = json.loads(ARCHIVE_JSON.read_text(encoding="utf-8"))
    strip_previous_dfse_batch(archive)
    existing_norms = load_existing_norms(archive)

    separated = 0
    duplicates = 0
    new_records = []
    dup_map = []

    for i, item in enumerate(parsed, start=1):
        separated += 1
        full = redact(item["rawText"])
        norm = normalize_for_dup(full)
        dup_of = find_duplicate(norm, existing_norms)
        if dup_of:
            duplicates += 1
            dup_map.append({"seq": i, "date": item["date"], "duplicateOf": dup_of, "preview": full[:80]})
            continue

        archive_id = f"dfse{i:02d}"
        symbols = match_lexicon(full, lexicon["symbols"])
        places = match_lexicon(full, lexicon["places"])
        people = match_lexicon(full, lexicon["people"])
        emotions = match_lexicon(full, lexicon["emotions"])
        title = title_from(full)
        rec = {
            "id": archive_id,
            "date": item["date"],
            "dateSource": "source.in_text_date",
            "dateProvenance": "in_text_dated_compilation",
            "notesCreated": None,
            "notesModified": None,
            "title": title,
            "fullText": full,
            "sourceNote": "Dreams from somewhere else",
            "notesId": archive_id,
            "importedAt": now,
            "fromBatch": "dreams-from-somewhere-else",
            "sourcePath": "content/dreams/sources/dreams-from-somewhere-else.md",
            "seqInSource": i,
            "seqInDay": item["seqInDay"],
        }
        new_records.append(
            {
                **rec,
                "symbols": symbols,
                "places": places,
                "people": people,
                "emotions": emotions,
            }
        )
        existing_norms.append((archive_id, norm))

    # Write archive entries + by-date
    for rec in new_records:
        archive_rec = {k: rec[k] for k in (
            "id", "date", "dateSource", "dateProvenance", "notesCreated", "notesModified",
            "title", "fullText", "sourceNote", "notesId", "importedAt", "fromBatch",
            "sourcePath", "seqInSource", "seqInDay",
        )}
        archive["dreams"].append(archive_rec)
        write_by_date(archive_rec)

    archive["dreams"].sort(key=lambda d: (d["date"] or "", d["id"]))
    archive["count"] = len(archive["dreams"])
    archive["generatedAt"] = now
    archive["namedNoteSearch"] = {
        "query": "dreams from somewhere else",
        "found": True,
        "note": "Imported from Downloads markdown compilation; split into individual dated dreams. In-text dates used (not Notes ZCREATIONDATE).",
        "sourcePath": "content/dreams/sources/dreams-from-somewhere-else.md",
        "separatedCount": separated,
        "newCount": len(new_records),
        "duplicateCount": duplicates,
        "duplicates": dup_map,
        "boundaryMethod": (
            "1) Date headers (Month D YYYY). 2) Blank-line paragraph blocks within a day. "
            "3) Secondary splits on cues (I had another dream / I also dreamed / There's also / "
            "I dreamt of / 梦见…). 4) Sentence-level over-split when multiple dream-start sentences "
            "appear in one block. Prefer over-splitting. Sept 25 2026 treated as 2025 typo."
        ),
    }
    ARCHIVE_JSON.write_text(json.dumps(archive, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # Update dreams-data.ts
    data = extract_ts_data_object(DREAMS_DATA)
    # Drop prior dfse rows for idempotent re-run, then append fresh UI records
    data["dreams"] = [d for d in data["dreams"] if not str(d.get("id", "")).startswith("dfse")]
    existing_ids = {d["id"] for d in data["dreams"]}
    next_ordinal = (max((d["ordinal"] for d in data["dreams"]), default=0) + 1)
    for rec in new_records:
        if rec["id"] in existing_ids:
            continue
        ui = {
            "id": rec["id"],
            "ordinal": next_ordinal,
            "dateLabel": rec["date"],
            "date": rec["date"],
            "title": rec["title"],
            "atmosphere": atmosphere_from(rec["fullText"]),
            "text": rec["fullText"],
            "excerpt": excerpt_from(rec["fullText"]),
            "interpretation": interpretation_from(rec["fullText"], rec["symbols"], rec["places"]),
            "symbols": rec["symbols"],
            "places": rec["places"],
            "people": rec["people"],
            "emotions": rec["emotions"],
            "source": "dreams-from-somewhere-else",
            "notesId": rec["id"],
            "dateSource": rec["dateSource"],
            "dateProvenance": rec["dateProvenance"],
            "archiveId": rec["id"],
        }
        data["dreams"].append(ui)
        next_ordinal += 1

    data["dreams"].sort(key=lambda d: (d["date"] or "9999", d["ordinal"]))
    for i, d in enumerate(data["dreams"], start=1):
        d["ordinal"] = i
    data["dreamCount"] = len(data["dreams"])
    data["generatedAt"] = now
    capture = data.get("captureNotes") or {}
    capture.update(
        {
            "namedNoteSearch": "dreams from somewhere else",
            "namedNoteFound": True,
            "namedNoteNote": (
                f"Split compilation into {separated} dreams; {len(new_records)} new, "
                f"{duplicates} duplicate(s) of existing archive. "
                "Dates from in-text headers."
            ),
            "dfseSeparated": separated,
            "dfseNew": len(new_records),
            "dfseDuplicates": duplicates,
            "dfseSource": "content/dreams/sources/dreams-from-somewhere-else.md",
            "archivePath": "content/dreams/archive/dreams-full.json",
        }
    )
    data["captureNotes"] = capture
    indexes = rebuild_indexes(data["dreams"])
    data.update(indexes)
    # Keep prior patterns/trajectories that still resolve
    ids = {d["id"] for d in data["dreams"]}
    data["patterns"] = [p for p in data.get("patterns", []) if all(e in ids for e in p.get("evidence", []))]
    data["trajectories"] = [t for t in data.get("trajectories", []) if all(e in ids for e in t.get("dreamIds", []))]
    write_dreams_data(data)

    # Update catalog.json (lightweight public catalog)
    if CATALOG.exists():
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    else:
        catalog = {"dreams": [], "opening": data.get("opening")}
    cat_by_id = {d["id"]: d for d in catalog.get("dreams", [])}
    for d in data["dreams"]:
        if d["id"] in cat_by_id:
            # refresh count-facing fields
            cat_by_id[d["id"]].update(
                {
                    "ordinal": d["ordinal"],
                    "dateLabel": d["dateLabel"],
                    "title": d["title"],
                    "atmosphere": d["atmosphere"],
                    "excerpt": d["excerpt"],
                    "interpretation": d["interpretation"],
                    "symbols": d["symbols"],
                    "places": d["places"],
                    "people": d["people"],
                    "emotions": d["emotions"],
                    "archiveId": d.get("archiveId", d["id"]),
                }
            )
        else:
            cat_by_id[d["id"]] = {
                "id": d["id"],
                "ordinal": d["ordinal"],
                "dateLabel": d["dateLabel"],
                "title": d["title"],
                "atmosphere": d["atmosphere"],
                "symbols": d["symbols"],
                "places": d["places"],
                "people": d["people"],
                "emotions": d["emotions"],
                "excerpt": d["excerpt"],
                "interpretation": d["interpretation"],
                "previewSymbols": [s["label"] for s in d["symbols"][:2]],
                "related": [],
                "archiveId": d.get("archiveId", d["id"]),
            }
    catalog["dreams"] = sorted(cat_by_id.values(), key=lambda d: d["ordinal"])
    catalog["dreamCount"] = len(catalog["dreams"])
    catalog["generatedAt"] = now
    catalog["symbolIndex"] = indexes["symbolIndex"]
    catalog["peopleIndex"] = indexes["peopleIndex"]
    catalog["placesIndex"] = indexes["placesIndex"]
    catalog["emotionIndex"] = indexes["emotionIndex"]
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # Atlas enrichment: attach new ids to recurring ontology nodes when lexicon hits
    theme_map = {
        "person-parent": "parent",
        "person-grandparent": "grandparent",
        "person-friend": "friend",  # may not match lexicon id
        "person-roommate": "roommate",
        "person-idol": "idol",
        "person-teacher": "teacher",
        "person-children": "children",
        "obj-photographs": "photographs",
        "obj-music": "music",
        "obj-bus": "bus",
        "animal-companions": "animals",
        "animal-dogs": "animals",
        "place-parallel-school": "parallel-school",
        "place-tourist-bus": "tourist-bus",
    }
    # Build reverse: lexicon people/symbol id -> new dream ids
    by_lex: dict[str, list[str]] = {}
    for rec in new_records:
        for field in ("symbols", "places", "people", "emotions"):
            for item in rec[field]:
                by_lex.setdefault(item["id"], []).append(rec["id"])
    # Also keyword attach for friend-heavy nights even if lexicon missed
    for rec in new_records:
        if "[friend]" in rec["fullText"]:
            by_lex.setdefault("_friend_text", []).append(rec["id"])
        if re.search(r"\b(mom|dad|mother|father|parents)\b", rec["fullText"], re.I):
            by_lex.setdefault("parent", []).append(rec["id"])
        if re.search(r"\b(grandma|grandpa|grandmother|grandfather|姑奶|姑爷)\b", rec["fullText"], re.I):
            by_lex.setdefault("grandparent", []).append(rec["id"])
        if re.search(r"\b(school|class|homework|proof|bayes)\b", rec["fullText"], re.I):
            by_lex.setdefault("parallel-school", []).append(rec["id"])
        if re.search(r"\b(song|music|musical|seventeen|rap)\b", rec["fullText"], re.I):
            by_lex.setdefault("music", []).append(rec["id"])
        if re.search(r"\b(picture|photo|camera|集邮)\b", rec["fullText"], re.I):
            by_lex.setdefault("photographs", []).append(rec["id"])

    atlas_updates = {}
    for node_id, lex_id in theme_map.items():
        ids = list(dict.fromkeys(by_lex.get(lex_id, [])))
        if node_id == "person-friend":
            ids = list(dict.fromkeys(by_lex.get("_friend_text", []) + by_lex.get("childhood-friend", []) + by_lex.get("companion", [])))
        if ids:
            atlas_updates[node_id] = ids
    update_atlas(atlas_updates)

    # README / CAPTURE notes
    readme = README.read_text(encoding="utf-8")
    note = (
        "\n## Dreams from somewhere else (2026-07-20 import)\n\n"
        f"- Source copy (redacted): `sources/dreams-from-somewhere-else.md`\n"
        f"- Separated **{separated}** individual dreams from the compilation markdown "
        f"({len(new_records)} new, {duplicates} duplicate of existing archive).\n"
        "- Boundary method: in-text date headers → blank-line blocks → secondary dream-cue splits "
        "(prefer over-splitting).\n"
        "- Dates are **in-text** (`dateProvenance: in_text_dated_compilation`), not Notes metadata.\n"
        f"- New archive ids: `dfse01`… (see `fromBatch: dreams-from-somewhere-else`).\n"
    )
    if "## Dreams from somewhere else" not in readme:
        README.write_text(readme.rstrip() + "\n" + note, encoding="utf-8")

    if CAPTURE.exists():
        cap = CAPTURE.read_text(encoding="utf-8")
        line = (
            f"\n- **Dreams from somewhere else** (Downloads md): found; split into {separated} "
            f"({len(new_records)} new / {duplicates} dup). Archive ids `dfse*`. "
            f"Source: `sources/dreams-from-somewhere-else.md`.\n"
        )
        if "split into" not in cap:
            CAPTURE.write_text(cap.rstrip() + line, encoding="utf-8")

    report = {
        "separated": separated,
        "new": len(new_records),
        "duplicates": duplicates,
        "duplicateDetails": dup_map,
        "newTotalArchive": archive["count"],
        "newIds": [r["id"] for r in new_records],
        "boundaryMethod": archive["namedNoteSearch"]["boundaryMethod"],
        "sourceOut": str(SOURCE_OUT.relative_to(ROOT)),
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
