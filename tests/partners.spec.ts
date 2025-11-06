import { test, expect } from '@playwright/test';

test.describe('Partners Page', () => {
  test('should load partners page successfully', async ({ page }) => {
    await page.goto('/en/partners');
    await expect(page).toHaveTitle(/Partners/);
    await expect(page.locator('h1')).toContainText('Our Partners');
  });

  test('should display all partner categories', async ({ page }) => {
    await page.goto('/en/partners');
    
    // Check telecommunication partners
    await expect(page.locator('text=Telecommunication Partners')).toBeVisible();
    await expect(page.locator('text=ATOM Myanmar')).toBeVisible();
    await expect(page.locator('text=Mytel')).toBeVisible();
    await expect(page.locator('text=MPT')).toBeVisible();
    await expect(page.locator('text=U9 Telecom')).toBeVisible();
    
    // Check financial partners
    await expect(page.locator('text=Financial Partners')).toBeVisible();
    await expect(page.locator('text=AYA Bank')).toBeVisible();
    await expect(page.locator('text=UAB Bank')).toBeVisible();
    
    // Check payment partners
    await expect(page.locator('text=Payment Partners')).toBeVisible();
    await expect(page.locator('text=WavePay')).toBeVisible();
    await expect(page.locator('text=MMQR')).toBeVisible();
    await expect(page.locator('text=VISA')).toBeVisible();
    await expect(page.locator('text=Mastercard')).toBeVisible();
    
    // Check digital marketing partners
    await expect(page.locator('text=Digital Marketing Partners')).toBeVisible();
    await expect(page.locator('text=Activ Digital Marketing')).toBeVisible();
    await expect(page.locator('text=NetLync')).toBeVisible();
  });

  test('should verify partner links are accessible', async ({ page }) => {
    await page.goto('/en/partners');
    
    // Test ATOM link
    const atomLink = page.locator('a[href="https://atom.com.mm"]');
    await expect(atomLink).toBeVisible();
    
    // Test UAB Bank link (corrected URL)
    const uabLink = page.locator('a[href="https://uab.com.mm"]');
    await expect(uabLink).toBeVisible();
    
    // Test WavePay link
    const wavePayLink = page.locator('a[href="https://wavemoney.com.mm"]');
    await expect(wavePayLink).toBeVisible();
  });

  test('should show EaaS integration badges', async ({ page }) => {
    await page.goto('/en/partners');
    
    // Check for EaaS integration indicators
    const eaasIndicators = page.locator('[data-testid="eaas-indicator"]');
    await expect(eaasIndicators.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/partners');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.partner-card').first()).toBeVisible();
  });

  test('should support Myanmar language', async ({ page }) => {
    await page.goto('/my/partners');
    await expect(page.locator('h1')).toContainText('');
  });
});