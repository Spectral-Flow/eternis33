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

// ElevenLabs adapter scaffold
// This file provides a safe, testable interface to ElevenLabs voice APIs.
// It intentionally does not perform network calls unless configured with an API key.

const logger = require('../logger');
let axios;
try {
  axios = require('axios');
} catch (e) {
  // axios optional; adapter will throw if used without network client
}

class ElevenLabsAgent {
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.ELEVENLABS_API_KEY || null;
    this.endpoint = options.endpoint || 'https://api.elevenlabs.io';
    this.voice = options.voice || 'alloy';
    this.enabled = !!this.apiKey && !!axios;

    if (!this.apiKey) {
      logger.info('ElevenLabsAgent: No API key provided; voice integration disabled.');
    }
    if (!axios) {
      logger.info('ElevenLabsAgent: axios not installed; network calls disabled.');
    }
  }

  async speak(text, opts = {}) {
    if (!this.enabled) {
      logger.debug('ElevenLabsAgent.speak called while disabled — returning null.');
      return null;
    }

    const url = `${this.endpoint}/v1/text-to-speech/${this.voice}`;
    try {
      const response = await axios.post(url, { text }, {
        headers: { 'xi-api-key': this.apiKey, 'Content-Type': 'application/json' },
        responseType: 'arraybuffer',
        timeout: 15000
      });
      logger.debug('ElevenLabsAgent: received audio buffer');
      return response.data; // Buffer of audio
    } catch (err) {
      logger.error('ElevenLabsAgent.speak error:', err.message || err);
      // Simple retry/backoff could be added here
      return null;
    }
  }

  // Placeholder for streaming or conversational endpoints
  async createConversationSession() {
    if (!this.enabled) return null;
    // Implementation would create/return a session object
    return { id: 'mock-session' };
  }
}

module.exports = ElevenLabsAgent;
