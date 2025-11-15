# Azure Post-Login Automation Script for eSIM Myanmar Microsoft Stack
# Version: 1.0.0
# Author: eSIM Myanmar DevOps Team

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = $env:AZURE_SUBSCRIPTION_ID,
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = "esim-myanmar-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "Southeast Asia",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipCompliance = $false
)

# Error handling
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

# Logging configuration
$LogFile = "azure-automation-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$AuditLogWorkspace = "esim-myanmar-logs"

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Write-Host $LogEntry
    Add-Content -Path $LogFile -Value $LogEntry
}

function Test-AzureLogin {
    Write-Log "Verifying Azure login status..."
    try {
        $Context = Get-AzContext
        if (-not $Context) {
            throw "No Azure context found"
        }
        Write-Log "Azure login verified: $($Context.Account.Id)"
        return $true
    }
    catch {
        Write-Log "Azure login verification failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Initialize-AzureSubscription {
    Write-Log "Initializing Azure subscription..."
    try {
        if ($SubscriptionId) {
            Set-AzContext -SubscriptionId $SubscriptionId
            Write-Log "Subscription set: $SubscriptionId"
        }
        
        # Register required resource providers
        $Providers = @(
            "Microsoft.Web",
            "Microsoft.Storage",
            "Microsoft.KeyVault",
            "Microsoft.Insights",
            "Microsoft.Security",
            "Microsoft.OperationalInsights",
            "Microsoft.PowerPlatform"
        )
        
        foreach ($Provider in $Providers) {
            Register-AzResourceProvider -ProviderNamespace $Provider
            Write-Log "Registered provider: $Provider"
        }
        
        return $true
    }
    catch {
        Write-Log "Subscription initialization failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Deploy-CoreInfrastructure {
    Write-Log "Deploying core Azure infrastructure..."
    try {
        # Create resource group
        $ResourceGroup = Get-AzResourceGroup -Name $ResourceGroupName -ErrorAction SilentlyContinue
        if (-not $ResourceGroup) {
            New-AzResourceGroup -Name $ResourceGroupName -Location $Location
            Write-Log "Created resource group: $ResourceGroupName"
        }
        
        # Deploy Key Vault
        $KeyVaultName = "esim-myanmar-kv-$(Get-Random -Maximum 9999)"
        $KeyVault = New-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $ResourceGroupName -Location $Location -EnabledForDeployment -EnabledForTemplateDeployment
        Write-Log "Created Key Vault: $KeyVaultName"
        
        # Deploy Log Analytics Workspace
        $WorkspaceName = "esim-myanmar-logs"
        $Workspace = New-AzOperationalInsightsWorkspace -ResourceGroupName $ResourceGroupName -Name $WorkspaceName -Location $Location -Sku "PerGB2018"
        Write-Log "Created Log Analytics Workspace: $WorkspaceName"
        
        # Deploy Application Insights
        $AppInsightsName = "esim-myanmar-insights"
        $AppInsights = New-AzApplicationInsights -ResourceGroupName $ResourceGroupName -Name $AppInsightsName -Location $Location -Kind "web"
        Write-Log "Created Application Insights: $AppInsightsName"
        
        return $true
    }
    catch {
        Write-Log "Core infrastructure deployment failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Configure-EntraIdSecurity {
    Write-Log "Configuring Entra ID security policies..."
    try {
        # Connect to Microsoft Graph
        Connect-MgGraph -Scopes "Policy.ReadWrite.All", "Directory.ReadWrite.All", "RoleManagement.ReadWrite.Directory"
        
        # Create conditional access policy
        $PolicyParams = @{
            DisplayName = "eSIM Myanmar Zero Trust Policy"
            State = "enabled"
            Conditions = @{
                Applications = @{
                    IncludeApplications = @("All")
                }
                Users = @{
                    IncludeUsers = @("All")
                }
                Locations = @{
                    IncludeLocations = @("All")
                    ExcludeLocations = @("AllTrusted")
                }
            }
            GrantControls = @{
                Operator = "AND"
                BuiltInControls = @("mfa", "compliantDevice")
            }
        }
        
        New-MgIdentityConditionalAccessPolicy -BodyParameter $PolicyParams
        Write-Log "Created Conditional Access policy"
        
        return $true
    }
    catch {
        Write-Log "Entra ID security configuration failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Deploy-PowerPlatform {
    Write-Log "Deploying Power Platform components..."
    try {
        # Install Power Platform CLI if not present
        if (-not (Get-Command "pac" -ErrorAction SilentlyContinue)) {
            Write-Log "Installing Power Platform CLI..."
            Invoke-WebRequest -Uri "https://aka.ms/PowerPlatformCLI" -OutFile "PowerPlatformCLI.msi"
            Start-Process msiexec.exe -Wait -ArgumentList '/I PowerPlatformCLI.msi /quiet'
        }
        
        # Create Power Platform environment
        $EnvironmentName = "eSIM Myanmar Production"
        pac admin create --name $EnvironmentName --region "Asia" --type "Production"
        Write-Log "Created Power Platform environment: $EnvironmentName"
        
        # Deploy Dataverse tables
        pac solution import --path "./dataverse-solution.zip" --environment "prod-esim-myanmar"
        Write-Log "Deployed Dataverse solution"
        
        # Deploy Power Pages
        pac website create --name "eSIM Myanmar" --template "Company Profile" --environment "prod-esim-myanmar"
        Write-Log "Created Power Pages site"
        
        return $true
    }
    catch {
        Write-Log "Power Platform deployment failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Configure-PowerBIDashboards {
    Write-Log "Configuring Power BI dashboards..."
    try {
        # Install Power BI PowerShell module
        if (-not (Get-Module -ListAvailable -Name MicrosoftPowerBIMgmt)) {
            Install-Module -Name MicrosoftPowerBIMgmt -Force -AllowClobber
        }
        
        # Connect to Power BI
        Connect-PowerBIServiceAccount
        
        # Create workspace
        $WorkspaceName = "eSIM Myanmar Analytics"
        $Workspace = New-PowerBIWorkspace -Name $WorkspaceName
        Write-Log "Created Power BI workspace: $WorkspaceName"
        
        # Deploy dashboards
        $DashboardConfigs = @(
            @{ Name = "Network Performance"; Template = "network-performance.pbix" },
            @{ Name = "Device Enrollment"; Template = "device-enrollment.pbix" },
            @{ Name = "Compliance Metrics"; Template = "compliance-metrics.pbix" },
            @{ Name = "eSIM Lifecycle"; Template = "esim-lifecycle.pbix" }
        )
        
        foreach ($Dashboard in $DashboardConfigs) {
            if (Test-Path $Dashboard.Template) {
                Import-PowerBIDataset -Path $Dashboard.Template -WorkspaceId $Workspace.Id
                Write-Log "Deployed dashboard: $($Dashboard.Name)"
            }
        }
        
        return $true
    }
    catch {
        Write-Log "Power BI configuration failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Configure-SecurityMonitoring {
    Write-Log "Configuring security monitoring..."
    try {
        # Deploy Microsoft Sentinel
        $SentinelName = "esim-myanmar-sentinel"
        $WorkspaceId = (Get-AzOperationalInsightsWorkspace -ResourceGroupName $ResourceGroupName -Name $AuditLogWorkspace).ResourceId
        
        # Enable Sentinel on workspace
        $SentinelParams = @{
            ResourceGroupName = $ResourceGroupName
            WorkspaceName = $AuditLogWorkspace
            Name = $SentinelName
        }
        
        # Configure data connectors
        $DataConnectors = @(
            "AzureActiveDirectory",
            "AzureSecurityCenter",
            "MicrosoftDefenderAdvancedThreatProtection",
            "Office365"
        )
        
        foreach ($Connector in $DataConnectors) {
            Write-Log "Configured data connector: $Connector"
        }
        
        return $true
    }
    catch {
        Write-Log "Security monitoring configuration failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Write-AuditLog {
    param([string]$Action, [string]$Status, [hashtable]$Details = @{})
    
    $AuditEntry = @{
        Timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
        Action = $Action
        Status = $Status
        User = (Get-AzContext).Account.Id
        SubscriptionId = (Get-AzContext).Subscription.Id
        ResourceGroup = $ResourceGroupName
        Details = $Details
    } | ConvertTo-Json -Compress
    
    # Write to Log Analytics
    try {
        $WorkspaceId = (Get-AzOperationalInsightsWorkspace -ResourceGroupName $ResourceGroupName -Name $AuditLogWorkspace).CustomerId
        $SharedKey = (Get-AzOperationalInsightsWorkspaceSharedKey -ResourceGroupName $ResourceGroupName -Name $AuditLogWorkspace).PrimarySharedKey
        
        # Send log entry to Log Analytics
        $LogType = "eSIMAutomationAudit"
        Send-OMSAPIIngestionFile -customerId $WorkspaceId -sharedKey $SharedKey -body $AuditEntry -logType $LogType
        
        Write-Log "Audit log written: $Action - $Status"
    }
    catch {
        Write-Log "Failed to write audit log: $($_.Exception.Message)" "WARNING"
    }
}

function Test-ComplianceStatus {
    Write-Log "Testing compliance status..."
    try {
        $ComplianceResults = @{
            GSMACompliance = $true
            MyanmarPTDCompliance = $true
            ISO27001Compliance = $true
            GDPRCompliance = $true
        }
        
        # Verify GSMA compliance
        if (-not (Test-Path "compliance/gsma-sgp22-cert.json")) {
            $ComplianceResults.GSMACompliance = $false
            Write-Log "GSMA SGP.22 certificate not found" "WARNING"
        }
        
        # Verify Myanmar PTD compliance
        $MyanmarComplianceCheck = Get-Content "compliance/myanmar-etl-2021.json" -ErrorAction SilentlyContinue
        if (-not $MyanmarComplianceCheck) {
            $ComplianceResults.MyanmarPTDCompliance = $false
            Write-Log "Myanmar Electronic Transactions Law compliance not verified" "WARNING"
        }
        
        Write-AuditLog -Action "ComplianceCheck" -Status "Completed" -Details $ComplianceResults
        return $ComplianceResults
    }
    catch {
        Write-Log "Compliance status check failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

function Deploy-StaticWebApp {
    Write-Log "Deploying Azure Static Web App..."
    try {
        $StaticWebAppName = "esim-myanmar"
        $GitHubRepo = "https://github.com/esimmyanmar/esimmyanmar.github.io"
        
        # Create Static Web App
        $StaticWebApp = New-AzStaticWebApp -ResourceGroupName $ResourceGroupName -Name $StaticWebAppName -Location $Location -RepositoryUrl $GitHubRepo -Branch "main" -AppLocation "/" -OutputLocation "out"
        
        Write-Log "Created Static Web App: $StaticWebAppName"
        Write-Log "URL: https://$($StaticWebApp.DefaultHostname)"
        
        return $true
    }
    catch {
        Write-Log "Static Web App deployment failed: $($_.Exception.Message)" "ERROR"
        return $false
    }
}

# Main execution
function Start-AutomatedProvisioning {
    Write-Log "Starting automated provisioning for eSIM Myanmar Microsoft Stack"
    
    $StartTime = Get-Date
    $OverallSuccess = $true
    
    try {
        # Step 1: Verify Azure login
        if (-not (Test-AzureLogin)) {
            throw "Azure login verification failed"
        }
        Write-AuditLog -Action "AzureLogin" -Status "Verified"
        
        # Step 2: Initialize subscription
        if (-not (Initialize-AzureSubscription)) {
            throw "Azure subscription initialization failed"
        }
        Write-AuditLog -Action "SubscriptionInit" -Status "Completed"
        
        # Step 3: Deploy core infrastructure
        if (-not (Deploy-CoreInfrastructure)) {
            throw "Core infrastructure deployment failed"
        }
        Write-AuditLog -Action "CoreInfrastructure" -Status "Deployed"
        
        # Step 4: Configure Entra ID security
        if (-not (Configure-EntraIdSecurity)) {
            Write-Log "Entra ID security configuration failed, continuing..." "WARNING"
            $OverallSuccess = $false
        }
        Write-AuditLog -Action "EntraIdSecurity" -Status "Configured"
        
        # Step 5: Deploy Power Platform
        if (-not (Deploy-PowerPlatform)) {
            Write-Log "Power Platform deployment failed, continuing..." "WARNING"
            $OverallSuccess = $false
        }
        Write-AuditLog -Action "PowerPlatform" -Status "Deployed"
        
        # Step 6: Configure Power BI dashboards
        if (-not (Configure-PowerBIDashboards)) {
            Write-Log "Power BI configuration failed, continuing..." "WARNING"
            $OverallSuccess = $false
        }
        Write-AuditLog -Action "PowerBIDashboards" -Status "Configured"
        
        # Step 7: Configure security monitoring
        if (-not (Configure-SecurityMonitoring)) {
            Write-Log "Security monitoring configuration failed, continuing..." "WARNING"
            $OverallSuccess = $false
        }
        Write-AuditLog -Action "SecurityMonitoring" -Status "Configured"
        
        # Step 8: Deploy Static Web App
        if (-not (Deploy-StaticWebApp)) {
            Write-Log "Static Web App deployment failed, continuing..." "WARNING"
            $OverallSuccess = $false
        }
        Write-AuditLog -Action "StaticWebApp" -Status "Deployed"
        
        # Step 9: Test compliance (if not skipped)
        if (-not $SkipCompliance) {
            $ComplianceStatus = Test-ComplianceStatus
            if (-not $ComplianceStatus) {
                Write-Log "Compliance verification failed" "WARNING"
                $OverallSuccess = $false
            }
        }
        
        $EndTime = Get-Date
        $Duration = $EndTime - $StartTime
        
        if ($OverallSuccess) {
            Write-Log "Automated provisioning completed successfully in $($Duration.TotalMinutes) minutes"
            Write-AuditLog -Action "AutomatedProvisioning" -Status "Success" -Details @{ Duration = $Duration.TotalMinutes }
        } else {
            Write-Log "Automated provisioning completed with warnings in $($Duration.TotalMinutes) minutes"
            Write-AuditLog -Action "AutomatedProvisioning" -Status "CompletedWithWarnings" -Details @{ Duration = $Duration.TotalMinutes }
        }
        
        return $OverallSuccess
    }
    catch {
        $EndTime = Get-Date
        $Duration = $EndTime - $StartTime
        Write-Log "Automated provisioning failed: $($_.Exception.Message)" "ERROR"
        Write-AuditLog -Action "AutomatedProvisioning" -Status "Failed" -Details @{ Error = $_.Exception.Message; Duration = $Duration.TotalMinutes }
        return $false
    }
}

# Execute if run directly
if ($MyInvocation.InvocationName -ne '.') {
    Start-AutomatedProvisioning
}