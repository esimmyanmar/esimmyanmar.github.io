#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  let emojiFound = false;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      if (scanDirectory(filePath)) emojiFound = true;
    } else if (file.match(/\.(tsx?|jsx?|md|json)$/)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(emojiRegex);
      if (matches) {
        console.error(`Emoji found in ${filePath}: ${matches.join(', ')}`);
        emojiFound = true;
      }
    }
  }

  return emojiFound;
}

if (scanDirectory('.')) {
  console.error('Emojis detected in codebase');
  process.exit(1);
} else {
  console.log('No emojis found - validation passed');
}