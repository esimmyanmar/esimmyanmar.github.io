#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('eSIM Myanmar - Complete Error Check & Update');
console.log('==========================================');

let totalErrors = 0;
let totalFiles = 0;
let fixedErrors = 0;

// 1. Zero Emoji Check
console.log('\n1. ZERO EMOJI ENFORCEMENT...');
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu;

function scanEmojis(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanEmojis(filePath);
    } else if (file.match(/\.(html|tsx?|jsx?|md|json|css|yml|yaml)$/)) {
      totalFiles++;
      const content = fs.readFileSync(filePath, 'utf8');
      if (emojiRegex.test(content)) {
        totalErrors++;
        console.log(`ERROR: Emoji found in ${filePath}`);
      }
    }
  }
}

scanEmojis('.');
console.log(`Emoji check: ${totalErrors === 0 ? 'PASS' : 'FAIL'} (${totalFiles} files scanned)`);

// 2. Case Sensitivity Check
console.log('\n2. CASE SENSITIVITY CHECK...');
let caseErrors = 0;

function checkCase(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      checkCase(filePath);
    } else if (file.match(/\.(tsx?|jsx?|css)$/)) {
      if (file !== file.toLowerCase()) {
        caseErrors++;
        totalErrors++;
        console.log(`ERROR: Non-lowercase filename: ${filePath}`);
      }
    }
  }
}

checkCase('.');
console.log(`Case check: ${caseErrors === 0 ? 'PASS' : 'FAIL'} (${caseErrors} errors)`);

// 3. Required Files Check
console.log('\n3. REQUIRED FILES CHECK...');
const requiredFiles = [
  'public/index.html',
  'public/404.html',
  'public/manifest.json',
  'public/robots.txt',
  'public/sitemap.xml',
  'package.json',
  'README.md'
];

let missingFiles = 0;
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles++;
    totalErrors++;
    console.log(`ERROR: Missing required file: ${file}`);
  }
});
console.log(`Required files: ${missingFiles === 0 ? 'PASS' : 'FAIL'} (${missingFiles} missing)`);

// 4. Security Headers Check
console.log('\n4. SECURITY HEADERS CHECK...');
let securityErrors = 0;

if (fs.existsSync('public/index.html')) {
  const indexContent = fs.readFileSync('public/index.html', 'utf8');
  const requiredHeaders = [
    'Content-Security-Policy',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Strict-Transport-Security'
  ];
  
  requiredHeaders.forEach(header => {
    if (!indexContent.includes(header)) {
      securityErrors++;
      totalErrors++;
      console.log(`ERROR: Missing security header: ${header}`);
    }
  });
}
console.log(`Security headers: ${securityErrors === 0 ? 'PASS' : 'FAIL'} (${securityErrors} missing)`);

// 5. Myanmar Unicode Check
console.log('\n5. MYANMAR UNICODE CHECK...');
let unicodeErrors = 0;

if (fs.existsSync('public/index.html')) {
  const indexContent = fs.readFileSync('public/index.html', 'utf8');
  if (!indexContent.includes('Leelawadee UI') || !indexContent.includes('မြန်မာ')) {
    unicodeErrors++;
    totalErrors++;
    console.log('ERROR: Myanmar Unicode support missing');
  }
}
console.log(`Myanmar Unicode: ${unicodeErrors === 0 ? 'PASS' : 'FAIL'} (${unicodeErrors} errors)`);

// 6. Performance Check
console.log('\n6. PERFORMANCE CHECK...');
let perfErrors = 0;

if (fs.existsSync('public/index.html')) {
  const indexContent = fs.readFileSync('public/index.html', 'utf8');
  if (!indexContent.includes('viewport') && !indexContent.includes('charset=UTF-8')) {
    perfErrors++;
    totalErrors++;
    console.log('ERROR: Basic performance meta tags missing');
  }
}
console.log(`Performance: ${perfErrors === 0 ? 'PASS' : 'FAIL'} (${perfErrors} errors)`);

// Summary
console.log('\n==========================================');
console.log('COMPLETE ERROR CHECK SUMMARY');
console.log('==========================================');
console.log(`Total files scanned: ${totalFiles}`);
console.log(`Total errors found: ${totalErrors}`);
console.log(`Errors fixed: ${fixedErrors}`);

if (totalErrors === 0) {
  console.log('\n100% ERROR-FREE STATUS ACHIEVED');
  console.log('eSIM Myanmar Entertainment Server is production ready');
  process.exit(0);
} else {
  console.log(`\n${totalErrors} ERRORS REQUIRE ATTENTION`);
  console.log('Fix all errors before production deployment');
  process.exit(1);
}