import { test, expect } from '@playwright/test'

test.describe('Contact', () => {

    test('Fill "Contact" form and verify success message', async ({ page }) => {

        // Open contact page
        await page.goto('https://practice.sdetunicorns.com/contact/');

        // A way to open the PlayWrigth Inspector (Besides the command: npx playwright test "contact.spec.ts" -g "Contact\s+Fill\s+\SContact\S\s+form\s+and\s+verify\s+success\s+message$" --debug)
        // await page.pause();

        // Fill out the form and click on "Submit" button
        await page.locator('.contact-name input').fill('TestName');
        await page.locator('.contact-email input').fill('testemail@gmail.com');
        await page.locator('.contact-phone input').fill('1202303404');
        await page.locator('.contact-message textarea').fill('This is a test message');

        // Add a soft assertion (It will fail intentionally). 
        // Note: The next steps will continue even if this soft asserttion fails.
        // await expect.soft(page.locator('.contact-message textarea')).toHaveText('Fail the test message');

        // Click on "Submit" button
        await page.locator('button[type="submit"]').click();
        // await page.getByRole('button', {name:'Submit'}).click(); // It works as well (Recomended)
        // await page.locator('//button[@id="evf-submit-277"]').click(); // It works as well. It is NOT recomended to use xpath as locators
        
        // This is to stop and fail the test if the "soft assertion" above fails.
        // expect(test.info().errors.length).toBeLessThan(1);

        // Verify success message is visible
        // Locate the element (by ????) and save it into a variable
        const successMessage = page.locator('div[role="alert"]');
        // Verify the element has the following text:
        await expect(successMessage).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
    });
    
});
