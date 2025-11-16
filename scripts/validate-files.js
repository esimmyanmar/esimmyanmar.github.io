#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function validateFiles() {
  const requiredFiles = [
    'public/index.html',
    'public/404.html',
    'public/manifest.json',
    'public/robots.txt',
    'public/sitemap.xml',
    'package.json',
    'next.config.js',
    'tsconfig.json'
  ];

  let allValid = true;

  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`Missing required file: ${file}`);
      allValid = false;
    }
  }

  // Check for broken symlinks
  function checkSymlinks(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.lstatSync(filePath);
        if (stat.isSymbolicLink()) {
          fs.statSync(filePath); // This will throw if symlink is broken
        } else if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          checkSymlinks(filePath);
        }
      } catch (error) {
        console.error(`Broken symlink: ${filePath}`);
        allValid = false;
      }
    }
  }

  checkSymlinks('.');

  if (allValid) {
    console.log('All required files present and valid');
  } else {
    process.exit(1);
  }
}

validateFiles();