extends Node

# Inventory Manager for Eternis-33: Prototype Shard
# Handles player's collection of Prisms and inventory UI

# Signal emitted when inventory is updated
signal inventory_updated(prism_count)
# Signal emitted when first Prism is collected (for lore popup)
signal first_collection()

# Inventory data
var collected_prisms = []
var has_collected_first_prism = false

# UI references
var inventory_ui
var lore_popup

func _ready():
    # Load saved inventory if available
    load_inventory()
    
    # Initialize UI elements
    initialize_ui()

func initialize_ui():
    # In a real implementation, this would:
    # 1. Create or reference UI elements for inventory display
    # 2. Set up the lore popup
    # 3. Connect UI signals
    
    print("Inventory UI initialized")

func add_prism(prism_data):
    # Add a Prism to the inventory
    collected_prisms.append(prism_data)
    
    # Check if this is the first Prism collected
    if !has_collected_first_prism:
        has_collected_first_prism = true
        emit_signal("first_collection")
    
    # Update UI
    emit_signal("inventory_updated", collected_prisms.size())
    
    # Save inventory
    save_inventory()
    
    print("Prism added to inventory: ", prism_data.id)
    print("Total Prisms: ", collected_prisms.size())

func get_prism_count() -> int:
    return collected_prisms.size()

func get_prism_count_by_type(type: String) -> int:
    var count = 0
    for prism in collected_prisms:
        if prism.type == type:
            count += 1
    return count

func show_inventory():
    # Display the inventory UI
    # In a real implementation, this would show a proper UI
    
    print("Showing inventory:")
    print("Total Prisms: ", collected_prisms.size())
    print("Common Prisms: ", get_prism_count_by_type("common"))
    print("Rare Prisms: ", get_prism_count_by_type("rare"))
    print("Corrupted Prisms: ", get_prism_count_by_type("corrupted"))

func show_lore_popup():
    # Show the lore popup for first collection
    # In a real implementation, this would display a UI element
    
    print("LORE: You hold a Prism. Data condensed into crystal. The city remembers you.")

func save_inventory():
    # Save inventory data to device storage
    # In a real implementation, this would use Godot's save system
    
    # Convert inventory to a serializable format
    var save_data = {
        "has_collected_first_prism": has_collected_first_prism,
        "prisms": []
    }
    
    for prism in collected_prisms:
        save_data.prisms.append({
            "id": prism.id,
            "type": prism.type,
            "latitude": prism.latitude,
            "longitude": prism.longitude,
            "collection_time": prism.collection_time if prism.has("collection_time") else 0
        })
    
    # In a real implementation, this would save to a file
    print("Inventory saved")

func load_inventory():
    # Load inventory data from device storage
    # In a real implementation, this would use Godot's save system
    
    # For this prototype, we'll start with an empty inventory
    has_collected_first_prism = false
    collected_prisms = []
    
    print("Inventory loaded")