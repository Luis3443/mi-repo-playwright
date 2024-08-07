import { Page, Locator } from '@playwright/test'

// Creating the class
class ContactPage {

    // Declaring the properties of the class (mandatory in TypeScript)
    page: Page;
    nameInput: Locator;
    emailInput: Locator;
    phoneInput: Locator;
    messageTextArea: Locator;
    submitBtn: Locator;
    successMessage: Locator;
    
    // Creating the constructor and initializing the properties 
    constructor(page: Page) {
        this.page = page;  // To be able to have access to "page" property
        this.nameInput = page.locator('.contact-name input');
        this.emailInput = page.locator('.contact-email input');
        this.phoneInput = page.locator('.contact-phone input');
        this.messageTextArea = page.locator('.contact-message textarea');
        this.submitBtn = page.locator('button[type="submit"]');
        // this.submitBtn = page.getByRole('button', {name:'Submit'})  // It works as well (Recomended)
        // this.submitBtn = page.locator('//button[@id="evf-submit-277"]')  // It works as well. It is NOT recomended to use xpath as locators
        this.successMessage = page.locator('div[role="alert"]');
    }

    // ******  Helper methods  ******

    // Navigate to an specific url
    async navigate() {
        await this.page.goto('/contact/');
    }

    // Fill form - Using dynamic data
    async fillForm (name: string, email: string, phone: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.messageTextArea.fill(message);

        // This timeout is just to be able to see the fiels filled for a few seconds
        // await this.page.waitForTimeout(5000);
    }

    // Fill form - Using hardcoded data
    /* async fillForm () {
        await this.nameInput.fill('TestName');
        await this.emailInput.fill('testemail@gmail.com');
        await this.phoneInput.fill('1202303404');
        await this.messageTextArea.fill('This is a test message');
    } */

}


// Exporting the class (to be able to import it from another files)
// "export" is to be able to use this file in another test file
// "default" is just to export this default class right here
export default ContactPage;