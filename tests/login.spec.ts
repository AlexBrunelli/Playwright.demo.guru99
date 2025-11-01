import {test,expect}  from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('Reset button test', async ({ page }) => {
    await page.goto('');
    
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
    // Verify that the fields are empty
    await expect(inputUser).toHaveValue('');
    await expect(inputPass).toHaveValue('');

    
});


test('Login test', async ({ page }) => {
  await page.goto('');

  const inputUser = page.locator('input[name="uid"]');
  const inputPass = page.locator('input[name="password"]');
  const btnLogin = page.locator('input[name="btnLogin"]');

  const user = process.env.USER || "";
  const pass = process.env.PASSWORD || "";

  if (!user || !pass) {
    throw new Error("Las variables de entorno USER o PASSWORD no están definidas");
  }

  await inputUser.fill(user);
  await inputPass.fill(pass);

  // verifies that the inputs have value
  await expect(inputUser).toHaveValue(user);
  await expect(inputPass).toHaveValue(pass);
  await btnLogin.click();

  await page.waitForURL('**/manager/Managerhomepage.php');
 
});