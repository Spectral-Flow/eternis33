extends Node3D

# Prism object for Eternis-33: Prototype Shard
# Represents a collectible crystal in AR space

# Signal emitted when the Prism is collected
signal prism_collected(prism_id, position)

# Prism properties
var prism_id: String
var prism_type: String = "common"  # common, rare, corrupted
var gps_position: Vector2  # Latitude, Longitude
var is_collected: bool = false

# Visual components
var prism_mesh: MeshInstance3D
var glow_effect: OmniLight3D
var animation_player: AnimationPlayer

# Audio components
var audio_player: AudioStreamPlayer3D
var hum_sound: AudioStream
var collect_sound: AudioStream

func _ready():
    # Generate unique ID if not already set
    if prism_id == null or prism_id.empty():
        prism_id = generate_unique_id()
    
    # Set up visual components
    setup_visuals()
    
    # Set up audio
    setup_audio()
    
    # Start idle animation
    animation_player.play("idle_float")

func setup_visuals():
    # Create prism mesh
    prism_mesh = MeshInstance3D.new()
    var crystal_mesh = PrismMesh.new()
    crystal_mesh.size = Vector3(0.2, 0.4, 0.2)
    prism_mesh.mesh = crystal_mesh
    
    # Create material with glow effect
    var material = StandardMaterial3D.new()
    material.albedo_color = Color(0.2, 0.8, 1.0)
    material.emission_enabled = true
    material.emission = Color(0.2, 0.8, 1.0)
    material.emission_energy = 2.0
    prism_mesh.material_override = material
    
    # Add mesh to scene
    add_child(prism_mesh)
    
    # Add glow light
    glow_effect = OmniLight3D.new()
    glow_effect.light_color = Color(0.2, 0.8, 1.0)
    glow_effect.light_energy = 0.8
    glow_effect.omni_range = 1.0
    add_child(glow_effect)
    
    # Set up animation player
    animation_player = AnimationPlayer.new()
    add_child(animation_player)
    
    # Create idle floating animation
    create_idle_animation()

func setup_audio():
    # Set up audio player
    audio_player = AudioStreamPlayer3D.new()
    audio_player.unit_db = -10
    audio_player.max_distance = 5.0
    add_child(audio_player)
    
    # Load sounds
    # In a real project, these would be loaded from files
    hum_sound = AudioStreamOggVorbis.new()
    collect_sound = AudioStreamOggVorbis.new()
    
    # Start humming sound
    audio_player.stream = hum_sound
    audio_player.play()

func create_idle_animation():
    # Create animation for idle floating effect
    var animation = Animation.new()
    var track_index = animation.add_track(Animation.TYPE_VALUE)
    
    # Set track to animate the Y position
    animation.track_set_path(track_index, ":position:y")
    
    # Add keyframes for floating up and down
    animation.track_insert_key(track_index, 0.0, 0.0)
    animation.track_insert_key(track_index, 1.0, 0.1)
    animation.track_insert_key(track_index, 2.0, 0.0)
    
    # Set animation to loop
    animation.loop_mode = Animation.LOOP_LINEAR
    
    # Add animation to player
    animation_player.add_animation("idle_float", animation)
    
    # Create rotation animation
    track_index = animation.add_track(Animation.TYPE_VALUE)
    animation.track_set_path(track_index, ":rotation:y")
    
    # Add keyframes for slow rotation
    animation.track_insert_key(track_index, 0.0, 0.0)
    animation.track_insert_key(track_index, 4.0, 2 * PI)  # Full rotation over 4 seconds
    
    # Create collection animation
    var collect_anim = Animation.new()
    track_index = collect_anim.add_track(Animation.TYPE_VALUE)
    collect_anim.track_set_path(track_index, ":scale")
    
    # Add keyframes for shrinking effect
    collect_anim.track_insert_key(track_index, 0.0, Vector3(1, 1, 1))
    collect_anim.track_insert_key(track_index, 0.5, Vector3(0, 0, 0))
    
    # Add glow effect track
    track_index = collect_anim.add_track(Animation.TYPE_VALUE)
    collect_anim.track_set_path(track_index, "glow_effect:light_energy")
    
    # Add keyframes for increasing glow before disappearing
    collect_anim.track_insert_key(track_index, 0.0, 0.8)
    collect_anim.track_insert_key(track_index, 0.25, 3.0)
    collect_anim.track_insert_key(track_index, 0.5, 0.0)
    
    # Add animation to player
    animation_player.add_animation("collect", collect_anim)

func collect():
    if is_collected:
        return
        
    is_collected = true
    
    # Play collection animation
    animation_player.play("collect")
    
    # Play collection sound
    audio_player.stream = collect_sound
    audio_player.play()
    
    # Emit collection signal
    emit_signal("prism_collected", prism_id, gps_position)
    
    # Remove after animation completes
    await animation_player.animation_finished
    queue_free()

func _input_event(_camera, event, _position, _normal, _shape_idx):
    # Handle touch input on the Prism
    if event is InputEventScreenTouch and event.pressed:
        collect()

func generate_unique_id() -> String:
    # Generate a unique ID for this Prism
    return "%d_%d" % [Time.get_unix_time_from_system(), randi() % 1000000]

func set_prism_type(type: String):
    prism_type = type
    
    # Update visuals based on type
    match type:
        "common":
            prism_mesh.material_override.albedo_color = Color(0.2, 0.8, 1.0)
            prism_mesh.material_override.emission = Color(0.2, 0.8, 1.0)
            glow_effect.light_color = Color(0.2, 0.8, 1.0)
        "rare":
            prism_mesh.material_override.albedo_color = Color(0.8, 0.2, 1.0)
            prism_mesh.material_override.emission = Color(0.8, 0.2, 1.0)
            glow_effect.light_color = Color(0.8, 0.2, 1.0)
        "corrupted":
            prism_mesh.material_override.albedo_color = Color(1.0, 0.2, 0.2)
            prism_mesh.material_override.emission = Color(1.0, 0.2, 0.2)
            glow_effect.light_color = Color(1.0, 0.2, 0.2)