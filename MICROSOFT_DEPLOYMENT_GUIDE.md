# Microsoft Stack Deployment Guide

Complete deployment guide for eSIM Myanmar company profile website using Microsoft-only architecture.

## Overview

This guide covers deployment of a 300-page company profile website built entirely with Microsoft technologies, designed to serve 50 million users across ASEAN.

## Microsoft Stack Components

### Azure Services
- **Azure Static Web Apps**: Primary hosting platform
- **Azure Functions 5**: Serverless backend with Durable Functions 4
- **Azure Front Door**: Global CDN with WAF protection
- **Azure Key Vault**: Secrets and certificate management
- **Azure Monitor**: Application monitoring and analytics

### Power Platform
- **Power Pages**: 300 pages with custom domain support
- **Dataverse**: 8 tables for company data storage
- **Power Automate**: 1200+ automated workflows
- **Power BI**: Real-time dashboards and reporting
- **Copilot Studio**: AI assistant with 540+ topics

### Microsoft 365 Integration
- **Microsoft Graph Toolkit**: Version 3.1.3 for seamless integration
- **SharePoint Online**: Document management and collaboration
- **Microsoft Teams**: Notifications and team communication
- **Outlook**: Email automation and calendar integration
- **OneDrive for Business**: File storage and sharing

## Prerequisites

### Required Tools
```bash
npm install -g @azure/static-web-apps-cli
npm install -g @microsoft/powerplatform-cli
npm install -g azure-functions-core-tools@4
```

### System Requirements
- Node.js 18.0.0 or higher
- NPM 9.0.0 or higher
- Azure CLI latest version
- Power Platform CLI latest version

## Azure Resources Setup

### Resource Group Creation
```bash
az login
az group create --name esim-myanmar-rg --location "Southeast Asia"
```

### Static Web App Deployment
```bash
az staticwebapp create \
  --name esim-myanmar \
  --resource-group esim-myanmar-rg \
  --source https://github.com/esimmyanmar/esimmyanmar.github.io \
  --location "East Asia" \
  --branch main \
  --app-location "/" \
  --api-location "src/microsoft-stack/azure-functions" \
  --output-location "out"
```

### Azure Functions Configuration
```bash
az functionapp create \
  --resource-group esim-myanmar-rg \
  --consumption-plan-location "Southeast Asia" \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name esim-myanmar-functions \
  --storage-account esimmyanmarfunctions
```

## Power Platform Configuration

### Environment Setup
```bash
pac auth create \
  --url https://prod-esim-myanmar.crm5.dynamics.com \
  --applicationId YOUR_CLIENT_ID \
  --clientSecret YOUR_CLIENT_SECRET \
  --tenant YOUR_TENANT_ID

pac admin create \
  --name "eSIM Myanmar Production" \
  --region "Asia" \
  --type Production
```

### Dataverse Tables Deployment
```bash
pac solution import \
  --path ./dataverse-solution.zip \
  --environment prod-esim-myanmar

pac data import \
  --file ./src/microsoft-stack/dataverse/sample-data.json \
  --environment prod-esim-myanmar
```

### Power Pages Deployment
```bash
pac website create \
  --name "eSIM Myanmar" \
  --template "Company Profile" \
  --environment prod-esim-myanmar

pac website upload \
  --path ./power-pages-content \
  --environment prod-esim-myanmar
```

### Power Automate Flows
```bash
pac flow import \
  --file ./src/microsoft-stack/power-automate/flows.zip \
  --environment prod-esim-myanmar

pac flow enable \
  --name "Network Status Monitor" \
  --environment prod-esim-myanmar
```

### Copilot Studio Bot
```bash
pac bot import \
  --file ./src/microsoft-stack/copilot-studio/esim-bot.zip \
  --environment prod-esim-myanmar

pac bot publish \
  --name esim-myanmar-assistant \
  --environment prod-esim-myanmar
```

## Environment Configuration

### Azure Static Web Apps Settings
```bash
MICROSOFT_CLIENT_ID=your-client-id
MICROSOFT_TENANT_ID=your-tenant-id
SHAREPOINT_SITE_URL=https://esimmyanmar.sharepoint.com
DATAVERSE_URL=https://prod-esim-myanmar.crm5.dynamics.com
COPILOT_BOT_ID=esim-myanmar-assistant
POWER_BI_WORKSPACE_ID=your-workspace-id
```

### Azure Functions Settings
```bash
AzureWebJobsStorage=your-storage-connection
FUNCTIONS_WORKER_RUNTIME=node
WEBSITE_NODE_DEFAULT_VERSION=~18
MICROSOFT_GRAPH_CLIENT_ID=your-client-id
MICROSOFT_GRAPH_CLIENT_SECRET=your-client-secret
MICROSOFT_GRAPH_TENANT_ID=your-tenant-id
```

## Custom Domain Setup

### DNS Configuration
Configure CNAME records for esim.com.mm:
```
www.esim.com.mm -> esim-myanmar.azurestaticapps.net
esim.com.mm -> esim-myanmar.azurestaticapps.net
```

### SSL Certificate Setup
```bash
az staticwebapp hostname set \
  --name esim-myanmar \
  --resource-group esim-myanmar-rg \
  --hostname esim.com.mm

az staticwebapp hostname show \
  --name esim-myanmar \
  --resource-group esim-myanmar-rg \
  --hostname esim.com.mm
```

## Security Configuration

### Entra ID Application Registration
Create application registration with the following configuration:
```json
{
  "displayName": "eSIM Myanmar Website",
  "signInAudience": "AzureADMultipleOrgs",
  "web": {
    "redirectUris": [
      "https://esim.com.mm/auth/callback",
      "https://esimmyanmar.github.io/auth/callback"
    ]
  },
  "requiredResourceAccess": [
    {
      "resourceAppId": "00000003-0000-0000-c000-000000000000",
      "resourceAccess": [
        {
          "id": "e1fe6dd8-ba31-4d61-89e7-88639da4683d",
          "type": "Scope"
        }
      ]
    }
  ]
}
```

### Content Security Policy
Configure CSP headers in next.config.mjs:
```javascript
"Content-Security-Policy": "default-src 'self' https://*.microsoft.com https://*.microsoftonline.com https://*.graph.microsoft.com https://*.sharepoint.com https://*.office.com https://*.powerapps.com https://*.dynamics.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.microsoft.com; style-src 'self' 'unsafe-inline' https://*.microsoft.com; img-src 'self' data: blob: https://*.microsoft.com https://*.office.com; connect-src 'self' https://*.microsoft.com https://*.graph.microsoft.com; font-src 'self' https://*.microsoft.com"
```

## Monitoring Setup

### Application Insights
```bash
az monitor app-insights component create \
  --app esim-myanmar-insights \
  --location "Southeast Asia" \
  --resource-group esim-myanmar-rg \
  --application-type web
```

### Power BI Dashboards
Configure the following dashboards:
- Network Performance Dashboard
- User Analytics Dashboard
- FAQ Analytics Dashboard
- Partner Integration Status Dashboard

## Backup and Recovery

### Automated Backups
```bash
pac admin backup create \
  --environment prod-esim-myanmar \
  --label "Daily Backup $(date +%Y%m%d)"
```

### Multi-Region Setup
- Primary Region: Southeast Asia (Singapore)
- Secondary Region: East Asia (Hong Kong)
- CDN: Azure Front Door with global distribution

## Performance Optimization

### Caching Configuration
```javascript
{
  "routes": [
    {
      "route": "/assets/*",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "route": "/api/*",
      "headers": {
        "Cache-Control": "no-cache"
      }
    }
  ]
}
```

### CDN Setup
```bash
az network front-door create \
  --resource-group esim-myanmar-rg \
  --name esim-myanmar-fd \
  --backend-address esim-myanmar.azurestaticapps.net
```

## Compliance and Governance

### Data Residency
- All data stored in Southeast Asia region
- Compliance with Myanmar Electronic Transactions Law 2021
- GDPR compliance for international users

### Access Controls
- Entra ID Conditional Access policies
- Privileged Identity Management (PIM)
- Zero Trust security model implementation

## Maintenance Procedures

### Automated Updates
Configure GitHub Actions workflow for automated updates:
```yaml
- name: Update Dependencies
  run: |
    npm update
    npm audit fix
    
- name: Deploy Updates
  run: |
    npm run build
    npm run deploy
```

### Health Monitoring
Configure health check endpoints:
```
GET /api/health
GET /api/network-status
GET /api/system-status
```

## Support Information

### Technical Support
- Email: tech-support@esim.com.mm
- Phone: +95-9650000172
- Teams: eSIM Myanmar Support Channel

### Documentation Resources
- API Documentation: /api-docs
- User Guides: /support/guides
- Developer Resources: /developer-resources

## Cost Optimization

### Resource Scaling
- Azure Functions: Consumption plan
- Static Web Apps: Free tier with custom domain
- Power Platform: Per-user licensing
- Dataverse: Pay-as-you-go storage

### Cost Monitoring
```bash
az consumption budget create \
  --budget-name esim-myanmar-budget \
  --amount 1000 \
  --resource-group esim-myanmar-rg
```

## Deployment Checklist

- [ ] Azure resources provisioned
- [ ] Power Platform environment configured
- [ ] Dataverse tables created and populated
- [ ] Power Pages deployed with 300 pages
- [ ] Power Automate flows imported and enabled
- [ ] Copilot Studio bot published
- [ ] Custom domain configured with SSL
- [ ] Security policies implemented
- [ ] Monitoring and alerts configured
- [ ] Backup strategy implemented
- [ ] Performance optimization applied
- [ ] Compliance requirements met
- [ ] Documentation updated
- [ ] Team training completed

## Contact Information

### eSIM Myanmar Company Limited
- Website: esim.com.mm
- Email: info@esim.com.mm
- Phone: 09650000172
- Social: @eSIMMyanmar
- CEO: Kaung Htet Paung

**Deployment Status**: Ready for Production
**Last Updated**: 2025-01-27
**Version**: 1.0.0