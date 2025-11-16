import Head from 'next/head'
import Link from 'next/link'

export default function MultiSIMSupport() {
  return (
    <>
      <Head>
        <title>Multi-SIM Support | eSIM Myanmar</title>
        <meta name="description" content="Advanced multi-SIM management with seamless switching" />
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
              <h1 className="text-5xl font-bold text-white mb-8">Multi-SIM Support</h1>
              <div className="prose prose-invert prose-cyan max-w-none">
                <p className="text-xl text-slate-300 mb-6">Advanced multi-SIM management with seamless profile switching and dual connectivity.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}