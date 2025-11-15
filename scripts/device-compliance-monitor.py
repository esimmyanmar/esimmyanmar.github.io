#!/usr/bin/env python3
"""
eSIM Myanmar Device Compliance Monitoring System
Comprehensive device compliance validation for Zero Trust architecture
"""

import os
import sys
import json
import logging
import asyncio
import platform
import subprocess
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
import requests
from azure.identity import DefaultAzureCredential
from azure.monitor.ingestion import LogsIngestionClient
from azure.keyvault.secrets import SecretClient
import msal

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'device-compliance-{datetime.now().strftime("%Y%m%d-%H%M%S")}.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class ComplianceResult:
    """Device compliance check result"""
    device_id: str
    timestamp: str
    os_version: str
    os_compliant: bool
    defender_status: str
    defender_compliant: bool
    bitlocker_status: str
    bitlocker_compliant: bool
    esim_profile_status: str
    esim_compliant: bool
    overall_compliant: bool
    compliance_score: float
    issues: List[str]
    recommendations: List[str]

class DeviceComplianceMonitor:
    """Main device compliance monitoring class"""
    
    def __init__(self):
        self.tenant_id = os.getenv('MICROSOFT_TENANT_ID')
        self.client_id = os.getenv('MICROSOFT_CLIENT_ID')
        self.client_secret = os.getenv('MICROSOFT_CLIENT_SECRET')
        self.key_vault_url = os.getenv('AZURE_KEY_VAULT_URL')
        self.log_analytics_endpoint = os.getenv('LOG_ANALYTICS_ENDPOINT')
        self.log_analytics_rule_id = os.getenv('LOG_ANALYTICS_RULE_ID')
        
        if not all([self.tenant_id, self.client_id, self.key_vault_url]):
            raise ValueError("Required environment variables not set")
        
        # Initialize Azure clients
        self.credential = DefaultAzureCredential()
        self.key_vault_client = SecretClient(vault_url=self.key_vault_url, credential=self.credential)
        
        if self.log_analytics_endpoint and self.log_analytics_rule_id:
            self.logs_client = LogsIngestionClient(endpoint=self.log_analytics_endpoint, credential=self.credential)
        else:
            self.logs_client = None
            logger.warning("Log Analytics not configured - compliance results will not be sent to Azure Monitor")
    
    def get_device_id(self) -> str:
        """Get unique device identifier"""
        try:
            if platform.system() == "Windows":
                result = subprocess.run(['wmic', 'csproduct', 'get', 'UUID'], 
                                      capture_output=True, text=True, check=True)
                return result.stdout.split('\n')[1].strip()
            elif platform.system() == "Darwin":  # macOS
                result = subprocess.run(['system_profiler', 'SPHardwareDataType'], 
                                      capture_output=True, text=True, check=True)
                for line in result.stdout.split('\n'):
                    if 'Hardware UUID' in line:
                        return line.split(':')[1].strip()
            else:  # Linux
                with open('/etc/machine-id', 'r') as f:
                    return f.read().strip()
        except Exception as e:
            logger.error(f"Failed to get device ID: {e}")
            return f"unknown-{platform.node()}"
    
    def check_os_compliance(self) -> tuple[str, bool]:
        """Check operating system version compliance"""
        try:
            os_info = platform.platform()
            system = platform.system()
            version = platform.version()
            
            # Define minimum required versions
            min_versions = {
                'Windows': '10.0.19041',  # Windows 10 20H1
                'Darwin': '12.0',         # macOS Monterey
                'Linux': '5.4'            # Ubuntu 20.04 LTS kernel
            }
            
            if system in min_versions:
                current_version = platform.release()
                min_version = min_versions[system]
                
                # Simple version comparison (works for most cases)
                compliant = current_version >= min_version
                
                return f"{system} {current_version}", compliant
            else:
                return f"{os_info}", False
                
        except Exception as e:
            logger.error(f"OS compliance check failed: {e}")
            return "Unknown", False
    
    def check_defender_status(self) -> tuple[str, bool]:
        """Check Microsoft Defender status"""
        try:
            if platform.system() == "Windows":
                # Check Windows Defender status
                result = subprocess.run([
                    'powershell', '-Command',
                    'Get-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled, IoavProtectionEnabled | ConvertTo-Json'
                ], capture_output=True, text=True, check=True)
                
                status = json.loads(result.stdout)
                
                if (status.get('AntivirusEnabled') and 
                    status.get('RealTimeProtectionEnabled') and 
                    status.get('IoavProtectionEnabled')):
                    return "Active - Real-time protection enabled", True
                else:
                    return "Inactive or partially disabled", False
                    
            elif platform.system() == "Darwin":
                # Check for Microsoft Defender for Endpoint on macOS
                defender_path = "/Applications/Microsoft Defender ATP.app"
                if os.path.exists(defender_path):
                    result = subprocess.run(['ps', 'aux'], capture_output=True, text=True)
                    if 'Microsoft Defender' in result.stdout:
                        return "Microsoft Defender for Endpoint - Running", True
                    else:
                        return "Microsoft Defender for Endpoint - Not running", False
                else:
                    return "Microsoft Defender for Endpoint - Not installed", False
                    
            else:  # Linux
                # Check for Microsoft Defender for Endpoint on Linux
                result = subprocess.run(['systemctl', 'is-active', 'mdatp'], 
                                      capture_output=True, text=True)
                if result.returncode == 0 and 'active' in result.stdout:
                    return "Microsoft Defender for Endpoint - Active", True
                else:
                    return "Microsoft Defender for Endpoint - Inactive", False
                    
        except Exception as e:
            logger.error(f"Defender status check failed: {e}")
            return "Check failed", False
    
    def check_bitlocker_status(self) -> tuple[str, bool]:
        """Check BitLocker encryption status"""
        try:
            if platform.system() == "Windows":
                result = subprocess.run([
                    'powershell', '-Command',
                    'Get-BitLockerVolume -MountPoint C: | Select-Object VolumeStatus, EncryptionPercentage | ConvertTo-Json'
                ], capture_output=True, text=True, check=True)
                
                status = json.loads(result.stdout)
                volume_status = status.get('VolumeStatus', '')
                encryption_percentage = status.get('EncryptionPercentage', 0)
                
                if volume_status == 'FullyEncrypted' and encryption_percentage == 100:
                    return "Fully encrypted", True
                elif 'Encrypted' in volume_status:
                    return f"Encryption in progress ({encryption_percentage}%)", False
                else:
                    return "Not encrypted", False
                    
            elif platform.system() == "Darwin":
                # Check FileVault status on macOS
                result = subprocess.run(['fdesetup', 'status'], 
                                      capture_output=True, text=True, check=True)
                if 'FileVault is On' in result.stdout:
                    return "FileVault enabled", True
                else:
                    return "FileVault disabled", False
                    
            else:  # Linux
                # Check LUKS encryption
                result = subprocess.run(['lsblk', '-f'], capture_output=True, text=True)
                if 'crypto_LUKS' in result.stdout:
                    return "LUKS encryption detected", True
                else:
                    return "No encryption detected", False
                    
        except Exception as e:
            logger.error(f"Encryption status check failed: {e}")
            return "Check failed", False
    
    def check_esim_profile_status(self) -> tuple[str, bool]:
        """Check eSIM profile provisioning status"""
        try:
            # This would typically integrate with the eSIM management system
            # For now, we'll simulate the check
            
            if platform.system() in ["Windows", "Darwin"]:
                # Check for eSIM capability and profiles
                # This is a simplified check - real implementation would use
                # Windows WMI or macOS Core Telephony APIs
                
                # Simulate eSIM profile check
                esim_profiles = self._get_esim_profiles()
                
                if esim_profiles:
                    active_profiles = [p for p in esim_profiles if p.get('status') == 'active']
                    if active_profiles:
                        return f"Active profiles: {len(active_profiles)}", True
                    else:
                        return f"Profiles installed: {len(esim_profiles)} (none active)", False
                else:
                    return "No eSIM profiles found", False
            else:
                return "eSIM not supported on this platform", False
                
        except Exception as e:
            logger.error(f"eSIM profile check failed: {e}")
            return "Check failed", False
    
    def _get_esim_profiles(self) -> List[Dict[str, Any]]:
        """Get eSIM profiles from device (simulated)"""
        # This would integrate with actual eSIM APIs
        # For demonstration, return simulated data
        return [
            {
                "iccid": "89860000000000000001",
                "status": "active",
                "operator": "eSIM Myanmar",
                "profile_name": "eSIM Myanmar Production"
            }
        ]
    
    async def run_compliance_check(self) -> ComplianceResult:
        """Run comprehensive compliance check"""
        logger.info("Starting device compliance check")
        
        device_id = self.get_device_id()
        timestamp = datetime.now(timezone.utc).isoformat()
        
        # Run all compliance checks
        os_version, os_compliant = self.check_os_compliance()
        defender_status, defender_compliant = self.check_defender_status()
        bitlocker_status, bitlocker_compliant = self.check_bitlocker_status()
        esim_status, esim_compliant = self.check_esim_profile_status()
        
        # Calculate overall compliance
        compliance_checks = [os_compliant, defender_compliant, bitlocker_compliant, esim_compliant]
        compliance_score = sum(compliance_checks) / len(compliance_checks) * 100
        overall_compliant = compliance_score >= 75  # 75% threshold
        
        # Collect issues and recommendations
        issues = []
        recommendations = []
        
        if not os_compliant:
            issues.append("Operating system version below minimum requirements")
            recommendations.append("Update operating system to latest supported version")
        
        if not defender_compliant:
            issues.append("Microsoft Defender not properly configured")
            recommendations.append("Install and configure Microsoft Defender for Endpoint")
        
        if not bitlocker_compliant:
            issues.append("Disk encryption not enabled or incomplete")
            recommendations.append("Enable BitLocker/FileVault disk encryption")
        
        if not esim_compliant:
            issues.append("eSIM profile not properly provisioned")
            recommendations.append("Contact IT support for eSIM profile provisioning")
        
        result = ComplianceResult(
            device_id=device_id,
            timestamp=timestamp,
            os_version=os_version,
            os_compliant=os_compliant,
            defender_status=defender_status,
            defender_compliant=defender_compliant,
            bitlocker_status=bitlocker_status,
            bitlocker_compliant=bitlocker_compliant,
            esim_profile_status=esim_status,
            esim_compliant=esim_compliant,
            overall_compliant=overall_compliant,
            compliance_score=compliance_score,
            issues=issues,
            recommendations=recommendations
        )
        
        logger.info(f"Compliance check completed - Score: {compliance_score:.1f}%")
        return result
    
    async def send_to_log_analytics(self, result: ComplianceResult) -> bool:
        """Send compliance result to Azure Log Analytics"""
        try:
            if not self.logs_client:
                logger.warning("Log Analytics client not configured")
                return False
            
            # Convert result to JSON format for Log Analytics
            log_data = [asdict(result)]
            
            # Send to Log Analytics
            self.logs_client.upload(
                rule_id=self.log_analytics_rule_id,
                stream_name="Custom-DeviceCompliance_CL",
                logs=log_data
            )
            
            logger.info("Compliance result sent to Azure Log Analytics")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send to Log Analytics: {e}")
            return False
    
    async def generate_compliance_report(self, result: ComplianceResult) -> str:
        """Generate detailed compliance report"""
        report = f"""
eSIM Myanmar Device Compliance Report
=====================================

Device Information:
- Device ID: {result.device_id}
- Timestamp: {result.timestamp}
- Overall Compliance: {'COMPLIANT' if result.overall_compliant else 'NON-COMPLIANT'}
- Compliance Score: {result.compliance_score:.1f}%

Detailed Results:
- Operating System: {result.os_version} ({'✓' if result.os_compliant else '✗'})
- Microsoft Defender: {result.defender_status} ({'✓' if result.defender_compliant else '✗'})
- Disk Encryption: {result.bitlocker_status} ({'✓' if result.bitlocker_compliant else '✗'})
- eSIM Profile: {result.esim_profile_status} ({'✓' if result.esim_compliant else '✗'})

"""
        
        if result.issues:
            report += "Issues Found:\n"
            for i, issue in enumerate(result.issues, 1):
                report += f"{i}. {issue}\n"
            report += "\n"
        
        if result.recommendations:
            report += "Recommendations:\n"
            for i, rec in enumerate(result.recommendations, 1):
                report += f"{i}. {rec}\n"
            report += "\n"
        
        report += "For technical support, contact: info@esim.com.mm\n"
        report += "Phone: 09650000172\n"
        
        return report

async def main():
    """Main execution function"""
    try:
        # Initialize compliance monitor
        monitor = DeviceComplianceMonitor()
        
        # Run compliance check
        result = await monitor.run_compliance_check()
        
        # Generate and display report
        report = await monitor.generate_compliance_report(result)
        print(report)
        
        # Send to Azure Log Analytics
        await monitor.send_to_log_analytics(result)
        
        # Save result to file
        result_file = f"compliance-result-{datetime.now().strftime('%Y%m%d-%H%M%S')}.json"
        with open(result_file, 'w') as f:
            json.dump(asdict(result), f, indent=2)
        
        logger.info(f"Compliance result saved to {result_file}")
        
        # Exit with appropriate code
        sys.exit(0 if result.overall_compliant else 1)
        
    except Exception as e:
        logger.error(f"Compliance check failed: {e}")
        sys.exit(2)

if __name__ == "__main__":
    asyncio.run(main())