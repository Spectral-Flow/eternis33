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

// Lightweight logger wrapper. Uses winston if available, otherwise falls back to console.
let logger = console;
try {
  const winston = require('winston');
  logger = winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console({ format: winston.format.simple() }),
    ],
  });
} catch (e) {
  // winston not installed; use console with simple methods
  logger = {
    debug: console.debug
      ? console.debug.bind(console)
      : console.log.bind(console),
    info: console.info ? console.info.bind(console) : console.log.bind(console),
    warn: console.warn ? console.warn.bind(console) : console.log.bind(console),
    error: console.error
      ? console.error.bind(console)
      : console.error.bind(console),
  };
}

module.exports = logger;
