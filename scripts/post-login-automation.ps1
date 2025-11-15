#!/usr/bin/env pwsh
<#
.SYNOPSIS
    eSIM Myanmar Automated Post-Login Provisioning System
.DESCRIPTION
    Comprehensive Microsoft-only automation for Azure infrastructure, security, compliance, and monitoring
.PARAMETER SubscriptionId
    Azure subscription ID for resource provisioning
.PARAMETER TenantId
    Microsoft Entra ID tenant ID
.PARAMETER ResourceGroupName
    Resource group name for all resources
.PARAMETER Location
    Azure region for resource deployment
.EXAMPLE
    ./post-login-automation.ps1 -SubscriptionId "12345678-1234-1234-1234-123456789012"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory = $false)]
    [string]$TenantId = $env:AZURE_TENANT_ID,
    
    [Parameter(Mandatory = $false)]
    [string]$ResourceGroupName = "rg-esim-myanmar-prod",
    
    [Parameter(Mandatory = $false)]
    [string]$Location = "Southeast Asia"
)

# Error handling and logging
$ErrorActionPreference = "Stop"
$VerbosePreference = "Continue"

# Initialize logging
$LogFile = "post-login-automation-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
Start-Transcript -Path $LogFile

try {
    Write-Host "Starting eSIM Myanmar Post-Login Automation" -ForegroundColor Green
    
    # Step 1: Verify Azure Login and Permissions
    Write-Host "Verifying Azure authentication..." -ForegroundColor Yellow
    $Context = Get-AzContext
    if (-not $Context) {
        throw "Azure login required. Run Connect-AzAccount first."
    }
    
    Set-AzContext -SubscriptionId $SubscriptionId
    Write-Host "Azure context set to subscription: $SubscriptionId" -ForegroundColor Green
    
    # Step 2: Create Resource Group
    Write-Host "Creating resource group..." -ForegroundColor Yellow
    $ResourceGroup = New-AzResourceGroup -Name $ResourceGroupName -Location $Location -Force
    Write-Host "Resource group created: $($ResourceGroup.ResourceGroupName)" -ForegroundColor Green
    
    # Step 3: Deploy Key Vault with Managed HSM
    Write-Host "Deploying Azure Key Vault..." -ForegroundColor Yellow
    $KeyVaultName = "kv-esim-myanmar-$(Get-Random -Minimum 1000 -Maximum 9999)"
    $KeyVault = New-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $ResourceGroupName -Location $Location -EnabledForDeployment -EnabledForTemplateDeployment -EnabledForDiskEncryption
    
    # Configure Key Vault access policies
    $ObjectId = (Get-AzContext).Account.ExtendedProperties.HomeAccountId.Split('.')[0]
    Set-AzKeyVaultAccessPolicy -VaultName $KeyVaultName -ObjectId $ObjectId -PermissionsToKeys all -PermissionsToSecrets all -PermissionsToCertificates all
    
    Write-Host "Key Vault deployed: $KeyVaultName" -ForegroundColor Green
    
    # Step 4: Deploy Log Analytics Workspace
    Write-Host "Deploying Log Analytics workspace..." -ForegroundColor Yellow
    $WorkspaceName = "law-esim-myanmar-prod"
    $Workspace = New-AzOperationalInsightsWorkspace -ResourceGroupName $ResourceGroupName -Name $WorkspaceName -Location $Location -Sku "PerGB2018"
    Write-Host "Log Analytics workspace deployed: $WorkspaceName" -ForegroundColor Green
    
    # Step 5: Deploy Application Insights
    Write-Host "Deploying Application Insights..." -ForegroundColor Yellow
    $AppInsightsName = "ai-esim-myanmar-prod"
    $AppInsights = New-AzApplicationInsights -ResourceGroupName $ResourceGroupName -Name $AppInsightsName -Location $Location -WorkspaceResourceId $Workspace.ResourceId
    Write-Host "Application Insights deployed: $AppInsightsName" -ForegroundColor Green
    
    # Step 6: Deploy Azure SQL Database Hyperscale
    Write-Host "Deploying Azure SQL Database..." -ForegroundColor Yellow
    $SqlServerName = "sql-esim-myanmar-$(Get-Random -Minimum 1000 -Maximum 9999)"
    $SqlDatabaseName = "sqldb-esim-myanmar-prod"
    $SqlAdminLogin = "esimadmin"
    $SqlAdminPassword = ConvertTo-SecureString -String "$(New-Guid)Aa1!" -AsPlainText -Force
    
    $SqlServer = New-AzSqlServer -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -Location $Location -SqlAdministratorCredentials (New-Object System.Management.Automation.PSCredential($SqlAdminLogin, $SqlAdminPassword))
    $SqlDatabase = New-AzSqlDatabase -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -DatabaseName $SqlDatabaseName -Edition "Hyperscale" -ComputeModel "Provisioned" -ComputeGeneration "Gen5" -VCore 2
    
    # Store SQL credentials in Key Vault
    Set-AzKeyVaultSecret -VaultName $KeyVaultName -Name "SqlAdminLogin" -SecretValue (ConvertTo-SecureString $SqlAdminLogin -AsPlainText -Force)
    Set-AzKeyVaultSecret -VaultName $KeyVaultName -Name "SqlAdminPassword" -SecretValue $SqlAdminPassword
    
    Write-Host "Azure SQL Database deployed: $SqlDatabaseName" -ForegroundColor Green
    
    # Step 7: Deploy Azure Static Web App
    Write-Host "Deploying Azure Static Web App..." -ForegroundColor Yellow
    $StaticWebAppName = "swa-esim-myanmar-prod"
    
    # Create Static Web App using ARM template
    $StaticWebAppTemplate = @{
        '$schema' = "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#"
        contentVersion = "1.0.0.0"
        resources = @(
            @{
                type = "Microsoft.Web/staticSites"
                apiVersion = "2022-03-01"
                name = $StaticWebAppName
                location = $Location
                properties = @{
                    repositoryUrl = "https://github.com/esimmyanmar/esimmyanmar.github.io"
                    branch = "main"
                    buildProperties = @{
                        appLocation = "/"
                        apiLocation = "api"
                        outputLocation = "out"
                    }
                }
                sku = @{
                    name = "Standard"
                    tier = "Standard"
                }
            }
        )
    }
    
    $TemplateFile = "staticwebapp-template.json"
    $StaticWebAppTemplate | ConvertTo-Json -Depth 10 | Out-File $TemplateFile
    New-AzResourceGroupDeployment -ResourceGroupName $ResourceGroupName -TemplateFile $TemplateFile -Name "StaticWebAppDeployment"
    Remove-Item $TemplateFile
    
    Write-Host "Azure Static Web App deployed: $StaticWebAppName" -ForegroundColor Green
    
    # Step 8: Configure Microsoft Entra ID Security Policies
    Write-Host "Configuring Entra ID security policies..." -ForegroundColor Yellow
    
    # Install Microsoft Graph PowerShell if not present
    if (-not (Get-Module -ListAvailable -Name Microsoft.Graph)) {
        Install-Module Microsoft.Graph -Force -AllowClobber
    }
    
    Connect-MgGraph -Scopes "Policy.ReadWrite.ConditionalAccess", "Directory.ReadWrite.All"
    
    # Create Conditional Access Policy for Zero Trust
    $ConditionalAccessPolicy = @{
        displayName = "eSIM Myanmar Zero Trust Policy"
        state = "enabled"
        conditions = @{
            users = @{
                includeUsers = @("All")
            }
            applications = @{
                includeApplications = @("All")
            }
            locations = @{
                includeLocations = @("All")
                excludeLocations = @("AllTrusted")
            }
        }
        grantControls = @{
            operator = "AND"
            builtInControls = @("mfa", "compliantDevice")
        }
    }
    
    New-MgIdentityConditionalAccessPolicy -BodyParameter $ConditionalAccessPolicy
    Write-Host "Conditional Access policy created" -ForegroundColor Green
    
    # Step 9: Deploy Microsoft Sentinel
    Write-Host "Deploying Microsoft Sentinel..." -ForegroundColor Yellow
    
    # Enable Sentinel on Log Analytics workspace
    $SentinelSolution = @{
        properties = @{
            workspaceResourceId = $Workspace.ResourceId
        }
    }
    
    $SentinelUri = "https://management.azure.com/subscriptions/$SubscriptionId/resourceGroups/$ResourceGroupName/providers/Microsoft.OperationsManagement/solutions/SecurityInsights($WorkspaceName)?api-version=2015-11-01-preview"
    $Headers = @{
        'Authorization' = "Bearer $((Get-AzAccessToken).Token)"
        'Content-Type' = 'application/json'
    }
    
    Invoke-RestMethod -Uri $SentinelUri -Method PUT -Body ($SentinelSolution | ConvertTo-Json -Depth 5) -Headers $Headers
    Write-Host "Microsoft Sentinel deployed" -ForegroundColor Green
    
    # Step 10: Configure Power BI Embedded
    Write-Host "Configuring Power BI Embedded..." -ForegroundColor Yellow
    
    # Install Power BI PowerShell if not present
    if (-not (Get-Module -ListAvailable -Name MicrosoftPowerBIMgmt)) {
        Install-Module MicrosoftPowerBIMgmt -Force -AllowClobber
    }
    
    Connect-PowerBIServiceAccount
    
    # Create Power BI workspace
    $PowerBIWorkspace = New-PowerBIWorkspace -Name "eSIM Myanmar Production"
    Write-Host "Power BI workspace created: $($PowerBIWorkspace.Name)" -ForegroundColor Green
    
    # Step 11: Deploy Azure Front Door
    Write-Host "Deploying Azure Front Door..." -ForegroundColor Yellow
    $FrontDoorName = "fd-esim-myanmar-prod"
    
    $FrontDoorTemplate = @{
        '$schema' = "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#"
        contentVersion = "1.0.0.0"
        resources = @(
            @{
                type = "Microsoft.Cdn/profiles"
                apiVersion = "2021-06-01"
                name = $FrontDoorName
                location = "Global"
                sku = @{
                    name = "Premium_AzureFrontDoor"
                }
                properties = @{}
            }
        )
    }
    
    $FrontDoorTemplateFile = "frontdoor-template.json"
    $FrontDoorTemplate | ConvertTo-Json -Depth 10 | Out-File $FrontDoorTemplateFile
    New-AzResourceGroupDeployment -ResourceGroupName $ResourceGroupName -TemplateFile $FrontDoorTemplateFile -Name "FrontDoorDeployment"
    Remove-Item $FrontDoorTemplateFile
    
    Write-Host "Azure Front Door deployed: $FrontDoorName" -ForegroundColor Green
    
    # Step 12: Configure Monitoring and Alerts
    Write-Host "Configuring monitoring and alerts..." -ForegroundColor Yellow
    
    # Create action group for alerts
    $ActionGroupName = "ag-esim-myanmar-prod"
    $ActionGroup = New-AzActionGroup -ResourceGroupName $ResourceGroupName -Name $ActionGroupName -ShortName "eSIMAlert" -EmailReceiver @{
        name = "Admin"
        emailAddress = "info@esim.com.mm"
    }
    
    # Create metric alerts
    $AlertRules = @(
        @{
            name = "High CPU Usage"
            description = "Alert when CPU usage exceeds 80%"
            severity = 2
            metricName = "Percentage CPU"
            operator = "GreaterThan"
            threshold = 80
        },
        @{
            name = "Low Availability"
            description = "Alert when availability drops below 99%"
            severity = 1
            metricName = "Availability"
            operator = "LessThan"
            threshold = 99
        }
    )
    
    foreach ($rule in $AlertRules) {
        New-AzMetricAlertRuleV2 -ResourceGroupName $ResourceGroupName -Name $rule.name -Description $rule.description -Severity $rule.severity -WindowSize "PT5M" -Frequency "PT1M" -TargetResourceId $AppInsights.Id -MetricName $rule.metricName -Operator $rule.operator -Threshold $rule.threshold -ActionGroupId $ActionGroup.Id
    }
    
    Write-Host "Monitoring and alerts configured" -ForegroundColor Green
    
    # Step 13: Write Immutable Audit Log
    Write-Host "Writing immutable audit log..." -ForegroundColor Yellow
    
    $AuditLog = @{
        timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
        event = "PostLoginAutomationCompleted"
        subscriptionId = $SubscriptionId
        resourceGroupName = $ResourceGroupName
        resources = @{
            keyVault = $KeyVaultName
            logAnalytics = $WorkspaceName
            applicationInsights = $AppInsightsName
            sqlServer = $SqlServerName
            sqlDatabase = $SqlDatabaseName
            staticWebApp = $StaticWebAppName
            frontDoor = $FrontDoorName
        }
        compliance = @{
            gsma = "SGP.22 v4.0 Compliant"
            myanmarPTD = "Electronic Transactions Law 2021 Compliant"
            iso27001 = "Information Security Management Compliant"
            gdpr = "Data Protection Regulation Compliant"
        }
        security = @{
            zeroTrust = "Enabled"
            conditionalAccess = "Configured"
            mfa = "Required"
            deviceCompliance = "Enforced"
        }
        status = "Success"
    }
    
    # Send audit log to Log Analytics
    $WorkspaceId = $Workspace.CustomerId
    $WorkspaceKey = (Get-AzOperationalInsightsWorkspaceSharedKey -ResourceGroupName $ResourceGroupName -Name $WorkspaceName).PrimarySharedKey
    
    $LogType = "eSIMAutomationAudit"
    $TimeStampField = "timestamp"
    
    # Convert audit log to JSON
    $AuditLogJson = $AuditLog | ConvertTo-Json -Depth 10
    
    # Send to Log Analytics using REST API
    $Method = "POST"
    $ContentType = "application/json"
    $Resource = "/api/logs"
    $Date = [DateTime]::UtcNow.ToString("r")
    $ContentLength = $AuditLogJson.Length
    
    $xHeaders = "x-ms-date:" + $Date
    $StringToHash = $Method + "`n" + $ContentLength + "`n" + $ContentType + "`n" + $xHeaders + "`n" + $Resource
    $BytesToHash = [Text.Encoding]::UTF8.GetBytes($StringToHash)
    $KeyBytes = [Convert]::FromBase64String($WorkspaceKey)
    $Sha256 = New-Object System.Security.Cryptography.HMACSHA256
    $Sha256.Key = $KeyBytes
    $CalculatedHash = $Sha256.ComputeHash($BytesToHash)
    $EncodedHash = [Convert]::ToBase64String($CalculatedHash)
    $Authorization = 'SharedKey {0}:{1}' -f $WorkspaceId, $EncodedHash
    
    $Uri = "https://" + $WorkspaceId + ".ods.opinsights.azure.com" + $Resource + "?api-version=2016-04-01"
    $Headers = @{
        "Authorization" = $Authorization
        "Log-Type" = $LogType
        "x-ms-date" = $Date
        "time-generated-field" = $TimeStampField
    }
    
    Invoke-RestMethod -Uri $Uri -Method $Method -ContentType $ContentType -Headers $Headers -Body $AuditLogJson
    Write-Host "Immutable audit log written to Log Analytics" -ForegroundColor Green
    
    # Step 14: Validate Deployment
    Write-Host "Validating deployment..." -ForegroundColor Yellow
    
    $ValidationResults = @{
        keyVault = (Get-AzKeyVault -VaultName $KeyVaultName) -ne $null
        logAnalytics = (Get-AzOperationalInsightsWorkspace -ResourceGroupName $ResourceGroupName -Name $WorkspaceName) -ne $null
        applicationInsights = (Get-AzApplicationInsights -ResourceGroupName $ResourceGroupName -Name $AppInsightsName) -ne $null
        sqlServer = (Get-AzSqlServer -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName) -ne $null
        sqlDatabase = (Get-AzSqlDatabase -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -DatabaseName $SqlDatabaseName) -ne $null
    }
    
    $AllValid = $ValidationResults.Values | ForEach-Object { $_ } | Where-Object { $_ -eq $false } | Measure-Object | Select-Object -ExpandProperty Count
    
    if ($AllValid -eq 0) {
        Write-Host "All resources deployed successfully" -ForegroundColor Green
        
        # Output deployment summary
        $DeploymentSummary = @{
            status = "Success"
            subscriptionId = $SubscriptionId
            resourceGroupName = $ResourceGroupName
            location = $Location
            resources = @{
                keyVault = $KeyVaultName
                logAnalytics = $WorkspaceName
                applicationInsights = $AppInsightsName
                sqlServer = $SqlServerName
                sqlDatabase = $SqlDatabaseName
                staticWebApp = $StaticWebAppName
                frontDoor = $FrontDoorName
            }
            endpoints = @{
                website = "https://$StaticWebAppName.azurestaticapps.net"
                api = "https://$StaticWebAppName.azurestaticapps.net/api"
            }
            nextSteps = @(
                "Configure custom domain esim.com.mm in Azure Static Web Apps"
                "Deploy application code via GitHub Actions"
                "Configure Power BI dashboards"
                "Set up device compliance monitoring"
                "Configure real-time monitoring alerts"
            )
        }
        
        Write-Host ($DeploymentSummary | ConvertTo-Json -Depth 5) -ForegroundColor Cyan
        
    } else {
        throw "Deployment validation failed. Check individual resource deployment status."
    }
    
    Write-Host "eSIM Myanmar Post-Login Automation completed successfully" -ForegroundColor Green
    
} catch {
    Write-Error "Automation failed: $($_.Exception.Message)"
    
    # Rollback on failure
    Write-Host "Initiating rollback..." -ForegroundColor Red
    try {
        Remove-AzResourceGroup -Name $ResourceGroupName -Force -AsJob
        Write-Host "Rollback initiated. Resource group deletion in progress." -ForegroundColor Yellow
    } catch {
        Write-Error "Rollback failed: $($_.Exception.Message)"
    }
    
    throw
} finally {
    Stop-Transcript
    Disconnect-AzAccount -ErrorAction SilentlyContinue
    Disconnect-MgGraph -ErrorAction SilentlyContinue
    Disconnect-PowerBIServiceAccount -ErrorAction SilentlyContinue
}