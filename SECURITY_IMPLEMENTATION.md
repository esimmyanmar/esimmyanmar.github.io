# eSIM Myanmar: Security Implementation Guide

## Compliance Frameworks

### Myanmar Electronic Transactions Law 2021
- Digital signature capability for EaaS transactions
- Data retention: 7 years minimum
- Local contact: info@esim.com.mm, 09650000172
- Partner agreements: All carriers (ATOM, Mytel, MPT, U9) compliant

### GDPR (European Users)
- Privacy Policy: Article 13 compliant
- Data Processing Agreement (DPA): Available for vendors
- Data Subject Rights: Delete, access, portability available
- Breach Notification: <72 hours to authorities
- DPIA: Completed for EaaS profile handling
- Consent: Explicit opt-in via cookie banner

### PDPA (Singapore/ASEAN)
- Personal Data Protection Act compliance
- Consent Management: Bilingual opt-in
- Data Retention: 12 months maximum
- Personal Data Officer: Designated and available
- Cross-border Transfers: Restricted, with consent

### WCAG 2.1 AAA+ (Accessibility)
- Contrast Ratio: ≥7:1 all text
- Keyboard Navigation: Full support (Tab, Enter, Escape)
- Screen Reader: Compatible (NVDA, VoiceOver, JAWS)
- Touch Targets: ≥48x48px all interactive elements
- Bilingual: English and Myanmar with font preloading

### GSMA SGP.22 v4.0 & SGP.32 2025
- Profile Encryption: AES-256-CBC
- Session Management: TLS 1.3 minimum
- Authentication: Multi-factor available
- Authorization: RBAC enforced
- EaaS Lifecycle: 4-stage provisioning
- Multi-eSIM: Up to 5 profiles per device

## Security Headers Implementation

### Required Headers
\`\`\`
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [see config]
\`\`\`

### Implementation in next.config.mjs
All headers configured via API routes with nonce generation for inline scripts.

## Encryption Standards

- **Data at Rest**: AES-256-GCM (local storage encryption)
- **Data in Transit**: TLS 1.3 (minimum TLS 1.2)
- **Key Exchange**: ECDH P-256
- **Hashing**: SHA-256 for integrity verification
- **HMAC**: HMAC-SHA256 for authentication codes

## Authentication & Authorization

- **User Auth**: JWT with RS256 signing (RSA 2048-bit minimum)
- **API Auth**: OAuth2 Bearer tokens with <1 hour expiry
- **MFA**: TOTP (Time-based One-Time Password) available
- **Passkey**: FIDO2/WebAuthn support for passwordless
- **Session**: Secure HTTP-only cookies, SameSite=Lax

## Audit Logging

- **Event Logging**: All EaaS operations (check, activate, transfer)
- **Log Retention**: 1 year minimum (7 years for Myanmar ETL)
- **Log Encryption**: Encrypted in transit and at rest
- **Log Access**: Restricted to authorized personnel only
- **PII Redaction**: Personal data masked in logs (last 4 digits only)

## Incident Response

**Severity Levels:**
- **SEV1 (Critical)**: Data breach, service down, active exploitation
  - Response: <30 minutes
  - Escalation: CTO, Legal, Security
  - Notification: <72 hours (GDPR/PDPA)

- **SEV2 (Major)**: Auth bypass, significant data exposure
  - Response: <2 hours
  - Escalation: Tech Lead, Security
  - Notification: <5 business days

- **SEV3 (Minor)**: Info disclosure, account lockout
  - Response: <1 business day
  - Escalation: Engineering
  - Notification: Monitoring only

## Vulnerability Disclosure

- **Contact**: security@esim.com.mm
- **Response Time**: <48 hours acknowledgment
- **Fix Timeline**: 30-90 days based on severity
- **CVE**: Will be obtained for critical/major issues
- **Disclosure**: Responsible disclosure policy followed

## Third-Party Risk Management

- **Vendor Assessment**: Annual security review
- **SLA Requirements**: 99.99% uptime, <15min MTTR
- **Audit Rights**: Annual third-party penetration test
- **Data Processing**: DPA signed with all vendors
- **Incident Notification**: Vendor must notify <24 hours

## Security Testing Schedule

- **Penetration Testing**: Annual third-party engagement
- **Vulnerability Scanning**: Monthly automated (Snyk, npm audit)
- **Code Review**: 100% code review before merge
- **Dependency Audit**: Weekly automated checks
- **Security Audit**: Quarterly internal audit
- **Compliance Audit**: Annual external audit (Myanmar ETL, GDPR, PDPA)
