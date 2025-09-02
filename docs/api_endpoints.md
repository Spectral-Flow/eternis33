# Eternis-33 Companion Module API Endpoints

## Overview
The companion module exposes several API endpoints for integration with the main Eternis-33 game and real-world data sources. All endpoints return JSON responses and handle errors gracefully.

## Base URL
`http://localhost:3000/api`

## Endpoints

### Initialize Companion
Initializes the companion with a personality profile based on quiz responses.

**URL**: `/companion/initialize`
**Method**: `POST`
**Auth Required**: No
**Data Constraints**:
```json
{
  "quizResponses": [0, 1, 2, 3, 1]
}
```

**Data Parameters**:
- `quizResponses` - Array of integers representing player's choices in the personality quiz

**Success Response**:
```json
{
  "success": true,
  "data": {
    "archetype": "Sparkmonger",
    "profile": {
      "warm": 3,
      "cold": -1,
      "pragmatic": 2,
      "idealist": 4,
      "guarded": -2,
      "open": 6,
      "cryptic": 1,
      "direct": 3
    }
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Invalid quiz responses"
}
```

### Process Player Input
Processes player input and generates an appropriate AI response.

**URL**: `/companion/process-input`
**Method**: `POST`
**Auth Required**: No
**Data Constraints**:
```json
{
  "input": "What is this Prism I found?",
  "context": {
    "inventory": ["Prism"],
    "location": "abandoned rail yard",
    "time": "late evening"
  }
}
```

**Data Parameters**:
- `input` - String representing player's question or statement
- `context` - Object containing player's current game context

**Success Response**:
```json
{
  "success": true,
  "data": {
    "text": "That shard in your hand... not glass, not gem. It hums with echoes of forgotten code. Keep it close; the Drift hungers for such sparks.",
    "voice": "Asterya"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Companion not initialized"
}
```

### Get Coding Game
Retrieves an appropriate coding game challenge based on player's skill level.

**URL**: `/companion/coding-game`
**Method**: `GET`
**Auth Required**: No
**URL Parameters**: None

**Success Response**:
```json
{
  "success": true,
  "data": {
    "title": "Prism Repair",
    "description": "Repair corrupted prism shards using visual logic puzzles",
    "difficulty": "Beginner",
    "narrative": "The Prism hums with fractured code. Align the logic sequences to restore its glow.",
    "skills": ["Pattern Recognition", "Basic Logic", "Sequencing"]
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Companion not initialized"
}
```

### Process Real-World Data
Processes real-world data and generates simulation feedback.

**URL**: `/companion/real-world-data`
**Method**: `POST`
**Auth Required**: No
**Data Constraints**:
```json
{
  "dataType": "steps",
  "value": 2000
}
```

**Data Parameters**:
- `dataType` - String representing type of real-world data (steps, task_completed, journal_entry, coding_practice)
- `value` - Numeric value representing the data measurement

**Success Response**:
```json
{
  "success": true,
  "data": {
    "narrative": "You scouted the Rustchanter alleys and found 3 Prism shards.",
    "reward": "3 Prism shards added to inventory",
    "simulationEffect": "Expanded scavenging territory in Eternis-33"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Invalid data type"
}
```

### Get Companion Status
Retrieves the current status of the companion including personality profile and skill level.

**URL**: `/companion/status`
**Method**: `GET`
**Auth Required**: No
**URL Parameters**: None

**Success Response**:
```json
{
  "success": true,
  "data": {
    "archetype": "Sparkmonger",
    "profile": {
      "warm": 3,
      "cold": -1,
      "pragmatic": 2,
      "idealist": 4,
      "guarded": -2,
      "open": 6,
      "cryptic": 1,
      "direct": 3
    },
    "traitPercentages": {
      "warm": 60,
      "cold": 40,
      "pragmatic": 33,
      "idealist": 67,
      "guarded": 25,
      "open": 75,
      "cryptic": 25,
      "direct": 75
    },
    "skillLevel": 2,
    "realWorldData": {
      "steps": 15000,
      "tasksCompleted": 12,
      "journalEntries": 5,
      "codingPracticeTime": 120
    }
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Companion not initialized"
}
```

### Update Companion Mood
Updates the companion's current mood state.

**URL**: `/companion/mood`
**Method**: `POST`
**Auth Required**: No
**Data Constraints**:
```json
{
  "mood": "happy"
}
```

**Data Parameters**:
- `mood` - String representing the companion's mood state

**Success Response**:
```json
{
  "success": true,
  "data": {
    "message": "Companion mood updated"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Companion not initialized"
}
```

### Update Companion Voice Tone
Updates the companion's voice tone for TTS output.

**URL**: `/companion/voice-tone`
**Method**: `POST`
**Auth Required**: No
**Data Constraints**:
```json
{
  "tone": "mysterious"
}
```

**Data Parameters**:
- `tone` - String representing the companion's voice tone

**Success Response**:
```json
{
  "success": true,
  "data": {
    "message": "Companion voice tone updated"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Companion not initialized"
}
```