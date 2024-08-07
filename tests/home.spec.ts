import { test, expect } from '@playwright/test';

test.describe('Home', () => {

    test('Open "Home" page and verify title', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Verify title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    });

    test('Open "About" page and verify title', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/about/');
        // Verigy title
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    });


     // **************  Locators and Selectors  *******************************

    test('Click "Get Started" button using CSS Selector', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');

        // Using "not" method
        await expect(page).not.toHaveURL(/.*#get-started/);

        // Locate the button (by CSS) and click on it
        await page.locator('#get-started').click(); // Click on button using CSS selector

        // Verify url has #get-started
        // await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started')  // Works as well
        await expect(page).toHaveURL(/.*#get-started/);  // Assertion using a regex
    });

    test('Verify heading text is visible using text selector', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate the element (by text selector) and save it into a variable
        const headingText = page.locator('text=Think different. Make different.');
        // Verify heading text is visible
        await expect(headingText).toBeVisible();
    });
    
    test('Verify "Home" link is enabled using css and text selectors', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate the element (by text css and text selectors) and save it into a variable
        const homeText = page.locator('#zak-primary-menu >> text=Home'); 
        // const homeText = page.locator('#zak-primary-menu:has-text("Home")'); // Works as well
        // Verify home text is enabled
        await expect(homeText).toBeEnabled();
    });

    test('Verify "Search icon" is visible using xpath selector', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate the element (by xpath selectors) and save it into a variable
        const searchIcon = page.locator('//*[@class="zak-header-actions zak-header-actions--desktop"]//*[@class="zak-header-search__toggle"]'); 
        // Verify the element is visible
        await expect(searchIcon).toBeVisible();
        
    });


    // **************  Working with multiple elements  *******************************

    test('Verify text of all links', async ({ page }) => {

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate the elements (by css selector) and save it into a variable
        const navLinks = page.locator('#zak-primary-menu li[id*="menu-item-"]'); 
        // Verify the text of all nav links
        expect(await navLinks.allTextContents()).toEqual(expectedLinks);
    });

    test('Verify text of an specific link', async ({ page }) => {

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate the specific element (by css selector and "nth(x)" method) and save it into a variable
        const navLink = page.locator('#zak-primary-menu li[id*="menu-item-"]').nth(3); 
        // Verify the text of the specific link
        await expect(navLink).toHaveText(expectedLinks[3]);  // EsLint's Suggestion
        // expect(await navLink.textContent()).toEqual(expectedLinks[3]);
    });
    
    test('Verify text of the first link', async ({ page }) => {

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate the first element (by css selector and "first()" method) and save it into a variable
        const navLink = page.locator('#zak-primary-menu li[id*="menu-item-"]').first(); 
        // Verify the text of the first link
        await expect(navLink).toHaveText(expectedLinks[0]);  // EsLint's Suggestion
        // expect(await navLink.textContent()).toEqual(expectedLinks[0]);
    });

    test('Verify text of the last link', async ({ page }) => {

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate the last element (by css selector and "last()" method) and save it into a variable
        const navLink = page.locator('#zak-primary-menu li[id*="menu-item-"]').last(); 
        // Verify the text of the last link
        await expect(navLink).toHaveText(expectedLinks[5]);  // EsLint's Suggestion
        // expect(await navLink.textContent()).toEqual(expectedLinks[5]);
    });

    // eslint-disable-next-line playwright/expect-expect
    test('Iterate through all of the links', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate all the elements (by css selector and "last()" method) and save it into a variable
        const navLinks = page.locator('#zak-primary-menu li[id*="menu-item-"]');
        // Print out all the links
        for (const element of await navLinks.elementHandles()) { // The method "elementHandles()" is to be able to iterate through all the elements that are into "navLinks"
            console.log(await element.textContent());
        }
    });

    // ------------------  Exercises  -------------------------------------
    test('Contact exercise', async ({ page }) => {

        // Open url
        await page.goto('https://practice.sdetunicorns.com/');

        // Locate "Contact" link  (by css selector -> id) and click on it
        await page.locator('#menu-item-493').click(); 

        // Locate "Send Us Message" title  (by xpath selector) and focus on it
        await page.locator('//h3[contains(text(),"Send Us Message")]').focus(); 

        // Fill out the form and click on "Submit" button
        await page.getByRole('textbox', {name:'Name'}).fill('TestName');
        await page.getByRole('textbox', {name:'Email'}).fill('testemail@gmail.com');
        await page.getByRole('textbox', {name:'Phone'}).fill('1202303404');
        await page.getByRole('textbox', {name:'Message'}).fill('This is a test message');

         // Locate "Submit" button (by xpath selector) and click on it
        await page.locator('//button[@id="evf-submit-277"]').click(); // It is NOT recomended to use xpath as locators
        // await page.locator('button[type="submit"]').click(); // It works as well 
        // await page.getByRole('button', {name:'Submit'}).click(); // It works as well (Recomended)

        // Locate the element (by text selector) and save it into a variable
        const successfulText = page.locator('text=Thanks for contacting us! We will be in touch with you shortly');
        // Verify success message is visible
        await expect(successfulText).toBeVisible();

    });

    test('Blog exercise', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // Locate "Blog" link  (by css selector) and click on it
        await page.locator('#menu-item-490').click(); 
        // Locate "Recent Posts" title  (by xpath selector) and focus on it
        await page.locator('//h2[contains(text(),"Recent Posts")]').focus(); 

        // Locate the element (by css) that contains posts and save it into a variable
        const listOfPosts = page.locator('#recent-posts-3 ul li')
        // Verify that the element contains 5 posts
        await expect (listOfPosts).toHaveCount(5);

        // Iterate through the list and verify the char lenght > 10
        for (const post of await listOfPosts.elementHandles()) {
            const item = (await post.textContent())?.trim(); // Note: "trim()" method removes the leading and trailing white space
            console.log(item)
            console.log(item?.length);
            // Verify the char lenght > 10
            expect(item?.length).toBeGreaterThanOrEqual(13);
        }
    });

});
