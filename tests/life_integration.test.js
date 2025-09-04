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

// Life Integration Module Unit Tests
const LifeIntegration = require('../src/life_integration');

describe('LifeIntegration', () => {
  let lifeIntegration;

  beforeEach(() => {
    // Create mock modules for testing
    const mockPersonalityMatrix = {
      updatePersonality: jest.fn(),
    };

    const mockConversationLayer = {
      // Mock conversation layer methods if needed
    };

    const mockCodingGameEngine = {
      // Mock coding game engine methods if needed
    };

    lifeIntegration = new LifeIntegration(
      mockPersonalityMatrix,
      mockConversationLayer,
      mockCodingGameEngine
    );
  });

  test('should process real-world steps data', () => {
    const feedback = lifeIntegration.processRealWorldData('steps', 1500);
    expect(feedback).toHaveProperty('narrative');
    expect(feedback).toHaveProperty('reward');
    expect(feedback).toHaveProperty('simulationEffect');

    const summary = lifeIntegration.getRealWorldDataSummary();
    expect(summary.steps).toBe(1500);
  });

  test('should process completed tasks', () => {
    lifeIntegration.processRealWorldData('task_completed', 1);
    lifeIntegration.processRealWorldData('task_completed', 1);

    const summary = lifeIntegration.getRealWorldDataSummary();
    expect(summary.tasksCompleted).toBe(2);
  });

  test('should process journal entries', () => {
    lifeIntegration.processRealWorldData('journal_entry', 1);
    lifeIntegration.processRealWorldData('journal_entry', 1);
    lifeIntegration.processRealWorldData('journal_entry', 1);

    const summary = lifeIntegration.getRealWorldDataSummary();
    expect(summary.journalEntries).toBe(3);
  });

  test('should process coding practice time', () => {
    lifeIntegration.processRealWorldData('coding_practice', 30);
    lifeIntegration.processRealWorldData('coding_practice', 45);

    const summary = lifeIntegration.getRealWorldDataSummary();
    expect(summary.codingPracticeTime).toBe(75);
  });

  test('should generate simulation feedback', () => {
    const feedback = lifeIntegration.generateSimulationFeedback('steps', 1000);
    expect(feedback.narrative).toContain('scouted');
    expect(feedback.reward).toContain('Prism');
    expect(feedback.simulationEffect).toContain('scavenging');
  });

  test('should map real-world actions to simulation parameters', () => {
    const mapping = lifeIntegration.mapToSimulation('steps', 1000);
    expect(mapping.simulationParameter).toBe('scavenging_distance');
    expect(mapping.value).toBe(1000);
  });

  test('should add simulation events to log', () => {
    lifeIntegration.addSimulationEvent('player_walked_1000_steps');
    lifeIntegration.addSimulationEvent('player_completed_coding_challenge');

    const events = lifeIntegration.getSimulationEvents();
    expect(events).toHaveLength(2);
  });
});
