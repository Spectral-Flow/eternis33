#!/usr/bin/env node
/**
 * add_license_headers.js
 *
 * Scans the repository for source files and prepends the Remedium Music LLC
 * license header if it's not already present. Idempotent and safe.
 *
 * Usage:
 *   node scripts/add_license_headers.js        # dry-run (shows files that would be changed)
 *   node scripts/add_license_headers.js --apply  # apply changes
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXTS = ['.js', '.ts', '.py'];
const IGNORE_DIRS = new Set(['node_modules', '.git', '.vscode', 'outputs', 'eternis33_prototype']);

const HEADER = `/*\n * Eternis-33 Companion — Core AI + Simulation Framework\n * Copyright (c) 2025 Remedium Music LLC. All rights reserved.\n *\n * Licensed under the Eternis-33 Companion License.\n * You may not use this file except in compliance with the License.\n *\n * A copy of the License should have been provided with this software.\n * If not, contact legal@remediummusic.com\n *\n * NOTICE:\n * - AI personality, dialogue, and learning models are proprietary.\n * - Unauthorized commercial use, modification, or redistribution is prohibited.\n * - Personal/educational experimentation is allowed within the License terms.\n *\n * Remedium Music LLC | Denver, CO | www.remediummusic.com\n */\n\n`;

function isBinaryFile(filePath) {
  // basic heuristic: treat files with NUL as binary
  try {
    const content = fs.readFileSync(filePath);
    return content.includes(0);
  } catch (e) {
    return true;
  }
}

function shouldIgnoreDir(name) {
  return IGNORE_DIRS.has(name);
}

function walk(dir, cb) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    if (it.isDirectory()) {
      if (shouldIgnoreDir(it.name)) continue;
      walk(path.join(dir, it.name), cb);
    } else if (it.isFile()) {
      cb(path.join(dir, it.name));
    }
  }
}

function hasHeader(content) {
  // detect key phrases to avoid duplicate headers
  const marker = 'Remedium Music LLC';
  const altMarker = 'Eternis-33 Companion';
  return content.includes(marker) || content.includes(altMarker);
}

function processFile(filePath, apply) {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXTS.includes(ext)) return null;
  if (isBinaryFile(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  if (hasHeader(raw)) return null;
  if (apply) {
    fs.writeFileSync(filePath, HEADER + raw, 'utf8');
    return { file: filePath, changed: true };
  }
  return { file: filePath, changed: false };
}

function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply') || args.includes('-a');
  const results = [];
  walk(ROOT, (filePath) => {
    const res = processFile(filePath, apply);
    if (res) results.push(res);
  });

  const toChange = results.filter(r => r.changed === false);
  const changed = results.filter(r => r.changed === true);

  if (!apply) {
    console.log('License header batch tool (dry-run)');
    console.log('Files that would receive a header:');
    toChange.forEach(r => console.log('  ', path.relative(ROOT, r.file)));
    console.log('\nRun with --apply to add headers.');
  } else {
    console.log('License header batch tool (apply mode)');
    changed.forEach(r => console.log('Added header to:', path.relative(ROOT, r.file)));
    if (changed.length === 0) console.log('No files needed changes.');
  }
}

if (require.main === module) main();
