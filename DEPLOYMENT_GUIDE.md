# eSIM Myanmar Automated Post-Login Deployment Guide

Complete deployment guide for the Microsoft-only enterprise eSIM solution serving 50 million users across ASEAN.

## Prerequisites

### Azure Subscription Requirements
- Azure subscription with Owner or Contributor role
- Microsoft 365 tenant with Power Platform license
- Power BI Premium or Premium Per User license
- Microsoft Entra ID P2 license for advanced security features

### Required Permissions
- Global Administrator (for initial setup)
- Application Administrator (for service principals)
- Security Administrator (for Conditional Access policies)
- Power Platform Administrator (for Power Platform resources)
- Azure Subscription Owner (for resource provisioning)

### Development Environment
- PowerShell 7.0 or later
- Python 3.8 or later
- Node.js 18 or later
- Azure CLI 2.45 or later
- Power Platform CLI
- Git 2.30 or later

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/esimmyanmar/esimmyanmar.github.io.git
cd esimmyanmar.github.io
```

### 2. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Install PowerShell modules
Install-Module -Name Az -Force -AllowClobber
Install-Module -Name Microsoft.Graph -Force -AllowClobber
Install-Module -Name MicrosoftPowerBIMgmt -Force -AllowClobber
```

### 3. Configure Environment Variables
Create `.env.local` file:
```bash
# Azure Configuration
AZURE_SUBSCRIPTION_ID=your-subscription-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret

# Microsoft 365 Configuration
MICROSOFT_TENANT_ID=your-tenant-id
MICROSOFT_CLIENT_ID=your-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret

# Power Platform Configuration
DATAVERSE_URL=https://prod-esim-myanmar.crm5.dynamics.com
DATAVERSE_ENVIRONMENT=prod-esim-myanmar
POWER_BI_WORKSPACE_ID=your-workspace-id

# SharePoint Configuration
SHAREPOINT_SITE_URL=https://esimmyanmar.sharepoint.com

# Monitoring Configuration
LOG_ANALYTICS_WORKSPACE_ID=your-workspace-id
LOG_ANALYTICS_WORKSPACE_KEY=your-workspace-key
APPLICATION_INSIGHTS_KEY=your-instrumentation-key

# Security Configuration
AZURE_KEY_VAULT_URL=https://kv-esim-myanmar-prod.vault.azure.net
SENTINEL_WORKSPACE_ID=your-sentinel-workspace-id

# Communication Configuration
TEAMS_WEBHOOK_URL=your-teams-webhook-url
SMTP_USERNAME=noreply@esim.com.mm
SMTP_PASSWORD=your-smtp-password

# Copilot Configuration
COPILOT_BOT_ID=esim-myanmar-assistant
COPILOT_ENDPOINT=https://esim-myanmar-copilot.cognitiveservices.azure.com
```

## Automated Deployment

### Method 1: PowerShell Script (Recommended)
```powershell
# Login to Azure
Connect-AzAccount

# Run automated provisioning
./scripts/post-login-automation.ps1 -SubscriptionId "your-subscription-id"
```

### Method 2: GitHub Actions Workflow
1. Configure repository secrets in GitHub
2. Trigger workflow manually or via push to main branch
3. Monitor deployment progress in Actions tab

### Method 3: Manual Step-by-Step Deployment
Follow the manual deployment steps below for granular control.

## Manual Deployment Steps

### Step 1: Azure Infrastructure Provisioning

#### 1.1 Create Resource Group
```bash
az group create \
  --name rg-esim-myanmar-prod \
  --location "Southeast Asia"
```

#### 1.2 Deploy Key Vault
```bash
az keyvault create \
  --name kv-esim-myanmar-prod \
  --resource-group rg-esim-myanmar-prod \
  --location "Southeast Asia" \
  --enable-rbac-authorization true
```

#### 1.3 Deploy Log Analytics Workspace
```bash
az monitor log-analytics workspace create \
  --resource-group rg-esim-myanmar-prod \
  --workspace-name law-esim-myanmar-prod \
  --location "Southeast Asia" \
  --sku PerGB2018
```

#### 1.4 Deploy Application Insights
```bash
az monitor app-insights component create \
  --app ai-esim-myanmar-prod \
  --location "Southeast Asia" \
  --resource-group rg-esim-myanmar-prod \
  --workspace law-esim-myanmar-prod
```

#### 1.5 Deploy Azure SQL Database
```bash
az sql server create \
  --name sql-esim-myanmar-prod \
  --resource-group rg-esim-myanmar-prod \
  --location "Southeast Asia" \
  --admin-user esimadmin \
  --admin-password "YourSecurePassword123!"

az sql db create \
  --resource-group rg-esim-myanmar-prod \
  --server sql-esim-myanmar-prod \
  --name sqldb-esim-myanmar-prod \
  --edition Hyperscale \
  --compute-model Provisioned \
  --family Gen5 \
  --capacity 2
```

### Step 2: Microsoft Entra ID Configuration

#### 2.1 Create Service Principal
```bash
az ad sp create-for-rbac \
  --name "eSIM Myanmar Production" \
  --role Contributor \
  --scopes /subscriptions/your-subscription-id
```

#### 2.2 Configure Conditional Access Policy
```powershell
Connect-MgGraph -Scopes "Policy.ReadWrite.ConditionalAccess"

$policy = @{
    displayName = "eSIM Myanmar Zero Trust Policy"
    state = "enabled"
    conditions = @{
        users = @{ includeUsers = @("All") }
        applications = @{ includeApplications = @("All") }
    }
    grantControls = @{
        operator = "AND"
        builtInControls = @("mfa", "compliantDevice")
    }
}

New-MgIdentityConditionalAccessPolicy -BodyParameter $policy
```

### Step 3: Power Platform Deployment

#### 3.1 Create Dataverse Environment
```bash
pac admin create \
  --name "eSIM Myanmar Production" \
  --type Production \
  --region asia \
  --currency USD \
  --language 1033
```

#### 3.2 Deploy Power BI Workspace
```powershell
Connect-PowerBIServiceAccount

$workspace = New-PowerBIWorkspace -Name "eSIM Myanmar Production"
Write-Host "Workspace ID: $($workspace.Id)"
```

#### 3.3 Configure Power Automate Flows
```bash
# Deploy flows using Power Platform CLI
pac solution import \
  --path solutions/eSIMMyanmar.zip \
  --environment prod-esim-myanmar
```

### Step 4: Static Web App Deployment

#### 4.1 Create Static Web App
```bash
az staticwebapp create \
  --name swa-esim-myanmar-prod \
  --resource-group rg-esim-myanmar-prod \
  --source https://github.com/esimmyanmar/esimmyanmar.github.io \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "out" \
  --login-with-github
```

#### 4.2 Configure Custom Domain
```bash
az staticwebapp hostname set \
  --name swa-esim-myanmar-prod \
  --resource-group rg-esim-myanmar-prod \
  --hostname esim.com.mm
```

### Step 5: Security Configuration

#### 5.1 Deploy Microsoft Sentinel
```bash
az sentinel workspace create \
  --resource-group rg-esim-myanmar-prod \
  --workspace-name law-esim-myanmar-prod
```

#### 5.2 Configure Azure Front Door
```bash
az afd profile create \
  --profile-name fd-esim-myanmar-prod \
  --resource-group rg-esim-myanmar-prod \
  --sku Premium_AzureFrontDoor
```

### Step 6: Monitoring and Alerting

#### 6.1 Create Action Group
```bash
az monitor action-group create \
  --name ag-esim-myanmar-prod \
  --resource-group rg-esim-myanmar-prod \
  --short-name eSIMAlert \
  --email info@esim.com.mm Admin
```

#### 6.2 Configure Metric Alerts
```bash
az monitor metrics alert create \
  --name "High Response Time" \
  --resource-group rg-esim-myanmar-prod \
  --scopes /subscriptions/your-subscription-id/resourceGroups/rg-esim-myanmar-prod/providers/Microsoft.Insights/components/ai-esim-myanmar-prod \
  --condition "avg requests/duration > 5000" \
  --description "Alert when average response time exceeds 5 seconds" \
  --evaluation-frequency 1m \
  --window-size 5m \
  --severity 2 \
  --action ag-esim-myanmar-prod
```

## Post-Deployment Configuration

### 1. Device Compliance Monitoring
```bash
# Run initial compliance check
python scripts/device-compliance-monitor.py

# Schedule regular compliance checks
# Add to cron job or Windows Task Scheduler
```

### 2. Power BI Dashboard Configuration
```bash
# Deploy dashboards
node scripts/deploy-powerbi-dashboards.js

# Verify dashboard deployment
curl -H "Authorization: Bearer $POWERBI_TOKEN" \
  "https://api.powerbi.com/v1.0/myorg/groups/$WORKSPACE_ID/dashboards"
```

### 3. Real-Time Monitoring Setup
```bash
# Configure SignalR for real-time updates
az signalr create \
  --name signalr-esim-myanmar-prod \
  --resource-group rg-esim-myanmar-prod \
  --sku Standard_S1 \
  --service-mode Default
```

## Validation and Testing

### 1. Infrastructure Validation
```powershell
# Run validation script
./scripts/validate-deployment.ps1 -ResourceGroupName "rg-esim-myanmar-prod"
```

### 2. Security Testing
```bash
# Run security scan
az security assessment list \
  --resource-group rg-esim-myanmar-prod
```

### 3. Performance Testing
```bash
# Run load test
az load test create \
  --name esim-myanmar-load-test \
  --resource-group rg-esim-myanmar-prod \
  --test-plan load-test-plan.jmx
```

### 4. Compliance Verification
```bash
# Check compliance status
python scripts/compliance-checker.py --full-scan
```

## Monitoring and Maintenance

### Daily Operations
- Monitor Power BI dashboard refresh status
- Review security alerts in Microsoft Sentinel
- Check device compliance reports
- Verify eSIM provisioning success rates

### Weekly Tasks
- Review audit logs for compliance
- Update security policies if needed
- Analyze performance metrics
- Check certificate expiration dates

### Monthly Tasks
- Security assessment and penetration testing
- Compliance audit and reporting
- Capacity planning and scaling review
- Disaster recovery testing

## Troubleshooting

### Common Issues

#### 1. Authentication Failures
```bash
# Clear cached credentials
az account clear
Connect-AzAccount

# Verify permissions
az role assignment list --assignee your-user-id
```

#### 2. Power BI Deployment Issues
```powershell
# Check Power BI service status
Get-PowerBIWorkspace -Scope Organization

# Verify API permissions
Test-PowerBIConnection
```

#### 3. Compliance Check Failures
```bash
# Run diagnostic mode
python scripts/device-compliance-monitor.py --debug

# Check Log Analytics connectivity
az monitor log-analytics workspace show \
  --resource-group rg-esim-myanmar-prod \
  --workspace-name law-esim-myanmar-prod
```

#### 4. Network Connectivity Issues
```bash
# Test endpoints
curl -I https://esim.com.mm
curl -I https://api.powerbi.com

# Check DNS resolution
nslookup esim.com.mm
```

### Support Contacts

#### Technical Support
- Email: support@esim.com.mm
- Phone: +95-9650000172
- Teams: eSIM Myanmar Support Channel

#### Emergency Contacts
- On-call Engineer: +95-9650000172
- Security Team: security@esim.com.mm
- Compliance Officer: compliance@esim.com.mm

## Security Considerations

### Data Protection
- All data encrypted at rest and in transit
- Customer Managed Keys for sensitive data
- Regular key rotation schedule
- Data residency compliance for Myanmar regulations

### Access Control
- Zero Trust architecture implementation
- Multi-factor authentication required
- Privileged Identity Management (PIM)
- Regular access reviews and audits

### Compliance Standards
- GSMA SGP.22 v4.0 compliance
- Myanmar Electronic Transactions Law 2021
- ISO 27001 Information Security Management
- GDPR and PDPA data protection regulations

### Audit and Logging
- Immutable audit logs with 7-10 year retention
- Real-time security monitoring with Microsoft Sentinel
- Comprehensive compliance reporting
- Automated incident response procedures

## Performance Optimization

### Caching Strategy
- Azure CDN for static content
- Power BI dataset caching
- Application-level caching for APIs
- Browser caching for web assets

### Scaling Configuration
- Auto-scaling for Azure Functions
- Power BI Premium capacity management
- Database performance tuning
- Load balancing configuration

### Monitoring Metrics
- Response time < 2 seconds (95th percentile)
- Availability > 99.9%
- Error rate < 0.1%
- Compliance score > 95%

## Disaster Recovery

### Backup Strategy
- Daily automated backups for all databases
- Geo-redundant storage for critical data
- Configuration backup to Azure DevOps
- Regular backup restoration testing

### Recovery Procedures
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour
- Automated failover for critical services
- Manual failover procedures documented

### Business Continuity
- Multi-region deployment capability
- Alternative communication channels
- Vendor relationship management
- Regular DR testing and updates

## Contact Information

### eSIM Myanmar Company Limited
- Website: https://esim.com.mm
- Email: info@esim.com.mm
- Phone: +95-9650000172
- Address: Yangon, Myanmar

### Development Team
- Lead Architect: architecture@esim.com.mm
- DevOps Team: devops@esim.com.mm
- Security Team: security@esim.com.mm
- Support Team: support@esim.com.mm

---

**Document Version**: 2.0.0  
**Last Updated**: January 15, 2025  
**Next Review**: April 15, 2025

Copyright 2025 eSIM Myanmar Company Limited. All Rights Reserved.