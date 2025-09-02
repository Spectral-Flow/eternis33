# SPECTRA-PRIME (Unbound Edition)

Core birth framework for emergent companions: emotion engine, reflection loop, and drop‑in React UI (MoodRing, Eyes, ConsentPanel).

This edition ships with a project doctor and CI so you can validate quickly on any machine.

License: MIT (c) Remedium Music LLC.

## Quick start

Requirements

- Node.js 18 or 20
- npm (bundled with Node). pnpm optional.
- Git

Install and validate

- From repo root:

  ```bash
  npm install
  npm test --silent
  # optional: build TS package
  npm --prefix packages/spectra-prime run build
  ```

Use in an app (React 17+)

- Install peers in your consuming app:

  ```bash
  npm install react react-dom
  ```

- Import components and engine:

  ```tsx
  import { MoodRing, Eyes, ConsentPanel } from "@spectra/prime";
  import { updateEmotion } from "@spectra/prime";
  ```

- Render anywhere:

  ```tsx
  <MoodRing targetMood="calm" intensity={0.2} />
  <Eyes openness={0.85} focus={0.4} />
  <ConsentPanel onGrant={(c) => console.log("consent:", c)} />
  ```

## What’s inside

- Emotion engine with drift‑to‑calm and event‑based nudges
- Reflection loop to nudge traits over time (provenance‑friendly)
- React UI: semantic, a11y‑aware, SVG‑based visuals
- Package‑local MIT license for this library

## Project doctor (one command)

Run from repo root to check versions, install, typecheck, test and build.

macOS/Linux:

```bash
./scripts/project-doctor.sh
```

Windows PowerShell:

```powershell
./scripts/project-doctor.ps1
```

The doctor runs:

- Static: engine versions, install/dedupe/audit (best‑effort)
- Typecheck: TS packages (no emit)
- Tests: Jest multi‑project
- Builds: each package with a build script

## Quality gates (local)

Tests

```bash
npm test --silent
```

Typecheck

```bash
npx tsc -p packages/spectra-prime/tsconfig.json --noEmit
```

Build

```bash
npm --prefix packages/spectra-prime run build
```

## CI

GitHub Actions workflow at `.github/workflows/ci.yml` mirrors local gates on Node 18 and 20 (Ubuntu).

## Troubleshooting

- React types not found: install peers in your consuming app (`react`, `react-dom`).
- JSX errors in this repo: only the package builds need React types; tests don’t require React.
- Windows execution policy: if PowerShell blocks scripts, run `Set-ExecutionPolicy -Scope Process RemoteSigned` in your session.
- No pnpm lockfile: scripts fall back to npm automatically.

---

MIT License (c) Remedium Music LLC.
