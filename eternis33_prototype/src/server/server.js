/**
 * Eternis-33: Prototype Shard - Backend Server
 * 
 * A simple WebSocket server to handle multiplayer functionality
 * for the Eternis-33 AR game prototype.
 */

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Server configuration
const PORT = process.env.PORT || 8080;
const SAVE_INTERVAL = 60000; // Save data every minute
const DATA_FILE = path.join(__dirname, 'data', 'prisms.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data
let prismData = {
    prisms: [],
    lastSaved: Date.now()
};

// Load existing data if available
try {
    if (fs.existsSync(DATA_FILE)) {
        const fileData = fs.readFileSync(DATA_FILE, 'utf8');
        prismData = JSON.parse(fileData);
        console.log(`Loaded ${prismData.prisms.length} prisms from storage`);
    } else {
        console.log('No existing data found, starting fresh');
    }
} catch (error) {
    console.error('Error loading data:', error);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Eternis-33 Prototype Shard Server');
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Connected clients
const clients = new Map();

// Handle WebSocket connections
wss.on('connection', (ws) => {
    const clientId = generateClientId();
    clients.set(ws, { id: clientId, location: null });
    
    console.log(`Client connected: ${clientId}`);
    
    // Send welcome message
    sendToClient(ws, {
        type: 'welcome',
        clientId: clientId,
        message: 'Connected to Eternis-33 server'
    });
    
    // Handle messages from client
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleClientMessage(ws, data);
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });
    
    // Handle client disconnect
    ws.on('close', () => {
        console.log(`Client disconnected: ${clients.get(ws).id}`);
        clients.delete(ws);
    });
});

// Handle client messages
function handleClientMessage(ws, data) {
    const client = clients.get(ws);
    
    switch (data.type) {
        case 'player_info':
            // Update client info
            client.playerId = data.player_id;
            client.playerName = data.player_name || 'Anonymous';
            console.log(`Player info updated: ${client.playerId} (${client.playerName})`);
            
            // Acknowledge
            sendToClient(ws, {
                type: 'player_info_response',
                success: true
            });
            break;
            
        case 'location_update':
            // Update client location
            client.location = {
                latitude: data.latitude,
                longitude: data.longitude,
                timestamp: data.timestamp || Date.now()
            };
            
            // Send nearby prisms
            sendNearbyPrisms(ws);
            break;
            
        case 'request_nearby_prisms':
            // Send prisms near the requested location
            sendNearbyPrisms(ws, {
                latitude: data.latitude,
                longitude: data.longitude,
                radius: data.radius || 100 // Default 100m radius
            });
            break;
            
        case 'prism_collected':
            // Mark prism as collected
            const prismId = data.prism_id;
            const prismIndex = prismData.prisms.findIndex(p => p.id === prismId);
            
            if (prismIndex >= 0) {
                // Update prism data
                prismData.prisms[prismIndex].collected = true;
                prismData.prisms[prismIndex].collectedBy = client.playerId;
                prismData.prisms[prismIndex].collectionTime = data.timestamp || Date.now();
                
                console.log(`Prism ${prismId} collected by ${client.playerId}`);
                
                // Notify nearby clients
                notifyNearbyClients({
                    type: 'prism_collected',
                    prism_id: prismId,
                    collected_by: client.playerId
                }, client.location);
            }
            break;
            
        case 'place_prism':
            // Create a new prism
            const newPrism = {
                id: `prism_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
                latitude: data.latitude,
                longitude: data.longitude,
                type: data.type || 'common',
                createdBy: client.playerId,
                creationTime: data.timestamp || Date.now(),
                collected: false
            };
            
            // Add to prism data
            prismData.prisms.push(newPrism);
            console.log(`New prism placed: ${newPrism.id} at ${newPrism.latitude}, ${newPrism.longitude}`);
            
            // Notify nearby clients
            notifyNearbyClients({
                type: 'new_prism',
                prism: newPrism
            }, client.location);
            break;
            
        default:
            console.log(`Unknown message type: ${data.type}`);
    }
}

// Send nearby prisms to client
function sendNearbyPrisms(ws, location = null) {
    const client = clients.get(ws);
    const clientLocation = location || client.location;
    
    // If no location available, can't send nearby prisms
    if (!clientLocation) return;
    
    // Find prisms within radius
    const nearbyPrisms = findNearbyPrisms(clientLocation);
    
    // Send to client
    sendToClient(ws, {
        type: 'prism_data',
        prisms: nearbyPrisms
    });
    
    console.log(`Sent ${nearbyPrisms.length} nearby prisms to ${client.id}`);
}

// Find prisms near a location
function findNearbyPrisms(location, radius = 100) {
    return prismData.prisms.filter(prism => {
        // Skip collected prisms
        if (prism.collected) return false;
        
        // Calculate distance
        const distance = calculateDistance(
            location.latitude, location.longitude,
            prism.latitude, prism.longitude
        );
        
        // Return prisms within radius
        return distance <= radius;
    });
}

// Notify clients near a location
function notifyNearbyClients(message, location, radius = 100) {
    clients.forEach((client, ws) => {
        // Skip clients without location
        if (!client.location) return;
        
        // Calculate distance
        const distance = calculateDistance(
            location.latitude, location.longitude,
            client.location.latitude, client.location.longitude
        );
        
        // Send to clients within radius
        if (distance <= radius) {
            sendToClient(ws, message);
        }
    });
}

// Calculate distance between two coordinates in meters
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
}

// Send data to client
function sendToClient(ws, data) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    }
}

// Generate unique client ID
function generateClientId() {
    return `client_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

// Save data periodically
setInterval(() => {
    saveData();
}, SAVE_INTERVAL);

// Save data to file
function saveData() {
    try {
        prismData.lastSaved = Date.now();
        fs.writeFileSync(DATA_FILE, JSON.stringify(prismData, null, 2));
        console.log(`Data saved: ${prismData.prisms.length} prisms`);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Save data on exit
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    saveData();
    process.exit();
});

// Start server
server.listen(PORT, () => {
    console.log(`Eternis-33 server running on port ${PORT}`);
});