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

// Coding Game Engine Unit Tests
const CodingGameEngine = require('../src/coding_game_engine');

describe('CodingGameEngine', () => {
  let gameEngine;
  
  beforeEach(() => {
    // Create a mock personality matrix for testing
    const mockPersonalityMatrix = {
      getProfile: jest.fn().mockReturnValue({
        warm: 5,
        cold: 2,
        pragmatic: 4,
        idealist: 3,
        guarded: 1,
        open: 6,
        cryptic: 2,
        direct: 5
      }),
      updatePersonality: jest.fn()
    };
    
    gameEngine = new CodingGameEngine(mockPersonalityMatrix);
  });
  
  test('should assess player skill level', () => {
    const skillLevel = gameEngine.assessSkillLevel();
    expect(skillLevel).toBeGreaterThanOrEqual(1);
    expect(skillLevel).toBeLessThanOrEqual(10);
  });
  
  test('should get appropriate coding game', () => {
    const game = gameEngine.getCodingGame();
    expect(game).toHaveProperty('title');
    expect(game).toHaveProperty('description');
    expect(game).toHaveProperty('difficulty');
    expect(game).toHaveProperty('narrative');
    expect(game).toHaveProperty('skills');
  });
  
  test('should create game instance with correct properties', () => {
    const game = gameEngine.createGameInstance('prism_repair', 2);
    expect(game.title).toBe('Prism Repair');
    expect(game.difficulty).toBe('Beginner');
  });
  
  test('should update game progress', () => {
    gameEngine.updateProgress('prism_repair_1', true);
    
    const progress = gameEngine.getProgressReport();
    expect(progress.gameProgress['prism_repair_1'].attempts).toBe(1);
    expect(progress.gameProgress['prism_repair_1'].successes).toBe(1);
  });
  
  test('should get progress report', () => {
    const progress = gameEngine.getProgressReport();
    expect(progress).toHaveProperty('skillLevel');
    expect(progress).toHaveProperty('unlockedGames');
    expect(progress).toHaveProperty('gameProgress');
  });
  
  test('should get narrative wrapper for game type', () => {
    const wrapper = gameEngine.getNarrativeWrapper('prism_repair');
    expect(wrapper).toHaveProperty('intro');
    expect(wrapper).toHaveProperty('success');
    expect(wrapper).toHaveProperty('failure');
  });
});