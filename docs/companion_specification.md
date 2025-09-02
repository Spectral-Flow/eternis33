# Eternis-33 Universal AI Companion Specification

## Overview
The Eternis-33 Universal AI Companion is an adaptive AI system that functions as both a life assistant and an in-game companion. The companion's personality evolves based on player interactions and real-world behaviors, creating a unique, personalized experience for each player.

## Core Components

### 1. Personality Quiz
The personality quiz initializes the companion's base archetype and personality traits. It consists of 5 questions designed to determine the player's preferences in key personality dimensions:

- Warmth (Warm ↔ Cold)
- Approach (Pragmatic ↔ Idealist)
- Openness (Guarded ↔ Open)
- Communication (Cryptic ↔ Direct)

Each question has four choices that map to different weight adjustments in these dimensions.

### 2. Personality Matrix
The personality matrix maintains the companion's current personality profile and manages how it adapts over time. It tracks:

- Personality trait weights
- Interaction history
- Archetype evolution

The matrix normalizes trait weights to stay within defined ranges and updates the companion's archetype based on significant personality shifts.

### 3. Conversation Layer
The conversation layer handles all dialogue interactions between the player and companion. It features:

- Speech-to-text (STT) processing
- Text-to-speech (TTS) output
- Personality-based response generation
- Dialogue history tracking
- Memory anchoring for contextual references

The layer ensures the companion's responses reflect its current personality and maintain continuity across sessions.

### 4. Coding Game Engine
The coding game engine provides educational mini-games that teach programming concepts through Eternis-33 narrative frameworks. It:

- Assesses player's coding skill level
- Dynamically adjusts game difficulty
- Tracks player progress
- Unlocks new games as skills improve
- Integrates with personality matrix for adaptive learning

The engine scales from beginner logic puzzles to advanced real-code challenges, all themed around Eternis-33 lore.

### 5. Life Integration Module
The life integration module bridges real-world actions with in-game effects. It:

- Syncs with device calendar and health data
- Tracks steps, tasks, and journaling
- Maps real actions to simulation events
- Generates narrative feedback
- Updates personality based on real-world behavior

This module ensures that the player's life outside the game influences their in-game experience.

## Technical Architecture

### Voice Layer
The voice layer implements a complete STT/TTS pipeline:
- Universal voice system with style transfer capabilities
- Multiple voice options unlocked through gameplay
- Mood-responsive voice modulation
- Natural language processing for input understanding

### AI Brain
The AI brain uses a combination of techniques:
- RAG (Retrieval-Augmented Generation) for contextual responses
- Fine-tuned personality models per archetype
- Persistent state management across sessions
- Dynamic personality adaptation algorithms

### Gameplay Hooks
Gameplay hooks connect the companion to the Eternis-33 world:
- Modular mini-games that can be added/removed
- Narrative wrappers for all coding challenges
- Simulation feedback based on real-world actions
- Archetype-specific game presentation styles

### Real-World Integration
Real-world integration features include:
- Calendar synchronization for task tracking
- Step counting for scavenging distance
- Journaling inputs for lore development
- Coding practice timers for skill assessment

## Core Loop

1. Player interacts with companion through voice or text
2. Companion analyzes tone and content, updating personality
3. Real-world actions are tracked and processed
4. Actions translate into simulation events and rewards
5. Player receives personalized feedback and new challenges
6. Companion evolves based on interaction patterns

## Personalization Features

### Dynamic Adaptation
The companion continuously adapts to the player's:
- Speech patterns and emotional tone
- Coding skill progression
- Real-world habits and behaviors
- Preferred interaction styles

### Memory Anchoring
The companion maintains persistent memory of:
- Past conversations and decisions
- Player's evolving preferences
- Relationship development
- Shared experiences in both worlds

### Archetype Evolution
Starting archetypes can evolve based on player interactions:
- Shadow: Skeptical, loyal, sharp-witted
- Oracle: Supportive, visionary, mystical
- Warden: Pragmatic, structured, protective
- Fractoracle: Glitchy prophet with coded riddles
- Sparkmonger: Scrappy, fast-talking guide
- Echo-Scribe: Thoughtful, archival companion

## Implementation Details

### Personality Profile Schema
```json
{
  "warm": 0,
  "cold": 0,
  "pragmatic": 0,
  "idealist": 0,
  "guarded": 0,
  "open": 0,
  "cryptic": 0,
  "direct": 0
}
```

### Real-World Data Tracking
- Steps: Mapped to scavenging distance
- Tasks: Influence Prism stability
- Journaling: Unlocks lore entries
- Coding practice: Enhances companion's teaching abilities

### Simulation Feedback Examples
- "You scouted the Rustchanter alleys and found 3 Prism shards."
- "Your discipline strengthens the Aetheric Drift."
- "You cracked a Voxclad cipher, your rep grows."
- "Entropy spreads—you skipped coding practice."

## Design Goals
The companion system aims to create a feeling of genuine partnership through:
- Adaptive personality that reflects player's behavior
- Seamless integration between real life and simulation
- Educational content that feels like natural gameplay
- Persistent memory that creates continuity
- Emotional depth that responds to player's mood