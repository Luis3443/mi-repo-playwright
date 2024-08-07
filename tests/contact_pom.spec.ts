import { test, expect } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import { faker } from '@faker-js/faker';


test.describe('Contact', () => {

    // Creating a variable (of type "ContactPage" class) which will store an object of that class for each test
    let contactPage: ContactPage;

    test('Fill "Contact" form and verify success message', async ({ page }) => {

        // Instantiating the class "ContactPage" (creating and object of that class) to be able to access to it
        contactPage = new ContactPage (page);

        // Examples of incorrect codes that EsLint will catch
        // page.pause();
        // await page.waitForTimeout(5000);

        // Open contact page
        await contactPage.navigate();
        // await page.goto('https://practice.sdetunicorns.com/contact/');

        // A way to open the PlayWrigth Inspector (Besides the command: npx playwright test "contact.spec.ts" -g "Contact\s+Fill\s+\SContact\S\s+form\s+and\s+verify\s+success\s+message$" --debug)
        // await page.pause();

        // Fill the form - Using dynamic data and "fakerJs" library to generate data automatically
        await contactPage.fillForm(faker.person.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));
        // Fill the form - Using hardcoded data
        // await contactPage.fillForm();

        // Add a soft assertion (It will fail intentionally). 
        // Note: The next steps will continue even if this soft asserttion fails.
        //await expect.soft(contactPage.message).toHaveText('Fail the test message');

        // Click on "Submit" button
        await contactPage.submitBtn.click();
        
        // This is to stop and fail the test if the "soft assertion" above fails.
        //expect(test.info().errors.length).toBeLessThan(1);

        // Verify success message is visible (Verify the element has the following text):
        await expect(contactPage.successMessage).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
    });
    
});