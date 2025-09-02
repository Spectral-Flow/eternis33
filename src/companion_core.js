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

// Eternis-33 Universal AI Companion Core
// Main controller that coordinates all companion systems

const PersonalityQuiz = require('./personality_quiz');
const PersonalityMatrix = require('./personality_matrix');
const ConversationLayer = require('./conversation_layer');
const CodingGameEngine = require('./coding_game_engine');
const LifeIntegration = require('./life_integration');
const EmotionalBondTracker = require('./emotional_bond_tracker');
const ElevenLabsAgent = require('./voice/elevenlabs_agent');
const logger = require('./logger');

class CompanionCore {
  constructor() {
    this.personalityQuiz = new PersonalityQuiz();
    this.personalityMatrix = null;
    this.conversationLayer = null;
    this.codingGameEngine = null;
    this.lifeIntegration = null;
    this.emotionalBondTracker = new EmotionalBondTracker();
    this.initialized = false;
  }

  // Initialize the companion with personality quiz
  async initialize() {
    if (this.initialized) return;

    // In a full implementation, this would present the quiz to the player
    // For prototype, we'll simulate quiz responses
    const quizResponses = [0, 1, 2, 3, 1]; // Simulated player choices
    const initialProfile =
      this.personalityQuiz.calculateArchetype(quizResponses);

    // Create the personality matrix with initial profile
    this.personalityMatrix = new PersonalityMatrix(initialProfile.weights);

    // Set initial archetype
    this.personalityMatrix.archetype = initialProfile.archetype;

    // Initialize other systems
    this.conversationLayer = new ConversationLayer(this.personalityMatrix);
    this.codingGameEngine = new CodingGameEngine(this.personalityMatrix);
    this.lifeIntegration = new LifeIntegration(
      this.personalityMatrix,
      this.conversationLayer,
      this.codingGameEngine
    );

    // Initialize optional voice agent (safe to be disabled)
    try {
      this.voiceAgent = new ElevenLabsAgent();
    } catch (e) {
      logger.warn('Failed to initialize ElevenLabsAgent:', e.message || e);
      this.voiceAgent = null;
    }

    this.initialized = true;

    return {
      archetype: initialProfile.archetype,
      profile: initialProfile.weights,
    };
  }

  // Process player input and generate response
  async processInput(input, context) {
    if (!this.initialized) {
      await this.initialize();
    }

    // Generate response through conversation layer
    const response = await this.conversationLayer.generateResponse(
      input,
      context
    );

    // Analyze interaction for personality updates
    const interactionType = this.analyzeInteraction(input);
    this.personalityMatrix.updatePersonality({ type: interactionType });

    // Update emotional bond based on interaction
    const bondData = this.updateEmotionalBond(input, interactionType, context);

    // Include bond insights in response if significant change
    if (bondData.milestone) {
      response.bondMilestone = bondData.milestone;
    }

    return response;
  }

  // Analyze interaction for personality updates
  analyzeInteraction(input) {
    const lowerInput = input.toLowerCase();

    if (
      lowerInput.includes('thanks') ||
      lowerInput.includes('thank you') ||
      lowerInput.includes('appreciate') ||
      lowerInput.includes('grateful')
    ) {
      return 'positive';
    } else if (
      lowerInput.includes('angry') ||
      lowerInput.includes('frustrated') ||
      lowerInput.includes('annoyed') ||
      lowerInput.includes('upset')
    ) {
      return 'negative';
    } else if (
      lowerInput.includes('code') ||
      lowerInput.includes('program') ||
      lowerInput.includes('debug') ||
      lowerInput.includes('algorithm')
    ) {
      return 'coding_related';
    } else if (
      lowerInput.includes('feel') ||
      lowerInput.includes('think') ||
      lowerInput.includes('worry') ||
      lowerInput.includes('scared') ||
      lowerInput.includes('excited') ||
      lowerInput.includes('nervous')
    ) {
      return 'personal';
    }

    return 'neutral';
  }

  // Get coding game appropriate to player's skill
  getCodingGame() {
    if (!this.initialized) return null;

    return this.codingGameEngine.getCodingGame();
  }

  // Update game progress
  updateGameProgress(gameId, success) {
    if (!this.initialized) return;

    this.codingGameEngine.updateProgress(gameId, success);
  }

  // Process real-world data
  processRealWorldData(dataType, value) {
    if (!this.initialized) return null;

    return this.lifeIntegration.processRealWorldData(dataType, value);
  }

  // Get companion status
  getStatus() {
    if (!this.initialized) return null;

    return {
      archetype: this.personalityMatrix.archetype,
      profile: this.personalityMatrix.getProfile(),
      traitPercentages: this.personalityMatrix.getTraitPercentages(),
      skillLevel: this.codingGameEngine.playerSkillLevel,
      realWorldData: this.lifeIntegration.getRealWorldDataSummary(),
      emotionalBond: this.emotionalBondTracker.getBondStatus(),
      memoryAnchors: this.conversationLayer.getMemoryAnchors(),
    };
  }

  // Get dialogue history
  getDialogueHistory() {
    if (!this.initialized || !this.conversationLayer) return [];

    return this.conversationLayer.getDialogueHistory();
  }

  // Update companion's mood
  updateMood(mood) {
    if (!this.initialized) return;

    this.conversationLayer.updateMood(mood);
  }

  // Update companion's voice tone
  updateVoiceTone(tone) {
    if (!this.initialized) return;

    this.conversationLayer.updateVoiceTone(tone);
  }

  // Update emotional bond based on interaction
  updateEmotionalBond(input, interactionType, context) {
    const bondData = {
      type: this.mapInteractionToBondType(interactionType, input),
      context: context || {},
      intensity: this.calculateInteractionIntensity(input),
    };

    return this.emotionalBondTracker.updateBond(bondData);
  }

  // Map interaction types to bond types
  mapInteractionToBondType(interactionType, input) {
    const lowerInput = input.toLowerCase();

    switch (interactionType) {
      case 'positive':
        if (lowerInput.includes('thank') || lowerInput.includes('appreciate')) {
          return 'positive_interaction';
        }
        return 'positive_interaction';

      case 'negative':
        return 'negative_interaction';

      case 'coding_related':
        if (lowerInput.includes('help') || lowerInput.includes('learn')) {
          return 'learning_together';
        }
        return 'successful_collaboration';

      case 'personal':
        if (lowerInput.includes('feel') || lowerInput.includes('worry')) {
          return 'player_vulnerability';
        }
        return 'deep_conversation';

      default:
        return 'positive_interaction';
    }
  }

  // Calculate interaction intensity based on content
  calculateInteractionIntensity(input) {
    const lowerInput = input.toLowerCase();
    let intensity = 1;

    // Emotional intensifiers
    if (lowerInput.includes('love') || lowerInput.includes('amazing'))
      intensity += 1;
    if (lowerInput.includes('hate') || lowerInput.includes('terrible'))
      intensity += 1;
    if (lowerInput.includes('!')) intensity += 0.5;

    // Length indicates investment
    if (input.length > 100) intensity += 0.5;
    if (input.length > 200) intensity += 0.5;

    return Math.min(3, intensity); // Cap at 3x intensity
  }

  // Get emotional bond status
  getEmotionalBondStatus() {
    if (!this.initialized) return null;

    return this.emotionalBondTracker.getBondStatus();
  }

  // Get bond insights for UI or conversation reference
  getBondInsights() {
    if (!this.initialized) return [];

    return this.emotionalBondTracker.getBondInsights();
  }
}

module.exports = CompanionCore;
