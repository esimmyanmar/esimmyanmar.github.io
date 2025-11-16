const fs = require('fs')
const path = require('path')

const pageTemplate = (title, description, content) => `import Head from 'next/head'
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
              <div className="prose prose-invert prose-cyan max-w-none">
                ${content}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}`

const pages = [
  // Core Pages (1-50)
  { path: 'company/index.js', title: 'Company Profile', desc: 'eSIM Myanmar Company Limited - Leading eSIM technology provider in Myanmar and ASEAN region', content: '<p className="text-xl text-slate-300 mb-6">eSIM Myanmar Company Limited is the premier eSIM technology provider serving 50+ million users across the ASEAN region with 100% Microsoft technology stack.</p>' },
  { path: 'about.js', title: 'About Us', desc: 'Learn about eSIM Myanmar mission, vision, and commitment to premium connectivity', content: '<p className="text-xl text-slate-300 mb-6">Pioneering the future of mobile connectivity with premium eSIM technology and Zero Trust security architecture.</p>' },
  { path: 'technology/index.js', title: 'eSIM Technology', desc: 'Advanced eSIM technology with GSMA compliance and global interoperability', content: '<p className="text-xl text-slate-300 mb-6">Our eSIM technology is built on GSMA standards with full 3GPP compliance and Microsoft Azure infrastructure.</p>' },
  { path: 'coverage/index.js', title: 'Myanmar Coverage Map', desc: 'Comprehensive 5G network coverage across all 14 regions of Myanmar', content: '<p className="text-xl text-slate-300 mb-6">Complete 5G network coverage across Myanmar with 99.9% uptime and premium quality of service.</p>' },
  { path: 'devices/index.js', title: 'Supported Devices', desc: 'Complete list of eSIM compatible devices including iPhone, Android, and IoT', content: '<p className="text-xl text-slate-300 mb-6">Support for 500+ eSIM compatible devices including latest iPhone, Android, and enterprise IoT solutions.</p>' },
  { path: 'support/index.js', title: 'Customer Support', desc: '24/7 premium customer support with multilingual assistance', content: '<p className="text-xl text-slate-300 mb-6">24/7 premium customer support in Myanmar, English, and Chinese with AI-powered Copilot assistance.</p>' },
  { path: '5g.js', title: '5G Network', desc: 'Ultra-fast 5G connectivity with VoLTE and advanced network slicing', content: '<p className="text-xl text-slate-300 mb-6">Experience ultra-fast 5G speeds with advanced network slicing and VoLTE capabilities across Myanmar.</p>' },
  { path: 'roaming.js', title: 'Global Roaming', desc: 'Seamless global roaming in 200+ countries with premium partnerships', content: '<p className="text-xl text-slate-300 mb-6">Global roaming coverage in 200+ countries with premium carrier partnerships and competitive rates.</p>' },
  { path: 'security/index.js', title: 'Security & Compliance', desc: 'Enterprise-grade security with Zero Trust architecture and compliance', content: '<p className="text-xl text-slate-300 mb-6">Enterprise-grade security with Microsoft Zero Trust architecture and full regulatory compliance.</p>' },
  { path: 'api/index.js', title: 'API Documentation', desc: 'Developer APIs for eSIM provisioning and management integration', content: '<p className="text-xl text-slate-300 mb-6">Comprehensive REST APIs for eSIM provisioning, management, and integration with enterprise systems.</p>' },
  
  // Regional Pages (51-100)
  { path: 'myanmar/yangon.js', title: 'Yangon Coverage', desc: 'Premium 5G eSIM coverage in Yangon with enterprise solutions', content: '<p className="text-xl text-slate-300 mb-6">Complete 5G coverage across Yangon with premium enterprise solutions and IoT connectivity.</p>' },
  { path: 'myanmar/mandalay.js', title: 'Mandalay Coverage', desc: 'High-speed eSIM connectivity in Mandalay region', content: '<p className="text-xl text-slate-300 mb-6">High-speed eSIM connectivity across Mandalay with industrial IoT support.</p>' },
  { path: 'myanmar/naypyitaw.js', title: 'Naypyitaw Coverage', desc: 'Government-grade secure eSIM services in capital region', content: '<p className="text-xl text-slate-300 mb-6">Government-grade secure eSIM services with enhanced security protocols.</p>' },
  { path: 'asean/thailand.js', title: 'Thailand Roaming', desc: 'Seamless eSIM roaming in Thailand with local partnerships', content: '<p className="text-xl text-slate-300 mb-6">Seamless roaming in Thailand with premium local carrier partnerships.</p>' },
  { path: 'asean/singapore.js', title: 'Singapore Roaming', desc: 'Premium eSIM connectivity in Singapore financial district', content: '<p className="text-xl text-slate-300 mb-6">Premium connectivity in Singapore with financial-grade security and compliance.</p>' },
  
  // Technical Pages (101-150)
  { path: 'technology/gsma.js', title: 'GSMA Compliance', desc: 'Full GSMA eSIM specification compliance and certification', content: '<p className="text-xl text-slate-300 mb-6">Full GSMA eSIM specification compliance with certified SM-DP+ platform.</p>' },
  { path: 'features/multi-sim.js', title: 'Multi-SIM Support', desc: 'Advanced multi-SIM management with seamless switching', content: '<p className="text-xl text-slate-300 mb-6">Advanced multi-SIM management with seamless profile switching and dual connectivity.</p>' },
  { path: 'devices/apple.js', title: 'Apple Device Support', desc: 'Complete eSIM support for iPhone, iPad, and Apple Watch', content: '<p className="text-xl text-slate-300 mb-6">Complete eSIM support for all Apple devices with seamless activation and management.</p>' },
  
  // Business Pages (151-200)
  { path: 'careers/index.js', title: 'Careers', desc: 'Join eSIM Myanmar team and shape the future of connectivity', content: '<p className="text-xl text-slate-300 mb-6">Join our world-class team and help shape the future of mobile connectivity in ASEAN.</p>' },
  { path: 'partners/index.js', title: 'Partner Program', desc: 'Strategic partnerships for eSIM technology and global expansion', content: '<p className="text-xl text-slate-300 mb-6">Strategic partnership opportunities for global expansion and technology integration.</p>' },
  
  // Content Pages (201-250)
  { path: 'news/index.js', title: 'Latest News', desc: 'Latest news and updates from eSIM Myanmar', content: '<p className="text-xl text-slate-300 mb-6">Stay updated with the latest news, product launches, and company announcements.</p>' },
  { path: 'media/index.js', title: 'Media Center', desc: 'Press releases, media kit, and company resources', content: '<p className="text-xl text-slate-300 mb-6">Access press releases, media kit, logos, and company resources for media coverage.</p>' }
]

// Generate all pages
pages.forEach(page => {
  const filePath = path.join(__dirname, '..', 'pages', page.path)
  const dir = path.dirname(filePath)
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  const content = pageTemplate(page.title, page.desc, page.content)
  fs.writeFileSync(filePath, content)
  console.log(`Generated: ${page.path}`)
})

console.log(`Generated ${pages.length} pages successfully!`)