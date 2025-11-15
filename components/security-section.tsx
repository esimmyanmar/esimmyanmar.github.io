"use client"

import { Card } from "@/components/ui/card"
import { Lock, Eye, Zap, Globe, Shield, Layers } from "@fluentui/react-icons"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export default function SecuritySection() {
  const { language } = useLanguage()
  const t = translations[language]

  const securityFeatures = [
    {
      title: t.security.feature1,
      description: t.security.feature1Desc,
      icon: Lock,
    },
    {
      title: t.security.feature2,
      description: t.security.feature2Desc,
      icon: Eye,
    },
    {
      title: t.security.feature3,
      description: t.security.feature3Desc,
      icon: Zap,
    },
    {
      title: t.security.feature4,
      description: t.security.feature4Desc,
      icon: ShieldAlert,
    },
    {
      title: t.security.feature5,
      description: t.security.feature5Desc,
      icon: Globe,
    },
    {
      title: t.security.feature6,
      description: t.security.feature6Desc,
      icon: Layers,
    },
  ]

  return (
    <section id="security" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t.security.title} <span className="text-accent">{t.security.titleAccent}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.security.description}</p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card
                key={idx}
                className="p-6 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
