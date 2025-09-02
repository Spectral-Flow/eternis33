# Eternis-33: Prototype Shard Specification

## Overview
Eternis-33: Prototype Shard is an AR mobile game set in the cyberpunk world of Eternis-33. Players use their mobile devices to discover and collect "Prism Anchors" - glowing crystalline shards that appear in the real world through AR technology.

## Technical Specifications

### Platforms
- Android (using ARCore)
- iOS (using ARKit)

### Engine
- Godot 4.x

### Core Technologies
- AR: ARCore (Android), ARKit (iOS)
- GPS/Mapping: OpenStreetMap + Mapbox API
- Networking: WebSocket / lightweight backend

## Core Gameplay Loop

### 1. Startup
- Player launches app
- Camera opens in AR view
- UI overlay shows compass and small map with current GPS position

### 2. Scan Environment
- ARCore/ARKit detects planes (ground, walls)
- Player taps to "reveal" a Prism Anchor in the AR space

### 3. Prism Artifact
- A glowing Prism crystal appears anchored to real-world coordinates
- Visual: Floating neon shard with animated shader (simple bloom/glow)
- Sound: Low synth hum

### 4. Interaction
- Player taps Prism to collect it
- Prism is added to player's inventory
- Basic inventory screen shows Prism count

### 5. Persistence
- Prism is anchored at that GPS coordinate
- Other players who visit the same location can see/collect the same Prism

### 6. Lore Hook
- On first collection: Small text popup with lore snippet
- "You hold a Prism. Data condensed into crystal. The city remembers you."

## Technical Implementation

### AR Implementation
- Use ARCore/ARKit to detect real-world surfaces
- Place virtual Prism objects on detected surfaces
- Implement touch interaction with virtual objects

### GPS & Location
- Use device GPS to get player location
- Map current location using OpenStreetMap/Mapbox
- Associate Prism spawns with specific GPS coordinates

### Networking
- Simple client-server architecture
- Server stores Prism locations and states
- Clients synchronize with server to see shared Prisms

### Visual Design
- Neon cyberpunk aesthetic
- Glitch shimmer effects on Prisms
- Color palette: Deep blues, magentas, cyan glows
- Minimalist UI with clean white text, sans serif

## Phase 2 Features (Stretch Goals)
- Multiple Prism types (common, rare, corrupted)
- Scintilla fragments (ambient AR particles, collectible)
- Faction system (choose allegiance, contribute to territory control)
- Time-based spawns (Prisms appear only at certain times)