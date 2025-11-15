"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/language-provider"
import { Globe } from "@fluentui/react-icons"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary rounded-full">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="rounded-full"
        aria-label="Switch to English"
        title="English"
      >
        <Globe className="w-4 h-4 mr-1" />
        EN
      </Button>
      <Button
        variant={language === "my" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("my")}
        className="rounded-full"
        aria-label="မြန်မာ ဘာသာစကား သို့ ပြောင်းပြန်ခြင်း"
        title="မြန်မာ"
      >
        <Globe className="w-4 h-4 mr-1" />
        မြန်မာ
      </Button>
    </div>
  )
}
