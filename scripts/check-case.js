#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const results = []

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full)
    else {
      if (/[A-Z]/.test(name)) results.push(full)
    }
  }
}

walk(root)

if (results.length) {
  console.error('Case-sensitivity scan failed — files with uppercase characters:')
  results.forEach(f => console.error(' -', f))
  process.exit(3)
} else {
  console.log('No uppercase filenames found.')
  process.exit(0)
}
