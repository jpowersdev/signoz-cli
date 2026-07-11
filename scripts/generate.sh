#!/usr/bin/env bash
set -euo pipefail

SPEC_URL="${SIGNOZ_OPENAPI_SPEC_URL:-https://signoz.io/api/api-reference-openapi/latest}"
CLIENT_NAME="${SIGNOZ_CLIENT_NAME:-SigNoz}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_FILE="$ROOT_DIR/src/Generated.ts"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

curl -fsSL "$SPEC_URL" -o "$TMP_DIR/openapi.yaml"
npx openapigen \
  --spec "$TMP_DIR/openapi.yaml" \
  --name "$CLIENT_NAME" \
  --format httpclient \
  --patch "$ROOT_DIR/patches/signoz-openapi-generator.patch.json" \
  > "$TMP_DIR/Generated.ts"
(
  cd "$TMP_DIR"
  # -F3: tolerate line shifts. The query-data-tags hunk is anchored by line number and
  # breaks when a schema patch above it changes the generated line count; fuzz lets patch
  # re-find its (unique) context. The QueryData block is unique, so this stays unambiguous.
  patch -p0 -s -F3 < "$ROOT_DIR/patches/generated-query-data-tags.patch"
)

if [[ "${1:-}" == "--check" ]]; then
  if ! cmp -s "$TMP_DIR/Generated.ts" "$OUT_FILE"; then
    echo "src/Generated.ts is out of date. Run: npm run generate" >&2
    diff -u "$OUT_FILE" "$TMP_DIR/Generated.ts" | head -200 >&2 || true
    exit 1
  fi
  exit 0
fi

mv "$TMP_DIR/Generated.ts" "$OUT_FILE"
