"use client"

import { Separator } from "@/components/ui/separator"
import { Share, Mail } from "@fluentui/react-icons"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  const footerLinks = {
    [t.footer.product]: ["Features", "Security", "Pricing", "Enterprise"],
    [t.footer.company]: ["About", "Blog", "Careers", "Contact"],
    [t.footer.resources]: ["Documentation", "API Reference", "Support", "Status"],
    [t.footer.legal]: ["Privacy", "Terms", "Compliance", "Audit Reports"],
  }

  return (
    <footer className="bg-foreground text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">eSIM</span>
              </div>
              <span className="font-bold text-lg">{t.nav.esim}</span>
            </div>
            <p className="text-sm text-white/70">{t.footer.tagline}</p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <Share size={20} />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <Share size={20} />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
