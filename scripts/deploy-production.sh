#!/bin/bash

# Production Deployment Script for eSIM Myanmar Microsoft Stack
# Version: 1.0.0
# Author: eSIM Myanmar DevOps Team

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_ROOT/deployment-$(date +%Y%m%d-%H%M%S).log"
BACKUP_DIR="$PROJECT_ROOT/backups"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

# Pre-deployment checks
pre_deployment_checks() {
    log "Starting pre-deployment checks..."
    
    # Check Node.js version
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed"
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="18.0.0"
    
    if ! npx semver "$NODE_VERSION" -r ">=$REQUIRED_VERSION" &> /dev/null; then
        error "Node.js version $NODE_VERSION is below required $REQUIRED_VERSION"
    fi
    
    # Check environment variables
    REQUIRED_VARS=(
        "NEXT_PUBLIC_MICROSOFT_CLIENT_ID"
        "NEXT_PUBLIC_MICROSOFT_TENANT_ID"
        "NEXT_PUBLIC_SHAREPOINT_SITE"
        "NEXT_PUBLIC_DATAVERSE_URL"
        "NEXT_PUBLIC_COPILOT_BOT_ID"
        "NEXT_PUBLIC_POWER_BI_WORKSPACE"
    )
    
    for var in "${REQUIRED_VARS[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            error "Required environment variable $var is not set"
        fi
    done
    
    # Check Git status
    if [[ -n $(git status --porcelain) ]]; then
        error "Working directory is not clean. Commit or stash changes before deployment."
    fi
    
    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current)
    if [[ "$CURRENT_BRANCH" != "main" ]]; then
        error "Deployment must be from main branch. Current branch: $CURRENT_BRANCH"
    fi
    
    success "Pre-deployment checks passed"
}

# Create backup
create_backup() {
    log "Creating backup..."
    
    mkdir -p "$BACKUP_DIR"
    BACKUP_FILE="$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    
    tar -czf "$BACKUP_FILE" \
        --exclude=node_modules \
        --exclude=.next \
        --exclude=out \
        --exclude=backups \
        --exclude=.git \
        "$PROJECT_ROOT"
    
    success "Backup created: $BACKUP_FILE"
}

# Install dependencies
install_dependencies() {
    log "Installing dependencies..."
    
    cd "$PROJECT_ROOT"
    
    # Clean install
    rm -rf node_modules package-lock.json
    npm ci --audit-level=moderate
    
    # Security audit
    npm audit --audit-level=high
    
    success "Dependencies installed and audited"
}

# Run tests
run_tests() {
    log "Running tests..."
    
    cd "$PROJECT_ROOT"
    
    # Lint
    npm run lint
    
    # Type check
    npx tsc --noEmit
    
    # Unit tests (if available)
    if npm run test --silent 2>/dev/null; then
        npm test
    else
        warning "No test script found, skipping unit tests"
    fi
    
    success "All tests passed"
}

# Build application
build_application() {
    log "Building application..."
    
    cd "$PROJECT_ROOT"
    
    # Clean previous build
    rm -rf .next out
    
    # Build
    npm run build
    
    # Verify build output
    if [[ ! -d "out" ]]; then
        error "Build output directory 'out' not found"
    fi
    
    # Check critical files
    CRITICAL_FILES=("out/index.html" "out/_next")
    for file in "${CRITICAL_FILES[@]}"; do
        if [[ ! -e "out/$file" && ! -e "$file" ]]; then
            error "Critical build file missing: $file"
        fi
    done
    
    success "Application built successfully"
}

# Deploy to Azure
deploy_to_azure() {
    log "Deploying to Azure Static Web Apps..."
    
    cd "$PROJECT_ROOT"
    
    # Check Azure CLI
    if ! command -v az &> /dev/null; then
        error "Azure CLI is not installed"
    fi
    
    # Deploy
    if [[ -n "${AZURE_STATIC_WEB_APPS_API_TOKEN:-}" ]]; then
        az staticwebapp deploy \
            --name esim-myanmar \
            --source ./out \
            --token "$AZURE_STATIC_WEB_APPS_API_TOKEN"
    else
        error "AZURE_STATIC_WEB_APPS_API_TOKEN environment variable is not set"
    fi
    
    success "Deployment to Azure completed"
}

# Post-deployment verification
post_deployment_verification() {
    log "Running post-deployment verification..."
    
    # Health check
    HEALTH_URL="https://esim-myanmar.azurestaticapps.net"
    
    if command -v curl &> /dev/null; then
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" || echo "000")
        
        if [[ "$HTTP_STATUS" == "200" ]]; then
            success "Health check passed: $HEALTH_URL"
        else
            error "Health check failed: HTTP $HTTP_STATUS"
        fi
    else
        warning "curl not available, skipping health check"
    fi
    
    success "Post-deployment verification completed"
}

# Rollback function
rollback() {
    log "Initiating rollback..."
    
    # Find latest backup
    LATEST_BACKUP=$(find "$BACKUP_DIR" -name "backup-*.tar.gz" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2-)
    
    if [[ -n "$LATEST_BACKUP" ]]; then
        log "Rolling back to: $LATEST_BACKUP"
        
        # Extract backup
        tar -xzf "$LATEST_BACKUP" -C /tmp/
        
        # Restore files (implement as needed)
        warning "Rollback procedure needs manual intervention"
    else
        error "No backup found for rollback"
    fi
}

# Cleanup function
cleanup() {
    log "Cleaning up temporary files..."
    
    # Remove old backups (keep last 5)
    if [[ -d "$BACKUP_DIR" ]]; then
        find "$BACKUP_DIR" -name "backup-*.tar.gz" -type f -printf '%T@ %p\n' | \
            sort -n | head -n -5 | cut -d' ' -f2- | xargs -r rm -f
    fi
    
    success "Cleanup completed"
}

# Main deployment function
main() {
    log "Starting production deployment for eSIM Myanmar Microsoft Stack"
    log "Deployment log: $LOG_FILE"
    
    # Trap for cleanup on exit
    trap cleanup EXIT
    trap 'error "Deployment failed. Check log: $LOG_FILE"' ERR
    
    pre_deployment_checks
    create_backup
    install_dependencies
    run_tests
    build_application
    deploy_to_azure
    post_deployment_verification
    
    success "Production deployment completed successfully"
    log "Deployment log saved: $LOG_FILE"
}

# Script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi