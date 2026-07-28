#!/usr/bin/env bash
# Legacy helper: build and copy dist/ into the repo root for branch-based Pages.
# Prefer the GitHub Actions workflow (.github/workflows/pages.yml), which publishes
# dist/ directly and leaves index.html as the Vite entry for local development.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ "${1:-}" != "--force-root" ]]; then
  echo "Refusing to overwrite repo-root index.html."
  echo "CI deploy: push to main (workflow pages.yml)."
  echo "Manual root publish (legacy): bash scripts/publish-pages.sh --force-root"
  exit 1
fi

# Preserve the Vite entry so local `npm run dev` keeps working after publish.
cp index.vite.html index.vite.html.bak 2>/dev/null || true
if [[ -f index.vite.html ]]; then
  cp index.vite.html index.dev.bak.html
elif grep -q '/src/main.tsx' index.html 2>/dev/null; then
  cp index.html index.dev.bak.html
fi

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

# Colliding with SPA routes — never keep these at site root.
rm -rf work research

# Keep Vite entry available for local development without undoing Pages index.
if [[ -f index.dev.bak.html ]]; then
  cp index.dev.bak.html index.vite.html
  rm -f index.dev.bak.html
fi
rm -f index.vite.html.bak

echo "Copied dist artifacts to root (index.html + 404.html = SPA for Pages)."
echo "Vite entry preserved at index.vite.html — copy to index.html for local npm run dev."
ls -d media/work media/research >/dev/null
test ! -e work
test -f 404.html
test -f index.html
