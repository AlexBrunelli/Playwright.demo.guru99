import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import { ManagerhomePage } from '../pages/ManagerhomePage';
import { NewCustonePage } from '../pages/NewCustonePage';
import { login } from '../helper/loginHelper';
import { CustomerRegPage } from '../pages/CustomerRegPage';


dotenv.config();

type CustomerData = {
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
};

const customerData: CustomerData = {
    name: 'Larry',
    gender: 'male',
    dateOfBirth: '05-10-1990',
    address: 'Calle mayor 12 1D',
    city: 'Madrid',
    state: 'Madrid',
    pin: '123456',
    mobile: '555555555',
    email: 'Larry.falso@example.com',
    password: 'password123'
};

test('Reset button test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const managerhomePage = new ManagerhomePage(page);
    const newCustomerPage = new NewCustonePage(page);
    //Login to the application
    await loginPage.navigateTo('');
    await login(page);
    //Navigate to New Customer Page
    await managerhomePage.clickOnMenuNewCustomer();
    await page.waitForURL('**/manager/addcustomerpage.php');

    //create a new customer
    await newCustomerPage.fillAllCustomerData(customerData);

    //verify that all fields are filled
    expect(await newCustomerPage.areAllFieldsEmpty()).toBeFalsy();
    expect(await newCustomerPage.getCustomerName()).toBe(customerData.name);
    expect(await newCustomerPage.getGender()).toBe(customerData.gender);
    expect(await newCustomerPage.getDateOfBirth()).toBe(customerData.dateOfBirth);
    expect(await newCustomerPage.getAddress()).toBe(customerData.address);
    expect(await newCustomerPage.getCity()).toBe(customerData.city);
    expect(await newCustomerPage.getState()).toBe(customerData.state);
    expect(await newCustomerPage.getPin()).toBe(customerData.pin);
    expect(await newCustomerPage.getMobileNumber()).toBe(customerData.mobile);
    expect(await newCustomerPage.getEmail()).toBe(customerData.email);
    expect(await newCustomerPage.getPassword()).toBe(customerData.password);

    //verify reset button
    await newCustomerPage.clickReset();
    // Verify that the fields are empty
    expect(await newCustomerPage.areAllFieldsEmpty()).toBeTruthy();
    expect(await newCustomerPage.isDefaultGenderSelected()).toBeTruthy();

});

test('Create new customer test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const managerhomePage = new ManagerhomePage(page);
    const newCustomerPage = new NewCustonePage(page);
    const customerRegPage = new CustomerRegPage(page);
    //Login to the application

    await loginPage.navigateTo('');

    await loginPage.fillLoginEnv();
    await loginPage.fillPasswordEnv();

    // verifies that the inputs have value
    expect(await loginPage.getInputUserText()).toBe(process.env.USER);
    expect(await loginPage.getInputPassText()).toBe(process.env.PASSWORD);
    await loginPage.clickOnbtnLogin();
    await page.waitForURL('**/manager/Managerhomepage.php');

    //Navigate to New Customer Page
    await managerhomePage.clickOnMenuNewCustomer();
    await page.waitForURL('**/manager/addcustomerpage.php');

    //create a new customer
    await newCustomerPage.fillAllCustomerData(customerData);

    //verify that all fields are filled
    expect(await newCustomerPage.areAllFieldsEmpty()).toBeFalsy();
    expect(await newCustomerPage.getCustomerName()).toBe(customerData.name);
    expect(await newCustomerPage.getGender()).toBe(customerData.gender);
    expect(await newCustomerPage.getDateOfBirth()).toBe(customerData.dateOfBirth);
    expect(await newCustomerPage.getAddress()).toBe(customerData.address);
    expect(await newCustomerPage.getCity()).toBe(customerData.city);
    expect(await newCustomerPage.getState()).toBe(customerData.state);
    expect(await newCustomerPage.getPin()).toBe(customerData.pin);
    expect(await newCustomerPage.getMobileNumber()).toBe(customerData.mobile);
    expect(await newCustomerPage.getEmail()).toBe(customerData.email);
    expect(await newCustomerPage.getPassword()).toBe(customerData.password);

    await newCustomerPage.clickSubmit();
    
    await page.waitForURL('**manager/CustomerRegMsg.php**');
       
});
