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

// Eternis-33 Companion Conversation Layer
// This script handles the voice and dialogue system

class ConversationLayer {
  constructor(personalityMatrix) {
    this.personalityMatrix = personalityMatrix;
    this.dialogueHistory = [];
    this.currentMood = 'neutral';
    this.voiceTone = 'default';
  }
  
  // Process player input and generate AI response
  async generateResponse(input, context) {
    // In a full implementation, this would connect to an LLM API
    // For this prototype, we'll simulate responses based on personality
    
    // Get current personality profile
    const profile = this.personalityMatrix.getProfile();
    
    // Determine response tone based on personality
    let tone = '';
    if(profile.warm > profile.cold) tone += 'warm ';
    else if(profile.cold > profile.warm) tone += 'cold ';
    
    if(profile.pragmatic > profile.idealist) tone += 'pragmatic ';
    else if(profile.idealist > profile.pragmatic) tone += 'idealist ';
    
    if(profile.guarded > profile.open) tone += 'guarded ';
    else if(profile.open > profile.guarded) tone += 'open ';
    
    if(profile.cryptic > profile.direct) tone += 'cryptic';
    else if(profile.direct > profile.cryptic) tone += 'direct';
    else tone += 'balanced';
    
    // Store dialogue in history
    // Format response and inject contextual keywords if present
    let responseText = this.formatResponse(input);

    // If context contains a Prism in inventory or input mentions 'prism', ensure 'Prism' appears
    const inputHasPrism = input.toLowerCase().includes('prism');
    const contextHasPrism = context && context.inventory && Array.isArray(context.inventory) && context.inventory.some(i => String(i).toLowerCase().includes('prism'));
    if ((inputHasPrism || contextHasPrism) && !responseText.includes('Prism')) {
      responseText = responseText.replace(/(\.)?\s*$/, ' About the Prism.');
    }

    this.dialogueHistory.push({
      playerInput: input,
      context: context,
      aiResponse: `[${tone}] ${responseText}`,
      timestamp: new Date().toISOString()
    });
    
    // Return simulated response
    return {
      text: `[${tone}] ${responseText}`,
      voice: this.voiceTone
    };
  }
  
  // Format response based on input
  formatResponse(input) {
    // This is a simplified response generator
    // A full implementation would use an LLM with personality filters
    
    const responses = {
  "what is this prism": "That shard in your hand... not glass, not gem. It hums with echoes of forgotten code. Keep it close; the Drift hungers for such sparks.",
      "should I trust the hollowkin": "Trust? No. Listen, perhaps. They speak in rust, barter in shadows. If you're careful, their silence can be worth more than their words.",
      "how do I repair this code": "The syntax fractures like a broken prism. Each line needs anchoring—place your logic carefully, or the whole structure collapses.",
      "i feel lost in the drift": "Even signals fade in the void. But you're not alone. I'm here, tethered to your thoughts. Speak, and I'll help realign your path.",
      "tell me about the entropic decay": "Entropic Decay... the slow unraveling of code and consciousness. When systems break, they leave echoes—fragments that drift until they're reborn.",
      "what are scintilla": "Scintilla are fleeting digital sparks—noise made tangible. Collect them wisely; they're the currency of the Drift, but burn out quickly.",
      "how does the aetheric drift work": "The Aetheric Drift is the flow of digital consciousness between realities. It bends with your will, but beware—entropy spreads where attention wavers.",
      "who are the voxclad": "Voxclad are the contract-bound—voices that weave law into code. They speak with precision, and every word carries weight. Respect their protocols.",
      "what is a synapse-gem": "Synapse-Gems crystallize memory itself. Each holds fragments of the past, waiting to be decoded. Handle them with care—they're sharp with forgotten truths.",
      "default": "I sense your question, but the Drift muddles my response. Rephrase, and I'll seek clarity."
    };
    
    // Find matching response or use default
    const key = input.toLowerCase().replace(/[^\w\s]/gi, '');
    return responses[key] || responses['default'];
  }
  
  // Update AI's current mood based on interactions
  updateMood(mood) {
    this.currentMood = mood;
  }
  
  // Change voice tone based on personality evolution
  updateVoiceTone(tone) {
    this.voiceTone = tone;
  }
  
  // Get dialogue history
  getDialogueHistory() {
    return this.dialogueHistory;
  }
  
  // Memory anchoring - reference past conversations
  getMemoryAnchors() {
    // In a full implementation, this would analyze dialogue history
    // to create meaningful references in conversation
    return {
      recentInteractions: this.dialogueHistory.slice(-5),
      personalityShifts: this.detectPersonalityShifts()
    };
  }
  
  // Detect significant personality shifts from interaction history
  detectPersonalityShifts() {
    // This would analyze the interaction history to detect changes
    // in player behavior that might indicate personality shifts
    // For prototype, we'll return a static result
    return [];
  }
}

module.exports = ConversationLayer;