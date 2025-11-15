#!/usr/bin/env python3
"""
Device Compliance Check Script for eSIM Myanmar Microsoft Stack
Validates device compliance across OS, Defender, BitLocker, and eSIM profile status
"""

import json
import logging
import sys
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple
import requests
from azure.identity import DefaultAzureCredential
from azure.monitor.ingestion import LogsIngestionClient
from msgraph import GraphServiceClient

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('device-compliance.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class DeviceComplianceChecker:
    """Device compliance validation for eSIM Myanmar infrastructure"""
    
    def __init__(self, tenant_id: str, client_id: str, log_analytics_endpoint: str):
        self.tenant_id = tenant_id
        self.client_id = client_id
        self.log_analytics_endpoint = log_analytics_endpoint
        self.credential = DefaultAzureCredential()
        self.graph_client = GraphServiceClient(credentials=self.credential)
        self.logs_client = LogsIngestionClient(endpoint=log_analytics_endpoint, credential=self.credential)
        
    def check_device_os_compliance(self, device_id: str) -> Dict:
        """Check device OS version compliance"""
        try:
            device = self.graph_client.devices.by_device_id(device_id).get()
            
            compliance_status = {
                'device_id': device_id,
                'os_version': device.operating_system_version,
                'os_type': device.operating_system,
                'compliant': False,
                'issues': []
            }
            
            # Define minimum OS versions
            min_versions = {
                'iOS': '15.0',
                'Android': '10.0',
                'Windows': '10.0.19041'
            }
            
            os_type = device.operating_system
            if os_type in min_versions:
                current_version = device.operating_system_version
                min_version = min_versions[os_type]
                
                if self._compare_versions(current_version, min_version) >= 0:
                    compliance_status['compliant'] = True
                else:
                    compliance_status['issues'].append(f"OS version {current_version} below minimum {min_version}")
            else:
                compliance_status['issues'].append(f"Unsupported OS type: {os_type}")
                
            return compliance_status
            
        except Exception as e:
            logger.error(f"OS compliance check failed for device {device_id}: {str(e)}")
            return {'device_id': device_id, 'compliant': False, 'error': str(e)}
    
    def check_defender_status(self, device_id: str) -> Dict:
        """Check Microsoft Defender status on device"""
        try:
            # Query device compliance policies
            compliance_policies = self.graph_client.device_management.device_compliance_policies.get()
            
            defender_status = {
                'device_id': device_id,
                'defender_enabled': False,
                'real_time_protection': False,
                'definitions_updated': False,
                'compliant': False,
                'last_scan': None
            }
            
            # Get device compliance status
            device_compliance = self.graph_client.device_management.managed_devices.by_managed_device_id(device_id).device_compliance_policy_states.get()
            
            for policy_state in device_compliance.value:
                if 'defender' in policy_state.display_name.lower():
                    defender_status['defender_enabled'] = policy_state.state == 'compliant'
                    defender_status['compliant'] = policy_state.state == 'compliant'
                    
            return defender_status
            
        except Exception as e:
            logger.error(f"Defender status check failed for device {device_id}: {str(e)}")
            return {'device_id': device_id, 'compliant': False, 'error': str(e)}
    
    def check_bitlocker_status(self, device_id: str) -> Dict:
        """Check BitLocker encryption status"""
        try:
            # Get device encryption status
            device = self.graph_client.device_management.managed_devices.by_managed_device_id(device_id).get()
            
            bitlocker_status = {
                'device_id': device_id,
                'encryption_enabled': False,
                'encryption_method': None,
                'compliant': False,
                'recovery_key_backed_up': False
            }
            
            # Check encryption compliance
            if hasattr(device, 'is_encrypted') and device.is_encrypted:
                bitlocker_status['encryption_enabled'] = True
                bitlocker_status['compliant'] = True
                
            return bitlocker_status
            
        except Exception as e:
            logger.error(f"BitLocker status check failed for device {device_id}: {str(e)}")
            return {'device_id': device_id, 'compliant': False, 'error': str(e)}
    
    def check_esim_profile_status(self, device_id: str) -> Dict:
        """Check eSIM profile provisioning and status"""
        try:
            esim_status = {
                'device_id': device_id,
                'profiles_installed': 0,
                'active_profiles': 0,
                'gsma_compliant': False,
                'compliant': False,
                'profiles': []
            }
            
            # Query eSIM profiles from Dataverse (mock implementation)
            profiles = self._query_esim_profiles(device_id)
            
            esim_status['profiles_installed'] = len(profiles)
            esim_status['active_profiles'] = len([p for p in profiles if p.get('status') == 'active'])
            esim_status['gsma_compliant'] = all(p.get('gsma_compliant', False) for p in profiles)
            esim_status['compliant'] = esim_status['gsma_compliant'] and esim_status['active_profiles'] > 0
            esim_status['profiles'] = profiles
            
            return esim_status
            
        except Exception as e:
            logger.error(f"eSIM profile check failed for device {device_id}: {str(e)}")
            return {'device_id': device_id, 'compliant': False, 'error': str(e)}
    
    def run_comprehensive_compliance_check(self, device_ids: List[str]) -> Dict:
        """Run comprehensive compliance check for multiple devices"""
        logger.info(f"Starting compliance check for {len(device_ids)} devices")
        
        results = {
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'total_devices': len(device_ids),
            'compliant_devices': 0,
            'non_compliant_devices': 0,
            'devices': []
        }
        
        for device_id in device_ids:
            logger.info(f"Checking compliance for device: {device_id}")
            
            device_result = {
                'device_id': device_id,
                'overall_compliant': True,
                'checks': {}
            }
            
            # Run all compliance checks
            checks = [
                ('os_compliance', self.check_device_os_compliance),
                ('defender_status', self.check_defender_status),
                ('bitlocker_status', self.check_bitlocker_status),
                ('esim_profile_status', self.check_esim_profile_status)
            ]
            
            for check_name, check_function in checks:
                try:
                    check_result = check_function(device_id)
                    device_result['checks'][check_name] = check_result
                    
                    if not check_result.get('compliant', False):
                        device_result['overall_compliant'] = False
                        
                except Exception as e:
                    logger.error(f"Check {check_name} failed for device {device_id}: {str(e)}")
                    device_result['checks'][check_name] = {'compliant': False, 'error': str(e)}
                    device_result['overall_compliant'] = False
            
            # Update counters
            if device_result['overall_compliant']:
                results['compliant_devices'] += 1
            else:
                results['non_compliant_devices'] += 1
                
            results['devices'].append(device_result)
        
        # Write audit log
        self._write_audit_log(results)
        
        logger.info(f"Compliance check completed. Compliant: {results['compliant_devices']}, Non-compliant: {results['non_compliant_devices']}")
        return results
    
    def _compare_versions(self, version1: str, version2: str) -> int:
        """Compare two version strings"""
        def normalize(v):
            return [int(x) for x in v.split('.')]
        
        v1_parts = normalize(version1)
        v2_parts = normalize(version2)
        
        # Pad shorter version with zeros
        max_len = max(len(v1_parts), len(v2_parts))
        v1_parts.extend([0] * (max_len - len(v1_parts)))
        v2_parts.extend([0] * (max_len - len(v2_parts)))
        
        for i in range(max_len):
            if v1_parts[i] < v2_parts[i]:
                return -1
            elif v1_parts[i] > v2_parts[i]:
                return 1
        return 0
    
    def _query_esim_profiles(self, device_id: str) -> List[Dict]:
        """Query eSIM profiles from Dataverse (mock implementation)"""
        # This would integrate with actual Dataverse API
        mock_profiles = [
            {
                'profile_id': f'profile_{device_id}_1',
                'iccid': '8944501234567890123',
                'status': 'active',
                'gsma_compliant': True,
                'carrier': 'ATOM Myanmar',
                'provisioned_date': '2025-01-15T10:30:00Z'
            }
        ]
        return mock_profiles
    
    def _write_audit_log(self, compliance_results: Dict) -> None:
        """Write compliance results to immutable audit log"""
        try:
            audit_entry = {
                'timestamp': compliance_results['timestamp'],
                'log_type': 'DeviceCompliance',
                'total_devices': compliance_results['total_devices'],
                'compliant_devices': compliance_results['compliant_devices'],
                'non_compliant_devices': compliance_results['non_compliant_devices'],
                'compliance_rate': compliance_results['compliant_devices'] / compliance_results['total_devices'] * 100,
                'details': compliance_results['devices']
            }
            
            # Write to Log Analytics
            self.logs_client.upload(
                rule_id="DeviceCompliance_CL",
                stream_name="Custom-DeviceCompliance_CL",
                logs=[audit_entry]
            )
            
            logger.info("Audit log written to Log Analytics")
            
        except Exception as e:
            logger.error(f"Failed to write audit log: {str(e)}")

def main():
    """Main execution function"""
    import os
    
    # Configuration from environment variables
    tenant_id = os.getenv('MICROSOFT_TENANT_ID')
    client_id = os.getenv('MICROSOFT_CLIENT_ID')
    log_analytics_endpoint = os.getenv('LOG_ANALYTICS_ENDPOINT', 'https://esim-myanmar-logs.ods.opinsights.azure.com')
    
    if not all([tenant_id, client_id]):
        logger.error("Missing required environment variables")
        sys.exit(1)
    
    # Sample device IDs (would come from actual device inventory)
    device_ids = [
        'device-001',
        'device-002',
        'device-003'
    ]
    
    # Initialize compliance checker
    checker = DeviceComplianceChecker(tenant_id, client_id, log_analytics_endpoint)
    
    # Run compliance check
    results = checker.run_comprehensive_compliance_check(device_ids)
    
    # Output results
    print(json.dumps(results, indent=2))
    
    # Exit with appropriate code
    if results['non_compliant_devices'] > 0:
        logger.warning(f"{results['non_compliant_devices']} devices are non-compliant")
        sys.exit(1)
    else:
        logger.info("All devices are compliant")
        sys.exit(0)

if __name__ == '__main__':
    main()