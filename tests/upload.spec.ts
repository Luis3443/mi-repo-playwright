import {test, expect} from '@playwright/test';
import path from 'path';


test.describe('Upload file', () => {

    test('Should upload a test file', async ({ page }) => {
        // Open the "cart" page
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // Set the file path
        const filePath = path.join(__dirname, '../data/Image_PlayWright.png');

        // Get the locator (css) to select the file from "Select file" element
        const upFileInput: string= 'input#upfile_1';  // 'input#upfile_1' is the css locator: "input" html label (with type='file') with value of "id" attribute ('upfile_1') 

        // Upload the given file (filePath) through the given locator (upFileInput).
        // Note: It's like clicking on "Select File" button, selecting the file from the given path and clicking on "Open" button from the OS explorer window)
        await page.setInputFiles(upFileInput, filePath);  
        // await page.waitForTimeout(3000);  // Wait FOR DEBUGGING PURPOSES

        // Click on "Upload File" button
        await page.locator('#upload_1').click();
        // await page.waitForTimeout(3000);  // Wait FOR DEBUGGING PURPOSES

        // *****  TYPE OF WAITS  *****

        // Set timeout for a single test - NOT RECOMMENDED
        // test.slow();   // Easy way to triple the default timeout
        // test.setTimeout(120000);   // Changes the timeout for the test


        // Harcoded sleep - RECOMMENDED ONLY FOR DEBUGGING PURPOSES
        // await page.waitForTimeout(5000);   // It pauses the execution for the given time

        // Conditional wait - RECOMMENDED
        // await page.locator('#wfu_messageblock_header_1_1').waitFor( {state: 'visible', timeout: 10000} );   // to wait for an element to reach a specific state
        // await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully');
        
        // Assertion wait - RECOMMENDED
        // Verify that the successful message contains "uploaded successfully" text
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully', {timeout: 10000}); // Note: The default timeout for assertions is in miliseconds
    });

    test('Should upload a test file on a hidden input field', async ({ page }) => {
        // Open the "cart" page
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // Provide the test file path
        const filePath = path.join(__dirname, '../data/Image_PlayWright.png');

        // DOM manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('#upfile_1'); // Gets access to selector of the web element and saves it into a variable
            if (selector) {  // If there is a selector
                selector.className = '' // Changes the value of "class" property of the selector from 'file_input_hidden' to ''
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
