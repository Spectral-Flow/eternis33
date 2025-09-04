# Eternis-33 Universal AI Companion Module

## Overview

Spectra Prime HealthKit monorepo health stack with web + mobile apps, shared packages, and full CI/CD + E2E validation. The Eternis-33 Universal AI Companion is an adaptive AI system that functions as both a life assistant and an in-game companion, creating unique, personalized experiences that evolve based on player interactions.

## Features

- **Personality Quiz**: Initializes the companion's base archetype and personality traits
- **Adaptive Personality Engine**: Continuously adjusts personality based on player interactions
- **Voice & Conversation System**: Natural dialogue with STT/TTS capabilities and advanced memory anchoring
- **Educational Coding Games**: Teaches programming through narrative-driven challenges with adaptive difficulty
- **Real-World Integration**: Maps life actions to simulation effects
- **Memory Anchoring**: Maintains persistent memory of past interactions with topic analysis and emotional context
- **Cross-platform Applications**: Web and mobile apps with comprehensive E2E testing
- **Automated Development Workflow**: Commit hooks, dependency automation, and CI/CD
- **Android Build & Deployment**: Complete Play Store deployment pipeline

## Project Structure

```
/workspace
├── src/                              # Core AI companion modules
│   ├── personality_quiz.js           # Personality initialization quiz
│   ├── personality_matrix.js         # Dynamic personality system
│   ├── conversation_layer.js         # Enhanced dialogue with memory anchoring
│   ├── coding_game_engine.js         # Adaptive coding game framework
│   ├── life_integration.js           # Real-world data integration
│   ├── emotional_bond_tracker.js     # Relationship tracking system
│   ├── companion_core.js             # Main coordinator
│   └── voice/elevenlabs_agent.js     # Voice integration (optional)
├── apps/                             # Applications
│   ├── web/                          # Web application
│   ├── mobile/                       # Mobile application
│   │   ├── android/                  # Android build configuration
│   │   └── e2e/                      # Mobile E2E tests (Detox)
│   └── web/e2e/                      # Web E2E tests (Playwright)
├── packages/                         # Shared workspace packages
├── tests/                            # Comprehensive test suite (51 tests)
└── docs/                            # Documentation including deployment guides
```

## Getting Started

### Setup

```bash
pnpm install
```

Bootstraps all workspaces and installs dependencies.

### Local Doctor

Run everything to ensure health:

```bash
pnpm doctor
```

Runs install, typecheck, lint, test, build across all packages.

### Start the Companion System

```bash
npm start
# or for development with watch mode
npm run dev
```

## E2E Tests

### Web E2E (Playwright)

```bash
pnpm e2e:web
```

Starts your web app on http://localhost:3000 (or E2E_BASE_URL) and runs Playwright smoke tests across Chrome, Firefox, and Safari.

### Mobile E2E (Detox)

```bash
pnpm e2e:mobile:ios      # iOS simulator
pnpm e2e:mobile:android  # Android emulator
```

Uses Detox to launch app in simulator/emulator and runs smoke tests ensuring app boots correctly.

### All-in-One Testing

```bash
pnpm e2e:all
```

Runs web + mobile E2E tests in sequence for complete validation.

## Android Development

### Prerequisites

- Android Studio with SDK (API 34 recommended)
- Environment variables configured (see [Android Deployment Guide](docs/android-deployment.md))

### Generate Keystore (one-time setup)

```bash
cd apps/mobile/android
./generate-keystore.sh
```

### Build APK/AAB

```bash
cd apps/mobile/android

# Debug APK (for testing)
./gradlew assembleDebug

# Release APK (signed)
./gradlew assembleRelease

# App Bundle (for Play Store)
./gradlew bundleRelease
```

See [Android Deployment Guide](docs/android-deployment.md) for complete setup and Play Store deployment instructions.

## Voice Integration (Optional)

Enable ElevenLabs voice features:

1. Install optional dependencies:

   ```bash
   npm install axios dotenv
   ```

2. Create `.env` file:

   ```env
   ELEVENLABS_API_KEY=your_key_here
   ```

3. The companion will auto-detect the API key and enable voice features.

**Security note**: Never commit API keys. Use environment variables or your deployment secret manager.

## Development Workflow

### Commit Discipline

- **Pre-commit**: Prettier + ESLint via lint-staged
- **Commit-msg**: Conventional commits enforced via Commitlint

Example:

```bash
git commit -m "feat(web): add appointment widget"
git commit -m "fix(mobile): resolve navigation issue"
```

### Dependency Automation

- **Renovate**: Automated patch/minor PRs (preferred)
- **Dependabot**: GitHub-native alternative

Both configurations are included; enable one in your repository settings.

### Continuous Integration

- CI runs doctor + web E2E on every PR
- Mobile E2E supported locally (self-hosted runner if desired)
- Automated artifact uploads for Playwright reports

## Workspace Scripts

All commands available from root:

```json
{
  "scripts": {
    "doctor": "pnpm -r run doctor",
    "e2e:web": "pnpm --filter @spectra/web-e2e e2e",
    "e2e:mobile:ios": "pnpm --filter @spectra/mobile-e2e e2e:ios:test",
    "e2e:mobile:android": "pnpm --filter @spectra/mobile-e2e e2e:android:test",
    "e2e:all": "pnpm e2e:web && pnpm e2e:mobile:ios && pnpm e2e:mobile:android"
  }
}
```

## Triple-Check ×3 Guarantee

1. **Local doctor** — instant feedback on your box
2. **E2E smoke** — sanity across web + mobile
3. **CI gates** — same checks in the cloud
4. **Commit hooks** — bad code never lands
5. **Autodeps** — drift handled safely

✨ With this setup, Spectra is self-defending. One command tells you the truth:

```bash
pnpm doctor && pnpm e2e:web && pnpm e2e:mobile:ios
```

## Documentation

- [Android Deployment Guide](docs/android-deployment.md) - Complete Android build and Play Store deployment
- [Companion Specification](docs/companion_specification.md) - AI companion system details
- [Developer Guide](eternis33_prototype/docs/developer_guide.md) - Prototype development
- [Implementation Plan](docs/implementation_plan.md) - Development roadmap

## API Endpoints

The companion system exposes REST endpoints:

- `POST /companion/initialize` - Initialize companion with quiz responses
- `POST /companion/process-input` - Process player input and generate response
- `GET /companion/coding-game` - Get appropriate coding challenge
- `POST /companion/real-world-data` - Process real-world actions
- `GET /companion/status` - Get current companion status
- `GET /companion/bond-status` - Get emotional bond status and insights
- `GET /companion/memory-anchors` - Get conversation memory and context

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes (following conventional commit format)
4. Push to the branch
5. Create a pull request

## License

Spectral Flow License v1.0
