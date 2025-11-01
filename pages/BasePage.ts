import { Page, expect } from '@playwright/test';


export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

}
