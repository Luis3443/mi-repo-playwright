import {test, expect} from '@playwright/test';
const path = require('path');

test.describe('Upload file', () => {

    test('Should upload a test file', async ({ page }) => {
        // Open the "cart" page
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // Provide the test file path
        const filePath = path.join(__dirname, '../data/Image_PlayWright.png');
        // const filePath = path.join(__dirname, '../data/Big-red-heart-health.png');

        // Upload the test file (it's like clicking on "Select File" button and select the file from the OS explorer)
        await page.setInputFiles('input#upfile_1', filePath);

        // Click on "Upload File" button
        await page.locator('#upload_1').click();


        // Harcoded sleep - RECOMMENDED ONLY FOR DEBUGGING PURPOSES
        // await page.waitForTimeout(5000);

        // Conditional wait - RECOMMENDED
        // await page.locator('#wfu_messageblock_header_1_1').waitFor({state: 'visible', timeout: 10000});

        // Assertion wait - RECOMMENDED
        //Verify that the successful message contains "uploaded successfully" text
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully', {timeout: 10000}); // Note: The default timeout for assertions is 5000 miliseconds
    });

    test('Should upload a test file on a hidden input field', async ({ page }) => {
        // Open the "cart" page
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // Provide the test file path
        const filePath = path.join(__dirname, '../data/Image_PlayWright.png');

        // DOM manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('#upfile_1');
            if (selector) {
                selector.className = ''
            }
        })

        // Upload the test file (it's like clicking on "Select File" button and select the file from the OS explorer)
        await page.setInputFiles('input#upfile_1', filePath);

        // Click on "Upload File" button
        await page.locator('#upload_1').click();

        // Asertion: Verify that the successful message contains "uploaded successfully" text
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully');
    });
    
});
