import Head from 'next/head'
import Link from 'next/link'

export default function Google() {
  return (
    <>
      <Head>
        <title>Google | eSIM Myanmar</title>
        <meta name="description" content="Premium eSIM devices services - Google with Microsoft technology stack and global coverage" />
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
              <h1 className="text-5xl font-bold text-white mb-8">Google</h1>
              <div className="glass-card p-8">
                <p className="text-xl text-slate-300 mb-6">Premium eSIM devices services - Google with Microsoft technology stack and global coverage</p>
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
}