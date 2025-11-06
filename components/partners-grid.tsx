"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export default function PartnersGrid() {
  const { language } = useLanguage()
  const t = translations[language]

  const partnerCategories = [
    {
      title: t.partners.telecom,
      partners: ["MPT", "Telenor Myanmar", "Ooredoo", "MyTel"],
    },
    {
      title: t.partners.financial,
      partners: ["CB Bank", "KBZ Bank", "AYA Bank", "BNPL Myanmar"],
    },
    {
      title: t.partners.digital,
      partners: ["Wave Money", "PayPay", "Grab", "Shopee"],
    },
    {
      title: t.partners.tech,
      partners: ["NetLync", "Telecom API Suite", "SMS Gateway Pro", "IoT Connect"],
    },
  ]

  return (
    <section id="partners" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t.partners.title} <span className="text-accent">{t.partners.titleAccent}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.partners.description}</p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerCategories.map((category, idx) => (
            <Card key={idx} className="p-8 border-border hover:border-primary/50 transition-all">
              <h3 className="font-semibold text-lg mb-6 text-foreground">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.partners.map((partner) => (
                  <Badge
                    key={partner}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium rounded-full bg-background hover:bg-primary/10 transition-colors"
                  >
                    {partner}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
