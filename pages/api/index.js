import Head from 'next/head'
import Link from 'next/link'

export default function APIDocumentation() {
  return (
    <>
      <Head>
        <title>API Documentation | eSIM Myanmar</title>
        <meta name="description" content="Developer APIs for eSIM provisioning and management integration" />
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
              <h1 className="text-5xl font-bold text-white mb-8">API Documentation</h1>
              <div className="prose prose-invert prose-cyan max-w-none">
                <p className="text-xl text-slate-300 mb-6">Comprehensive REST APIs for eSIM provisioning, management, and integration with enterprise systems.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}