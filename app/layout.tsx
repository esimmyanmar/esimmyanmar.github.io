import type { Metadata } from 'next';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import '../src/styles/microsoft-fluent.scss';

export const metadata: Metadata = {
  title: 'eSIM Myanmar - Enterprise eSIM Solutions',
  description: 'Myanmar\'s leading enterprise eSIM provider with GSMA SGP.22 compliance, serving 2+ million customers across all 14 regions with 98.5% network coverage.',
  keywords: 'eSIM, Myanmar, telecommunications, enterprise, GSMA, 5G, VoLTE, roaming',
  authors: [{ name: 'eSIM Myanmar Company Limited', url: 'https://esim.com.mm' }],
  creator: 'eSIM Myanmar Company Limited',
  publisher: 'eSIM Myanmar Company Limited',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://esim.com.mm',
    siteName: 'eSIM Myanmar',
    title: 'eSIM Myanmar - Enterprise eSIM Solutions',
    description: 'Myanmar\'s leading enterprise eSIM provider with GSMA SGP.22 compliance',
    images: []
  },
  twitter: {
    card: 'summary',
    site: '@eSIMMyanmar',
    creator: '@eSIMMyanmar',
    title: 'eSIM Myanmar - Enterprise eSIM Solutions',
    description: 'Myanmar\'s leading enterprise eSIM provider with GSMA SGP.22 compliance',
    images: []
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#1e2f3c',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Microsoft Graph Toolkit
  if (typeof window !== 'undefined' && !Providers.globalProvider) {
    Providers.globalProvider = new Msal2Provider({
      clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID || '',
      authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID || 'common'}`,
      scopes: [
        'user.read',
        'files.read',
        'sites.read.all',
        'calendars.read'
      ]
    });
  }

  return (
    <html lang="en" className="fluent-theme">
      <head>
        <link rel="preconnect" href="https://graph.microsoft.com" />
        <link rel="preconnect" href="https://login.microsoftonline.com" />
        <link rel="dns-prefetch" href="//esimmyanmar.sharepoint.com" />
        <link rel="dns-prefetch" href="//powerapps.microsoft.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "eSIM Myanmar Company Limited",
              "url": "https://esim.com.mm",
              "description": "Myanmar's leading enterprise eSIM provider with GSMA SGP.22 compliance",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MM",
                "addressRegion": "Yangon"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+95-9650000172",
                "email": "info@esim.com.mm",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body>
        <div id="root">
          <header className="site-header">
            <nav className="main-navigation glass-card">
              <div className="nav-brand">
                <div className="brand-logo"></div>
                <span className="brand-text">eSIM Myanmar</span>
              </div>
              <div className="nav-links">
                <a href="/" className="nav-link">Home</a>
                <a href="/company" className="nav-link">Company</a>
                <a href="/technology" className="nav-link">Technology</a>
                <a href="/coverage" className="nav-link">Coverage</a>
                <a href="/devices" className="nav-link">Devices</a>
                <a href="/support" className="nav-link">Support</a>
                <a href="/contact" className="nav-link">Contact</a>
              </div>
              <div className="nav-actions">
                <div className="language-selector">
                  <select className="language-select">
                    <option value="en">English</option>
                    <option value="my">မြန်မာ</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
              </div>
            </nav>
          </header>

          <main className="site-main">
            {children}
          </main>

          <footer className="site-footer glass-card">
            <div className="footer-content">
              <div className="footer-section">
                <h4>eSIM Myanmar</h4>
                <p>Enterprise eSIM Solutions</p>
                <p>GSMA SGP.22 Certified</p>
              </div>
              <div className="footer-section">
                <h4>Services</h4>
                <ul>
                  <li><a href="/5g">5G Network</a></li>
                  <li><a href="/volte">VoLTE</a></li>
                  <li><a href="/roaming">Global Roaming</a></li>
                  <li><a href="/iot">IoT Solutions</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Coverage</h4>
                <ul>
                  <li><a href="/myanmar">Myanmar</a></li>
                  <li><a href="/asean">ASEAN</a></li>
                  <li><a href="/global">Global</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/support">24/7 Support</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="contact-info">
                <span>esim.com.mm</span>
                <span>info@esim.com.mm</span>
                <span>09650000172</span>
                <span>@eSIMMyanmar</span>
              </div>
              <div className="copyright">
                <p>© 2025 eSIM Myanmar Company Limited. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </div>

        {/* Copilot Studio embedded via iframe to avoid third-party CDNs */}
        <iframe
          title="eSIM Myanmar Copilot"
          id="copilot-frame"
          src="https://copilotstudio.microsoft.com/embed/agents/esim-myanmar-public"
          referrerPolicy="no-referrer"
          loading="lazy"
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            width: '420px',
            height: '560px',
            border: '0',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            backgroundColor: 'rgba(30, 47, 60, 0.85)'
          }}
        />
      </body>
    </html>
  );
}