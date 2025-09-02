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

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function generate() {
  const outPath = path.resolve(__dirname, '..', 'docs', 'HALL_OF_ARCHITECTS.md');
  let content = '# Hall of Architects\n\nThis file lists contributors recognized as Spectral Architects.\n\n';
  try {
    const stdout = execSync('git shortlog -sne', { encoding: 'utf8' });
    if (!stdout.trim()) throw new Error('no git output');
    const lines = stdout.trim().split(/\r?\n/);
    content += '| Commits | Name | Email |\n|---:|---|---|\n';
    for (const l of lines) {
      const m = l.trim().match(/^([0-9]+)\s+(.*)\s+<(.*)>$/);
      if (m) content += `| ${m[1]} | ${m[2]} | ${m[3]} |\n`;
    }
  } catch (err) {
    content += '*Git not available or no commits found.*\n\nPlease run this script inside a git repository to populate contributors.\n';
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content, 'utf8');
  console.log('Wrote', outPath);
}

if (require.main === module) generate();
