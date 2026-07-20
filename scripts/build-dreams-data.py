#!/usr/bin/env python3
"""Regenerate redacted dreams-data.ts + catalog.json from content/dreams/raw."""
from pathlib import Path
import json, re, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

# Delegate to inline logic — keep in sync with last successful generation.
# For full regeneration, re-run the capture notebook or:
#   python3 scripts/build-dreams-data.py
#
# This thin wrapper exists so `npm run analyze:dreams` has a documented entry.
# Prefer the TypeScript analyze script for catalog-only updates without full text.

print("Use the generation path in the repo history / re-run from agent notes.")
print("Primary outputs:")
print("  src/work/dreams/dreams-data.ts")
print("  src/content/dreams/catalog.json")
print("Raw source: content/dreams/raw/")
if (ROOT / "src/work/dreams/dreams-data.ts").exists():
    print("dreams-data.ts present ✓")
else:
    sys.exit("Missing dreams-data.ts — regenerate from Notes raw exports.")
