/*
 * Eternis-33 Companion — Core AI + Simulation Framework
 * Copyright (c) 2025 Remedium Music LLC. All rights reserved.
 *
 * Licensed under the Eternis-33 Companion License.
 * You may not use this file except in compliance with the License.
 *
 * A copy of the License should have been provided with this software.
 * If not, contact legal@remediummusic.com
 *
 * NOTICE:
 * - AI personality, dialogue, and learning models are proprietary.
 * - Unauthorized commercial use, modification, or redistribution is prohibited.
 * - Personal/educational experimentation is allowed within the License terms.
 *
 * Remedium Music LLC | Denver, CO | www.remediummusic.com
 */

// Companion Core Unit Tests
const CompanionCore = require('../src/companion_core');

describe('CompanionCore', () => {
  let companion;
  
  beforeEach(() => {
    companion = new CompanionCore();
  });
  
  test('should initialize with default archetype', async () => {
    const result = await companion.initialize();
    expect(result).toHaveProperty('archetype');
    expect(result).toHaveProperty('profile');
    expect(companion.initialized).toBe(true);
  });
  
  test('should process player input and generate response', async () => {
    // Initialize companion first
    await companion.initialize();
    
    const input = "What is this prism I found?";
    const context = {
      inventory: ["Prism"],
      location: "abandoned rail yard",
      time: "late evening"
    };
    
    const response = await companion.processInput(input, context);
    expect(response).toHaveProperty('text');
    expect(response).toHaveProperty('voice');
  });
  
  test('should get appropriate coding game', async () => {
    // Initialize companion first
    await companion.initialize();
    
    const game = companion.getCodingGame();
    expect(game).toHaveProperty('title');
    expect(game).toHaveProperty('description');
    expect(game).toHaveProperty('skills');
  });
  
  test('should process real-world data', async () => {
    // Initialize companion first
    await companion.initialize();
    
    const feedback = companion.processRealWorldData('steps', 1000);
    expect(feedback).toHaveProperty('narrative');
    expect(feedback).toHaveProperty('reward');
    expect(feedback).toHaveProperty('simulationEffect');
  });
  
  test('should get companion status', async () => {
    // Initialize companion first
    await companion.initialize();
    
    const status = companion.getStatus();
    expect(status).toHaveProperty('archetype');
    expect(status).toHaveProperty('profile');
    expect(status).toHaveProperty('traitPercentages');
    expect(status).toHaveProperty('skillLevel');
    expect(status).toHaveProperty('realWorldData');
  });
  
  test('should update companion mood', async () => {
    // Initialize companion first
    await companion.initialize();
    
    companion.updateMood('happy');
    // Verify mood is set (would need a getter method in real implementation)
    expect(companion.conversationLayer.currentMood).toBe('happy');
  });
  
  test('should update companion voice tone', async () => {
    // Initialize companion first
    await companion.initialize();
    
    companion.updateVoiceTone('warm');
    // Verify voice tone is set (would need a getter method in real implementation)
    expect(companion.conversationLayer.voiceTone).toBe('warm');
  });
});