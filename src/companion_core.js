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
const ElevenLabsAgent = require('./voice/elevenlabs_agent');
const logger = require('./logger');

class CompanionCore {
  constructor() {
    this.personalityQuiz = new PersonalityQuiz();
    this.personalityMatrix = null;
    this.conversationLayer = null;
    this.codingGameEngine = null;
    this.lifeIntegration = null;
    this.initialized = false;
  }
  
  // Initialize the companion with personality quiz
  async initialize() {
    if(this.initialized) return;
    
    // In a full implementation, this would present the quiz to the player
    // For prototype, we'll simulate quiz responses
    const quizResponses = [0, 1, 2, 3, 1]; // Simulated player choices
    const initialProfile = this.personalityQuiz.calculateArchetype(quizResponses);
    
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
      profile: initialProfile.weights
    };
  }
  
  // Process player input and generate response
  async processInput(input, context) {
    if(!this.initialized) {
      await this.initialize();
    }
    
    // Generate response through conversation layer
    const response = await this.conversationLayer.generateResponse(input, context);
    
    // Update personality based on input
    // This would analyze the input for emotional tone and content
    // For prototype, we'll use a simple heuristic
    const interactionType = this.analyzeInteraction(input);
    this.personalityMatrix.updatePersonality({ type: interactionType });
    
    return response;
  }
  
  // Analyze interaction for personality updates
  analyzeInteraction(input) {
    const lowerInput = input.toLowerCase();
    
    if(lowerInput.includes('thanks') || lowerInput.includes('thank you')) {
      return 'positive';
    } else if(lowerInput.includes('angry') || lowerInput.includes('frustrated')) {
      return 'negative';
    } else if(lowerInput.includes('code') || lowerInput.includes('program')) {
      return 'coding_related';
    }
    
    return 'neutral';
  }
  
  // Get coding game appropriate to player's skill
  getCodingGame() {
    if(!this.initialized) return null;
    
    return this.codingGameEngine.getCodingGame();
  }
  
  // Update game progress
  updateGameProgress(gameId, success) {
    if(!this.initialized) return;
    
    this.codingGameEngine.updateProgress(gameId, success);
  }
  
  // Process real-world data
  processRealWorldData(dataType, value) {
    if(!this.initialized) return null;
    
    return this.lifeIntegration.processRealWorldData(dataType, value);
  }
  
  // Get companion status
  getStatus() {
    if(!this.initialized) return null;
    
    return {
      archetype: this.personalityMatrix.archetype,
      profile: this.personalityMatrix.getProfile(),
      traitPercentages: this.personalityMatrix.getTraitPercentages(),
      skillLevel: this.codingGameEngine.playerSkillLevel,
      realWorldData: this.lifeIntegration.getRealWorldDataSummary()
    };
  }
  
  // Get dialogue history
  getDialogueHistory() {
    if(!this.initialized || !this.conversationLayer) return [];
    
    return this.conversationLayer.getDialogueHistory();
  }
  
  // Update companion's mood
  updateMood(mood) {
    if(!this.initialized) return;
    
    this.conversationLayer.updateMood(mood);
  }
  
  // Update companion's voice tone
  updateVoiceTone(tone) {
    if(!this.initialized) return;
    
    this.conversationLayer.updateVoiceTone(tone);
  }
}

module.exports = CompanionCore;