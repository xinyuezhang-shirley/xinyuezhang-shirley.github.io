#!/usr/bin/env bash
# Build and copy dist/ into the repo root for branch-based GitHub Pages.
# Keeps a Vite-capable entry at index.vite.html for local `npm run dev`.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ "${1:-}" != "--force-root" ]]; then
  echo "Refusing to overwrite repo-root index.html."
  echo "Manual root publish: bash scripts/publish-pages.sh --force-root"
  exit 1
fi

# Ensure build entry is the Vite app (not a previous SPA shell).
if [[ -f index.vite.html ]]; then
  cp index.vite.html index.html
elif ! grep -q '/src/main.tsx' index.html; then
  echo "error: index.html is not a Vite entry and index.vite.html is missing." >&2
  exit 1
fi
cp index.html index.vite.html

npm run build
cp dist/index.html dist/404.html

PUBLISH_DIRS=(assets art photography poetry media)
PUBLISH_FILES=(
  index.html
  404.html
  robots.txt
  favicon.ico
  favicon.png
  favicon-32x32.png
  apple-touch-icon.png
  Xinyue_Zhang_Resume.pdf
)

rm -rf assets
mkdir -p assets

for dir in "${PUBLISH_DIRS[@]}"; do
  rm -rf "$dir"
  if [[ -d "dist/$dir" ]]; then
    cp -R "dist/$dir" "$dir"
  fi
done

for file in "${PUBLISH_FILES[@]}"; do
  if [[ -f "dist/$file" ]]; then
    cp "dist/$file" "$file"
  fi
done

rm -rf work research

# Leave Pages SPA at index.html/404.html. Keep Vite entry copy for next build.
cp index.vite.html index.dev-entry.html 2>/dev/null || true

echo "Published dist → repo root (index.html + 404.html for Pages)."
echo "For local dev: cp index.vite.html index.html && npm run dev"
test -f 404.html
test -f index.html
grep -q '/assets/index-' index.html
# Sanity: new bundle must include Insights route
JS="$(ls assets/index-*.js | head -1)"
if ! grep -q '/insights' "$JS"; then
  echo "error: built bundle $JS missing /insights — aborting publish." >&2
  exit 1
fi
echo "OK: $JS includes /insights"
