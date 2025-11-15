#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const outDir = path.join(process.cwd(), 'out')
const publicDir = path.join(process.cwd(), 'public')

function collectHtml(dir) {
  const pages = []
  if (!fs.existsSync(dir)) return pages
  function walk(d) {
    for (const name of fs.readdirSync(d)) {
      const full = path.join(d, name)
      const stat = fs.statSync(full)
      if (stat.isDirectory()) walk(full)
      else if (name.endsWith('.html')) {
        let rel = path.relative(dir, full).replace(/\\\\/g, '/')
        if (rel.endsWith('index.html')) rel = rel.replace(/index.html$/, '')
        pages.push('/' + rel)
      }
    }
  }
  walk(dir)
  return pages
}

const pages = new Set([...collectHtml(outDir), ...collectHtml(publicDir)])
const base = process.env.SITE_BASE_URL || 'https://esim.com.mm'
const urls = Array.from(pages).map(p => `${base}${p}`)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n')}\n</urlset>`

const outPath = fs.existsSync(outDir) ? path.join(outDir, 'sitemap.xml') : path.join(publicDir, 'sitemap.xml')
fs.writeFileSync(outPath, sitemap, 'utf8')
console.log('Sitemap written to', outPath)
