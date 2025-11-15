"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight, CheckmarkCircle, Cpu, Database, Send } from "@fluentui/react-icons"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export default function EaasFlow() {
  const { language } = useLanguage()
  const t = translations[language]

  const steps = [
    {
      number: "01",
      title: t.eaas.step1Title,
      description: t.eaas.step1Desc,
      icon: Send,
    },
    {
      number: "02",
      title: t.eaas.step2Title,
      description: t.eaas.step2Desc,
      icon: Cpu,
    },
    {
      number: "03",
      title: t.eaas.step3Title,
      description: t.eaas.step3Desc,
      icon: Database,
    },
    {
      number: "04",
      title: t.eaas.step4Title,
      description: t.eaas.step4Desc,
      icon: CheckCircle2,
    },
  ]

  return (
    <section id="platform" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t.eaas.title} <span className="text-accent">{t.eaas.titleAccent}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.eaas.description}</p>
        </div>

        {/* Flow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <Card className="p-6 h-full border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-primary/20">{step.number}</span>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="text-primary/30" size={24} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
