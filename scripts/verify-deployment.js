#!/usr/bin/env node

/**
 * Deployment Verification Script for eSIM Myanmar
 * Verifies all security measures and functionality are working
 */

const fs = require('fs');
const path = require('path');

class DeploymentVerifier {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.verificationResults = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? 'ERROR' : type === 'success' ? 'SUCCESS' : 'INFO';
    console.log(`[${prefix}] ${timestamp} - ${message}`);
  }

  async runVerification() {
    this.log('Starting deployment verification...', 'info');

    // Verify security implementation
    this.verifySecurityFiles();
    
    // Verify configuration files
    this.verifyConfiguration();
    
    // Verify component structure
    this.verifyComponents();
    
    // Verify documentation
    this.verifyDocumentation();

    // Generate report
    this.generateReport();
  }

  verifySecurityFiles() {
    this.log('Verifying security implementation...', 'info');

    const securityFiles = [
      'src/lib/security.ts',
      'src/lib/config/security.ts',
      'src/middleware.ts',
      'src/components/SecurityProvider.tsx'
    ];

    securityFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for key security features
        const securityFeatures = [
          'disableRightClick',
          'disableTextSelection',
          'disableKeyboardShortcuts',
          'disableDevTools',
          'detectBots',
          'preventImageSaving'
        ];

        const missingFeatures = securityFeatures.filter(feature => 
          !content.includes(feature)
        );

        if (missingFeatures.length === 0) {
          this.verificationResults.push({
            test: `Security Features in ${file}`,
            status: 'PASS',
            message: 'All security features implemented'
          });
        } else {
          this.verificationResults.push({
            test: `Security Features in ${file}`,
            status: 'FAIL',
            message: `Missing features: ${missingFeatures.join(', ')}`
          });
        }
      } else {
        this.verificationResults.push({
          test: `Security File ${file}`,
          status: 'FAIL',
          message: 'File not found'
        });
      }
    });
  }

  verifyConfiguration() {
    this.log('Verifying configuration files...', 'info');

    // Check next.config.mjs
    const configPath = path.join(this.projectRoot, 'next.config.mjs');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      const requiredHeaders = [
        'Content-Security-Policy',
        'Strict-Transport-Security',
        'X-Frame-Options',
        'X-Content-Type-Options'
      ];

      const missingHeaders = requiredHeaders.filter(header => 
        !configContent.includes(header)
      );

      if (missingHeaders.length === 0) {
        this.verificationResults.push({
          test: 'Security Headers Configuration',
          status: 'PASS',
          message: 'All required security headers configured'
        });
      } else {
        this.verificationResults.push({
          test: 'Security Headers Configuration',
          status: 'FAIL',
          message: `Missing headers: ${missingHeaders.join(', ')}`
        });
      }
    }

    // Check package.json
    const packagePath = path.join(this.projectRoot, 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      const requiredScripts = ['build', 'deploy:secure', 'security:check'];
      const missingScripts = requiredScripts.filter(script => 
        !packageContent.scripts || !packageContent.scripts[script]
      );

      if (missingScripts.length === 0) {
        this.verificationResults.push({
          test: 'Package Scripts',
          status: 'PASS',
          message: 'All required scripts present'
        });
      } else {
        this.verificationResults.push({
          test: 'Package Scripts',
          status: 'FAIL',
          message: `Missing scripts: ${missingScripts.join(', ')}`
        });
      }
    }
  }

  verifyComponents() {
    this.log('Verifying component structure...', 'info');

    const componentFiles = [
      'src/app/layout.tsx',
      'src/app/[locale]/layout.tsx',
      'src/app/[locale]/page.tsx',
      'src/components/SecurityProvider.tsx'
    ];

    componentFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for security integration
        if (content.includes('SecurityProvider') || content.includes('initSecurity')) {
          this.verificationResults.push({
            test: `Security Integration in ${file}`,
            status: 'PASS',
            message: 'Security provider integrated'
          });
        } else if (file.includes('SecurityProvider')) {
          // SecurityProvider file itself
          this.verificationResults.push({
            test: `Security Integration in ${file}`,
            status: 'PASS',
            message: 'Security provider component'
          });
        } else {
          this.verificationResults.push({
            test: `Security Integration in ${file}`,
            status: 'WARN',
            message: 'No security integration found'
          });
        }
      } else {
        this.verificationResults.push({
          test: `Component File ${file}`,
          status: 'FAIL',
          message: 'File not found'
        });
      }
    });
  }

  verifyDocumentation() {
    this.log('Verifying documentation...', 'info');

    const docFiles = [
      'README.md',
      'SECURITY_AUDIT_REPORT.md',
      'DEPLOYMENT_VERIFICATION.md',
      'FINAL_AUDIT_SUMMARY.md'
    ];

    docFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for emoji policy compliance
        const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
        const hasEmojis = emojiRegex.test(content);
        
        if (!hasEmojis) {
          this.verificationResults.push({
            test: `Emoji Policy Compliance - ${file}`,
            status: 'PASS',
            message: 'No emojis found'
          });
        } else {
          this.verificationResults.push({
            test: `Emoji Policy Compliance - ${file}`,
            status: 'FAIL',
            message: 'Emojis detected in documentation'
          });
        }
      } else {
        this.verificationResults.push({
          test: `Documentation File ${file}`,
          status: 'FAIL',
          message: 'File not found'
        });
      }
    });
  }

  generateReport() {
    this.log('Generating verification report...', 'info');

    const passedTests = this.verificationResults.filter(r => r.status === 'PASS').length;
    const failedTests = this.verificationResults.filter(r => r.status === 'FAIL').length;
    const warningTests = this.verificationResults.filter(r => r.status === 'WARN').length;
    const totalTests = this.verificationResults.length;

    console.log('\n' + '='.repeat(60));
    console.log('DEPLOYMENT VERIFICATION REPORT');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Warnings: ${warningTests}`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));

    this.verificationResults.forEach(result => {
      const status = result.status === 'PASS' ? '✓' : 
                   result.status === 'FAIL' ? '✗' : '⚠';
      console.log(`${status} ${result.test}: ${result.message}`);
    });

    console.log('='.repeat(60));

    if (failedTests === 0) {
      this.log('All critical tests passed! Deployment ready.', 'success');
      return true;
    } else {
      this.log(`${failedTests} critical tests failed. Review required.`, 'error');
      return false;
    }
  }

  async run() {
    try {
      const success = await this.runVerification();
      process.exit(success ? 0 : 1);
    } catch (error) {
      this.log(`Verification failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run verification if called directly
if (require.main === module) {
  const verifier = new DeploymentVerifier();
  verifier.run();
}

module.exports = DeploymentVerifier;