import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/app/language-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "eSIM Myanmar - Enterprise Mobile Connectivity Platform",
  description:
    "Next-generation eSIM deployment and management platform for Myanmar enterprises. NetLync EaaS integration, GSMA SGP.32 compliant, secure and scalable.",
  generator: "v0.app",
  openGraph: {
    title: "eSIM Myanmar - Enterprise Mobile Connectivity",
    description: "NetLync Entitlements-as-a-Service platform for Myanmar",
    url: "https://esim.com.mm",
    type: "website",
  },
  alternates: {
    languages: {
      "en-US": "https://esim.com.mm/en",
      "my-MM": "https://esim.com.mm/my",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Myanmar Font Preload */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Security Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e2f3c" />
        {/* WCAG Compliance */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${_geist.className} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
