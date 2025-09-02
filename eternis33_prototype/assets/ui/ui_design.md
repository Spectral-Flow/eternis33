# Eternis-33: Prototype Shard UI Design

## UI Elements

### 1. Compass

- Position: Top center of screen
- Design: Minimalist cyberpunk compass with neon blue/cyan glow
- Function: Shows direction player is facing
- Animation: Smooth rotation with slight glow pulse

### 2. Mini-Map

- Position: Bottom right corner
- Design: Small circular map with player at center
- Function: Shows nearby area with player position
- Features:
  - Nearby Prisms shown as glowing dots
  - Current position as bright center point
  - Minimal street outlines in neon blue

### 3. Prism Counter

- Position: Top right corner
- Design: Crystalline icon with number
- Function: Shows number of Prisms collected
- Animation: Increments with glow effect when new Prism is collected

### 4. Scan Button

- Position: Bottom center of screen
- Design: Circular button with radar-like animation
- Function: Activates AR scanning for surfaces
- States:
  - Inactive: Dim glow
  - Active: Bright pulsing animation
  - Surface Detected: Steady bright glow

### 5. Inventory Button

- Position: Bottom left corner
- Design: Prism icon with subtle glow
- Function: Opens inventory screen
- Animation: Rotates slightly when pressed

### 6. Lore Popup

- Position: Center of screen (when triggered)
- Design: Semi-transparent panel with cyberpunk border
- Function: Displays lore text on first Prism collection
- Animation: Fades in/out with slight glitch effect

### 7. Loading Screen

- Position: Full screen
- Design: Dark background with Eternis-33 logo
- Function: Shown during startup and loading
- Animation: Glowing particles and loading indicator

### 8. Permission Request

- Position: Center of screen
- Design: Modal dialog with cyberpunk styling
- Function: Requests camera and location permissions
- Features: Clear explanation text and confirm/deny buttons

## Color Scheme

### Primary Colors

- Neon Blue: #00F3FF (Aether Blue)
- Neon Purple: #9D00FF (Prism Purple)
- Chrome Silver: #E0E0E6

### Secondary Colors

- Neon Pink: #FF00E6 (Neural Pink)
- Warning Red: #FF3C41
- Rust Orange: #FF7300
- Code Green: #00FF9F

### Background Colors

- Night Black: #0A0A12
- Urban Gray: #1A1A24
- Smog Purple: #2A2A36

## Typography

- Headers: "Rajdhani" - Clean, geometric sans-serif with slight tech feel
- Body Text: "Exo 2" - Modern, readable sans-serif
- UI Elements: "Orbitron" - Futuristic, angular for numbers and short labels

## UI Animations

### Prism Collection

1. Prism glows brighter
2. Shrinks while increasing glow
3. Particle effect emanates outward
4. Counter increments with flash

### Scan Activation

1. Button pulses with expanding rings
2. Screen edges briefly glow
3. AR grid effect sweeps across camera view
4. Surface detection highlights with grid pattern

### Inventory Open/Close

1. Button rotates and glows
2. Inventory slides up from bottom with slight blur effect
3. Prisms in inventory rotate slowly with glow effect
4. Reverse animation for closing

### Lore Popup

1. Screen slightly darkens
2. Text panel fades in with glitch effect
3. Text appears with typewriter effect
4. Gentle pulsing glow around panel edges
5. Fades out after reading time or tap
