import { complianceValidator } from "./compliance-validator"
import { auditConfig } from "./audit-config"

export interface AuditResult {
  dimension: string
  status: "pass" | "fail" | "warning"
  checks: Array<{
    name: string
    result: boolean
    details: string
  }>
  timestamp: string
}

export const auditRunner = {
  async runPerformanceAudit(): Promise<AuditResult> {
    const checks = []

    // LCP check
    const lcpCheck = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      checks.push({
        name: "Largest Contentful Paint (LCP)",
        result: lastEntry.renderTime < auditConfig.performance.coreWeb.lcp,
        details: `LCP: ${Math.round(lastEntry.renderTime)}ms (target: <${auditConfig.performance.coreWeb.lcp}ms)`,
      })
    })

    try {
      lcpCheck.observe({ entryTypes: ["largest-contentful-paint"] })
    } catch (e) {
      // PerformanceObserver not supported
    }

    return {
      dimension: "Performance & Monitoring",
      status: checks.every((c) => c.result) ? "pass" : "warning",
      checks,
      timestamp: new Date().toISOString(),
    }
  },

  async runComplianceAudit(): Promise<AuditResult> {
    const checks = complianceValidator.runAll()
    const allPassed = checks.every((c) => c.passed)

    return {
      dimension: "Security & Compliance",
      status: allPassed ? "pass" : checks.some((c) => c.severity === "critical") ? "fail" : "warning",
      checks: checks.map((c) => ({
        name: c.name,
        result: c.passed,
        details: c.message,
      })),
      timestamp: new Date().toISOString(),
    }
  },

  async runFullAudit(): Promise<AuditResult[]> {
    return Promise.all([this.runPerformanceAudit(), this.runComplianceAudit()])
  },
}
