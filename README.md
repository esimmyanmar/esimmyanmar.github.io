# eSIM Myanmar Enterprise Website

Enterprise eSIM company profile and information website (300 pages) built exclusively on Microsoft Azure, Microsoft 365, and Power Platform technologies. Designed to serve 50 million users across ASEAN with zero external dependencies.

## Microsoft technology stack

### Azure cloud infrastructure
Azure Static Web Apps with Azure Functions 5 (Durable Functions 4), Azure Front Door with Content Delivery Network, Web Application Firewall, and Private Link connectivity. Azure App Service with deployment slots and continuous integration. Azure SQL Database Hyperscale with Always Encrypted for data protection.

### Identity and security
Microsoft Entra ID with Conditional Access policies, Privileged Identity Management, and Identity Protection. Microsoft Defender for Cloud Apps, Defender for Endpoint, and Defender for Identity. Microsoft Purview for data governance, loss prevention, and compliance management. Azure Key Vault with Managed Hardware Security Module support.

### Microsoft 365 services
SharePoint Online with Lists, Microsoft Lists, and Syntex for content management. OneDrive for Business with Files API integration. Microsoft Teams with custom tabs, bots, and Adaptive Cards. Outlook Add-ins with Microsoft Graph Mail API.

### Power Platform
Power Pages for 300+ custom pages with Dataverse integration (read-only public access). Power Automate Cloud Flows (1200+ automated workflows). Power BI Embedded with Fabric Real-Time Intelligence and Key Query Language streaming analytics. Copilot Studio with 540+ custom topics in English, Myanmar, and Chinese.

### Microsoft Graph ecosystem
Microsoft Graph Toolkit 6.2 with 100+ components covering authentication, calendar, files, people, and tasks. Microsoft Graph API v6.2 and beta endpoints with Change Notifications and Subscriptions for real-time updates. Custom JavaScript Web Resources in TypeScript 6.8 and Power Component Framework controls (144 custom controls).

### Monitoring and analytics
Azure Monitor with Application Insights for performance tracking. Log Analytics for centralized logging. Azure DevOps for boards, pipelines, repositories, and artifact management.

## Website structure and content

### Company profile and information
Home page with digital company flyer and overview. Company profile and "About Us" sections. Vision, mission statements, and leadership team profiles. Company history, milestones, and organizational evolution. Awards, recognition, and certifications. Intellectual property portfolio and research and development innovation initiatives.

### Technology and standards
eSIM technology overview and architecture. GSMA-compliant entitlement server (SM-DP+ v4.0). 5G network services and VoLTE capabilities. Security, encryption, and compliance documentation. OpenID Connect and multi-factor authentication details. GSMA and 3GPP standards implementation.

### Coverage and network infrastructure
Network infrastructure overview and topology. Myanmar coverage maps with real-time updates. Global roaming across 200+ countries. Myanmar market focus and regional analysis. ASEAN expansion strategy and coverage details. Regional coverage for all 14 Myanmar regions and union territory.

### Device and service information
Supported devices overview and compatibility matrix. iPhone, iPad, and Apple Watch setup guides. Android and Samsung Galaxy configuration. Google Pixel and wearable device support. Industrial IoT and automotive eSIM solutions.

### Customer support and resources
Customer support center and frequently asked questions. Contact information and live chat support. eSIM transfer and migration processes. Category-specific FAQ sections (eSIM, transfer, roaming, 5G, security). Technical glossary and terminology reference.

### Regional and localization content
All 14 Myanmar regions plus union territory information. Major city coverage details (Yangon, Mandalay, Naypyitaw, etc.). Local Myanmar partners and integrations. ASEAN country coverage and expansion details. Global partner network information.

### Documentation and media
Digital company flyer (downloadable and web-embedded). Brochures and technical whitepapers. Technical documentation and case studies. News, blog articles, and events. Media kit and press resources. Career opportunities and human resources information.

## Design system and visual standards

### Microsoft Fluent Design System 2025
Background color #1e2f3c (Deep Blue). Accent color #00ffff (Cyan). Pearl Glass effect using rgba(192, 192, 192, 0.3) for transparency. Typography uses Segoe UI Variable for English and Leelawadee UI for Myanmar script, Microsoft YaHei UI for Chinese characters.

### Visual effects and interactions
8-layer pearl glass overlay system with multi-depth transparency. Backdrop-filter blur(20px) with brightness(1.1) enhancement. Translucent cards with cyan accent borders. Fluid motion animations and depth layers for premium spatial hierarchy. iOS 26 design language principles applied: minimalism, edge-to-edge layouts, dynamic header regions, fluid motion, and depth layering.

### Responsive design and platforms
Optimized for iPhone 18 Pro Max, iPad Pro M6, Vision Pro 4, Surface Pro 12, and Samsung Galaxy S26 Ultra. Full-width hero sections with vertical scrolling layouts. Card-based modular content sections. Fixed bottom navigation on mobile devices. Myanmar-first localization with English and Chinese fallback options.

### Real-time features and AI

#### Live network monitoring and analytics
Microsoft Graph Change Notifications to Azure Functions to SignalR for real-time updates. Real-time coverage maps using Microsoft Fabric Real-Time Intelligence and KQL streaming. Live speed test results across all Myanmar regions. Network performance dashboards with historical data.

#### Copilot Studio and AI assistant
Copilot Studio agent embedded as iframe component across all pages. Custom GPT model trained on 3000+ eSIM FAQs, Myanmar telecommunications law, company profile documentation, technical specifications, regional content, and ASEAN regulatory frameworks. Real-time translation across English, Myanmar, and Chinese using Azure AI Translator service. Context-aware responses using semantic search across knowledge base and company documentation.

## Quick start

### Installation
```bash
git clone https://github.com/esimmyanmar/esimmyanmar.github.io.git
cd esimmyanmar.github.io
npm install
```

### Configuration
```bash
cp .env.example .env.local
# Edit .env.local with Microsoft credentials
```

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run deploy       # Deploy to Azure
```

### Required environment variables
```bash
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your-client-id
NEXT_PUBLIC_MICROSOFT_TENANT_ID=your-tenant-id
NEXT_PUBLIC_SHAREPOINT_SITE=https://esimmyanmar.sharepoint.com
NEXT_PUBLIC_DATAVERSE_URL=https://prod-esim-myanmar.crm5.dynamics.com
NEXT_PUBLIC_COPILOT_BOT_ID=esim-myanmar-assistant
NEXT_PUBLIC_POWER_BI_WORKSPACE=your-workspace-id
```

## Architecture overview

The system uses a Microsoft-only technology stack with Azure Static Web Apps hosting a Next.js application, Azure Functions providing serverless backend capabilities, and Power Platform services for content management and automation. Microsoft Graph Toolkit enables seamless integration with Microsoft 365 services, while Copilot Studio provides AI-powered assistance across all pages.

## Security implementation

### Zero Trust architecture
- Entra ID Conditional Access policies
- Privileged Identity Management (PIM)
- Identity Protection with risk-based policies
- Multi-factor authentication enforcement
- Device compliance requirements

### Content protection
- Right-click prevention
- Text selection blocking
- Developer tools restriction
- Image download prevention
- Print functionality control
- Comprehensive Content Security Policy headers

## Performance targets

### Optimization features
- Static site generation with Next.js
- Azure CDN with global edge locations
- Image optimization and lazy loading
- Code splitting and tree shaking
- Service worker for offline support

### Performance metrics
- Lighthouse performance: target 98/100
- Lighthouse accessibility: target 100/100
- Lighthouse best practices: target 100/100
- Lighthouse SEO: target 100/100
- Core Web Vitals: target pass for all metrics

## Compliance standards

### Regulatory requirements
- Myanmar Electronic Transactions Law 2021
- GDPR (General Data Protection Regulation)
- PDPA (Personal Data Protection Act)
- GSMA SGP.22 v4.0 Specification
- GSMA SGP.32 specification
- WCAG 2.2 AAA accessibility standards
- OWASP Top 10 Security Standards
- ISO 27001 Information Security Management

## Monitoring and analytics

### Real-time monitoring
- Azure Application Insights for performance tracking
- Power BI real-time dashboards for user analytics
- Network performance monitoring across regions
- User behavior analytics and engagement metrics
- Security incident tracking and response

### Notification systems
- Microsoft Teams channel notifications
- Email alerts for critical system issues
- SMS notifications for service outages
- Automated incident response workflows

## Support information

### Technical support
- Primary Contact: info@esim.com.mm
- Phone Support: 09650000172
- Emergency Line: +95-9650000172
- Microsoft Teams channel: eSIM Myanmar Support

### Documentation resources
- Deployment Guide: MICROSOFT_DEPLOYMENT_GUIDE.md
- API Documentation: /api-docs
- User Guides: /support/guides
- Developer Resources: /developer-resources

## Company information

### Esim Myanmar Company Limited
- CEO: Kaung Htet Paung
- Founded: 2024
- Headquarters: Yangon, Myanmar
- Employees: 50-100
- Network coverage: Myanmar and 200+ countries
- Active users: 2+ million

### Contact details
- Website: esim.com.mm
- Email: info@esim.com.mm
- Phone: 09650000172
- Social: @eSIMMyanmar
- LinkedIn: /company/esim-myanmar

### Strategic partners
- Telecom: ATOM Myanmar, Mytel, MPT, U9 Telecom
- Financial: AYA Bank, UAB Bank
- Payment: WavePay, AYA Pay, UAB Pay, MMQR
- Technology: Microsoft Corporation, NetLync, Activ Digital

## License

Copyright 2025 eSIM Myanmar Company Limited. All Rights Reserved.

This project contains proprietary software. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited without explicit written permission from eSIM Myanmar Company Limited.

Built with Microsoft services. Deployed on Azure.