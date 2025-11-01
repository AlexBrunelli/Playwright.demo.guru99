import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('BASE_URL:', process.env.BASE_URL);

test('Is lading page test', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await expect(page).toHaveTitle(/Guru99 Bank/);

});

