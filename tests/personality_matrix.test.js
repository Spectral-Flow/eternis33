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

// Personality Matrix Unit Tests
const PersonalityMatrix = require('../src/personality_matrix');

describe('PersonalityMatrix', () => {
  let matrix;

  beforeEach(() => {
    matrix = new PersonalityMatrix();
  });

  test('should initialize with default profile', () => {
    const profile = matrix.getProfile();
    expect(profile).toHaveProperty('warm');
    expect(profile).toHaveProperty('cold');
    expect(profile).toHaveProperty('pragmatic');
    expect(profile).toHaveProperty('idealist');
    expect(profile).toHaveProperty('guarded');
    expect(profile).toHaveProperty('open');
    expect(profile).toHaveProperty('cryptic');
    expect(profile).toHaveProperty('direct');
  });

  test('should update personality with positive interaction', () => {
    const initialProfile = matrix.getProfile();
    matrix.updatePersonality({ type: 'positive' });

    const updatedProfile = matrix.getProfile();
    expect(updatedProfile.warm).toBeGreaterThan(initialProfile.warm);
    expect(updatedProfile.open).toBeGreaterThan(initialProfile.open);
  });

  test('should update personality with negative interaction', () => {
    const initialProfile = matrix.getProfile();
    matrix.updatePersonality({ type: 'negative' });

    const updatedProfile = matrix.getProfile();
    expect(updatedProfile.cold).toBeGreaterThan(initialProfile.cold);
    expect(updatedProfile.guarded).toBeGreaterThan(initialProfile.guarded);
  });

  test('should update personality with coding success', () => {
    const initialProfile = matrix.getProfile();
    matrix.updatePersonality({ type: 'coding_success' });

    const updatedProfile = matrix.getProfile();
    expect(updatedProfile.pragmatic).toBeGreaterThan(initialProfile.pragmatic);
    expect(updatedProfile.direct).toBeGreaterThan(initialProfile.direct);
  });

  test('should update personality with coding struggle', () => {
    const initialProfile = matrix.getProfile();
    matrix.updatePersonality({ type: 'coding_struggle' });

    const updatedProfile = matrix.getProfile();
    expect(updatedProfile.idealist).toBeGreaterThan(initialProfile.idealist);
    expect(updatedProfile.cryptic).toBeGreaterThan(initialProfile.cryptic);
  });

  test('should get trait percentages', () => {
    const percentages = matrix.getTraitPercentages();
    expect(percentages).toHaveProperty('warm');
    expect(percentages).toHaveProperty('cold');
    expect(percentages).toHaveProperty('pragmatic');
    expect(percentages).toHaveProperty('idealist');
    expect(percentages).toHaveProperty('guarded');
    expect(percentages).toHaveProperty('open');
    expect(percentages).toHaveProperty('cryptic');
    expect(percentages).toHaveProperty('direct');

    // Percentages should be between 0 and 100
    Object.values(percentages).forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  test('should track interaction history', () => {
    matrix.updatePersonality({ type: 'positive' });
    matrix.updatePersonality({ type: 'coding_success' });

    const history = matrix.getInteractionHistory();
    expect(history).toHaveLength(2);
    expect(history[0].type).toBe('positive');
    expect(history[1].type).toBe('coding_success');
  });
});
