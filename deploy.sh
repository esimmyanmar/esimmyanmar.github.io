#!/bin/bash
# eSIM Myanmar Production Deployment Script
set -e

echo "Starting eSIM Myanmar Production Deployment"

# 1. Azure Resource Provisioning
echo "Provisioning Azure Resources..."
pwsh ./scripts/post-login-automation.ps1 -SubscriptionId "${AZURE_SUBSCRIPTION_ID}"

# 2. Domain Configuration
echo "Configuring Domain..."
az staticwebapp hostname set --name swa-esim-myanmar-prod --hostname esim.com.mm

# 3. Environment Variables
echo "Setting Environment Variables..."
az staticwebapp appsettings set --name swa-esim-myanmar-prod --setting-names \
  NEXT_PUBLIC_MICROSOFT_CLIENT_ID="${MICROSOFT_CLIENT_ID}" \
  NEXT_PUBLIC_MICROSOFT_TENANT_ID="${MICROSOFT_TENANT_ID}" \
  NEXT_PUBLIC_DATAVERSE_URL="https://prod-esim-myanmar.crm5.dynamics.com"

# 4. Power Platform Deployment
echo "Deploying Power Platform..."
pac solution import --path solutions/eSIMMyanmar.zip --environment prod-esim-myanmar

# 5. Build and Deploy
echo "Building Application..."
npm ci
npm run build
npm run deploy

# 6. Performance Validation
echo "Running Performance Tests..."
npm run lighthouse
npm run security-scan

echo "Deployment Complete - esim.com.mm LIVE"
echo "Contact: info@esim.com.mm | 09650000172"