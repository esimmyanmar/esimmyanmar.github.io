import Head from 'next/head'
import Link from 'next/link'

export default function MicrosoftGraphPage() {
  return (
    <>
      <Head>
        <title>Microsoft Graph Integration | eSIM Myanmar</title>
        <meta name="description" content="Microsoft Graph Toolkit integration for enterprise connectivity and Microsoft 365 services" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="glass-container">
          <header className="premium-header">
            <div className="container mx-auto px-6 py-8">
              <Link href="/" className="text-cyan-400 hover:text-cyan-300">← eSIM Myanmar</Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-6xl font-bold text-white mb-8">Microsoft Graph Integration</h1>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-6">Enterprise Connectivity</h2>
                  <p className="text-xl text-slate-300 mb-6">
                    Seamless integration with Microsoft 365 ecosystem using Graph Toolkit 4.5.0
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Microsoft Graph Components</h3>
                      <mgt-login></mgt-login>
                      <mgt-person person-query="me"></mgt-person>
                    </div>
                    
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Calendar Integration</h3>
                      <mgt-agenda></mgt-agenda>
                    </div>
                    
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Teams Integration</h3>
                      <mgt-teams-channel-picker></mgt-teams-channel-picker>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-6">Enterprise Features</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Microsoft 365 Integration</h3>
                      <ul className="text-slate-300 space-y-2">
                        <li>• Single Sign-On with Entra ID</li>
                        <li>• Teams Channel Integration</li>
                        <li>• SharePoint Document Access</li>
                        <li>• Outlook Calendar Sync</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Graph API Features</h3>
                      <ul className="text-slate-300 space-y-2">
                        <li>• Real-time Notifications</li>
                        <li>• User Profile Management</li>
                        <li>• File Sharing & Collaboration</li>
                        <li>• Enterprise Security</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Zero Trust Security</h3>
                      <ul className="text-slate-300 space-y-2">
                        <li>• Conditional Access Policies</li>
                        <li>• Multi-Factor Authentication</li>
                        <li>• Identity Protection</li>
                        <li>• Privileged Access Management</li>
                      </ul>
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