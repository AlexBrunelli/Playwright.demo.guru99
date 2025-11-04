import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
const { chromium, expect } = require("@playwright/test");
const { Page } = require("playwright");
import { LoginPage } from "../../../pages/LoginPage";
setDefaultTimeout(60 * 1000);

let page, browser;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given("The user is on the landing page", async function () {
    const loginPage = new LoginPage(global.page);
    await loginPage.navigateTo('');
});


When("the user enters their valid credentials", async function () {
    const loginPage = new LoginPage(global.page);
    await global.page.fill('#username', 'usuario_demo');
    await global.page.fill('#password', 'contraseña123');
    await global.page.click('button[type="submit"]');
    // verifies that the inputs have value
    expect(await loginPage.getInputUserText()).toBe(process.env.USER);
    expect(await loginPage.getInputPassText()).toBe(process.env.PASSWORD);
    await loginPage.clickOnbtnLogin();
});

Then("the user has successfully logged in", async function () {
    await global.page.waitForURL('**/manager/Managerhomepage.php');
});

After(async function () {
    await browser.close();
})