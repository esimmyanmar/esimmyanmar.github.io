#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkDirectory(dir) {
  const files = fs.readdirSync(dir);
  let caseIssues = false;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      if (checkDirectory(filePath)) caseIssues = true;
    } else if (file.match(/\.(tsx?|jsx?|css)$/)) {
      if (file !== file.toLowerCase()) {
        console.error(`Non-lowercase filename: ${filePath}`);
        caseIssues = true;
      }
    }
  }

  return caseIssues;
}

if (checkDirectory('.')) {
  console.error('Case sensitivity issues found');
  process.exit(1);
} else {
  console.log('All filenames are lowercase - validation passed');
}