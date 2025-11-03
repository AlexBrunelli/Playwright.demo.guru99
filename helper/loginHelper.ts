import { test, expect, Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';

dotenv.config();

export async function login(page:Page):Promise<void> {
    
    const loginPage = new LoginPage(page);
    //Login to the application
    await loginPage.navigateTo('');

    await loginPage.fillLoginEnv();
    await loginPage.fillPasswordEnv();

    // verifies that the inputs have value
    expect(await loginPage.getInputUserText()).toBe(process.env.USER);
    expect(await loginPage.getInputPassText()).toBe(process.env.PASSWORD);
    await loginPage.clickOnbtnLogin();
    await page.waitForURL('**/manager/Managerhomepage.php');
}