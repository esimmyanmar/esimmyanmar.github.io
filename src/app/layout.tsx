import { Inter, Noto_Sans_Myanmar } from 'next/font/google';
import './globals.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ['myanmar'],
  variable: '--font-myanmar',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  title: 'eSIM Myanmar - Entitlements-as-a-Service',
  description: 'NetLync Entitlements-as-a-Service  The First. The Fastest. The Only. GSMA SGP.22 v4.0 compliant eSIM platform.',
  keywords: 'eSIM, Myanmar, NetLync, EaaS, Entitlements-as-a-Service, GSMA, SGP.22',
  authors: [{ name: 'ESIM MYANMAR COMPANY LIMITED' }],
  creator: 'ESIM MYANMAR COMPANY LIMITED',
  publisher: 'ESIM MYANMAR COMPANY LIMITED',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://esimmyanmar.github.io'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'my': '/my'
    }
  },
  openGraph: {
    title: 'eSIM Myanmar - Entitlements-as-a-Service',
    description: 'NetLync Entitlements-as-a-Service  The First. The Fastest. The Only.',
    url: 'https://esimmyanmar.github.io',
    siteName: 'eSIM Myanmar',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'eSIM Myanmar - Entitlements-as-a-Service'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eSIM Myanmar - Entitlements-as-a-Service',
    description: 'NetLync Entitlements-as-a-Service  The First. The Fastest. The Only.',
    images: ['/assets/twitter-image.jpg'],
    creator: '@eSIMMyanmar'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${notoSansMyanmar.variable}`}>
      <head>
        <link rel="preload" href="/fonts/noto-sans-myanmar.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e2f3c" />
        <meta name="msapplication-TileColor" content="#1e2f3c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TelecommunicationsServiceProvider',
              name: 'eSIM Myanmar',
              description: 'Entitlements-as-a-Service platform',
              url: 'https://esimmyanmar.github.io',
              logo: 'https://esimmyanmar.github.io/assets/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+95-9650000172',
                contactType: 'customer service',
                email: 'info@esim.com.mm'
              },
              offers: {
                '@type': 'Offer',
                name: 'Entitlements-as-a-Service',
                description: 'GSMA SGP.22 v4.0 compliant eSIM activation service'
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}