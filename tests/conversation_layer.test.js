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

// Conversation Layer Unit Tests
const ConversationLayer = require('../src/conversation_layer');

describe('ConversationLayer', () => {
  let conversation;
  
  beforeEach(() => {
    // Create a mock personality matrix for testing
    const mockPersonalityMatrix = {
      getProfile: jest.fn().mockReturnValue({
        warm: 5,
        cold: 2,
        pragmatic: 4,
        idealist: 3,
        guarded: 1,
        open: 6,
        cryptic: 2,
        direct: 5
      })
    };
    
    conversation = new ConversationLayer(mockPersonalityMatrix);
  });
  
  test('should generate response based on input', async () => {
    const input = "what is this prism";
    const context = { inventory: ["Prism"], location: "drift station" };
    
    const response = await conversation.generateResponse(input, context);
    expect(response).toHaveProperty('text');
    expect(response).toHaveProperty('voice');
    expect(response.text).toContain('Prism');
  });
  
  test('should format response based on input', () => {
    const response = conversation.formatResponse("what is this prism");
    expect(response).toBe("That shard in your hand... not glass, not gem. It hums with echoes of forgotten code. Keep it close; the Drift hungers for such sparks.");
  });
  
  test('should use default response for unrecognized input', () => {
    const response = conversation.formatResponse("unknown query");
    expect(response).toBe("I sense your question, but the Drift muddles my response. Rephrase, and I'll seek clarity.");
  });
  
  test('should update mood', () => {
    conversation.updateMood('anxious');
    expect(conversation.currentMood).toBe('anxious');
  });
  
  test('should update voice tone', () => {
    conversation.updateVoiceTone('mysterious');
    expect(conversation.voiceTone).toBe('mysterious');
  });
  
  test('should track dialogue history', async () => {
    const input = "should I trust the hollowkin";
    const context = { location: "market district" };
    
    await conversation.generateResponse(input, context);
    
    const history = conversation.getDialogueHistory();
    expect(history).toHaveLength(1);
    expect(history[0].playerInput).toBe(input);
    expect(history[0].context).toBe(context);
  });
});