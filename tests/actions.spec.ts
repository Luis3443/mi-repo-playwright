/* eslint-disable playwright/expect-expect */
import {test} from '@playwright/test'

test.describe('Actions for web elements', () => {

    test('Mouse Click', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');
        // Click on "Contact" link menu
        await page.locator('#menu-item-493').click();
    });

    test('Double Click', async ({ page }) => {
        // Open the url
        await page.goto('https://testautomationpractice.blogspot.com/');

        // Double click on "Copy Tex" button
        await page.locator('text=Copy Text').dblclick();
        // await page.locator('//button[contains(text(),"Copy Text")]').dblclick();  // Works as well
    });

    test('Right Click', async ({ page }) => {
        // Open the url
        await page.goto('http://swisnl.github.io/jQuery-contextMenu/demo.html');

        // Right click on "right click me" button
        await page.locator('//span[contains(text(),"right click me")]').click( {button: 'right'} );
        // await page.locator('text=right click me').click( {button: 'right'} );  // NOT Working
        // await page.getByText('right click me', {exact: true}).click( {button: 'right'} );  // Works as well
    });

    test('Focus on an element', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/contact/');
        // Focus on "Send Us Message" title
        await page.locator('text=Send Us Message').focus();
    });

    test('Text input', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/contact/');
        // Input text in "Name" textbox
        await page.locator('#evf-277-field_ys0GeZISRs-1').fill('Test Name');
        
    });

    test('Select radio button', async ({ page }) => {
        // Open the url
        await page.goto('https://www.tutorialspoint.com/selenium/practice/radio-button.php');
        // Select "Impressive" radio button
        await page.locator('//input[@value="igotthree"]').check();
    });

    test('Check checkbox', async ({ page }) => {
        // Open the url
        await page.goto('https://www.tutorialspoint.com/selenium/practice/check-box.php');
        // Check "Main Level 1" checkbox
        await page.locator('#c_bs_1').check();
    });

    test('Select several options from a list box', async ({ page }) => {
        // Open the url
        await page.goto('https://testautomationpractice.blogspot.com/');
        // Select several options in "Colors" list box
        await page.locator('//*[@id="colors"]').selectOption(['Blue','Yellow']);
    })

    test('Drag and drop', async ({ page }) => {
        // Open the url
        await page.goto('https://demo.guru99.com/test/drag_drop.html');

        // Bank -> Debit Side - Account
        await page.locator('#credit2').dragTo(page.locator('#bank'));

        // 5000 -> Debit Side - Amount
        // await page.locator('#fourth').dragTo(page.locator('#amt7')); // Not working due to there are two elements (5000) with exactly the same locators.
        await page.locator('#fourth').first().dragTo(page.locator('#amt7'));  // Note: "first()" is used due to there are two elements (5000) with exactly the same locators.
        // await page.locator('section[id="g-container-main"] li:nth-child(2) a:nth-child(1)').dragTo(page.locator('#amt7')); // Works as well
    });
    
    test('Scrolling', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');

        // Scroll to "Latest Posts & Articles" section
        await page.locator('text=Latest Posts & Articles').scrollIntoViewIfNeeded();
        // await page.locator('//h3[contains(text(),"Latest Posts & Articles")]').scrollIntoViewIfNeeded(); // Works as well
        // await page.locator('//h3[normalize-space()="Latest Posts & Articles"]').scrollIntoViewIfNeeded(); // Works as well
    });

    test('Working with frames', async ({ page }) => {
        // Open the url
        await page.goto('https://ui.vision/demo/webtest/frames/');

        // Get the amount of frames existing in the page
        // const allFrames = page.frames();
        // console.log('Ammout of Frames:' + allFrames.length);

        
        // Frame 1
        const frame1 = page.frameLocator('//html[1]/frameset[1]/frame[1]');
        await frame1.locator('input[name="mytext1"]').fill('Test in frame_1');
        // Frame 1 - works as well
        // const textbox1 = page.frameLocator('//html[1]/frameset[1]/frame[1]').locator('input[name="mytext1"]');
        // textbox1.fill('Test in frame_1');

        // Frame 2
        const frame2 = page.frameLocator('//frameset//frameset//frame[1]');
        await frame2.locator('input[name="mytext2"]').fill('Test in frame_2');

        // Frame 3
        const frame3 = page.frameLocator('frame[src="frame_3.html"]');
        await frame3.locator('input[name="mytext3"]').fill('Test in frame_3');
        // Frame 3_1 - NOT WORKING
        // const frame3_1 = page.frameLocator('//iframe[normalize-space()="Loading..."]');  
        // await frame3_1.locator('//a[contains(text(),"Más información")]').click();  // Click on "Más información" link
        // // await frame3_1.locator('text=Más información').click();  // Click on "Más información" link

        // Frame 4
        const frame4 = page.frameLocator('frame[src="frame_4.html"]');
        await frame4.locator('input[name="mytext4"]').fill('Test in frame_4');

        // Frame 5
        const frame5 = page.frameLocator('//html[1]/frameset[1]/frame[2]');
        await frame5.locator('input[name="mytext5"]').fill('Test in frame_5');
        await frame5.locator('text=https://a9t9.com').click();  // Click on  link "https://a9t9.com"

        await page.waitForTimeout(5000);

    })
    

    
});
