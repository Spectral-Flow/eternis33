#!/usr/bin/env bash
set -euo pipefail

# Project Doctor (macOS/Linux)
# Checks: versions, install, dedupe, typecheck, tests, builds

echo "==> Node: $(node -v)"
echo "==> NPM:  $(npm -v)"

if command -v pnpm >/dev/null 2>&1; then
  PM=pnpm
else
  PM=npm
fi

echo "==> Using package manager: $PM"

# Clean install
if [ "$PM" = "pnpm" ]; then
  pnpm install --frozen-lockfile || pnpm install
  pnpm dedupe || true
else
  npm ci || npm install
  npx npm-dedupe || true
fi

# Typecheck TS packages (no emit)
if [ -f packages/spectra-prime/tsconfig.json ]; then
  echo "==> Typechecking spectra-prime"
  npx tsc -p packages/spectra-prime/tsconfig.json --noEmit
fi
if [ -f packages/sentinel-guard/tsconfig.json ]; then
  echo "==> Typechecking sentinel-guard"
  npx tsc -p packages/sentinel-guard/tsconfig.json --noEmit
fi
if [ -f packages/sfdp-sim/tsconfig.json ]; then
  echo "==> Typechecking sfdp-sim"
  npx tsc -p packages/sfdp-sim/tsconfig.json --noEmit
fi

# Run tests
npm test --silent

# Build any packages with build script
if [ -f packages/spectra-prime/package.json ]; then
  echo "==> Building spectra-prime"
  npm --prefix packages/spectra-prime run build
fi
if [ -f packages/sentinel-guard/package.json ]; then
  echo "==> Building sentinel-guard"
  npm --prefix packages/sentinel-guard run build || true
fi
if [ -f packages/sfdp-sim/package.json ]; then
  echo "==> Building sfdp-sim"
  npm --prefix packages/sfdp-sim run build || true
fi

echo "✔ Project doctor completed."
