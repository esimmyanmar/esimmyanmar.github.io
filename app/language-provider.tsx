"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get language from cookie or localStorage
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("language="))
      ?.split("=")[1]

    const stored = cookieValue || localStorage.getItem("language") || "en"
    const lang = (stored === "my" ? "my" : "en") as Language

    setLanguageState(lang)
    setIsLoading(false)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.cookie = `language=${lang}; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`
  }

  return <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
