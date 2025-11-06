"use client"

import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"
import { telecomPartners, financialPartners, paymentPartners } from "@/lib/payment-partners"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export default function PartnersPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background">
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-hero mb-4">
              {t.partners.title} <span className="text-accent">{t.partners.titleAccent}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.partners.description}</p>
          </div>

          {/* Telecommunication Partners */}
          <div className="mb-16">
            <h2 className="text-section-title mb-8 text-foreground">{t.partners.telecom}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {telecomPartners.map((partner) => (
                <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="glass p-6 flex flex-col items-center justify-center min-h-48 hover:border-primary/50 transition-all cursor-pointer">
                    <div
                      className="w-16 h-16 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: partner.color }}
                    >
                      {partner.name.substring(0, 2)}
                    </div>
                    <h3 className="font-semibold text-center mb-2">{partner.displayName}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">{partner.url}</p>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Financial Partners */}
          <div className="mb-16">
            <h2 className="text-section-title mb-8 text-foreground">{t.partners.financial}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialPartners.map((partner) => (
                <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="glass p-6 flex flex-col items-center justify-center min-h-48 hover:border-primary/50 transition-all cursor-pointer">
                    <div
                      className="w-16 h-16 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: partner.color }}
                    >
                      {partner.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 className="font-semibold text-center mb-2">{partner.displayName}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">{partner.url}</p>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Payment Partners */}
          <div>
            <h2 className="text-section-title mb-8 text-foreground">{t.partners.tech}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentPartners.map((partner) => (
                <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="glass p-6 flex flex-col items-center justify-center min-h-48 hover:border-primary/50 transition-all cursor-pointer">
                    <div
                      className="w-16 h-16 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: partner.color }}
                    >
                      {partner.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 className="font-semibold text-center mb-2 text-sm">{partner.displayName}</h3>
                    <p className="text-xs text-muted-foreground text-center mb-4">{partner.url}</p>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
