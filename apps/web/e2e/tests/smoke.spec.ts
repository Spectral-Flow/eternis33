import { test, expect } from '@playwright/test';

test('homepage renders', async ({ page }) => {
  const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
  await page.goto(base);
  // Basic sanity: title and body exist
  await expect(page.locator('body')).toBeVisible();
  const title = await page.title();
  expect(title).toBeTruthy();
});
