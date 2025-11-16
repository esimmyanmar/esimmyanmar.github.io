import Head from 'next/head'
import Link from 'next/link'

export default function MediaCenter() {
  return (
    <>
      <Head>
        <title>Media Center | eSIM Myanmar</title>
        <meta name="description" content="Press releases, media kit, and company resources" />
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
              <h1 className="text-5xl font-bold text-white mb-8">Media Center</h1>
              <div className="prose prose-invert prose-cyan max-w-none">
                <p className="text-xl text-slate-300 mb-6">Access press releases, media kit, logos, and company resources for media coverage.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}