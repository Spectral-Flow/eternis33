extends Node

# Network Manager for Eternis-33: Prototype Shard
# Handles communication with the backend server

# Signals
signal connected_to_server
signal connection_failed
signal prism_data_received(prisms)
signal prism_sync_complete

# Network configuration
var server_url = "wss://eternis33-backend.example.com"
var reconnect_delay = 5.0  # seconds
var max_reconnect_attempts = 5

# WebSocket client
var client = WebSocketClient.new()
var connection_attempts = 0
var is_connected = false

# Player data
var player_id = ""
var player_name = ""

func _ready():
    # Initialize network client
    initialize_client()
    
    # Generate or load player ID
    initialize_player_id()
    
    # Connect to server
    connect_to_server()

func initialize_client():
    # Connect WebSocket signals
    client.connect("connection_established", self, "_on_connection_established")
    client.connect("connection_error", self, "_on_connection_error")
    client.connect("connection_closed", self, "_on_connection_closed")
    client.connect("data_received", self, "_on_data_received")
    
    print("Network client initialized")

func initialize_player_id():
    # In a real implementation, this would:
    # 1. Try to load a saved player ID from device storage
    # 2. Generate a new ID if none exists
    
    # For this prototype, we'll generate a simple ID
    player_id = "player_" + str(randi() % 1000000)
    
    print("Player ID: ", player_id)

func connect_to_server():
    print("Connecting to server: ", server_url)
    
    # Attempt to connect
    var err = client.connect_to_url(server_url)
    if err != OK:
        print("Failed to connect to server: ", err)
        _on_connection_error()
        return
    
    connection_attempts += 1

# WebSocket signal handlers
func _on_connection_established(protocol):
    print("Connected to server with protocol: ", protocol)
    
    # Reset connection attempts
    connection_attempts = 0
    is_connected = true
    
    # Send player info
    send_player_info()
    
    # Emit signal
    emit_signal("connected_to_server")

func _on_connection_error():
    print("Connection error")
    is_connected = false
    
    # Attempt to reconnect
    if connection_attempts < max_reconnect_attempts:
        print("Reconnecting in ", reconnect_delay, " seconds...")
        await get_tree().create_timer(reconnect_delay).timeout
        connect_to_server()
    else:
        print("Max reconnection attempts reached")
        emit_signal("connection_failed")

func _on_connection_closed(was_clean_close):
    print("Connection closed. Clean: ", was_clean_close)
    is_connected = false
    
    # Attempt to reconnect if not a clean close
    if !was_clean_close && connection_attempts < max_reconnect_attempts:
        print("Reconnecting in ", reconnect_delay, " seconds...")
        await get_tree().create_timer(reconnect_delay).timeout
        connect_to_server()

func _on_data_received():
    # Process received data
    var packet = client.get_peer(1).get_packet()
    var text = packet.get_string_from_utf8()
    
    # Parse JSON data
    var json = JSON.new()
    var error = json.parse(text)
    if error == OK:
        var data = json.get_data()
        process_server_message(data)
    else:
        print("JSON Parse Error: ", json.get_error_message(), " at line ", json.get_error_line())

# Message processing
func process_server_message(data):
    # Process different message types
    match data.type:
        "prism_data":
            # Received Prism data
            print("Received Prism data: ", data.prisms.size(), " Prisms")
            emit_signal("prism_data_received", data.prisms)
        
        "prism_sync_complete":
            # Prism synchronization complete
            print("Prism sync complete")
            emit_signal("prism_sync_complete")
        
        "player_info_response":
            # Player info response
            print("Player info confirmed")
        
        _:
            # Unknown message type
            print("Unknown message type: ", data.type)

# Send messages to server
func send_player_info():
    # Send player information to server
    if !is_connected:
        print("Cannot send player info: Not connected")
        return
    
    var data = {
        "type": "player_info",
        "player_id": player_id,
        "player_name": player_name
    }
    
    send_data(data)

func send_location_update(latitude, longitude):
    # Send player location update
    if !is_connected:
        print("Cannot send location update: Not connected")
        return
    
    var data = {
        "type": "location_update",
        "player_id": player_id,
        "latitude": latitude,
        "longitude": longitude,
        "timestamp": Time.get_unix_time_from_system()
    }
    
    send_data(data)

func send_prism_collected(prism_id, latitude, longitude):
    # Send Prism collection notification
    if !is_connected:
        print("Cannot send Prism collection: Not connected")
        return
    
    var data = {
        "type": "prism_collected",
        "player_id": player_id,
        "prism_id": prism_id,
        "latitude": latitude,
        "longitude": longitude,
        "timestamp": Time.get_unix_time_from_system()
    }
    
    send_data(data)

func request_nearby_prisms(latitude, longitude, radius):
    # Request Prisms near a location
    if !is_connected:
        print("Cannot request nearby Prisms: Not connected")
        return
    
    var data = {
        "type": "request_nearby_prisms",
        "player_id": player_id,
        "latitude": latitude,
        "longitude": longitude,
        "radius": radius
    }
    
    send_data(data)

func send_data(data):
    # Send data to server
    var json_string = JSON.stringify(data)
    var packet = json_string.to_utf8()
    client.get_peer(1).put_packet(packet)

func _process(delta):
    # Process WebSocket client
    if client.get_connection_status() != WebSocketClient.CONNECTION_DISCONNECTED:
        client.poll()