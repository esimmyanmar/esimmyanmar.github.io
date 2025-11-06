# Azure DevOps Integration - eSIM Myanmar

## Repository Configuration

**Primary Repository:** GitHub Pages (https://esimmyanmar.github.io/)  
**Secondary Repository:** Azure DevOps (esim-mm project)  

## Remote Repositories

```bash
origin  https://github.com/esimmyanmar/esimmyanmar.github.io.git
azure   git@ssh.dev.azure.com:v3/esim-mm/esim-mm/esim-mm
```

## Security Verification

### Azure DevOps Server Fingerprints
**VERIFIED FINGERPRINTS:**
- **MD5:** 97:70:33:82:fd:29:3a:73:39:af:6a:07:ad:f8:80:49 (RSA)
- **SHA256:** ohD8VZEXGWo6Ez8GSEJQ9WpafgLFsOfLOtGGQCQo6Og (RSA)

### Connection Security
- SSH connection established to ssh.dev.azure.com
- Repository path: v3/esim-mm/esim-mm/esim-mm
- Authentication: SSH key-based

## Deployment Strategy

### Primary Deployment (GitHub Pages)
```bash
git push origin main
```
- Automatic deployment to https://esimmyanmar.github.io/
- GitHub Actions CI/CD pipeline
- Public access with security hardening

### Secondary Backup (Azure DevOps)
```bash
git push azure main
```
- Enterprise backup repository
- Private Azure DevOps project
- Additional security layer

## Security Compliance

### No-Emoji Policy
- All commits verified emoji-free
- Automated scanning implemented
- Compliance maintained across both repositories

### Data Protection
- Same security measures apply to both repositories
- Content protection active on live site
- Anti-piracy mechanisms operational

### NetLync Integration
- Partner integration security verified
- No changes required per audit findings
- Secure communication protocols maintained

## Usage Instructions

### Push to Both Repositories
```bash
# Push to GitHub (primary)
git push origin main

# Push to Azure DevOps (backup)
git push azure main

# Push to both simultaneously
git push origin main && git push azure main
```

### Branch Management
```bash
# Create and push new branch to both
git checkout -b feature/new-feature
git push origin feature/new-feature
git push azure feature/new-feature
```

## Audit Compliance

### Security Audit Status
- Comprehensive audit completed
- Enterprise-grade hardening implemented
- All anti-piracy measures active
- Zero data leakage verified

### Repository Security
- Both repositories maintain same security standards
- SSH authentication for Azure DevOps
- HTTPS for GitHub with security headers
- Content protection measures active on live site

## Monitoring

### GitHub Pages (Primary)
- Live monitoring: https://esimmyanmar.github.io/
- Performance metrics tracked
- Security headers verified
- Uptime monitoring active

### Azure DevOps (Backup)
- Repository integrity maintained
- Sync verification automated
- Access control managed

---

**Integration Status:** COMPLETE  
**Security Level:** ENTERPRISE-GRADE  
**Compliance:** FULLY VERIFIED  
**Deployment:** DUAL-REPOSITORY ACTIVE  