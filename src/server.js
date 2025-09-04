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

// Eternis-33 Companion Module Server
// This script sets up the Express server and API endpoints

const express = require('express');
const CompanionCore = require('./companion_core');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Initialize companion core
const companion = new CompanionCore();

// API Endpoints

// Initialize Companion
app.post('/api/companion/initialize', async (req, res) => {
  try {
    const { quizResponses } = req.body;

    if (!quizResponses || !Array.isArray(quizResponses)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quiz responses',
      });
    }

    const result = await companion.initialize();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Process Player Input
app.post('/api/companion/process-input', async (req, res) => {
  try {
    const { input, context } = req.body;

    if (!input) {
      return res.status(400).json({
        success: false,
        error: 'Input is required',
      });
    }

    const response = await companion.processInput(input, context);

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get Coding Game
app.get('/api/companion/coding-game', (req, res) => {
  try {
    const game = companion.getCodingGame();

    if (!game) {
      return res.status(400).json({
        success: false,
        error: 'Companion not initialized',
      });
    }

    res.json({
      success: true,
      data: game,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Process Real-World Data
app.post('/api/companion/real-world-data', (req, res) => {
  try {
    const { dataType, value } = req.body;

    if (!dataType || value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Both dataType and value are required',
      });
    }

    const feedback = companion.processRealWorldData(dataType, value);

    res.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get Companion Status
app.get('/api/companion/status', (req, res) => {
  try {
    const status = companion.getStatus();

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Companion not initialized',
      });
    }

    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update Companion Mood
app.post('/api/companion/mood', (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({
        success: false,
        error: 'Mood is required',
      });
    }

    companion.updateMood(mood);

    res.json({
      success: true,
      data: {
        message: 'Companion mood updated',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update Companion Voice Tone
app.post('/api/companion/voice-tone', (req, res) => {
  try {
    const { tone } = req.body;

    if (!tone) {
      return res.status(400).json({
        success: false,
        error: 'Tone is required',
      });
    }

    companion.updateVoiceTone(tone);

    res.json({
      success: true,
      data: {
        message: 'Companion voice tone updated',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Eternis-33 Companion Module server running on port ${port}`);
});

module.exports = app;
