# Eternis-33: Prototype Shard - Developer Guide

This guide provides instructions for setting up and developing the Eternis-33: Prototype Shard AR game.

## Development Environment Setup

### Prerequisites

- [Godot 4.x](https://godotengine.org/download) - Game engine
- [Android Studio](https://developer.android.com/studio) (for Android builds)
- [Xcode](https://developer.apple.com/xcode/) (for iOS builds)
- [Node.js](https://nodejs.org/) (for backend server)
- [Git](https://git-scm.com/) - Version control

### AR Development Requirements

- Android: ARCore supported device
- iOS: ARKit supported device (iPhone 6S or newer)

### API Keys

You'll need to obtain the following API keys:

- Mapbox API key for map integration
- (Optional) Firebase or alternative backend service

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/eternis33-prototype.git
cd eternis33-prototype
```

### 2. Godot Project Setup

1. Open Godot 4.x
2. Click "Import" and navigate to the cloned repository
3. Select the `project.godot` file
4. Click "Import & Edit"

### 3. Backend Server Setup

```bash
cd src/server
npm install
npm run dev  # Starts the server in development mode
```

The server will run on port 8080 by default.

### 4. Configure API Keys

1. Create a file named `api_keys.gd` in the `src` directory
2. Add your API keys:

```gdscript
# api_keys.gd
class_name ApiKeys

const MAPBOX_API_KEY = "your_mapbox_api_key_here"
const SERVER_URL = "ws://localhost:8080"  # For local development
```

**Note:** Make sure to add `api_keys.gd` to your `.gitignore` file to avoid committing sensitive information.

## Project Structure

### Key Directories

- `src/` - Main game scripts
- `assets/` - Game assets (models, textures, sounds, UI)
- `docs/` - Documentation
- `src/server/` - Backend server code

### Key Files

- `src/Main.gd` - Entry point for the game
- `src/GameController.gd` - Main game controller
- `src/ARController.gd` - AR functionality
- `src/LocationManager.gd` - GPS and location handling
- `src/Prism.gd` - Prism object behavior
- `src/InventoryManager.gd` - Player inventory system
- `src/NetworkManager.gd` - Multiplayer functionality
- `src/UI.gd` - User interface controller

## Development Workflow

### AR Development

1. **Testing AR Features:**

   - Use Godot's AR simulation when possible
   - For real device testing, build to device frequently

2. **AR Best Practices:**
   - Test in various lighting conditions
   - Ensure plane detection is robust
   - Optimize 3D models for mobile performance

### Location-Based Features

1. **Testing Location Features:**

   - Use location simulation in development
   - Test with small GPS movements
   - Verify Prism anchoring accuracy

2. **Location Best Practices:**
   - Handle location permission requests gracefully
   - Implement location error handling
   - Consider battery usage optimization

### Multiplayer Testing

1. **Local Testing:**

   - Run the local server (`npm run dev`)
   - Connect multiple devices to test synchronization

2. **Deployment Testing:**
   - Deploy server to a hosting service
   - Update `SERVER_URL` in `api_keys.gd`
   - Test with geographically distributed users

## Building and Deployment

### Android Build

1. Configure Android export settings in Godot
2. Set up keystore for signing
3. Export the project as an APK or AAB

```bash
# Command line build (optional)
godot --export "Android" /path/to/output.apk
```

### iOS Build

1. Configure iOS export settings in Godot
2. Set up Apple Developer account and certificates
3. Export the project for Xcode
4. Build and sign in Xcode

### Server Deployment

1. Choose a hosting provider (Heroku, DigitalOcean, etc.)
2. Deploy the Node.js server:

```bash
# Example for Heroku
heroku create eternis33-server
git subtree push --prefix src/server heroku main
```

## Performance Optimization

### Mobile Optimization

- Keep polygon count low for 3D models
- Use efficient shaders
- Implement level-of-detail (LOD) for distant objects
- Optimize texture sizes

### AR Optimization

- Limit the number of AR objects in view
- Use occlusion when available
- Implement proper cleanup of AR anchors

### Battery Considerations

- Reduce GPS polling frequency when possible
- Implement battery-saving mode
- Allow background/foreground state handling

## Troubleshooting

### Common AR Issues

- **Plane Detection Problems:**

  - Ensure adequate lighting
  - Check for reflective or uniform surfaces
  - Verify ARCore/ARKit support on device

- **Tracking Loss:**
  - Implement graceful recovery
  - Save anchor positions to restore objects

### Location Issues

- **GPS Inaccuracy:**
  - Implement accuracy threshold filtering
  - Consider using additional sensors for positioning
  - Add visual feedback about GPS accuracy

### Networking Issues

- **Connection Problems:**
  - Implement reconnection logic
  - Cache data locally when offline
  - Sync when connection is restored

## Contributing

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Resources

- [Godot AR Documentation](https://docs.godotengine.org/en/stable/tutorials/vr/index.html)
- [ARCore Documentation](https://developers.google.com/ar)
- [ARKit Documentation](https://developer.apple.com/augmented-reality/)
- [Mapbox Documentation](https://docs.mapbox.com/)
