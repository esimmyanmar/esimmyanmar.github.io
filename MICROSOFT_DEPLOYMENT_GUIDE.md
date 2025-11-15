# eSIM Myanmar Microsoft Stack Deployment Guide

## 300-Page Company Profile Website - Microsoft-Only Architecture

### Overview
Complete Microsoft-only solution for eSIM Myanmar company profile website with 300 pages, serving 50 million users across ASEAN.

### Microsoft Stack Components

#### 1. Azure Static Web Apps + Azure Functions 5
- **Static Web App**: `esim-myanmar`
- **Functions App**: `esim-myanmar-functions`
- **Runtime**: Node.js 18, Durable Functions 4
- **Custom Domain**: esim.com.mm

#### 2. Microsoft Graph Toolkit 6.2
- **Components**: Person, Files, Agenda, Search, Login
- **Provider**: MSAL2Provider with Entra ID
- **Scopes**: user.read, files.read, sites.read.all, calendars.read

#### 3. Power Platform
- **Power Pages**: 300 pages with custom domains
- **Dataverse**: 8 tables with company data
- **Power Automate**: 1200+ flows for automation
- **Power BI**: Real-time dashboards and analytics

#### 4. Copilot Studio
- **Bot ID**: esim-myanmar-assistant
- **Topics**: 540+ multilingual topics (en/my/zh)
- **Integration**: Embedded via iframe on all pages

#### 5. Microsoft 365 Integration
- **SharePoint Online**: Document management and lists
- **Teams**: Notifications and collaboration
- **Outlook**: Email automation and calendar integration

### Deployment Steps

#### Prerequisites
```bash
# Install required tools
npm install -g @azure/static-web-apps-cli
npm install -g @microsoft/powerplatform-cli
npm install -g azure-functions-core-tools@4
```

#### 1. Azure Resources Setup
```bash
# Login to Azure
az login

# Create resource group
az group create --name esim-myanmar-rg --location "Southeast Asia"

# Create Static Web App
az staticwebapp create \
  --name esim-myanmar \
  --resource-group esim-myanmar-rg \
  --source https://github.com/esimmyanmar/esimmyanmar.github.io \
  --location "East Asia" \
  --branch main \
  --app-location "/" \
  --api-location "src/microsoft-stack/azure-functions" \
  --output-location "out"

# Create Functions App
az functionapp create \
  --resource-group esim-myanmar-rg \
  --consumption-plan-location "Southeast Asia" \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name esim-myanmar-functions \
  --storage-account esimmyanmarfunctions
```

#### 2. Power Platform Environment
```bash
# Authenticate with Power Platform
pac auth create \
  --url https://prod-esim-myanmar.crm5.dynamics.com \
  --applicationId YOUR_CLIENT_ID \
  --clientSecret YOUR_CLIENT_SECRET \
  --tenant YOUR_TENANT_ID

# Create environment (if not exists)
pac admin create \
  --name "eSIM Myanmar Production" \
  --region "Asia" \
  --type Production
```

#### 3. Dataverse Tables Deployment
```bash
# Import solution with tables
pac solution import \
  --path ./dataverse-solution.zip \
  --environment prod-esim-myanmar

# Import sample data
pac data import \
  --file ./src/microsoft-stack/dataverse/sample-data.json \
  --environment prod-esim-myanmar
```

#### 4. Power Pages Deployment
```bash
# Deploy Power Pages site
pac website create \
  --name "eSIM Myanmar" \
  --template "Company Profile" \
  --environment prod-esim-myanmar

# Upload custom pages
pac website upload \
  --path ./power-pages-content \
  --environment prod-esim-myanmar
```

#### 5. Power Automate Flows
```bash
# Import all 1200+ flows
pac flow import \
  --file ./src/microsoft-stack/power-automate/flows.zip \
  --environment prod-esim-myanmar

# Enable critical flows
pac flow enable \
  --name "Network Status Monitor" \
  --environment prod-esim-myanmar
```

#### 6. Copilot Studio Bot
```bash
# Import bot configuration
pac bot import \
  --file ./src/microsoft-stack/copilot-studio/esim-bot.zip \
  --environment prod-esim-myanmar

# Publish bot
pac bot publish \
  --name esim-myanmar-assistant \
  --environment prod-esim-myanmar
```

### Environment Variables

#### Azure Static Web Apps
```bash
# Application Settings
MICROSOFT_CLIENT_ID=your-client-id
MICROSOFT_TENANT_ID=your-tenant-id
SHAREPOINT_SITE_URL=https://esimmyanmar.sharepoint.com
DATAVERSE_URL=https://prod-esim-myanmar.crm5.dynamics.com
COPILOT_BOT_ID=esim-myanmar-assistant
POWER_BI_WORKSPACE_ID=your-workspace-id
```

#### Azure Functions
```bash
# Function App Settings
AzureWebJobsStorage=your-storage-connection
FUNCTIONS_WORKER_RUNTIME=node
WEBSITE_NODE_DEFAULT_VERSION=~18
MICROSOFT_GRAPH_CLIENT_ID=your-client-id
MICROSOFT_GRAPH_CLIENT_SECRET=your-client-secret
MICROSOFT_GRAPH_TENANT_ID=your-tenant-id
```

### Custom Domain Configuration

#### 1. DNS Configuration
```bash
# CNAME records for esim.com.mm
www.esim.com.mm -> esim-myanmar.azurestaticapps.net
esim.com.mm -> esim-myanmar.azurestaticapps.net
```

#### 2. SSL Certificate
```bash
# Add custom domain to Static Web App
az staticwebapp hostname set \
  --name esim-myanmar \
  --resource-group esim-myanmar-rg \
  --hostname esim.com.mm

# Validate domain
az staticwebapp hostname show \
  --name esim-myanmar \
  --resource-group esim-myanmar-rg \
  --hostname esim.com.mm
```

### Security Configuration

#### 1. Entra ID Application Registration
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

#### 2. Content Security Policy
```javascript
// next.config.mjs headers
"Content-Security-Policy": "default-src 'self' https://*.microsoft.com https://*.microsoftonline.com https://*.graph.microsoft.com https://*.sharepoint.com https://*.office.com https://*.powerapps.com https://*.dynamics.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.microsoft.com; style-src 'self' 'unsafe-inline' https://*.microsoft.com; img-src 'self' data: blob: https://*.microsoft.com https://*.office.com; connect-src 'self' https://*.microsoft.com https://*.graph.microsoft.com; font-src 'self' https://*.microsoft.com"
```

### Monitoring and Analytics

#### 1. Application Insights
```bash
# Create Application Insights
az monitor app-insights component create \
  --app esim-myanmar-insights \
  --location "Southeast Asia" \
  --resource-group esim-myanmar-rg \
  --application-type web
```

#### 2. Power BI Dashboards
- Network Performance Dashboard
- User Analytics Dashboard
- FAQ Analytics Dashboard
- Partner Integration Status

### Backup and Disaster Recovery

#### 1. Automated Backups
```bash
# Power Platform environment backup
pac admin backup create \
  --environment prod-esim-myanmar \
  --label "Daily Backup $(date +%Y%m%d)"

# SharePoint site backup via Power Automate
# Configured in flows for daily execution
```

#### 2. Multi-Region Deployment
- Primary: Southeast Asia (Singapore)
- Secondary: East Asia (Hong Kong)
- CDN: Azure Front Door with global distribution

### Performance Optimization

#### 1. Caching Strategy
```javascript
// Static Web Apps caching
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

#### 2. CDN Configuration
```bash
# Azure Front Door setup
az network front-door create \
  --resource-group esim-myanmar-rg \
  --name esim-myanmar-fd \
  --backend-address esim-myanmar.azurestaticapps.net
```

### Compliance and Governance

#### 1. Data Residency
- All data stored in Southeast Asia region
- Compliance with Myanmar Electronic Transactions Law 2021
- GDPR compliance for international users

#### 2. Access Controls
- Entra ID Conditional Access policies
- Privileged Identity Management (PIM)
- Zero Trust security model

### Maintenance and Updates

#### 1. Automated Updates
```yaml
# GitHub Actions workflow
- name: Update Dependencies
  run: |
    npm update
    npm audit fix
    
- name: Deploy Updates
  run: |
    npm run build
    npm run deploy
```

#### 2. Health Monitoring
```bash
# Health check endpoints
GET /api/health
GET /api/network-status
GET /api/system-status
```

### Support and Documentation

#### 1. Technical Support
- **Email**: tech-support@esim.com.mm
- **Phone**: +95-9650000172
- **Teams**: eSIM Myanmar Support Channel

#### 2. Documentation
- API Documentation: /api-docs
- User Guides: /support/guides
- Developer Resources: /developer-resources

### Cost Optimization

#### 1. Resource Scaling
- Azure Functions: Consumption plan
- Static Web Apps: Free tier with custom domain
- Power Platform: Per-user licensing
- Dataverse: Pay-as-you-go storage

#### 2. Monitoring Costs
```bash
# Azure Cost Management
az consumption budget create \
  --budget-name esim-myanmar-budget \
  --amount 1000 \
  --resource-group esim-myanmar-rg
```

### Deployment Checklist

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

### Contact Information

**eSIM Myanmar Company Limited**
- **Website**: esim.com.mm
- **Email**: info@esim.com.mm
- **Phone**: 09650000172
- **Social**: @eSIMMyanmar
- **CEO**: Kaung Htet Paung

---

**Deployment Status**: Ready for Production
**Last Updated**: 2025-01-27
**Version**: 1.0.0