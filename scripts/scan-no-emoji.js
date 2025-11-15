#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const exts = ['.js', '.jsx', '.ts', '.tsx', '.md', '.html', '.css']

// Basic emoji regex covering common ranges
const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u

const results = []

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === '.next' || name === 'out') continue
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full)
    else if (exts.includes(path.extname(name))) {
      const content = fs.readFileSync(full, 'utf8')
      if (emojiRegex.test(content)) results.push(full)
    }
  }
}

walk(root)

if (results.length) {
  console.error('Emoji scan failed — found emoji in files:')
  results.forEach(f => console.error(' -', f))
  process.exit(2)
} else {
  console.log('No emoji found.')
  process.exit(0)
}
