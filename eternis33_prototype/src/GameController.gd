extends Node

# Game Controller for Eternis-33: Prototype Shard
# Main controller that coordinates all game systems

# References to other managers
var ar_controller
var location_manager
var inventory_manager

# UI elements
var ui_compass
var ui_mini_map
var ui_inventory_button
var ui_lore_popup

# Game state
var is_initialized = false
var is_scanning = false

func _ready():
    # Initialize all systems
    initialize_game()

func initialize_game():
    print("Initializing Eternis-33: Prototype Shard...")
    
    # Initialize AR system
    initialize_ar_system()
    
    # Initialize location system
    initialize_location_system()
    
    # Initialize inventory system
    initialize_inventory_system()
    
    # Initialize UI
    initialize_ui()
    
    # Connect signals between systems
    connect_signals()
    
    # Game is now initialized
    is_initialized = true
    print("Game initialization complete")

func initialize_ar_system():
    # Create AR controller
    ar_controller = $ARController
    if !ar_controller:
        ar_controller = load("res://src/ARController.gd").new()
        ar_controller.name = "ARController"
        add_child(ar_controller)
    
    print("AR system initialized")

func initialize_location_system():
    # Create location manager
    location_manager = $LocationManager
    if !location_manager:
        location_manager = load("res://src/LocationManager.gd").new()
        location_manager.name = "LocationManager"
        add_child(location_manager)
    
    print("Location system initialized")

func initialize_inventory_system():
    # Create inventory manager
    inventory_manager = $InventoryManager
    if !inventory_manager:
        inventory_manager = load("res://src/InventoryManager.gd").new()
        inventory_manager.name = "InventoryManager"
        add_child(inventory_manager)
    
    print("Inventory system initialized")

func initialize_ui():
    # In a real implementation, this would:
    # 1. Create or reference UI elements
    # 2. Set up initial UI state
    # 3. Connect UI signals
    
    print("UI initialized")

func connect_signals():
    # Connect AR signals
    ar_controller.connect("plane_detected", self, "_on_plane_detected")
    ar_controller.connect("prism_placed", self, "_on_prism_placed")
    
    # Connect location signals
    location_manager.connect("location_updated", self, "_on_location_updated")
    location_manager.connect("prism_detected", self, "_on_prism_detected")
    
    # Connect inventory signals
    inventory_manager.connect("inventory_updated", self, "_on_inventory_updated")
    inventory_manager.connect("first_collection", self, "_on_first_collection")
    
    print("Signals connected")

# Signal handlers
func _on_plane_detected(transform, size):
    # Handle detected AR plane
    print("Plane detected")
    
    # If we're in scanning mode, we can now place Prisms
    if is_scanning:
        # In a real implementation, this would visualize the plane
        pass

func _on_prism_placed(prism_instance, position):
    # Handle Prism placement in AR
    print("Prism placed in AR space")
    
    # Anchor the Prism to the current GPS location
    location_manager.anchor_prism_to_location(
        prism_instance, 
        location_manager.current_latitude, 
        location_manager.current_longitude
    )

func _on_location_updated(latitude, longitude):
    # Handle location updates
    print("Location updated: ", latitude, ", ", longitude)
    
    # Update UI compass and map
    update_ui_location(latitude, longitude)

func _on_prism_detected(prism_data):
    # Handle detection of a nearby Prism
    print("Prism detected nearby: ", prism_data.id)
    
    # In a real implementation, this would:
    # 1. Create a Prism in AR space at the appropriate location
    # 2. Update UI to indicate nearby Prism
    
    # For this prototype, we'll simulate placing a Prism
    var simulated_position = Vector3(
        (prism_data.latitude - location_manager.current_latitude) * 1000,
        0,
        (prism_data.longitude - location_manager.current_longitude) * 1000
    )
    
    # Place Prism in AR space
    var prism_instance = ar_controller.place_prism_at_hit(
        simulated_position,
        Vector3(0, 1, 0)  # Assuming horizontal surface
    )
    
    # Connect Prism signals
    prism_instance.connect("prism_collected", self, "_on_prism_collected")
    
    # Set Prism type
    prism_instance.set_prism_type(prism_data.type)
    
    # Store Prism ID
    prism_instance.prism_id = prism_data.id

func _on_prism_collected(prism_id, position):
    # Handle Prism collection
    print("Prism collected: ", prism_id)
    
    # Report collection to location manager
    location_manager.report_prism_collected(prism_id)
    
    # Add to inventory
    var prism_data = {
        "id": prism_id,
        "type": "common",  # In a real implementation, this would be the actual type
        "latitude": location_manager.current_latitude,
        "longitude": location_manager.current_longitude,
        "collection_time": Time.get_unix_time_from_system()
    }
    inventory_manager.add_prism(prism_data)

func _on_inventory_updated(prism_count):
    # Handle inventory updates
    print("Inventory updated: ", prism_count, " Prisms")
    
    # Update UI
    update_ui_inventory(prism_count)

func _on_first_collection():
    # Handle first Prism collection
    print("First Prism collected!")
    
    # Show lore popup
    inventory_manager.show_lore_popup()

# UI update functions
func update_ui_location(latitude, longitude):
    # Update compass and mini-map
    # In a real implementation, this would update actual UI elements
    
    print("UI location updated")

func update_ui_inventory(prism_count):
    # Update inventory display
    # In a real implementation, this would update actual UI elements
    
    print("UI inventory updated: ", prism_count, " Prisms")

# Game control functions
func start_scanning():
    # Start scanning for surfaces
    is_scanning = true
    print("Started scanning for surfaces")

func stop_scanning():
    # Stop scanning for surfaces
    is_scanning = false
    print("Stopped scanning for surfaces")

func toggle_inventory():
    # Show/hide inventory
    inventory_manager.show_inventory()

func _process(delta):
    # Main game loop
    if !is_initialized:
        return
    
    # Process AR updates
    # In a real implementation, this would handle continuous AR tracking
    
    # Process location updates
    # In a real implementation, this would handle continuous location tracking