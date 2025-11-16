#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Comprehensive emoji regex covering all Unicode emoji ranges
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}\u{2395}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]/gu;

function scanDirectory(dir, basePath = '') {
  const files = fs.readdirSync(dir);
  let emojiFound = false;
  let totalFiles = 0;
  let scannedFiles = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const relativePath = path.join(basePath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .git, .next, out directories
      if (!file.startsWith('.') && !['node_modules', 'out', 'dist', 'build'].includes(file)) {
        const result = scanDirectory(filePath, relativePath);
        if (result.emojiFound) emojiFound = true;
        totalFiles += result.totalFiles;
        scannedFiles += result.scannedFiles;
      }
    } else if (file.match(/\.(html|tsx?|jsx?|md|json|css|scss|yml|yaml)$/)) {
      totalFiles++;
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const matches = content.match(emojiRegex);
        
        if (matches) {
          console.error(`EMOJI VIOLATION: ${relativePath}`);
          console.error(`Found emojis: ${matches.join(', ')}`);
          console.error(`Line numbers:`);
          
          // Show line numbers where emojis are found
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (emojiRegex.test(line)) {
              console.error(`  Line ${index + 1}: ${line.trim()}`);
            }
          });
          console.error('');
          emojiFound = true;
        }
        scannedFiles++;
      } catch (error) {
        console.warn(`Warning: Could not read file ${relativePath}: ${error.message}`);
      }
    }
  }

  return { emojiFound, totalFiles, scannedFiles };
}

console.log('eSIM Myanmar - Zero Emoji Enforcement Scanner');
console.log('===========================================');

const startTime = Date.now();
const result = scanDirectory('.');
const endTime = Date.now();

console.log(`\nScan Results:`);
console.log(`- Total files: ${result.totalFiles}`);
console.log(`- Scanned files: ${result.scannedFiles}`);
console.log(`- Scan time: ${endTime - startTime}ms`);

if (result.emojiFound) {
  console.error('\nZERO EMOJI POLICY VIOLATION DETECTED');
  console.error('All emoji characters must be removed from the codebase.');
  console.error('This is a strict requirement for eSIM Myanmar Entertainment Server.');
  process.exit(1);
} else {
  console.log('\nZERO EMOJI COMPLIANCE VERIFIED');
  console.log('No emoji characters found in codebase.');
  console.log('eSIM Myanmar Entertainment Server meets zero emoji requirements.');
}