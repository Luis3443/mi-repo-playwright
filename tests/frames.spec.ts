/* eslint-disable playwright/expect-expect */
import { test } from '@playwright/test'

test.describe('Frames', () => {

    test('Working with frames', async ({ page }) => {
        // Open the url
        await page.goto('https://ui.vision/demo/webtest/frames/');

        // Get the amount of frames existing in the page
        // const allFrames = page.frames();
        // console.log('Ammout of Frames:' + allFrames.length);

        
        // *****  Frame 1  *****
        // const frame1 = page.frameLocator('//html[1]/frameset[1]/frame[1]');
        const frame1 = page.frameLocator('//frame[@src="frame_1.html"]');
        await frame1.locator('//input[@name="mytext1"]').fill('Test in frame_1');
        // Frame 1 - works as well
        // const textbox1 = page.frameLocator('//html[1]/frameset[1]/frame[1]').locator('input[name="mytext1"]');
        // textbox1.fill('Test in frame_1');


        // *****  Frame 2  *****
        // const frame2 = page.frameLocator('//frameset//frameset//frame[1]');
        const frame2 = page.frameLocator('//frame[@src="frame_2.html"]');
        await frame2.locator('//input[@name="mytext2"]').fill('Test in frame_2');
        

        // *****  Frame 3  *****
        // const frame3 = page.frameLocator('frame[src="frame_3.html"]');
        const frame3 = page.frameLocator('//frame[@src="frame_3.html"]');
        await frame3.locator('//input[@name="mytext3"]').fill('Test in frame_3');


        // *****  iFrame inside Frame 3  *****
        const iframe1_F3 = frame3.frameLocator('//iframe'); // Accessing to the iframe that is inside the Frame 3

        // Click on "Más información" link
        await iframe1_F3.locator('//a[contains(text(), "Más información")]').click();
        // await iframe1_F3.locator('text="Más información"').click();  // WORKS AS WELL
        // await iframe1_F3.getByRole('button', { name: 'Más información' }).click();  // WORKS AS WELL

        // Click on "Continuar sin acceder" link
        await iframe1_F3.locator('//*[contains(text(), "Continuar sin acceder")]').nth(1).click(); 
        // await iframe1_F3.locator('text="Continuar sin acceder"').nth(1).click();  // WORKS AS WELL
        
        // Check all radio buttons
        await iframe1_F3.locator('//div[@id="i5"]').check();
        // await iframe1_F3.getByRole('radio', {name:'Hi, I am the UI.Vision IDE'}).check();  // SOMETIMES FAILS
        await iframe1_F3.locator('//div[@id="i8"]').check();
        //await iframe1_F3.getByRole('radio', {name:'I am a human'}).check();  // SOMETIMES FAILS
        await iframe1_F3.locator('//div[@id="i11"]').check();
        // await iframe1_F3.getByRole('radio', {name:'Otros:'}).nth(2).check();  // NOT WORKING
        // await iframe1_F3.getByLabel('Otros:').check();  // NOT WORKING
        

        // Fill "Otra respuesta" textbox
        await iframe1_F3.locator('//input[@aria-label="Otra respuesta"]').fill('text for testing');

        // Click on "Borrar la selección" link
        await iframe1_F3.locator('text=Borrar la selección').click();

        // Check all checkboxes
        await iframe1_F3.locator('//div[@id="i19"]').check();
        //await iframe1_F3.getByRole('checkbox', {name:'Web Testing'}).check();  // SOMETIMES FAILS
        await iframe1_F3.locator('//div[@id="i22"]').check();
        await iframe1_F3.locator('//div[@id="i25"]').check();
        // await iframe1_F3.getByRole('checkbox', {name:'General Web Automation'}).check();  // SOMETIMES FAILS
        // await iframe1_F3.locator('text=General Web Automation').check();  // NOT WORKING
        // await iframe1_F3.locator('//span[contains(text(),"General Web Automation")]').check();  // NOT WORKING
        
        // Select an option from the listbox
        // Note: Since the element (listbox or dropdown list) does not have "<select>" html tag, the action "selectOption" does NOT work
        await iframe1_F3.locator('//div[@role="listbox"]').click();
        // await iframe1_F3.locator('//span[contains(text(), "Yes")]').nth(1).click();
        await iframe1_F3.locator('//span[contains(text(), "Well, now I know :-)")]').nth(1).click();  // WORKS AS WELL
        
        // Click on "Siguiente" button
        await iframe1_F3.locator('//span[contains(text(), "Siguiente")]').click();

        // Fill "Enter a short text" textbox
        await iframe1_F3.locator('//input[@class="whsOnd zHQkBf"]').fill('This is a short text');

        // Fill "Enter a long answer" textbox
        await iframe1_F3.locator('//textarea[@class="KHxj8b tL9Q4c"]').fill('This is a long text for testing purposes');

        // Click on "Siguiente" button
        await iframe1_F3.locator('//div[@aria-label="Submit"]').click();

        
        // *****  Frame 4  *****
        // const frame4 = page.frameLocator('frame[src="frame_4.html"]');
        const frame4 = page.frameLocator('//frame[@src="frame_4.html"]');
        await frame4.locator('//input[@name="mytext4"]').fill('Test in frame_4');


        // *****  Frame 5  *****
        // const frame5 = page.frameLocator('//html[1]/frameset[1]/frame[2]');
        const frame5 = page.frameLocator('//frame[@src="frame_5.html"]');
        await frame5.locator('//input[@name="mytext5"]').fill('Test in frame_5');
        await frame5.locator('text=https://a9t9.com').click();  // Click on  link "https://a9t9.com"
        
        
        await page.waitForTimeout(5000);
        
    });
    
});
