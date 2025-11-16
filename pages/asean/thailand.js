import Head from 'next/head'
import Link from 'next/link'

export default function ThailandRoaming() {
  return (
    <>
      <Head>
        <title>Thailand Roaming | eSIM Myanmar</title>
        <meta name="description" content="Seamless eSIM roaming in Thailand with local partnerships" />
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
              <h1 className="text-5xl font-bold text-white mb-8">Thailand Roaming</h1>
              <div className="prose prose-invert prose-cyan max-w-none">
                <p className="text-xl text-slate-300 mb-6">Seamless roaming in Thailand with premium local carrier partnerships.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}