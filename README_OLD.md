# Eternis-33 Universal AI Companion Module

## Overview

The Eternis-33 Universal AI Companion is an adaptive AI system that functions as both a life assistant and an in-game companion. This module creates a unique, personalized experience for each player by evolving the companion's personality based on player interactions and real-world behaviors.

## Features

- **Personality Quiz**: Initializes the companion's base archetype and personality traits
- **Adaptive Personality Engine**: Continuously adjusts personality based on player interactions
- **Voice & Conversation System**: Natural dialogue with STT/TTS capabilities and advanced memory anchoring
- **Educational Coding Games**: Teaches programming through narrative-driven challenges with adaptive difficulty
- **Real-World Integration**: Maps life actions to simulation effects
- **Memory Anchoring**: Maintains persistent memory of past interactions with topic analysis and emotional context
- **Archetype Evolution**: Companion's personality can shift over time
- **Emotional Bond Tracking**: Monitors and analyzes the relationship between player and companion

## Project Structure

```
/workspace
├── src/
│   ├── personality_quiz.js           # Personality initialization quiz
│   ├── personality_matrix.js         # Dynamic personality system
│   ├── conversation_layer.js         # Enhanced dialogue with memory anchoring
│   ├── coding_game_engine.js         # Adaptive coding game framework
│   ├── life_integration.js           # Real-world data integration
│   ├── emotional_bond_tracker.js     # Relationship tracking system
│   ├── companion_core.js             # Main coordinator
│   └── voice/elevenlabs_agent.js     # Voice integration (optional)
├── tests/                            # Comprehensive test suite (51 tests)
├── docs/                            # Documentation
├── packages/                        # Additional workspace packages
└── apps/                           # Example applications
```

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the companion system:

   ```bash
   npm start
   ```

Optional development helpers:

- Run tests:

  ```bash
  npm test
  ```

- Run in watch mode during development:

  ```bash
  npm run dev
  ```

Voice integration (optional):

This project includes a safe scaffold for integrating the ElevenLabs Conversational/TTS APIs. To enable it:

1. Install optional dependencies (axios, dotenv or use the optionalDependencies in package.json):

   ```bash
   npm install axios dotenv
   ```

2. Create a `.env` file in the project root and add your ElevenLabs key:

   ```env
   ELEVENLABS_API_KEY=your_key_here
   ```

3. The companion will detect the API key at runtime and enable voice features; otherwise the adapter is a no-op and the app continues to function normally.

Security note: Never commit API keys. Use environment variables or your deployment secret manager.

## Documentation

- [Companion Specification](docs/companion_specification.md)
- [Developer Guide](docs/developer_guide.md)
- [Implementation Plan](docs/implementation_plan.md)

## API Endpoints

- `POST /companion/initialize` - Initialize companion with quiz responses
- `POST /companion/process-input` - Process player input and generate response
- `GET /companion/coding-game` - Get appropriate coding challenge
- `POST /companion/real-world-data` - Process real-world actions
- `GET /companion/status` - Get current companion status
- `GET /companion/bond-status` - Get emotional bond status and insights
- `GET /companion/memory-anchors` - Get conversation memory and context

## End-to-end (E2E) smoke tests

- Web (Playwright)
  - Start local prototype server and run smoke test

```powershell
npm run e2e:web:local
```

- Or, in two terminals

```powershell
npm run serve:proto
# in another terminal
npm run e2e:web
```

## Commit hooks & formatting

- Hooks are set up in `.husky/`; if not initialized yet, run `npx husky init` to set up git hooks directory.
- Lint-staged + Prettier will format and fix staged files on commit.

## Dependency automation

- Renovate configured via `renovate.json` (enable Renovate app on the repo)
- Dependabot alternative: `.github/dependabot.yml`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request
