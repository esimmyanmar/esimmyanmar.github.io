// CHANGE: Lighthouse CI configuration for automated performance audits

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      staticDistDir: "./out",
      url: [
        "http://localhost:3000",
        "http://localhost:3000/en",
        "http://localhost:3000/my",
        "http://localhost:3000/en/partners",
        "http://localhost:3000/my/partners",
        "http://localhost:3000/en/how-it-works",
        "http://localhost:3000/my/how-it-works",
        "http://localhost:3000/en/faq",
        "http://localhost:3000/my/faq",
      ],
      settings: {
        chromeFlags: "--no-sandbox",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
        },
      },
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "first-contentful-paint": ["error", { maxNumericValue: 1500 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 1500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.03 }],
        "interaction-to-next-paint": ["error", { maxNumericValue: 75 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    server: {
      port: 9001,
    },
  },
}
