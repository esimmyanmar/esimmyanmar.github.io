import Head from 'next/head'
import Link from 'next/link'

export default function Page5GNetwork() {
  return (
    <>
      <Head>
        <title>5G Network | eSIM Myanmar</title>
        <meta name="description" content="Ultra-fast 5G connectivity with VoLTE and advanced network slicing" />
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
              <h1 className="text-5xl font-bold text-white mb-8">5G Network</h1>
              <div className="prose prose-invert prose-cyan max-w-none">
                <p className="text-xl text-slate-300 mb-6">Experience ultra-fast 5G speeds with advanced network slicing and VoLTE capabilities across Myanmar.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}