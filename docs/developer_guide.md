# Eternis-33 Companion Module Developer Guide

## Project Structure

```
/workspace
├── src/
│   ├── personality_quiz.js
│   ├── personality_matrix.js
│   ├── conversation_layer.js
│   ├── coding_game_engine.js
│   ├── life_integration.js
│   └── companion_core.js
├── docs/
│   ├── companion_specification.md
│   └── developer_guide.md
├── assets/
└── tests/
```

## Setup Instructions

### Prerequisites

- Node.js 14.x or higher
- npm package manager
- Godot 4.x (for integration with main game)

### Installation

1. Clone the repository
2. Navigate to the companion module directory
3. Install dependencies:

```bash
npm install
```

## Core Module Implementation

### CompanionCore (src/companion_core.js)

The main controller that coordinates all companion systems.

Key methods:

- `initialize()`: Sets up the companion with personality quiz
- `processInput(input, context)`: Handles player interactions
- `getCodingGame()`: Retrieves appropriate coding challenge
- `processRealWorldData(dataType, value)`: Integrates real-world actions
- `getStatus()`: Returns current companion status

### PersonalityQuiz (src/personality_quiz.js)

Implements the onboarding quiz that determines initial companion personality.

Key methods:

- `getQuestions()`: Returns quiz questions
- `calculateArchetype(responses)`: Determines starting archetype

### PersonalityMatrix (src/personality_matrix.js)

Manages the companion's adaptive personality engine.

Key methods:

- `updatePersonality(interactionData)`: Adjusts personality traits
- `getProfile()`: Returns current personality weights
- `getTraitPercentages()`: Gets personality traits as percentages

### ConversationLayer (src/conversation_layer.js)

Handles voice and dialogue systems.

Key methods:

- `generateResponse(input, context)`: Creates AI responses
- `updateMood(mood)`: Adjusts companion's emotional state
- `updateVoiceTone(tone)`: Changes voice characteristics

### CodingGameEngine (src/coding_game_engine.js)

Manages educational coding mini-games.

Key methods:

- `assessSkillLevel()`: Determines player's coding ability
- `getCodingGame()`: Retrieves appropriate game challenge
- `updateProgress(gameId, success)`: Tracks player progress

### LifeIntegration (src/life_integration.js)

Bridges real-world actions with simulation effects.

Key methods:

- `processRealWorldData(dataType, value)`: Integrates real actions
- `generateSimulationFeedback(dataType, value)`: Creates narrative feedback
- `mapToSimulation(dataType, value)`: Maps actions to simulation parameters

## Integration Points

### Voice System

The companion uses a universal STT/TTS pipeline that can be integrated with:

- Android SpeechRecognizer API
- iOS SFSpeechRecognizer API
- External services like Google Speech-to-Text or Amazon Transcribe

### Real-World Data Sources

Integration hooks exist for:

- Device step counting (HealthKit on iOS, Google Fit on Android)
- Calendar synchronization
- Journaling applications
- Coding practice timers

### Simulation Feedback

The companion's real-world actions influence the Eternis-33 simulation through:

- Prism stability adjustments
- Scavenging distance expansion
- Lore entry unlocks
- Companion growth metrics

## Testing

### Unit Tests

Run unit tests with:

```bash
npm test
```

### Integration Testing

1. Initialize companion with different quiz responses
2. Process various player inputs to verify personality adaptation
3. Test coding game engine with different skill levels
4. Verify real-world data mapping to simulation effects

## API Endpoints

### Initialize Companion

```
POST /companion/initialize
Body: { quizResponses: [0, 1, 2, 3, 1] }
Response: { archetype: "Sparkmonger", profile: {...} }
```

### Process Player Input

```
POST /companion/process-input
Body: { input: "What is this Prism I found?", context: {...} }
Response: { text: "...", voice: "Asterya" }
```

### Get Coding Game

```
GET /companion/coding-game
Response: { title: "Prism Repair", description: "...", skills: [...] }
```

### Process Real-World Data

```
POST /companion/real-world-data
Body: { dataType: "steps", value: 2000 }
Response: { narrative: "...", reward: "...", simulationEffect: "..." }
```

### Get Companion Status

```
GET /companion/status
Response: { archetype: "...", profile: {...}, skillLevel: 5, ... }
```

## Extending the Companion

### Adding New Archetypes

1. Update the archetypes object in PersonalityQuiz
2. Define personality weight mappings
3. Create archetype-specific dialogue filters

### Creating New Coding Games

1. Add game type to CodingGameEngine
2. Implement skill level appropriate challenges
3. Create narrative wrappers for Eternis-33 themes

### Expanding Real-World Integration

1. Add new data types to LifeIntegration
2. Implement mapping to simulation parameters
3. Create appropriate narrative feedback

## Troubleshooting

### Common Issues

1. Personality traits not updating correctly

   - Verify interaction data is being passed properly
   - Check weight normalization in PersonalityMatrix

2. Dialogue responses not reflecting personality

   - Ensure conversation layer has latest personality profile
   - Verify archetype-specific response generation

3. Coding game difficulty not scaling
   - Check skill level assessment in CodingGameEngine
   - Verify game selection logic matches skill level

### Debugging Tips

1. Use getStatus() to inspect current personality
2. Check dialogue history for interaction patterns
3. Monitor real-world data integration points
4. Verify simulation feedback mapping
