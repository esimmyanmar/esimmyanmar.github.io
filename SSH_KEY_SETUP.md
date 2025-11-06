# SSH Key Setup for Azure DevOps - eSIM Myanmar

## SSH Key Generated

**Key Type:** RSA 4096-bit  
**Email:** esim-myanmar@azure-devops  
**Fingerprint:** SHA256:PX7F+NUi1HSU8n55+4JctjZFPKlh0QPqkOsTMT4ArlY  

## Public Key for Azure DevOps

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDTuW8ztLZhEr+LxQstZs/w/Grw8qdahP80WAfGi0D5DuN0wG3sSsqNRlVqUBpwLPLtDBNgUgjhWHjmV2SGHBf5DYt2AtuwZ+lpGLE5c8UVUvny5K/7sYkD+c8sAUvk+8n+ZoZrla14e0SQC/lzEtsXf3UuVmlKiv6jIgRo/XqaYAG4J1lCAHUmEHWhjeBsN0GBynQx3KFSCoAqkV/6sL/AgOZ3MyBuzzuGjCnQa/UTtJHG7MKljVpmS1Sr0UNzonwMRDi7a/wILJNK0TXM9++Ne5fqkrPy9rD/4mjrJu5ltZgUOeu1GsW1fTsY4IR6laAvQdNbH/IpUie6dN2EMUk38mqUNO+61fKDLaXUwB6mhZ+rbQbLOBdZsc0NSnZBs0NHbO6ravrDWZl7f+GeM/lLtpct388DxrJ9tJyIbG51ExOpsAu0NdsKmsa3qsugSbu0PVL23dsp8IeE8F/eFRjJ/4XUqkUykfuKUT0C1IKvRQThzC948JiPaKmHWiuzXzZJRI30go3tvyyZMjdz4JbUEYRWW4Hv/3KhL2YWvgmR129nqoguzGhJK8Ju+ovEugsrLM5LuoMSM2i8PR5Jv/VXCnDjkn6qPX08kzGV/6FtjpV2Z3dq+gSzSaXcQaeOrur6ebcfFc72U99Hjr1kzkSBeq/55y1ek6Jkn7RgYN4QyQ== esim-myanmar@azure-devops
```

## Setup Instructions

### 1. Add SSH Key to Azure DevOps
1. Copy the public key above
2. Go to Azure DevOps: https://dev.azure.com/esim-mm
3. Navigate to User Settings > SSH public keys
4. Click "New Key"
5. Paste the public key
6. Name: "eSIM Myanmar Development Key"

### 2. Configure SSH Client
```bash
# Add to SSH config
Host ssh.dev.azure.com
  HostName ssh.dev.azure.com
  User git
  IdentityFile C:\Users\igsim\.ssh\esim_azure_rsa
  IdentitiesOnly yes
```

### 3. Test Connection
```bash
ssh -T git@ssh.dev.azure.com
```

### 4. Push to Azure DevOps
```bash
git push azure main
```

## Security Notes

- Private key stored securely at: C:\Users\igsim\.ssh\esim_azure_rsa
- Public key configured for Azure DevOps access only
- Key generated with 4096-bit RSA encryption
- No passphrase for automated deployment

## Repository Configuration

**Azure DevOps Remote:**
```bash
git remote add azure git@ssh.dev.azure.com:v3/esim-mm/esim-mm/esim-mm
```

**Verification Commands:**
```bash
git remote -v
ssh -T git@ssh.dev.azure.com
```

---

**SSH Key Status:** GENERATED AND READY  
**Next Step:** Add public key to Azure DevOps SSH settings  
**Security Level:** 4096-bit RSA encryption  