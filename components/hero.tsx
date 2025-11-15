"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Globe } from "@fluentui/react-icons"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrameId: number
    let time = 0

    const drawMesh = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(79, 70, 229, 0.08)")
      gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.04)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0.06)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid
      ctx.strokeStyle = "rgba(79, 70, 229, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 100
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offsetX = Math.sin((time + x) * 0.0005) * 10
          const offsetY = Math.cos((time + y) * 0.0005) * 10

          ctx.strokeRect(x + offsetX, y + offsetY, gridSize, gridSize)
        }
      }

      time += 0.5
      animationFrameId = requestAnimationFrame(drawMesh)
    }

    drawMesh()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10 animate-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
          <Zap size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">{t.hero.badge}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 text-foreground">
          {t.hero.title} <span className="text-accent">{t.hero.titleAccent}</span>
        </h1>

        <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button className="rounded-full px-8 py-3 h-auto text-base bg-primary hover:bg-primary/90 flex items-center gap-2">
            {t.hero.cta1}
            <ArrowRight size={20} />
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-3 h-auto text-base border-border bg-transparent">
            {t.hero.cta2}
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3 mx-auto">
              <Shield size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{t.hero.feature1Title}</h3>
            <p className="text-sm text-muted-foreground">{t.hero.feature1Desc}</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 mb-3 mx-auto">
              <Zap size={20} className="text-accent" />
            </div>
            <h3 className="font-semibold mb-2">{t.hero.feature2Title}</h3>
            <p className="text-sm text-muted-foreground">{t.hero.feature2Desc}</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3 mx-auto">
              <Globe size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{t.hero.feature3Title}</h3>
            <p className="text-sm text-muted-foreground">{t.hero.feature3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
