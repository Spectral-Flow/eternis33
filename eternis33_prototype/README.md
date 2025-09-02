# Eternis-33: Prototype Shard

An AR mobile game set in the cyberpunk world of Eternis-33. Players use their mobile devices to discover and collect "Prism Anchors" - glowing crystalline shards that appear in the real world through AR technology.

## Project Overview

Eternis-33: Prototype Shard is a location-based AR game where players explore the real world to find and collect virtual Prism crystals. These Prisms are anchored to real-world GPS coordinates and can be seen and collected by other players, creating a shared experience.

### Core Features

- **AR Visualization**: Use ARCore/ARKit to place virtual Prism objects in the real world
- **GPS Integration**: Anchor Prisms to real-world locations
- **Collection Mechanics**: Tap Prisms to collect them and add to your inventory
- **Multiplayer Persistence**: Prisms are visible to all players in the same location
- **Cyberpunk Aesthetic**: Neon visual style with glowing effects

## Technical Implementation

### Engine & Platforms
- **Engine**: Godot 4.x
- **Platforms**: Android (ARCore), iOS (ARKit)
- **AR Plugins**: godot-arcore (Android), equivalent for iOS
- **Map/GPS**: OpenStreetMap + Mapbox API
- **Networking**: WebSocket / lightweight backend

### Project Structure

```
eternis33_prototype/
├── assets/
│   ├── models/       # 3D models for Prisms
│   ├── textures/     # Textures including noise maps for shaders
│   ├── sounds/       # Audio files for Prism and UI sounds
│   └── ui/           # UI design files and mockups
├── src/
│   ├── ARController.gd       # Handles AR camera and plane detection
│   ├── GameController.gd     # Main game controller
│   ├── InventoryManager.gd   # Manages collected Prisms
│   ├── LocationManager.gd    # Handles GPS and location services
│   ├── Main.gd               # Entry point for the game
│   ├── NetworkManager.gd     # Handles multiplayer communication
│   ├── Prism.gd              # Prism object behavior
│   └── UI.gd                 # User interface controller
└── docs/
    └── project_specification.md  # Detailed project specifications
```

### Core Gameplay Loop

1. **Startup**: Player launches app → Camera opens in AR view with UI overlay
2. **Scan Environment**: ARCore/ARKit detects planes → Player taps to reveal Prisms
3. **Prism Artifact**: Glowing crystal appears anchored to real-world coordinates
4. **Interaction**: Player taps Prism → Collects it → Added to Inventory
5. **Persistence**: Prism remains anchored at GPS location for other players to find
6. **Lore Hook**: First collection triggers lore popup introducing the world

## Visual Design

### Prism Visualization
- Floating neon crystal with animated shader effects
- Glowing bloom effect with color variations based on Prism type
- Subtle animation (rotation, hovering)
- Particle effects on interaction

### UI Design
- Minimalist cyberpunk aesthetic
- Neon color palette (blues, magentas, cyan)
- Clean white text with sans-serif fonts
- Compass and mini-map for navigation
- Inventory counter showing collected Prisms

## Future Development (Phase 2)

- Multiple Prism types (common, rare, corrupted)
- Scintilla fragments (ambient AR particles, collectible)
- Faction system (choose allegiance, contribute to territory control)
- Time-based spawns (Prisms appear only at certain times)

## Setup & Development

### Requirements
- Godot 4.x
- Android SDK with ARCore support (for Android builds)
- Xcode with ARKit support (for iOS builds)
- OpenStreetMap/Mapbox API key

### Building the Project
1. Clone the repository
2. Open the project in Godot 4.x
3. Configure your API keys in the appropriate configuration files
4. Build for your target platform (Android/iOS)

## Credits

Developed as part of the Eternis-33 cyberpunk world concept.

### Assets
- Noise textures generated using Python with NumPy and PIL
- UI mockup created with HTML/CSS
- Background image from Unsplash (for mockup only)