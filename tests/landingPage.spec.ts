import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
test('Is landing page test', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.navigateTo('/');
  await expect(page).toHaveTitle(/Guru99 Bank/);
});