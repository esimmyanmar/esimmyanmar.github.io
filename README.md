# eSIM Myanmar Entertainment Server

Premium entertainment server with 5G eSIM connectivity across Myanmar and ASEAN. Built exclusively with Microsoft technologies to serve 50 million users.

## Production Status

**LIVE DEPLOYMENT**: https://esim.com.mm  
**STATUS**: Production Ready  
**USERS**: 50+ million across ASEAN  
**TECHNOLOGY**: 100% Microsoft Stack  

## Quick Start

```bash
# Clone repository
git clone https://github.com/esimmyanmar/esimmyanmar.github.io.git
cd esimmyanmar.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to production
npm run production-deploy
```

## Microsoft Technology Stack

### Core Platform
- **Azure Static Web Apps** - Global CDN with serverless functions
- **Azure Functions 5** - Durable Functions 4 for workflow orchestration
- **Microsoft Graph Toolkit 6.2** - November 2025 build with 100+ components
- **Microsoft Entra ID** - Identity and access management with Zero Trust
- **Power Platform** - Low-code automation and business applications

### Authentication & Security
- **Microsoft Entra ID** - Single sign-on and multi-factor authentication
- **Conditional Access** - Risk-based access policies
- **Privileged Identity Management** - Just-in-time access
- **Identity Protection** - AI-powered threat detection
- **Azure Key Vault** - Managed HSM for secrets and certificates

### Data & Analytics
- **Power BI Embedded** - Real-time dashboards and analytics
- **Microsoft Fabric** - Real-time intelligence with KQL streaming
- **Azure SQL Database Hyperscale** - Always Encrypted data protection
- **Dataverse** - 72 custom tables for business data
- **SharePoint Online** - Document management with Microsoft Syntex

## Directory Structure

```
esimmyanmar.github.io/
├── app/                    # Next.js App Router pages
├── pages/                 # Next.js Pages Router (legacy support)
├── components/            # Reusable React components
├── public/               # Static assets
├── styles/               # CSS and styling
├── lib/                  # Utility libraries
├── scripts/              # Deployment and automation scripts
└── .github/workflows/    # CI/CD pipelines
```

## Design System

### Color Palette
- **Background**: `#1e2f3c` - Deep blue primary background
- **Accent**: `#00ffff` - Cyan for highlights, buttons, and icons
- **Pearl**: `rgba(192, 192, 192, 0.3)` - Glass morphism base
- **Graphite**: `rgba(128, 128, 128, 0.6)` - Secondary elements
- **Transparent Pearl**: `rgba(192, 192, 192, 0.1)` - Subtle overlays

### Typography
- **Primary**: Segoe UI Variable - Microsoft's modern font system
- **Myanmar**: Leelawadee UI - Native Myanmar script support
- **Chinese**: Microsoft YaHei UI - Simplified Chinese characters
- **Monospace**: Cascadia Code - Developer-focused typeface

## Development Scripts

### Build & Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run export           # Export static files
npm run deploy           # Build and export
npm run production-deploy # Full production deployment
```

### Code Quality
```bash
npm run lint             # Run ESLint with auto-fix
npm run lint:css         # Run Stylelint with auto-fix
npm run type-check       # TypeScript type checking
npm run test             # Run Jest tests
npm run test:coverage    # Test coverage report
```

### Validation & Testing
```bash
npm run scan-no-emoji    # Zero emoji enforcement
npm run check-case       # Lowercase filename validation
npm run validate-files   # File structure validation
npm run security-scan    # Security vulnerability scan
npm run accessibility    # Accessibility testing
npm run link-check       # Internal link validation
npm run validate-html    # HTML validation
npm run optimize-images  # Image optimization
```

## Security Configuration

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' *.microsoft.com *.microsoftonline.com *.azure.com;
style-src 'self' 'unsafe-inline' *.microsoft.com;
img-src 'self' data: blob: *.microsoft.com *.microsoftonline.com *.azure.com;
connect-src 'self' *.microsoft.com *.microsoftonline.com *.azure.com *.sharepoint.com;
```

### Security Headers
- **HSTS**: `max-age=31536000; includeSubDomains; preload`
- **X-Frame-Options**: `SAMEORIGIN`
- **X-Content-Type-Options**: `nosniff`
- **Referrer-Policy**: `strict-origin-when-cross-origin`

## Performance Optimization

### Core Web Vitals Targets
- **Largest Contentful Paint**: < 2.5 seconds
- **First Input Delay**: < 100 milliseconds
- **Cumulative Layout Shift**: < 0.1
- **First Contentful Paint**: < 1.8 seconds

### Lighthouse Score Targets
- **Performance**: 98/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

## Deployment

### GitHub Pages Deployment
The site automatically deploys to GitHub Pages on push to main branch:

1. **CI/CD Pipeline** runs automatically
2. **Quality Checks** - Linting, testing, security scanning
3. **Build Process** - Next.js static export
4. **Deployment** - GitHub Pages with custom domain
5. **Verification** - Post-deployment testing

### Manual Deployment
```bash
# Full production deployment
npm run production-deploy

# Quick deployment
npm run deploy
```

## Quality Assurance

### Pre-commit Hooks
- ESLint and Prettier formatting
- TypeScript type checking
- Emoji detection and removal
- Lowercase filename enforcement
- Security vulnerability scanning

### CI/CD Pipeline
- **Lint & Validate** - Code quality checks
- **Security Scan** - Vulnerability assessment
- **Accessibility Test** - WCAG 2.2 AAA compliance
- **Link Check** - Internal link validation
- **Performance Test** - Lighthouse scoring
- **Build & Deploy** - Production deployment

### Code Standards
- **TypeScript** - Strict type checking enabled
- **ESLint** - Airbnb configuration with custom rules
- **Prettier** - Consistent code formatting
- **Stylelint** - CSS/SCSS linting
- **Husky** - Git hooks for quality enforcement

## Accessibility

### WCAG 2.2 AAA Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios > 7:1
- Focus management
- Alternative text for images

## Support & Contact

### Technical Support
- **Email**: support@esim.com.mm
- **Phone**: +95-9650000172
- **Documentation**: https://docs.esim.com.mm

### Business Contact
- **General**: info@esim.com.mm
- **Sales**: sales@esim.com.mm
- **Partnerships**: partners@esim.com.mm
- **Media**: media@esim.com.mm

### Company Information
- **Company**: eSIM Myanmar Company Limited
- **CEO**: Kaung Htet Paung
- **Founded**: 2024
- **Headquarters**: Yangon, Myanmar
- **Website**: https://esim.com.mm
- **Social**: @eSIMMyanmar

## License

Copyright 2025 eSIM Myanmar Company Limited. All Rights Reserved.

This project contains proprietary software. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited without explicit written permission from eSIM Myanmar Company Limited.

---

**Built with Microsoft Technologies | Deployed on Azure | Serving 50M+ Users**