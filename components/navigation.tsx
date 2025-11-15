"use client"

import { useState } from "react"
import { Menu, Dismiss } from "@fluentui/react-icons"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"
import LanguageSwitcher from "@/components/language-switcher"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const navItems = [
    { label: t.nav.platform, href: "#platform" },
    { label: t.nav.features, href: "#features" },
    { label: t.nav.partners, href: "#partners" },
    { label: t.nav.security, href: "#security" },
    { label: t.nav.docs, href: "#docs" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">eSIM</span>
            </div>
            <span className="font-bold text-lg text-foreground">{t.nav.esim}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons and Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              {t.nav.signIn}
            </Button>
            <Button className="rounded-full bg-accent hover:bg-accent/90">{t.nav.getStarted}</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <Dismiss size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2 flex-col">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" className="w-full rounded-lg bg-transparent">
                {t.nav.signIn}
              </Button>
              <Button className="w-full rounded-lg bg-accent hover:bg-accent/90">{t.nav.getStarted}</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
