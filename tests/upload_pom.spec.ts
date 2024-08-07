import {test, expect} from '@playwright/test';
import CartPage from '../pages/cart.page';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

test.describe('Upload file', () => {

    // Creating a variable (of type "CartPage" class) which will store an object of that class for each test
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        // Instantiating the class "CartPage" (creating and object of that class) to be able to access to it
        cartPage = new CartPage (page);
        // Open the "cart" page
        await cartPage.navigate();
    })
    


    // **********  Parameterize test  **********
    // Array to save the files to be used in the same test
    const fileName = ['logotitle.png', 'Image_PlayWright.png'];

    // "for" loop to iterate through the files that are in "fileName" array
    for (const name of fileName) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        test(`Should upload a ${name} file`, async ({ page }) => {

            // Instantiating the class "CartPage" (creating and object of that class) to be able to access to it
            // cartPage = new CartPage (page);
            // Open the "cart" page
            // await cartPage.navigate();
    
            // Provide the test file path
            const filePath = path.join(__dirname, `../data/${name}`);
    
            // Upload the test file
            cartPage.uploadComponent().uploadFile(filePath);
    
    
            // Harcoded sleep - RECOMMENDED ONLY FOR DEBUGGING PURPOSES
            // await page.waitForTimeout(5000);
    
            // Conditional wait - RECOMMENDED
            // await (cartPage.uploadComponent().successText).waitFor({state: 'visible', timeout: 10000});
    
            // Assertion wait - RECOMMENDED
            //Verify that the successful message contains "uploaded successfully" text
            await expect(cartPage.uploadComponent().successText).toContainText('uploaded successfully', {timeout: 10000}); // Note: The default timeout for assertions is 5000 miliseconds
        });
    }



    /* // This test was commented to run the "Parameterized test" test above
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test('Should upload a test file', async ({ page }) => {

        // Provide the test file path
        const filePath = path.join(__dirname, '../data/logotitle.png');

        // Upload the test file
        cartPage.uploadComponent().uploadFile(filePath);


        // Harcoded sleep - RECOMMENDED ONLY FOR DEBUGGING PURPOSES
        // await page.waitForTimeout(5000);

        // Conditional wait - RECOMMENDED
        // await (cartPage.uploadComponent().successText).waitFor({state: 'visible', timeout: 10000});

        // Assertion wait - RECOMMENDED
        //Verify that the successful message contains "uploaded successfully" text
        await expect(cartPage.uploadComponent().successText).toContainText('uploaded successfully', {timeout: 10000}); // Note: The default timeout for assertions is 5000 miliseconds
    }); */


    // This test is skipped (using "skip" keyword) to run the "Parameterized test" test above
    test.skip('Should upload a test file on a hidden input field', async ({ page }) => {
        
        // Provide the test file path
        const filePath = path.join(__dirname, '../data/Image_PlayWright.png');

        // DOM manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('#upfile_1');
            if (selector) {
                selector.className = ''
            }
        })

        // Upload the test file
        cartPage.uploadComponent().uploadFile(filePath);

        // Asertion: Verify that the successful message contains "uploaded successfully" text
        await expect(cartPage.uploadComponent().successText).toContainText('uploaded successfully');
    });
    
});
