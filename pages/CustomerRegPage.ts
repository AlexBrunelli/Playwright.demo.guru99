import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';
import { Page, Locator } from '@playwright/test';


dotenv.config();

export class CustomerRegPage extends BasePage {
    private table: Locator;

    constructor(page: Page) {
        super(page);
        this.table = this.page.locator('table[id="customer"]');
    }

    /**
     * Metodo que retorna verdadero o falso si la tabla contiene el texto especificado
     * @param text Texto a buscar en la tabla
     * @returns boolean
     */
    async containsText(text: string): Promise<boolean> {
        const tableText = await this.table.innerText();
        return tableText.includes(text);
    }

}
