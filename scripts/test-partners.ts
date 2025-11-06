import { telecomPartners, financialPartners, paymentPartners } from "../lib/payment-partners"

const allPartners = [...telecomPartners, ...financialPartners, ...paymentPartners]

async function validatePartnerLinks() {
  console.log("[v0] Starting partner link validation...")
  const results = {
    passed: 0,
    failed: 0,
    timeout: 0,
    details: [] as Array<{ name: string; url: string; status: number | string }>,
  }

  for (const partner of allPartners) {
    try {
      const response = await fetch(partner.url, {
        method: "HEAD",
        timeout: 5000,
      }).catch(() => ({ status: "timeout" }))

      if (response.status === "timeout") {
        results.timeout++
        results.details.push({ name: partner.displayName, url: partner.url, status: "timeout" })
      } else if (response.status >= 200 && response.status < 400) {
        results.passed++
        results.details.push({ name: partner.displayName, url: partner.url, status: response.status })
      } else {
        results.failed++
        results.details.push({ name: partner.displayName, url: partner.url, status: response.status })
      }
    } catch (error) {
      results.failed++
      results.details.push({ name: partner.displayName, url: partner.url, status: "error" })
    }
  }

  console.log("[v0] Partner validation complete:")
  console.log(`  Passed: ${results.passed}/${allPartners.length}`)
  console.log(`  Failed: ${results.failed}/${allPartners.length}`)
  console.log(`  Timeout: ${results.timeout}/${allPartners.length}`)

  return results
}

// Run if executed directly
if (typeof window === "undefined") {
  validatePartnerLinks().then(console.log)
}

export { validatePartnerLinks }
