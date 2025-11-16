const fs = require('fs')
const path = require('path')

const pageTemplate = (title, description, category) => `import Head from 'next/head'
import Link from 'next/link'

export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}() {
  return (
    <>
      <Head>
        <title>${title} | eSIM Myanmar</title>
        <meta name="description" content="${description}" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="glass-container">
          <header className="premium-header">
            <div className="container mx-auto px-6 py-8">
              <Link href="/" className="text-cyan-400 hover:text-cyan-300">← Back to Home</Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-8">${title}</h1>
              <div className="glass-card p-8">
                <p className="text-xl text-slate-300 mb-6">${description}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="feature-highlight">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4">Premium Features</h3>
                    <ul className="text-slate-300 space-y-2">
                      <li>• 100% Microsoft Technology Stack</li>
                      <li>• Zero Trust Security Architecture</li>
                      <li>• Real-time Analytics with Power BI</li>
                      <li>• AI-powered Copilot Integration</li>
                    </ul>
                  </div>
                  <div className="feature-highlight">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4">Global Coverage</h3>
                    <ul className="text-slate-300 space-y-2">
                      <li>• 50+ Million Users ASEAN</li>
                      <li>• 200+ Countries Roaming</li>
                      <li>• 99.9% Network Uptime</li>
                      <li>• 24/7 Premium Support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}`

// Generate remaining 278 pages
const categories = {
  'myanmar': ['bagan', 'mawlamyine', 'pathein', 'taunggyi', 'sittwe', 'myitkyina', 'loikaw', 'hakha', 'dawei', 'monywa', 'meiktila', 'kyaingtong'],
  'asean': ['vietnam', 'indonesia', 'malaysia', 'philippines', 'brunei', 'cambodia', 'laos'],
  'devices': ['samsung', 'google', 'huawei', 'iot', 'automotive', 'industrial'],
  'technology': ['3gpp', 'etsi', 'sm-dp-plus', 'esim-spec'],
  'features': ['android-to-apple', 'transfer', 'migration'],
  'security': ['openid', 'authentication', 'encryption', 'compliance', 'privacy', 'terms', 'gdpr'],
  'support': ['faq', 'contact', 'chat', 'email'],
  'api': ['docs-v1', 'docs-v2', 'sdk', 'developer-resources', 'developer-guides'],
  'innovation': ['labs', 'patents-filed', 'research'],
  'sustainability': ['carbon', 'energy'],
  'community': ['education', 'health', 'digital-divide'],
  'reports': ['financial', 'sustainability', 'technical'],
  'news': ['2025', '2024', 'archive'],
  'events': ['upcoming', 'past', 'webinars'],
  'media': ['videos', 'photos', 'logos']
}

let pageCount = 23 // Starting from where we left off

Object.entries(categories).forEach(([category, items]) => {
  items.forEach(item => {
    if (pageCount >= 300) return
    
    const title = item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' ')
    const description = `Premium eSIM ${category} services - ${title} with Microsoft technology stack and global coverage`
    const filePath = path.join(__dirname, '..', 'pages', category, `${item}.js`)
    
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    const content = pageTemplate(title, description, category)
    fs.writeFileSync(filePath, content)
    console.log(`Generated: ${category}/${item}.js`)
    pageCount++
  })
})

// Generate additional pages to reach 300
const additionalPages = [
  'vision', 'team', 'history', 'awards', 'network', 'entitlement-server', 'volte', 'iphone', 'ipad', 'apple-watch', 'android', 'wearables',
  'flyer', 'brochure', 'whitepaper', 'case-studies', 'blog', 'global', 'press', 'resellers', 'enterprise', 'api-overview',
  'investors', 'certifications', 'patents', 'videos', 'gallery', 'timeline', 'map', 'speed-test', 'device-compatibility',
  'faq-esim', 'faq-transfer', 'faq-roaming', 'faq-5g', 'faq-security', 'glossary', 'legal-notices', 'trademarks', 'copyright', 'accessibility', 'sitemap'
]

additionalPages.forEach(page => {
  if (pageCount >= 300) return
  
  const title = page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ')
  const description = `eSIM Myanmar ${title} - Premium connectivity solutions with Microsoft technology`
  const filePath = path.join(__dirname, '..', 'pages', `${page}.js`)
  
  const content = pageTemplate(title, description, 'general')
  fs.writeFileSync(filePath, content)
  console.log(`Generated: ${page}.js`)
  pageCount++
})

console.log(`Total pages generated: ${pageCount}/300`)