import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>eSIM Myanmar - Premium 5G eSIM Technology | 50M+ Users ASEAN</title>
        <meta name="description" content="Premium eSIM technology serving 50+ million users across ASEAN. 100% Microsoft stack, Zero Trust security, global roaming in 200+ countries." />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="glass-container">
          <header className="premium-header">
            <div className="container mx-auto px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="brand-logo">
                  <h1 className="text-4xl font-bold text-cyan-400">eSIM Myanmar</h1>
                  <p className="text-slate-300">Premium 5G Connectivity</p>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <Link href="/company" className="nav-link">Company</Link>
                  <Link href="/technology" className="nav-link">Technology</Link>
                  <Link href="/coverage" className="nav-link">Coverage</Link>
                  <Link href="/support" className="nav-link">Support</Link>
                </nav>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-16">
            <div className="hero-section text-center mb-20">
              <h2 className="text-6xl font-bold text-white mb-6">
                Premium eSIM Technology
              </h2>
              <p className="text-2xl text-slate-300 mb-8 max-w-4xl mx-auto">
                Serving 50+ million users across ASEAN with 100% Microsoft stack, 
                Zero Trust security, and global roaming in 200+ countries
              </p>
              <div className="flex justify-center space-x-6">
                <Link href="/devices" className="premium-button">
                  Check Device Compatibility
                </Link>
                <Link href="/coverage" className="premium-button-outline">
                  View Coverage Map
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="feature-card">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">5G Network</h3>
                <p className="text-slate-300">Ultra-fast 5G connectivity across Myanmar with VoLTE support</p>
                <Link href="/5g" className="card-link">Learn More</Link>
              </div>
              <div className="feature-card">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Global Roaming</h3>
                <p className="text-slate-300">Seamless connectivity in 200+ countries worldwide</p>
                <Link href="/roaming" className="card-link">Explore Roaming</Link>
              </div>
              <div className="feature-card">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Enterprise Security</h3>
                <p className="text-slate-300">Zero Trust architecture with Microsoft Entra ID</p>
                <Link href="/security" className="card-link">Security Details</Link>
              </div>
            </div>

            <div className="stats-section">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="stat-item">
                  <div className="text-4xl font-bold text-cyan-400">50M+</div>
                  <div className="text-slate-300">ASEAN Users</div>
                </div>
                <div className="stat-item">
                  <div className="text-4xl font-bold text-cyan-400">300</div>
                  <div className="text-slate-300">Pages</div>
                </div>
                <div className="stat-item">
                  <div className="text-4xl font-bold text-cyan-400">200+</div>
                  <div className="text-slate-300">Countries</div>
                </div>
                <div className="stat-item">
                  <div className="text-4xl font-bold text-cyan-400">100%</div>
                  <div className="text-slate-300">Microsoft Stack</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}