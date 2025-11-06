#!/usr/bin/env node

/**
 * Secure Deployment Script for eSIM Myanmar
 * Performs security checks and deploys to GitHub Pages
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SecureDeployment {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.buildDir = path.join(this.projectRoot, 'out');
    this.securityChecks = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runSecurityChecks() {
    this.log('Running security checks...', 'info');

    // Check 1: Verify security headers in next.config.mjs
    this.checkSecurityHeaders();

    // Check 2: Verify no hardcoded secrets
    this.checkForSecrets();

    // Check 3: Verify security middleware exists
    this.checkSecurityMiddleware();

    // Check 4: Verify content protection is enabled
    this.checkContentProtection();

    // Check 5: Verify CSP configuration
    this.checkCSPConfiguration();

    const failedChecks = this.securityChecks.filter(check => !check.passed);
    
    if (failedChecks.length > 0) {
      this.log(`Security checks failed: ${failedChecks.length}`, 'error');
      failedChecks.forEach(check => {
        this.log(`- ${check.name}: ${check.error}`, 'error');
      });
      process.exit(1);
    }

    this.log('All security checks passed!', 'success');
  }

  checkSecurityHeaders() {
    try {
      const configPath = path.join(this.projectRoot, 'next.config.mjs');
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

      if (missingHeaders.length > 0) {
        throw new Error(`Missing security headers: ${missingHeaders.join(', ')}`);
      }

      this.securityChecks.push({
        name: 'Security Headers',
        passed: true
      });
    } catch (error) {
      this.securityChecks.push({
        name: 'Security Headers',
        passed: false,
        error: error.message
      });
    }
  }

  checkForSecrets() {
    try {
      const secretPatterns = [
        /api[_-]?key[s]?\s*[:=]\s*['"]\w+['"]/i,
        /secret[_-]?key[s]?\s*[:=]\s*['"]\w+['"]/i,
        /password\s*[:=]\s*['"]\w+['"]/i,
        /token\s*[:=]\s*['"]\w+['"]/i,
        /sk_live_\w+/i,
        /pk_live_\w+/i
      ];

      const filesToCheck = [
        'src/app/layout.tsx',
        'src/lib/security.ts',
        'next.config.mjs'
      ];

      for (const file of filesToCheck) {
        const filePath = path.join(this.projectRoot, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          for (const pattern of secretPatterns) {
            if (pattern.test(content)) {
              throw new Error(`Potential secret found in ${file}`);
            }
          }
        }
      }

      this.securityChecks.push({
        name: 'Secret Detection',
        passed: true
      });
    } catch (error) {
      this.securityChecks.push({
        name: 'Secret Detection',
        passed: false,
        error: error.message
      });
    }
  }

  checkSecurityMiddleware() {
    try {
      const middlewarePath = path.join(this.projectRoot, 'src/middleware.ts');
      
      if (!fs.existsSync(middlewarePath)) {
        throw new Error('Security middleware not found');
      }

      const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
      
      if (!middlewareContent.includes('security')) {
        throw new Error('Middleware does not contain security logic');
      }

      this.securityChecks.push({
        name: 'Security Middleware',
        passed: true
      });
    } catch (error) {
      this.securityChecks.push({
        name: 'Security Middleware',
        passed: false,
        error: error.message
      });
    }
  }

  checkContentProtection() {
    try {
      const securityPath = path.join(this.projectRoot, 'src/lib/security.ts');
      
      if (!fs.existsSync(securityPath)) {
        throw new Error('Security library not found');
      }

      const securityContent = fs.readFileSync(securityPath, 'utf8');
      
      const requiredFeatures = [
        'disableRightClick',
        'disableTextSelection',
        'disableKeyboardShortcuts',
        'disableDevTools',
        'detectBots'
      ];

      const missingFeatures = requiredFeatures.filter(feature => 
        !securityContent.includes(feature)
      );

      if (missingFeatures.length > 0) {
        throw new Error(`Missing security features: ${missingFeatures.join(', ')}`);
      }

      this.securityChecks.push({
        name: 'Content Protection',
        passed: true
      });
    } catch (error) {
      this.securityChecks.push({
        name: 'Content Protection',
        passed: false,
        error: error.message
      });
    }
  }

  checkCSPConfiguration() {
    try {
      const configPath = path.join(this.projectRoot, 'next.config.mjs');
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      if (!configContent.includes("default-src 'self'")) {
        throw new Error('CSP default-src not properly configured');
      }

      if (!configContent.includes("frame-ancestors 'none'")) {
        throw new Error('CSP frame-ancestors not configured');
      }

      this.securityChecks.push({
        name: 'CSP Configuration',
        passed: true
      });
    } catch (error) {
      this.securityChecks.push({
        name: 'CSP Configuration',
        passed: false,
        error: error.message
      });
    }
  }

  async buildProject() {
    this.log('Building project...', 'info');
    
    try {
      // Install dependencies
      execSync('npm ci', { 
        cwd: this.projectRoot, 
        stdio: 'inherit' 
      });

      // Run linting
      execSync('npm run lint', { 
        cwd: this.projectRoot, 
        stdio: 'inherit' 
      });

      // Build project
      execSync('npm run build', { 
        cwd: this.projectRoot, 
        stdio: 'inherit' 
      });

      this.log('Build completed successfully!', 'success');
    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  async verifyBuild() {
    this.log('Verifying build output...', 'info');

    // Check if build directory exists
    if (!fs.existsSync(this.buildDir)) {
      this.log('Build directory not found', 'error');
      process.exit(1);
    }

    // Check for essential files
    const essentialFiles = [
      'index.html',
      '_next/static'
    ];

    for (const file of essentialFiles) {
      const filePath = path.join(this.buildDir, file);
      if (!fs.existsSync(filePath)) {
        this.log(`Essential file missing: ${file}`, 'error');
        process.exit(1);
      }
    }

    // Verify security headers in HTML
    const indexPath = path.join(this.buildDir, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    if (!indexContent.includes('protected-content')) {
      this.log('Security classes not found in HTML', 'error');
      process.exit(1);
    }

    this.log('Build verification completed!', 'success');
  }

  async deploy() {
    this.log('Starting deployment process...', 'info');

    try {
      // Add CNAME file for custom domain
      const cnameContent = 'esimmyanmar.github.io';
      fs.writeFileSync(path.join(this.buildDir, 'CNAME'), cnameContent);

      // Add .nojekyll file
      fs.writeFileSync(path.join(this.buildDir, '.nojekyll'), '');

      // Add security.txt
      const securityTxt = `Contact: info@esim.com.mm
Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}
Encryption: https://esimmyanmar.github.io/pgp-key.txt
Preferred-Languages: en, my
Canonical: https://esimmyanmar.github.io/.well-known/security.txt`;

      const wellKnownDir = path.join(this.buildDir, '.well-known');
      if (!fs.existsSync(wellKnownDir)) {
        fs.mkdirSync(wellKnownDir, { recursive: true });
      }
      fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), securityTxt);

      this.log('Deployment files prepared!', 'success');
      this.log('Manual deployment to GitHub Pages required', 'info');
      this.log('Upload the contents of the "out" directory to your repository', 'info');
      
    } catch (error) {
      this.log(`Deployment preparation failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  async run() {
    try {
      await this.runSecurityChecks();
      await this.buildProject();
      await this.verifyBuild();
      await this.deploy();
      
      this.log('Secure deployment completed successfully!', 'success');
    } catch (error) {
      this.log(`Deployment failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployment = new SecureDeployment();
  deployment.run().catch(error => {
    console.error('Deployment error:', error);
    process.exit(1);
  });
}

module.exports = SecureDeployment;