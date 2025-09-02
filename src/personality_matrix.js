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

// Eternis-33 Companion Personality Matrix
// This script manages the adaptive personality engine

class PersonalityMatrix {
  constructor(initialProfile) {
    // Initialize with the profile from the personality quiz
    this.profile = initialProfile || {
      warm: 0,
      cold: 0,
      pragmatic: 0,
      idealist: 0,
      guarded: 0,
      open: 0,
      cryptic: 0,
      direct: 0,
    };

    // Define personality axes with their ranges
    this.axes = {
      warmth: { min: -10, max: 10, low: 'cold', high: 'warm' },
      approach: { min: -10, max: 10, low: 'pragmatic', high: 'idealist' },
      openness: { min: -10, max: 10, low: 'guarded', high: 'open' },
      communication: { min: -10, max: 10, low: 'cryptic', high: 'direct' },
    };

    // Initialize archetype
    this.archetype = null;

    // Store interaction history
    this.interactionHistory = [];
  }

  // Update personality based on player interaction
  updatePersonality(interactionData) {
    // Store interaction for memory anchoring
    this.interactionHistory.push(interactionData);

    // Apply weight adjustments based on interaction type
    switch (interactionData.type) {
      case 'positive':
        this.profile.warm += 1;
        this.profile.open += 1;
        break;
      case 'negative':
        this.profile.cold += 1;
        this.profile.guarded += 1;
        break;
      case 'coding_success':
        this.profile.pragmatic += 1;
        this.profile.direct += 1;
        break;
      case 'coding_struggle':
        this.profile.idealist += 1;
        this.profile.cryptic += 1;
        break;
      case 'life_integration':
        // Adjust based on specific life actions
        if (interactionData.action === 'task_completed') {
          this.profile.pragmatic += 1;
        } else if (interactionData.action === 'journal_entry') {
          this.profile.idealist += 1;
          this.profile.open += 1;
        } else if (interactionData.action === 'skipped_coding') {
          this.profile.cold += 1;
          this.profile.guarded += 1;
        }
        break;
    }

    // Normalize weights to stay within defined ranges
    this.normalizeWeights();

    // Update archetype based on new weights
    this.updateArchetype();
  }

  // Normalize weights to stay within axis ranges
  normalizeWeights() {
    // eslint-disable-next-line no-unused-vars
    for (const [_key, axis] of Object.entries(this.axes)) {
      const lowTrait = axis.low;
      const highTrait = axis.high;

      // Ensure traits stay within bounds
      this.profile[lowTrait] = Math.max(
        axis.min,
        Math.min(axis.max, this.profile[lowTrait])
      );
      this.profile[highTrait] = Math.max(
        axis.min,
        Math.min(axis.max, this.profile[highTrait])
      );
    }
  }

  // Update archetype based on current profile
  updateArchetype() {
    // This would implement the logic to shift archetypes based on personality changes
    // For now, we'll keep the initial archetype but this could be expanded
    // to allow for dynamic archetype shifts
  }

  // Get current personality profile
  getProfile() {
    // Return a shallow copy so callers can't mutate internal state directly
    return Object.assign({}, this.profile);
  }

  // Get personality traits as percentages for UI display
  getTraitPercentages() {
    const percentages = {};
    // eslint-disable-next-line no-unused-vars
    for (const [_key, axis] of Object.entries(this.axes)) {
      const lowTrait = axis.low;
      const highTrait = axis.high;

      // Calculate percentage based on axis range
      const total =
        Math.abs(this.profile[lowTrait]) + Math.abs(this.profile[highTrait]);
      if (total > 0) {
        percentages[lowTrait] = Math.round(
          (Math.abs(this.profile[lowTrait]) / total) * 100
        );
        percentages[highTrait] = Math.round(
          (Math.abs(this.profile[highTrait]) / total) * 100
        );
      } else {
        percentages[lowTrait] = 50;
        percentages[highTrait] = 50;
      }
    }
    return percentages;
  }

  // Get interaction history
  getInteractionHistory() {
    return this.interactionHistory;
  }
}

module.exports = PersonalityMatrix;
