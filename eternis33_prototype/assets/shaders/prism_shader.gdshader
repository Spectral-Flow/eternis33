shader_type spatial;

// Prism shader for Eternis-33
// Creates a glowing, crystalline effect with animated shimmer

// Parameters
uniform vec4 albedo : source_color = vec4(0.2, 0.8, 1.0, 1.0);
uniform vec4 emission_color : source_color = vec4(0.2, 0.8, 1.0, 1.0);
uniform float emission_strength : hint_range(0.0, 10.0) = 3.0;
uniform float roughness : hint_range(0.0, 1.0) = 0.1;
uniform float metallic : hint_range(0.0, 1.0) = 0.8;
uniform float refraction : hint_range(0.0, 1.0) = 0.5;
uniform float shimmer_speed : hint_range(0.0, 5.0) = 1.0;
uniform float shimmer_strength : hint_range(0.0, 1.0) = 0.3;
uniform float edge_glow : hint_range(0.0, 1.0) = 0.5;
uniform sampler2D noise_texture;

// Varying variables
varying vec3 vertex_pos;
varying vec3 normal_vec;

void vertex() {
    // Store vertex position for fragment shader
    vertex_pos = VERTEX;
    normal_vec = NORMAL;
    
    // Add subtle animation to vertices
    float time_offset = TIME * shimmer_speed;
    float noise_val = texture(noise_texture, UV + time_offset * 0.1).r;
    VERTEX += NORMAL * noise_val * 0.02;
}

void fragment() {
    // Base color and properties
    ALBEDO = albedo.rgb;
    METALLIC = metallic;
    ROUGHNESS = roughness;
    
    // Calculate fresnel effect for edge glow
    float fresnel = pow(1.0 - dot(NORMAL, VIEW), 3.0);
    
    // Calculate shimmer effect
    vec2 noise_uv = UV;
    noise_uv.x += TIME * shimmer_speed * 0.1;
    noise_uv.y += TIME * shimmer_speed * 0.2;
    float noise_val = texture(noise_texture, noise_uv).r;
    
    // Apply shimmer to emission
    vec3 emission = emission_color.rgb * emission_strength;
    emission *= 1.0 + noise_val * shimmer_strength;
    
    // Add edge glow using fresnel
    emission += emission_color.rgb * fresnel * edge_glow * 5.0;
    
    // Set final emission
    EMISSION = emission;
    
    // Add refraction
    SPECULAR = 1.0;
    SPECULAR_TINT = refraction;
}