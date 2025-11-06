export interface ComplianceCheck {
  name: string
  passed: boolean
  message: string
  severity: "critical" | "major" | "minor"
}

export const complianceValidator = {
  checkHTTPS(): ComplianceCheck {
    const passed = typeof window !== "undefined" && window.location.protocol === "https:"
    return {
      name: "HTTPS Enforcement",
      passed,
      message: passed ? "Site uses HTTPS" : "Site must use HTTPS",
      severity: "critical",
    }
  },

  checkPrivacyPolicy(): ComplianceCheck {
    const privacyLink = document.querySelector('a[href*="privacy"]')
    const passed = !!privacyLink
    return {
      name: "Privacy Policy",
      passed,
      message: passed ? "Privacy policy link found" : "Privacy policy must be accessible",
      severity: "critical",
    }
  },

  checkCookieConsent(): ComplianceCheck {
    const hasConsent = document.cookie.includes("consent=")
    return {
      name: "Cookie Consent",
      passed: hasConsent,
      message: hasConsent ? "User consent recorded" : "Consent management required for GDPR/PDPA",
      severity: "major",
    }
  },

  checkContentSecurityPolicy(): ComplianceCheck {
    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
    const passed = !!meta
    return {
      name: "Content Security Policy",
      passed,
      message: passed ? "CSP header configured" : "CSP must be configured for security",
      severity: "major",
    }
  },

  checkAccessibility(): ComplianceCheck {
    const hasLang = document.documentElement.lang
    const passed = !!hasLang
    return {
      name: "Accessibility (WCAG)",
      passed,
      message: passed ? "Language attribute set" : "Language attribute required for WCAG 2.1",
      severity: "major",
    }
  },

  runAll(): ComplianceCheck[] {
    return [
      this.checkHTTPS(),
      this.checkPrivacyPolicy(),
      this.checkCookieConsent(),
      this.checkContentSecurityPolicy(),
      this.checkAccessibility(),
    ]
  },
}
