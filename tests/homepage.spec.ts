import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/eSIM Myanmar/);
    await expect(page.locator('h1')).toContainText('eSIM Myanmar');
  });

  test('should display NetLync EaaS tagline prominently', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('text=NetLync Entitlements-as-a-Service® – The First. The Fastest. The Only.')).toBeVisible();
  });

  test('should show hero statistics', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('text=250,000+ Activations')).toBeVisible();
    await expect(page.locator('text=4 Partner Carriers')).toBeVisible();
    await expect(page.locator('text=99.9% Uptime')).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/en');
    
    const checkEntitlementBtn = page.locator('a[href="/en/compatibility"]');
    await expect(checkEntitlementBtn).toBeVisible();
    await expect(checkEntitlementBtn).toContainText('Check Entitlement');
    
    const dashboardBtn = page.locator('a[href="/en/dashboard"]');
    await expect(dashboardBtn).toBeVisible();
  });

  test('should display GSMA compliance badge', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('text=GSMA SGP.22 v4.0 Compliant')).toBeVisible();
  });

  test('should have pearl glassmorphic effects', async ({ page }) => {
    await page.goto('/en');
    
    // Check for pearl glass CSS classes
    const pearlElements = page.locator('.pearl-glass');
    await expect(pearlElements.first()).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/en');
    
    // Check for proper heading hierarchy
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for alt text on images
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/en');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });
});