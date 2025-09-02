extends Node

# Location Manager for Eternis-33: Prototype Shard
# Handles GPS location, mapping, and Prism anchoring to real-world coordinates

# Signal emitted when player location is updated
signal location_updated(latitude, longitude)
# Signal emitted when a nearby Prism is detected
signal prism_detected(prism_data)

# Location variables
var current_latitude: float = 0.0
var current_longitude: float = 0.0
var location_accuracy: float = 0.0
var last_update_time: int = 0

# Map variables
var map_node: Node
var map_zoom: int = 16
var map_style: String = "dark-v10"  # Cyberpunk-style dark map

# Prism location variables
var nearby_prisms = []
var detection_radius: float = 100.0  # meters

# Backend connection
var backend_client: WebSocketClient

func _ready():
    # Initialize location services
    initialize_location_services()
    
    # Initialize map
    initialize_map()
    
    # Connect to backend
    connect_to_backend()
    
    # Start location updates
    start_location_updates()

func initialize_location_services():
    # In a real implementation, this would:
    # 1. Request location permissions
    # 2. Initialize the device's location services
    # 3. Set up callbacks for location updates
    
    print("Location services initialized")

func initialize_map():
    # In a real implementation, this would:
    # 1. Initialize the map view using OpenStreetMap/Mapbox
    # 2. Set initial position and zoom level
    # 3. Configure map style for cyberpunk aesthetic
    
    print("Map initialized")

func connect_to_backend():
    # Initialize WebSocket client
    backend_client = WebSocketClient.new()
    
    # Connect signals
    backend_client.connect("connection_established", self, "_on_connection_established")
    backend_client.connect("connection_error", self, "_on_connection_error")
    backend_client.connect("data_received", self, "_on_data_received")
    
    # Connect to server
    # In a real implementation, this would connect to an actual server
    var err = backend_client.connect_to_url("wss://eternis33-backend.example.com")
    if err != OK:
        print("Failed to connect to backend: ", err)

func start_location_updates():
    # In a real implementation, this would start receiving regular location updates
    # For this prototype, we'll simulate location updates
    
    # Create a timer to simulate location updates
    var timer = Timer.new()
    timer.wait_time = 5.0  # Update every 5 seconds
    timer.autostart = true
    timer.connect("timeout", self, "_on_location_update")
    add_child(timer)
    
    print("Location updates started")

func _on_location_update():
    # In a real implementation, this would receive actual GPS coordinates
    # For this prototype, we'll simulate small changes in location
    
    # Simulate small movement
    current_latitude += (randf() - 0.5) * 0.0001
    current_longitude += (randf() - 0.5) * 0.0001
    location_accuracy = 10.0  # 10 meters accuracy
    last_update_time = Time.get_unix_time_from_system()
    
    # Emit signal with new location
    emit_signal("location_updated", current_latitude, current_longitude)
    
    # Update map position
    update_map_position()
    
    # Check for nearby Prisms
    check_nearby_prisms()

func update_map_position():
    # Update the map to center on current location
    # In a real implementation, this would call the map API
    
    print("Map updated to: ", current_latitude, ", ", current_longitude)

func check_nearby_prisms():
    # In a real implementation, this would:
    # 1. Query the backend for Prisms near the current location
    # 2. Process the response and emit signals for nearby Prisms
    
    # For this prototype, we'll simulate finding Prisms occasionally
    if randf() < 0.3:  # 30% chance to find a Prism on each location update
        var simulated_prism = {
            "id": "sim_" + str(randi()),
            "latitude": current_latitude + (randf() - 0.5) * 0.0002,
            "longitude": current_longitude + (randf() - 0.5) * 0.0002,
            "type": "common",
            "collected": false
        }
        
        emit_signal("prism_detected", simulated_prism)
        nearby_prisms.append(simulated_prism)

func get_distance_between(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    # Calculate distance between two GPS coordinates using Haversine formula
    var R = 6371000  # Earth radius in meters
    var phi1 = lat1 * PI / 180
    var phi2 = lat2 * PI / 180
    var delta_phi = (lat2 - lat1) * PI / 180
    var delta_lambda = (lon2 - lon1) * PI / 180
    
    var a = sin(delta_phi/2) * sin(delta_phi/2) + \
            cos(phi1) * cos(phi2) * \
            sin(delta_lambda/2) * sin(delta_lambda/2)
    var c = 2 * atan2(sqrt(a), sqrt(1-a))
    var distance = R * c
    
    return distance

func anchor_prism_to_location(prism_instance, latitude: float, longitude: float):
    # Associate a Prism instance with GPS coordinates
    prism_instance.gps_position = Vector2(latitude, longitude)
    
    # In a real implementation, this would also:
    # 1. Save the Prism location to the backend
    # 2. Set up proper AR anchoring
    
    print("Prism anchored at: ", latitude, ", ", longitude)

func report_prism_collected(prism_id: String):
    # Report to the backend that a Prism was collected
    # In a real implementation, this would send a message to the server
    
    # Find and mark the Prism as collected in our local list
    for prism in nearby_prisms:
        if prism.id == prism_id:
            prism.collected = true
            break
    
    print("Prism collected: ", prism_id)

# WebSocket callbacks
func _on_connection_established(protocol):
    print("Connected to backend with protocol: ", protocol)
    
    # Send initial location to server
    var initial_data = {
        "type": "location_update",
        "latitude": current_latitude,
        "longitude": current_longitude
    }
    backend_client.get_peer(1).put_packet(JSON.stringify(initial_data).to_utf8())

func _on_connection_error():
    print("Failed to connect to backend")

func _on_data_received():
    # Process data from the server
    var packet = backend_client.get_peer(1).get_packet()
    var data = JSON.parse_string(packet.get_string_from_utf8())
    
    if data.type == "prism_update":
        # Update nearby Prisms based on server data
        nearby_prisms = data.prisms
        
        # Emit signals for each Prism
        for prism in nearby_prisms:
            emit_signal("prism_detected", prism)

func _process(delta):
    # Update WebSocket client
    if backend_client.get_connection_status() == WebSocketClient.CONNECTION_CONNECTING || \
       backend_client.get_connection_status() == WebSocketClient.CONNECTION_CONNECTED:
        backend_client.poll()