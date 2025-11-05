import { promises } from 'dns';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';
import { Page } from '@playwright/test';

dotenv.config();

export class ManagerhomePage extends BasePage {
    //Locators
    private menuNewCustomer = this.page.locator('a[href="addcustomerpage.php"]');

    constructor(page: Page) {
            super(page);
    }

    async clickOnMenuNewCustomer() {
        await this.menuNewCustomer.click();
    }

}