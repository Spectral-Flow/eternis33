#!/usr/bin/env python3
"""
Noise Texture Generator for Eternis-33
Creates a noise texture for use with the Prism shader
"""

import numpy as np
from PIL import Image
import os

def generate_perlin_noise_2d(shape, res):
    """Generate a 2D perlin noise texture"""
    def f(t):
        return 6*t**5 - 15*t**4 + 10*t**3
    
    delta = (res[0] / shape[0], res[1] / shape[1])
    d = (shape[0] // res[0], shape[1] // res[1])
    grid = np.mgrid[0:res[0]:delta[0], 0:res[1]:delta[1]].transpose(1, 2, 0) % 1
    
    # Gradients
    angles = 2*np.pi*np.random.rand(res[0]+1, res[1]+1)
    gradients = np.dstack((np.cos(angles), np.sin(angles)))
    gradients = gradients.repeat(d[0], 0).repeat(d[1], 1)
    
    g00 = gradients[:-d[0], :-d[1]]
    g10 = gradients[d[0]:, :-d[1]]
    g01 = gradients[:-d[0], d[1]:]
    g11 = gradients[d[0]:, d[1]:]
    
    # Ramps
    n00 = np.sum(grid * g00, 2)
    n10 = np.sum(np.dstack((grid[:, :, 0]-1, grid[:, :, 1])) * g10, 2)
    n01 = np.sum(np.dstack((grid[:, :, 0], grid[:, :, 1]-1)) * g01, 2)
    n11 = np.sum(np.dstack((grid[:, :, 0]-1, grid[:, :, 1]-1)) * g11, 2)
    
    # Interpolation
    t = f(grid)
    n0 = n00*(1-t[:, :, 0]) + t[:, :, 0]*n10
    n1 = n01*(1-t[:, :, 0]) + t[:, :, 0]*n11
    
    return np.sqrt(2)*((1-t[:, :, 1])*n0 + t[:, :, 1]*n1)

def generate_fractal_noise_2d(shape, res, octaves=1, persistence=0.5):
    """Generate a 2D fractal noise texture by layering perlin noise"""
    noise = np.zeros(shape)
    frequency = 1
    amplitude = 1.0
    
    # Add successively smaller, higher-frequency terms
    for _ in range(octaves):
        noise += amplitude * generate_perlin_noise_2d(shape, (res[0] * frequency, res[1] * frequency))
        frequency *= 2
        amplitude *= persistence
    
    # Normalize to [0, 1]
    noise = (noise - np.min(noise)) / (np.max(noise) - np.min(noise))
    return noise

def save_noise_texture(noise, filename):
    """Save the noise array as an image"""
    # Scale to 0-255 and convert to uint8
    img_data = (noise * 255).astype(np.uint8)
    img = Image.fromarray(img_data, mode='L')
    img.save(filename)
    print(f"Saved noise texture to {filename}")

def main():
    # Create output directory if it doesn't exist
    output_dir = "../assets/textures/noise"
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate noise textures
    print("Generating noise textures...")
    
    # Generate a basic noise texture
    basic_noise = generate_perlin_noise_2d((256, 256), (8, 8))
    save_noise_texture(basic_noise, os.path.join(output_dir, "basic_noise.png"))
    
    # Generate a fractal noise texture
    fractal_noise = generate_fractal_noise_2d((256, 256), (4, 4), octaves=5, persistence=0.5)
    save_noise_texture(fractal_noise, os.path.join(output_dir, "fractal_noise.png"))
    
    # Generate a shimmer noise texture (higher frequency)
    shimmer_noise = generate_fractal_noise_2d((256, 256), (8, 8), octaves=3, persistence=0.7)
    save_noise_texture(shimmer_noise, os.path.join(output_dir, "shimmer_noise.png"))
    
    print("Noise texture generation complete.")

if __name__ == "__main__":
    main()