import Head from 'next/head'
import Link from 'next/link'

export default function ChineseLanguageSupportPage() {
  return (
    <>
      <Head>
        <title>Chinese Language Support | eSIM Myanmar</title>
        <meta name="description" content="eSIM Myanmar Chinese Language Support - Premium connectivity solutions with Microsoft technology stack serving 50+ million users across ASEAN" />
        <meta name="keywords" content="eSIM, Myanmar, 5G, Microsoft, Azure, ASEAN, roaming" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="glass-container">
          <header className="premium-header">
            <div className="container mx-auto px-6 py-8">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-lg">← eSIM Myanmar</Link>
                <div className="text-slate-400">chinese-language-support</div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-6xl font-bold text-white mb-8">Chinese Language Support</h1>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="glass-card p-8 mb-8">
                    <p className="text-xl text-slate-300 mb-6">eSIM Myanmar Chinese Language Support - Premium connectivity solutions with Microsoft technology stack serving 50+ million users across ASEAN</p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">Microsoft Technology Stack</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">Azure Platform</h4>
                            <p className="text-slate-300 text-sm">Static Web Apps, Functions 5, SQL Hyperscale</p>
                          </div>
                          <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">Power Platform</h4>
                            <p className="text-slate-300 text-sm">Power BI, Automate, Copilot Studio</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">Global Coverage</h3>
                        <div className="stats-grid">
                          <div className="stat-card">
                            <div className="text-3xl font-bold text-cyan-400">50M+</div>
                            <div className="text-slate-300">ASEAN Users</div>
                          </div>
                          <div className="stat-card">
                            <div className="text-3xl font-bold text-cyan-400">200+</div>
                            <div className="text-slate-300">Countries</div>
                          </div>
                          <div className="stat-card">
                            <div className="text-3xl font-bold text-cyan-400">99.9%</div>
                            <div className="text-slate-300">Uptime</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <Link href="/devices" className="block text-cyan-400 hover:text-cyan-300">Device Compatibility</Link>
                      <Link href="/coverage" className="block text-cyan-400 hover:text-cyan-300">Coverage Map</Link>
                      <Link href="/support" className="block text-cyan-400 hover:text-cyan-300">24/7 Support</Link>
                      <Link href="/api" className="block text-cyan-400 hover:text-cyan-300">Developer API</Link>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
                    <div className="space-y-2 text-slate-300">
                      <div>Email: info@esim.com.mm</div>
                      <div>Phone: 09650000172</div>
                      <div>Website: esim.com.mm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}