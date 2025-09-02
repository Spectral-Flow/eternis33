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

// Personality Quiz Unit Tests
const PersonalityQuiz = require('../src/personality_quiz');

describe('PersonalityQuiz', () => {
  let quiz;

  beforeEach(() => {
    quiz = new PersonalityQuiz();
  });

  test('should return quiz questions', () => {
    const questions = quiz.getQuestions();
    expect(questions).toHaveLength(5);
    expect(questions[0]).toHaveProperty('id');
    expect(questions[0]).toHaveProperty('text');
    expect(questions[0]).toHaveProperty('choices');
  });

  test('should calculate archetype based on responses', () => {
    const responses = [0, 1, 2, 3, 1];
    const result = quiz.calculateArchetype(responses);

    expect(result).toHaveProperty('archetype');
    expect(result).toHaveProperty('weights');
    expect(typeof result.archetype).toBe('string');
    expect(typeof result.weights).toBe('object');
  });

  test('should map to Shadow archetype with pragmatic responses', () => {
    const responses = [0, 0, 0, 0, 0]; // All pragmatic choices
    const result = quiz.calculateArchetype(responses);

    // Based on the weighting system, these responses should map to Shadow
    expect(result.archetype).toBe('Shadow');
  });

  test('should map to Oracle archetype with idealist responses', () => {
    const responses = [1, 1, 1, 1, 1]; // All idealist choices
    const result = quiz.calculateArchetype(responses);

    // Based on the weighting system, these responses should map to Oracle
    expect(result.archetype).toBe('Oracle');
  });

  test('should map to Sparkmonger archetype with open responses', () => {
    const responses = [2, 2, 3, 2, 2]; // Mostly open choices
    const result = quiz.calculateArchetype(responses);

    // Based on the weighting system, these responses should map to Sparkmonger
    expect(result.archetype).toBe('Sparkmonger');
  });
});
