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

// Emotional Bond Tracker Unit Tests
const EmotionalBondTracker = require('../src/emotional_bond_tracker');

describe('EmotionalBondTracker', () => {
  let tracker;

  beforeEach(() => {
    tracker = new EmotionalBondTracker();
  });

  test('should initialize with neutral bond level', () => {
    expect(tracker.bondLevel).toBe(0);
    expect(tracker.bondCategories.trust).toBe(50);
    expect(tracker.getBondCategory()).toBe('acquaintances');
  });

  test('should update bond on positive interaction', () => {
    const result = tracker.updateBond({
      type: 'positive_interaction',
      context: { message: 'thank you' },
      intensity: 1,
    });

    expect(result.bondLevel).toBeGreaterThan(0);
    expect(result.bondChange).toBeGreaterThan(0);
    expect(tracker.bondCategories.emotional_support).toBeGreaterThan(0);
  });

  test('should handle negative interactions', () => {
    const result = tracker.updateBond({
      type: 'negative_interaction',
      context: { message: 'frustrated' },
      intensity: 1,
    });

    expect(result.bondLevel).toBeLessThan(0);
    expect(result.bondChange).toBeLessThan(0);
    expect(tracker.bondCategories.trust).toBeLessThan(50);
  });

  test('should detect milestones', () => {
    // Build up bond to trigger milestone
    for (let i = 0; i < 15; i++) {
      tracker.updateBond({
        type: 'positive_interaction',
        intensity: 2,
      });
    }

    expect(tracker.milestones.length).toBeGreaterThan(0);
    expect(tracker.milestones[0].name).toBe('Initial Trust');
  });

  test('should track shared experiences', () => {
    tracker.updateBond({
      type: 'successful_collaboration',
      context: { activity: 'coding' },
      intensity: 3,
    });

    expect(tracker.sharedExperiences.length).toBeGreaterThan(0);
    expect(tracker.sharedExperiences[0].type).toBe('successful_collaboration');
  });

  test('should provide bond insights', () => {
    // Add some interactions
    tracker.updateBond({ type: 'learning_together', intensity: 2 });
    tracker.updateBond({ type: 'positive_interaction', intensity: 1 });

    const insights = tracker.getBondInsights();
    expect(Array.isArray(insights)).toBe(true);
    expect(insights.length).toBeGreaterThan(0);
  });

  test('should calculate trends', () => {
    // Create history for trend calculation
    for (let i = 0; i < 10; i++) {
      tracker.updateBond({
        type: i < 5 ? 'negative_interaction' : 'positive_interaction',
        intensity: 1,
      });
    }

    const trend = tracker.calculateRecentTrend();
    expect(['strengthening', 'weakening', 'stable']).toContain(trend);
  });

  test('should provide memory context', () => {
    tracker.updateBond({
      type: 'deep_conversation',
      context: { topic: 'personal growth' },
      intensity: 2,
    });

    const context = tracker.getSharedExperienceContext();
    expect(context.totalExperiences).toBeGreaterThan(0);
    expect(Array.isArray(context.recentExperiences)).toBe(true);
    expect(Array.isArray(context.mostSignificant)).toBe(true);
  });
});
