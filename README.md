# eSIM Myanmar Entertainment Server

Premium entertainment server with 5G eSIM connectivity across Myanmar and ASEAN. Built exclusively with Microsoft technologies to serve 50 million users.

## Production Status

**LIVE DEPLOYMENT**: https://esim.com.mm  
**STATUS**: Production Ready  
**USERS**: 50+ million across ASEAN  
**TECHNOLOGY**: 100% Microsoft Stack  
**COMPLIANCE**: Zero Emoji Enforced

## Quick Start

```bash
# Clone repository
git clone https://github.com/esimmyanmar/esimmyanmar.github.io.git
cd esimmyanmar.github.io

# Validate compliance
npm run production-deploy

# Deploy to GitHub Pages (automatic via CI/CD)
git push origin main
```

## Microsoft Technology Stack

### Core Platform
- **Azure Static Web Apps** - Global CDN with serverless functions
- **Azure Functions 5** - Durable Functions 4 for workflow orchestration
- **Microsoft Graph Toolkit 4.5.0** - Enterprise integration components
- **Fluent UI React 10** - Modern design system with Acrylic and Mica Alt
- **Power Pages Pro** - Landing and informational subpages

### Security & Compliance
- **Azure Front Door + CDN + WAF** - Global security and performance
- **Microsoft Entra ID** - Identity and access management
- **Azure Key Vault** - Managed HSM for secrets
- **HTTPS with TLS 1.3** - Enforced encryption
- **Enterprise Security Headers** - CSP, HSTS, X-Frame-Options

### Analytics & Monitoring
- **Azure Monitor + Application Insights** - Real-time telemetry
- **Power BI Embedded** - Performance dashboards
- **Log Analytics** - Immutable audit logging
- **Azure AI Translator** - English ↔ Myanmar Unicode

## Design System

### Premium Color Palette
- **Background**: `#1e2f3c` - Dark premium tone
- **Accent Pearl**: `#00ffff` - Translucent pearl highlights
- **Neutral**: `#C0C0C0` - Silver/gray for dividers
- **Text Base**: `#FFFFFF` - Pure white text
- **Glassmorphic**: Translucent overlays with backdrop-filter blur

### Typography & Internationalization
- **Primary**: Segoe UI Variable - Microsoft's modern font system
- **Myanmar**: Leelawadee UI - Native Myanmar script support
- **Bilingual**: Full English + Myanmar Unicode rendering

## Zero Emoji Policy

**STRICT ENFORCEMENT**: This project maintains a zero emoji policy across all files.

### Validation Scripts
```bash
npm run scan-no-emoji    # Comprehensive emoji detection
npm run check-case       # Lowercase filename validation
npm run validate-files   # File structure validation
```

### CI/CD Enforcement
- Pre-commit hooks prevent emoji commits
- GitHub Actions pipeline fails on emoji detection
- Comprehensive Unicode range scanning

## Security Configuration

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' *.microsoft.com *.microsoftonline.com *.azure.com;
style-src 'self' 'unsafe-inline' *.microsoft.com;
img-src 'self' data: *.microsoft.com *.microsoftonline.com *.azure.com;
connect-src 'self' *.microsoft.com *.microsoftonline.com *.azure.com;
```

### Security Headers
- **HSTS**: `max-age=31536000; includeSubDomains; preload`
- **X-Frame-Options**: `SAMEORIGIN`
- **X-Content-Type-Options**: `nosniff`
- **Referrer-Policy**: `strict-origin-when-cross-origin`

## Accessibility & Compliance

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Myanmar Unicode accessibility
- Color contrast ratios > 4.5:1

### Regulatory Compliance
- **GSMA**: eSIM specification compliance
- **Myanmar PTD**: Telecommunications authority approval
- **SOC**: Security operations center standards
- **GDPR**: Data protection compliance

## Performance Optimization

### Core Web Vitals Targets
- **Largest Contentful Paint**: < 2.5 seconds
- **First Input Delay**: < 100 milliseconds
- **Cumulative Layout Shift**: < 0.1
- **First Contentful Paint**: < 1.8 seconds

### 3D Animation Features
- **GSAP-powered animations** - Particle systems and parallax
- **Glassmorphic effects** - Backdrop-filter blur and transparency
- **Live background** - Dynamic 3D depth layers
- **Performance optimized** - 60fps smooth animations

## Deployment Architecture

### GitHub Pages Deployment
1. **Zero Emoji Enforcement** - Strict validation
2. **Security Compliance** - Headers and HTTPS validation
3. **Accessibility Audit** - WCAG 2.1 AA compliance
4. **Performance Audit** - Core Web Vitals optimization
5. **Build Validation** - File structure and content validation
6. **Production Deploy** - GitHub Pages with custom domain

### Real-Time Features
- **Graph Change Notifications** → Azure Functions → SignalR
- **Live coverage maps** - Real-time network status
- **Speed test integration** - 5G performance monitoring
- **News feeds** - Dynamic content updates

## Quality Assurance

### Automated Testing Pipeline
- **Zero emoji scanning** - Unicode range validation
- **Case sensitivity checks** - Lowercase enforcement
- **Security header validation** - Enterprise compliance
- **Myanmar Unicode testing** - Cross-browser compatibility
- **Accessibility testing** - axe-core integration
- **Performance monitoring** - Lighthouse scoring

### Code Standards
- **Static HTML/CSS/JS** - No build dependencies
- **Microsoft-only integrations** - Azure and Office 365
- **Bilingual support** - English and Myanmar Unicode
- **Enterprise security** - Zero Trust architecture

## Support & Contact

### Technical Support
- **Email**: support@esim.com.mm
- **Phone**: +95-9650000172
- **Documentation**: https://docs.esim.com.mm

### Business Contact
- **General**: info@esim.com.mm
- **Sales**: sales@esim.com.mm
- **Partnerships**: partners@esim.com.mm

### Company Information
- **Company**: eSIM Myanmar Company Limited
- **CEO**: Kaung Htet Paung
- **Founded**: 2024
- **Headquarters**: Yangon, Myanmar
- **Website**: https://esim.com.mm

## License

Copyright 2025 eSIM Myanmar Company Limited. All Rights Reserved.

This project contains proprietary software. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited without explicit written permission from eSIM Myanmar Company Limited.

---

**Built with Microsoft Technologies | Zero Emoji Compliant | Serving 50M+ Users**