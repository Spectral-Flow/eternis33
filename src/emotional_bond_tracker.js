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

// Eternis-33 Emotional Bond Tracker
// This module tracks and analyzes the emotional connection between player and companion

class EmotionalBondTracker {
  constructor() {
    this.bondLevel = 0; // Scale: -100 to +100
    this.bondHistory = [];
    this.milestones = [];
    this.trustLevel = 50; // Scale: 0 to 100
    this.intimacyLevel = 0; // Scale: 0 to 100
    this.sharedExperiences = [];

    // Bond categories tracking
    this.bondCategories = {
      trust: 50,
      understanding: 0,
      shared_goals: 0,
      emotional_support: 0,
      intellectual_connection: 0,
      playfulness: 0,
    };
  }

  // Update bond based on interaction type and context
  updateBond(interactionData) {
    const {
      type,
      context,
      intensity = 1,
      isReciprocal = false,
    } = interactionData;

    let bondChange = 0;
    let categoryUpdates = {};

    switch (type) {
      case 'positive_interaction':
        bondChange = 2 * intensity;
        categoryUpdates.emotional_support = 1;
        break;

      case 'successful_collaboration':
        bondChange = 5 * intensity;
        categoryUpdates.shared_goals = 2;
        categoryUpdates.trust = 1;
        break;

      case 'deep_conversation':
        bondChange = 3 * intensity;
        categoryUpdates.understanding = 2;
        categoryUpdates.intimacyLevel = 1;
        break;

      case 'shared_joke':
        bondChange = 2 * intensity;
        categoryUpdates.playfulness = 2;
        break;

      case 'learning_together':
        bondChange = 4 * intensity;
        categoryUpdates.intellectual_connection = 2;
        break;

      case 'player_vulnerability':
        bondChange = 6 * intensity;
        categoryUpdates.trust = 3;
        categoryUpdates.intimacyLevel = 2;
        break;

      case 'conflict_resolution':
        bondChange = 4 * intensity;
        categoryUpdates.understanding = 3;
        categoryUpdates.trust = 2;
        break;

      case 'negative_interaction':
        bondChange = -3 * intensity;
        categoryUpdates.trust = -1;
        break;

      case 'betrayal_of_trust':
        bondChange = -10 * intensity;
        categoryUpdates.trust = -5;
        break;

      case 'neglect':
        bondChange = -1 * intensity;
        // Gradual erosion across all categories
        Object.keys(categoryUpdates).forEach((key) => {
          categoryUpdates[key] = -0.5;
        });
        break;
    }

    // Apply reciprocal bonus if the companion also benefits
    if (isReciprocal) {
      bondChange *= 1.5;
    }

    // Update bond level with bounds checking
    this.bondLevel = Math.max(-100, Math.min(100, this.bondLevel + bondChange));

    // Update category bonds
    Object.entries(categoryUpdates).forEach(([category, change]) => {
      if (this.bondCategories[category] !== undefined) {
        this.bondCategories[category] = Math.max(
          0,
          Math.min(100, this.bondCategories[category] + change)
        );
      }
    });

    // Record the interaction
    this.bondHistory.push({
      timestamp: new Date().toISOString(),
      type,
      context,
      bondChange,
      newBondLevel: this.bondLevel,
      intensity,
    });

    // Check for milestones
    this.checkMilestones();

    // Add to shared experiences if significant
    if (Math.abs(bondChange) >= 3) {
      this.addSharedExperience(interactionData);
    }

    return {
      bondLevel: this.bondLevel,
      bondChange,
      milestone: this.milestones[this.milestones.length - 1] || null,
    };
  }

  // Check for bond milestones
  checkMilestones() {
    const currentLevel = this.bondLevel;
    const existingMilestones = this.milestones.map((m) => m.level);

    const positiveMilestones = [
      {
        level: 25,
        name: 'Initial Trust',
        description: 'The companion begins to open up',
      },
      {
        level: 50,
        name: 'Growing Bond',
        description: 'A real friendship is forming',
      },
      {
        level: 75,
        name: 'Deep Connection',
        description: 'True understanding and trust',
      },
      {
        level: 90,
        name: 'Unbreakable Bond',
        description: 'An inseparable partnership',
      },
    ];

    const negativeMilestones = [
      {
        level: -25,
        name: 'Strained Relationship',
        description: 'Tension and distrust emerge',
      },
      {
        level: -50,
        name: 'Broken Trust',
        description: 'The relationship is damaged',
      },
      {
        level: -75,
        name: 'Hostility',
        description: 'Active antagonism has developed',
      },
    ];

    // Check positive milestones
    positiveMilestones.forEach((milestone) => {
      if (
        currentLevel >= milestone.level &&
        !existingMilestones.includes(milestone.level)
      ) {
        this.milestones.push({
          ...milestone,
          achievedAt: new Date().toISOString(),
          bondHistory: this.bondHistory.length,
        });
      }
    });

    // Check negative milestones
    negativeMilestones.forEach((milestone) => {
      if (
        currentLevel <= milestone.level &&
        !existingMilestones.includes(milestone.level)
      ) {
        this.milestones.push({
          ...milestone,
          achievedAt: new Date().toISOString(),
          bondHistory: this.bondHistory.length,
        });
      }
    });
  }

  // Add a significant shared experience
  addSharedExperience(interactionData) {
    this.sharedExperiences.push({
      timestamp: new Date().toISOString(),
      type: interactionData.type,
      context: interactionData.context,
      bondLevelAtTime: this.bondLevel,
      significance: Math.abs(interactionData.bondChange || 0),
    });

    // Keep only the most recent 20 experiences
    if (this.sharedExperiences.length > 20) {
      this.sharedExperiences = this.sharedExperiences.slice(-20);
    }
  }

  // Get current bond status
  getBondStatus() {
    return {
      bondLevel: this.bondLevel,
      bondCategory: this.getBondCategory(),
      bondStrength: this.getBondStrength(),
      categories: this.bondCategories,
      trustLevel: this.trustLevel,
      intimacyLevel: this.intimacyLevel,
      totalInteractions: this.bondHistory.length,
      milestones: this.milestones,
      recentTrend: this.calculateRecentTrend(),
    };
  }

  // Determine bond category based on level
  getBondCategory() {
    if (this.bondLevel >= 75) return 'soulmates';
    if (this.bondLevel >= 50) return 'close_friends';
    if (this.bondLevel >= 25) return 'friends';
    if (this.bondLevel >= 0) return 'acquaintances';
    if (this.bondLevel >= -25) return 'strained';
    if (this.bondLevel >= -50) return 'adversarial';
    return 'hostile';
  }

  // Calculate bond strength as percentage
  getBondStrength() {
    return Math.abs(this.bondLevel);
  }

  // Calculate recent trend in bond development
  calculateRecentTrend() {
    if (this.bondHistory.length < 5) {
      return 'insufficient_data';
    }

    const recent = this.bondHistory.slice(-5);
    const older = this.bondHistory.slice(-10, -5);

    if (older.length === 0) return 'new_relationship';

    const recentAvg =
      recent.reduce((sum, h) => sum + h.bondChange, 0) / recent.length;
    const olderAvg =
      older.reduce((sum, h) => sum + h.bondChange, 0) / older.length;

    const trend = recentAvg - olderAvg;

    if (trend > 1) return 'strengthening';
    if (trend < -1) return 'weakening';
    return 'stable';
  }

  // Get personalized insights based on bond data
  getBondInsights() {
    const insights = [];

    // Analyze category strengths
    const strongestCategory = Object.entries(this.bondCategories).sort(
      ([, a], [, b]) => b - a
    )[0];

    const weakestCategory = Object.entries(this.bondCategories).sort(
      ([, a], [, b]) => a - b
    )[0];

    insights.push({
      type: 'strength',
      category: strongestCategory[0],
      level: strongestCategory[1],
      message: `Your strongest connection is through ${strongestCategory[0].replace(
        '_',
        ' '
      )}`,
    });

    if (weakestCategory[1] < 25) {
      insights.push({
        type: 'growth_opportunity',
        category: weakestCategory[0],
        level: weakestCategory[1],
        message: `Consider developing your ${weakestCategory[0].replace(
          '_',
          ' '
        )} together`,
      });
    }

    // Milestone insights
    if (this.milestones.length > 0) {
      const latestMilestone = this.milestones[this.milestones.length - 1];
      insights.push({
        type: 'milestone',
        milestone: latestMilestone.name,
        message: latestMilestone.description,
      });
    }

    // Trend insights
    const trend = this.calculateRecentTrend();
    if (trend === 'strengthening') {
      insights.push({
        type: 'trend',
        trend: 'positive',
        message: 'Your bond has been growing stronger recently',
      });
    } else if (trend === 'weakening') {
      insights.push({
        type: 'trend',
        trend: 'negative',
        message: 'Your connection needs some attention',
      });
    }

    return insights;
  }

  // Get shared experiences for reference in conversations
  getSharedExperienceContext() {
    return {
      totalExperiences: this.sharedExperiences.length,
      recentExperiences: this.sharedExperiences.slice(-3),
      mostSignificant: this.sharedExperiences
        .sort((a, b) => b.significance - a.significance)
        .slice(0, 3),
    };
  }
}

module.exports = EmotionalBondTracker;
