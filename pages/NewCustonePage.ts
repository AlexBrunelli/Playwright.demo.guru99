import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';
import { Page } from '@playwright/test';

dotenv.config();

export class NewCustonePage extends BasePage {
    //Locators
    private customerName = this.page.locator('input[name="name"]');
    private genderMale = this.page.locator('input[type="radio"][value="m"]');
    private genderFemale = this.page.locator('input[type="radio"][value="f"]');
    private dateOfBirth = this.page.locator('input[id="dob"]');
    private address = this.page.locator('textarea[name="addr"]');
    private city = this.page.locator('input[name="city"]');
    private state = this.page.locator('input[name="state"]');
    private pin = this.page.locator('input[name="pinno"]');
    private mobileNumber = this.page.locator('input[name="telephoneno"]');
    private email = this.page.locator('input[name="emailid"]');
    private password = this.page.locator('input[name="password"]');
    private submit = this.page.locator('input[value="Submit"]');
    private reset = this.page.locator('input[value="Reset"]');

    constructor(page: Page) {
        super(page);
    }

    async fillCustomerName(customerName: string): Promise<void> {
        await this.customerName.fill(customerName);
    }

    async selectGender(gender: 'male' | 'female'): Promise<void> {
        if (gender === 'male') {
            await this.genderMale.check();
        } else {
            await this.genderFemale.check();
        }
    }

    async fillDateOfBirth(dob: string): Promise<void> {
        // Expected `customerData.dateOfBirth` format in tests: 'DD-MM-YYYY'
        // The page input usually expects 'YYYY-MM-DD' (ISO). Convert accordingly.
        let formatted = dob;
        const parts = dob.split('-');
        if (parts.length === 3) {
            // If input is in DD-MM-YYYY, convert to YYYY-MM-DD
            const [dd, mm, yyyy] = parts;
            if (dd.length === 2 && mm.length === 2 && yyyy.length === 4) {
                formatted = `${yyyy}-${mm}-${dd}`;
            }
        }

        // Use fill to set the value (clear + type can be flaky depending on the control)
        await this.dateOfBirth.fill(formatted);
    }

    async fillAddress(address: string): Promise<void> {
        await this.address.fill(address);
    }

    async fillCity(city: string): Promise<void> {
        await this.city.fill(city);
    }

    async fillState(state: string): Promise<void> {
        await this.state.fill(state);
    }

    async fillPin(pin: string): Promise<void> {
        await this.pin.fill(pin);
    }

    async fillMobileNumber(mobile: string): Promise<void> {
        await this.mobileNumber.fill(mobile);
    }

    async fillEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async clickSubmit(): Promise<void> {
        await this.submit.click();
    }

    async clickReset(): Promise<void> {
        await this.reset.click();
    }


    async fillAllCustomerData(customerData: {
        name: string;
        gender: 'male' | 'female';
        dateOfBirth: string;
        address: string;
        city: string;
        state: string;
        pin: string;
        mobile: string;
        email: string;
        password: string;
    }): Promise<void> {
        await this.fillCustomerName(customerData.name);
        await this.selectGender(customerData.gender);
        await this.fillDateOfBirth(customerData.dateOfBirth);
        await this.fillAddress(customerData.address);
        await this.fillCity(customerData.city);
        await this.fillState(customerData.state);
        await this.fillPin(customerData.pin);
        await this.fillMobileNumber(customerData.mobile);
        await this.fillEmail(customerData.email);
        await this.fillPassword(customerData.password);
    }


    /**
     * Checks if all input fields are empty.
     * @returns Promise<boolean> - true if all fields are empty, false otherwise.
     */
    async areAllFieldsEmpty(): Promise<boolean> {
        const fields = [
            this.customerName,
            this.dateOfBirth,
            this.address,
            this.city,
            this.state,
            this.pin,
            this.mobileNumber,
            this.email,
            this.password
        ];

        for (const field of fields) {
            const value = await field.inputValue();
            if (value !== '') return false;
        }

        return true;
    }

    // Check if no gender is default in this case male
    async isDefaultGenderSelected(): Promise<boolean> {
        return await this.genderMale.isChecked();
    }



    async getCustomerName(): Promise<string> {
        return await this.customerName.inputValue() || '';
    }

    async getGender(): Promise<string> {
        if (await this.genderMale.isChecked()) {
            return 'male';
        }
        if (await this.genderFemale.isChecked()) {
            return 'female';
        }
        return '';
    }

    async getDateOfBirth(): Promise<string> {

        const dob = await this.dateOfBirth.inputValue() || '';
        // forma the date to validate
        if (dob && dob.includes('-')) {
            const [year, month, day] = dob.split('-');
            return `${day}-${month}-${year}`;
        }
        return await this.dateOfBirth.inputValue() || '';
    }

    async getAddress(): Promise<string> {
        return await this.address.inputValue() || '';
    }

    async getCity(): Promise<string> {
        return await this.city.inputValue() || '';
    }

    async getState(): Promise<string> {
        return await this.state.inputValue() || '';
    }

    async getPin(): Promise<string> {
        return await this.pin.inputValue() || '';
    }

    async getMobileNumber(): Promise<string> {
        return await this.mobileNumber.inputValue() || '';
    }

    async getEmail(): Promise<string> {
        return await this.email.inputValue() || '';
    }

    async getPassword(): Promise<string> {
        return await this.password.inputValue() || '';
    }


}