// CHANGE: Enterprise audit configuration for compliance tracking

export const auditConfig = {
  version: "1.0.0",
  timestamp: new Date().toISOString(),

  // Visual & UX Audit Dimensions
  visual: {
    responsiveBreakpoints: [320, 480, 768, 1024, 1440, 1920, 3840],
    browsers: ["Chrome 131", "Safari 19", "Firefox 133", "Edge 131"],
    wcag: {
      level: "AAA",
      minContrast: 7,
      minTouchTarget: 48,
    },
  },

  // Security Audit
  security: {
    csp: {
      enabled: true,
      nonce: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'nonce'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
      },
    },
    headers: {
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },

  // Performance Targets
  performance: {
    lighthouse: {
      performance: 95,
      accessibility: 95,
      bestPractices: 95,
      seo: 95,
    },
    coreWeb: {
      lcp: 1500, // milliseconds
      inp: 80, // milliseconds
      cls: 0.03, // score
      ttfb: 100, // milliseconds
    },
  },

  // Compliance Frameworks
  compliance: {
    myanmar_etl_2021: {
      digital_signatures: true,
      data_localization: true,
    },
    gdpr: {
      article_30: true,
      breach_notification: 72, // hours
      dpia_required: true,
    },
    pdpa: {
      consent_required: true,
      data_retention: 12, // months
    },
    wcag: {
      level: "AAA",
      version: "2.1",
    },
    gsma: {
      sgp_22_v4_0: true,
      sgp_32_2025: true,
    },
  },
}

export type AuditConfig = typeof auditConfig
