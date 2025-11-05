import {test,expect}  from '@playwright/test';
import * as dotenv from 'dotenv';
import {LoginPage} from '../pages/LoginPage';

dotenv.config();

test('Reset button test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('');
    
    const user = 'usuario';
    const pass = 'password'

    //fill the fields  user and password
    await loginPage.fillLogin(user);
    await loginPage.fillPassword(pass);
   
    //Verify that the inputs have the expected value
    expect(await loginPage.getInputUserText()).toBe(user);
    expect(await loginPage.getInputPassText()).toBe(pass);

    //verify reset button
    await loginPage.clickOnbtnReset();
    // Verify that the fields are empty
    expect(await loginPage.getInputUserText()).toBe('');
    expect(await loginPage.getInputPassText()).toBe('');
});


test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('');

  await loginPage.fillLoginEnv();
  await loginPage.fillPasswordEnv();

  // verifies that the inputs have value
  expect(await loginPage.getInputUserText()).toBe(process.env.USER);
  expect(await loginPage.getInputPassText()).toBe(process.env.PASSWORD);
  await loginPage.clickOnbtnLogin();

  await page.waitForURL('**/manager/Managerhomepage.php');
 
});