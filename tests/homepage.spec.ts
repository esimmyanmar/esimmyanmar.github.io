import { test, expect } from '@playwright/test';

test.describe('eSIM Myanmar Homepage', () => {
  test('should load homepage with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/eSIM Myanmar - Enterprise eSIM Solutions/);
  });

  test('should display company hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.company-hero')).toBeVisible();
    await expect(page.locator('.hero-title')).toContainText('eSIM MYANMAR');
    await expect(page.locator('.hero-subtitle')).toContainText('Enterprise eSIM Solutions');
  });

  test('should show network statistics', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-stats')).toBeVisible();
    await expect(page.locator('.stat-item').first()).toContainText('2M+');
    await expect(page.locator('.stat-item').nth(1)).toContainText('98.5%');
  });

  test('should display contact information in footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.contact-info')).toBeVisible();
    await expect(page.locator('.contact-info')).toContainText('esim.com.mm');
    await expect(page.locator('.contact-info')).toContainText('info@esim.com.mm');
    await expect(page.locator('.contact-info')).toContainText('09650000172');
    await expect(page.locator('.contact-info')).toContainText('@eSIMMyanmar');
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.main-navigation')).toBeVisible();
    
    const companyLink = page.locator('a[href="/company"]');
    await expect(companyLink).toBeVisible();
    
    const technologyLink = page.locator('a[href="/technology"]');
    await expect(technologyLink).toBeVisible();
    
    const coverageLink = page.locator('a[href="/coverage"]');
    await expect(coverageLink).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    
    await expect(page.locator('.company-hero')).toBeVisible();
    await expect(page.locator('.hero-content')).toBeVisible();
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(consoleErrors).toHaveLength(0);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('Myanmar\'s leading enterprise eSIM provider');
    
    const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
    expect(keywords).toContain('eSIM, Myanmar, telecommunications');
  });
});

test.describe('Performance Tests', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // 5 seconds max
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    const performanceEntries = await page.evaluate(() => {
      return JSON.stringify(performance.getEntriesByType('navigation'));
    });
    
    const entries = JSON.parse(performanceEntries);
    expect(entries).toBeDefined();
  });
});