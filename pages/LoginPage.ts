import { promises } from 'dns';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';
import { Page } from '@playwright/test';

dotenv.config();

export class LoginPage extends BasePage {

    //Locators
    private inputUser = this.page.locator('input[name="uid"]');
    private inputPass = this.page.locator('input[name="password"]');
    private btnReset = this.page.locator('input[name="btnReset"]');
    private btnLogin = this.page.locator('input[name="btnLogin"]');

    constructor(page: Page) {
        super(page);
    }

    async fillLogin(username: string): Promise<void> {
        await this.inputUser.fill(username);
    }
    async fillPassword(password: string): Promise<void> {
        await this.inputPass.fill(password);
    }

    /**
     * Fills the login input with the value from the USER environment variable.
     * Throws an error if the USER variable is not defined.
     */
    async fillLoginEnv() {
        const user = process.env.USER || "";
        if (!user) {
            throw new Error(" USER is not defined in .env");
        }
        await this.inputUser.fill(user);
    }

    /**
     * Fills the password input with the value from the PASSWORD environment variable.
     * Throws an error if the PASSWORD variable is not defined.
     */
    async fillPasswordEnv() {
        const pass = process.env.PASSWORD || "";
        if (!pass) {
            throw new Error(" password is not defined in .env");
        }
        await this.inputPass.fill(pass);
    }

    async clickOnbtnReset() {
        await this.btnReset.click();
    }

    async clickOnbtnLogin() {
        await this.btnLogin.click();
    }

    async getInputUserText(){
        return await this.inputUser.inputValue();
    }

    async getInputPassText(){
        return await this.inputPass.inputValue();
    }
}