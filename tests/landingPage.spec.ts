import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('BASE_URL:', process.env.BASE_URL);

test('Is lading page test', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await expect(page).toHaveTitle(/Guru99 Bank/);
});


test('Reset button test', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);

    const inputUser = page.locator('input[name="uid"]');
    const inputPass = page.locator('input[name="password"]');
    const btnReset = page.locator('input[name="btnReset"]');

    //fill the fields  user and password
    await inputUser.fill(process.env.USER!);
    await inputPass.fill(process.env.PASSWORD!);

    //Verify that the inputs have value
    await expect(inputUser).toHaveValue(process.env.USER!);
    await expect(inputPass).toHaveValue(process.env.PASSWORD!);

    //verify reset button
    await btnReset.click();
    await expect(inputUser).toHaveValue('');
    await expect(inputPass).toHaveValue('');

    // Verify that the fields are empty
    await expect(inputUser).toHaveValue('');
    await expect(inputPass).toHaveValue('');
});