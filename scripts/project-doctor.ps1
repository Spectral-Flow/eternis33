#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host "==> Node: $(node -v)"
Write-Host "==> NPM:  $(npm -v)"

# Prefer pnpm when available
$pm = if (Get-Command pnpm -ErrorAction SilentlyContinue) { 'pnpm' } else { 'npm' }
Write-Host "==> Using package manager: $pm"

if ($pm -eq 'pnpm') {
  try { pnpm install --frozen-lockfile } catch { pnpm install }
  try { pnpm dedupe } catch { Write-Host 'dedupe skipped' }
} else {
  try { npm ci } catch { npm install }
  try { npx npm-dedupe } catch { Write-Host 'dedupe skipped' }
}

# Typecheck TS packages
if (Test-Path 'packages/spectra-prime/tsconfig.json') {
  Write-Host '==> Typechecking spectra-prime'
  npx tsc -p packages/spectra-prime/tsconfig.json --noEmit
}
if (Test-Path 'packages/sentinel-guard/tsconfig.json') {
  Write-Host '==> Typechecking sentinel-guard'
  npx tsc -p packages/sentinel-guard/tsconfig.json --noEmit
}
if (Test-Path 'packages/sfdp-sim/tsconfig.json') {
  Write-Host '==> Typechecking sfdp-sim'
  npx tsc -p packages/sfdp-sim/tsconfig.json --noEmit
}

# Tests
npm test --silent

# Builds
if (Test-Path 'packages/spectra-prime/package.json') {
  Write-Host '==> Building spectra-prime'
  npm --prefix packages/spectra-prime run build
}
if (Test-Path 'packages/sentinel-guard/package.json') {
  Write-Host '==> Building sentinel-guard'
  npm --prefix packages/sentinel-guard run build
}
if (Test-Path 'packages/sfdp-sim/package.json') {
  Write-Host '==> Building sfdp-sim'
  npm --prefix packages/sfdp-sim run build
}

Write-Host '✔ Project doctor completed.'
