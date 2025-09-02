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

// Eternis-33 Coding Game Engine
// This script manages the teaching and mini-game components

class CodingGameEngine {
  constructor(personalityMatrix) {
    this.personalityMatrix = personalityMatrix;
    this.playerSkillLevel = 1; // 1-10 scale
    this.gameProgress = {};
    this.unlockedGames = ['prism_repair']; // Start with basic game
  }
  
  // Assess player's coding skill level
  assessSkillLevel() {
    // In a full implementation, this would analyze player's coding history
    // For prototype, we'll derive skill level from personality traits
    const profile = this.personalityMatrix.getProfile();
    
    // Calculate skill level based on pragmatic/idealist traits
    // and direct/cryptic communication style
    let level = 1;
    if(profile.pragmatic > 0) level += 1;
    if(profile.direct > 0) level += 1;
    if(profile.pragmatic > 5) level += 1;
    if(profile.direct > 5) level += 1;
    if(profile.pragmatic > 10) level += 1;
    if(profile.direct > 10) level += 1;
    
    this.playerSkillLevel = Math.min(10, Math.max(1, level));
    return this.playerSkillLevel;
  }
  
  // Get appropriate coding game based on skill level
  getCodingGame() {
    const skillLevel = this.assessSkillLevel();
    
    // Determine game type based on skill level
    let gameType = '';
    if(skillLevel <= 3) gameType = 'prism_repair'; // Drag/drop logic puzzles
    else if(skillLevel <= 6) gameType = 'firewall_breach'; // Guided coding challenges
    else gameType = 'encryption_crack'; // Real syntax problems
    
    // Ensure game is unlocked
    if(!this.unlockedGames.includes(gameType)) {
      this.unlockedGames.push(gameType);
    }
    
    return this.createGameInstance(gameType, skillLevel);
  }
  
  // Create a game instance with appropriate difficulty
  createGameInstance(gameType, skillLevel) {
    // In a full implementation, this would generate actual game challenges
    // For prototype, we'll return descriptive objects
    
    const games = {
      'prism_repair': {
        title: "Prism Repair",
        description: "Repair corrupted prism shards using visual logic puzzles",
        difficulty: "Beginner",
        narrative: "The Prism hums with fractured code. Align the logic sequences to restore its glow.",
        skills: ["Pattern Recognition", "Basic Logic", "Sequencing"]
      },
      'firewall_breach': {
        title: "Firewall Breach",
        description: "Override corp firewalls with guided coding challenges",
        difficulty: "Intermediate",
        narrative: "The corporate barrier resists your touch. Weave the correct syntax to breach their defenses.",
        skills: ["Syntax", "Control Flow", "Data Structures"]
      },
      'encryption_crack': {
        title: "Encryption Crack",
        description: "Crack complex encryption using real code problems",
        difficulty: "Advanced",
        narrative: "Ancient codes protect the city's deepest secrets. Debug and decrypt to unlock their truth.",
        skills: ["Debugging", "Algorithms", "Security Concepts"]
      }
    };
    
    return games[gameType] || games['prism_repair'];
  }
  
  // Update game progress
  updateProgress(gameId, success) {
    if(!this.gameProgress[gameId]) {
      this.gameProgress[gameId] = { attempts: 0, successes: 0 };
    }
    
    this.gameProgress[gameId].attempts += 1;
    if(success) {
      this.gameProgress[gameId].successes += 1;
    }
    
    // Update personality matrix based on game performance
    if(success) {
      this.personalityMatrix.updatePersonality({ type: 'coding_success' });
    } else {
      this.personalityMatrix.updatePersonality({ type: 'coding_struggle' });
    }
  }
  
  // Get player's coding progress report
  getProgressReport() {
    return {
      skillLevel: this.playerSkillLevel,
      unlockedGames: this.unlockedGames,
      gameProgress: this.gameProgress
    };
  }
  
  // Get narrative wrapper for coding challenge
  getNarrativeWrapper(gameType) {
    const wrappers = {
      'prism_repair': {
        intro: "Let's reforge a corrupted shard. The city's stability depends on our precision.",
        success: "Well done. The Prism's glow strengthens with each repair.",
        failure: "The code fractured further. But entropy teaches as well as destroys—try again."
      },
      'firewall_breach': {
        intro: "A corporate barrier blocks our path. We'll need to override their firewall.",
        success: "Their defenses crumble before your skill. The city opens its secrets.",
        failure: "The firewall held. But every failed attempt sharpens your approach."
      },
      'encryption_crack': {
        intro: "Ancient encryption guards this knowledge. We must crack its code.",
        success: "The cipher breaks! Forgotten truths emerge from the digital shadows.",
        failure: "The encryption remains intact. But persistence is a prism's virtue."
      }
    };
    
    return wrappers[gameType] || wrappers['prism_repair'];
  }
}

module.exports = CodingGameEngine;