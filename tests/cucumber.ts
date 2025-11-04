import { setDefaultTimeout, Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";

// Agrego la declaración global para evitar el error TS7017 al asignar a `global.page`.
declare global {
  // `page` será accesible desde los step definitions
  var page: Page;
}

let browser: Browser;
let page: Page;

setDefaultTimeout(60 * 1000);

Before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  global.page = page; // hacemos accesible la página en los steps
});

After(async () => {
  await browser.close();
});
