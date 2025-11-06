#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const log = (msg, type = 'info') => {
  const prefix = type === 'error' ? 'ERROR' : type === 'success' ? 'SUCCESS' : 'INFO';
  console.log(`[${prefix}] ${msg}`);
};

const checkSecurity = () => {
  const securityFile = path.join(__dirname, 'src/lib/security.ts');
  if (!fs.existsSync(securityFile)) {
    throw new Error('Security file missing');
  }
  
  const content = fs.readFileSync(securityFile, 'utf8');
  const requiredFeatures = ['disableRightClick', 'disableTextSelection', 'disableKeyboardShortcuts', 'disableDevTools'];
  
  for (const feature of requiredFeatures) {
    if (!content.includes(feature)) {
      throw new Error(`Missing security feature: ${feature}`);
    }
  }
  
  log('Security features verified', 'success');
};

const buildProject = () => {
  try {
    log('Building project...');
    execSync('node build.js', { stdio: 'inherit' });
    log('Build completed', 'success');
  } catch (error) {
    throw new Error(`Build failed: ${error.message}`);
  }
};

const verifyBuild = () => {
  const buildDir = path.join(__dirname, 'out');
  if (!fs.existsSync(buildDir)) {
    throw new Error('Build directory not found');
  }
  
  const indexFile = path.join(buildDir, 'index.html');
  if (!fs.existsSync(indexFile)) {
    throw new Error('Index file not found');
  }
  
  log('Build verification passed', 'success');
};

const deploy = async () => {
  try {
    log('Starting deployment...');
    checkSecurity();
    buildProject();
    verifyBuild();
    log('Deployment ready for GitHub Pages', 'success');
  } catch (error) {
    log(error.message, 'error');
    process.exit(1);
  }
};

deploy();