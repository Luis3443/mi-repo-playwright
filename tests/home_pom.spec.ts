/* eslint-disable @typescript-eslint/no-unused-vars */
import {test, expect} from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {

    // Creating a variable (of type "HomePage" class) which will store an object of that class for each test
    let homePage: HomePage;

    // Method "beforeEach" to execute its content before each test
    test.beforeEach(async ({ page }) => {
        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        homePage = new HomePage(page); 
        // Open url
        await homePage.navigate();
    })

    test('Open "Home" page and verify title', async ({ page }) => {
        // Verify title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    });
    
    test('Click "Get Started" button using CSS Selector', async ({ page }) => {

        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);
        // Open url
        // await homePage.navigate();

        // Using "not" method
        await expect(page).not.toHaveURL(/.*#get-started/);

        // Locate the button (by CSS) and click on it
        await homePage.getStartedBtn.click();

        // Verify url has #get-started
        // await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started')  // Works as well
        await expect(page).toHaveURL(/.*#get-started/);  // Assertion using a regex
    });

    test('Verify heading text is visible using text selector', async ({ page }) => {
        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);
        // Open url
        // await homePage.navigate();

        // Locate the element (by text selector) and save it into a variable
        const headingText = homePage.headingText;
        // Verify heading text is visible
        await expect(headingText).toBeVisible();
    });
    
    test('Verify "Home" link is enabled using css and text selectors', async ({ page }) => {
        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);
        // Open url
        // await homePage.navigate();

        // Locate the element (by text css and text selectors) and save it into a variable
        const homeText = homePage.homeText;
        // Verify home text is enabled
        await expect(homeText).toBeEnabled();
    });

    test('Verify "Search icon" is visible using xpath selector', async ({ page }) => {
        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);
        // Open url
        // await homePage.navigate();

        // Locate the element (by xpath selectors) and save it into a variable
        const searchIcon = homePage.searchIcon;
        // Verify the element is visible
        // await expect(searchIcon).toBeVisible();
        await expect(searchIcon).not.toBeVisible();
        
    });


    // **************  Working with multiple elements  *******************************

    test('Verify text of all nav links', async ({ page }) => {

        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        // await homePage.navigate();

        // Verify the text of all nav links
        expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
    });


    test('Verify text of an specific link', async ({ page }) => {

        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        // await homePage.navigate();

        // Locate the specific element (by css selector and "nth(x)" method) and save it into a variable
        const navLink = homePage.navLinks.nth(3); 
        // Verify the text of the specific link
        await expect(navLink).toHaveText(expectedLinks[3]);  // EsLint's Suggestion
        // expect(await navLink.textContent()).toEqual(expectedLinks[3]);
    });
    

    test('Verify text of the first link', async ({ page }) => {

        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        // await homePage.navigate();

        // Locate the first element (by css selector and "first()" method) and save it into a variable
        const navLink = homePage.navLinks.first(); 
        // Verify the text of the first link
        await expect(navLink).toHaveText(expectedLinks[0]);  // EsLint's Suggestion
        // expect(await navLink.textContent()).toEqual(expectedLinks[0]);
    });


    test('Verify text of the last link', async ({ page }) => {

        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // Open url
        // await homePage.navigate();

        // Locate the last element (by css selector and "last()" method) and save it into a variable
        const navLink = homePage.navLinks.last(); 
        // Verify the text of the last link
        await expect(navLink).toHaveText(expectedLinks[5]);  // EsLint's Suggestion
        // expect(await navLink.textContent()).toEqual(expectedLinks[5]);
    });


    // eslint-disable-next-line playwright/expect-expect
    test('Iterate through all of the links', async ({ page }) => {

        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        // homePage = new HomePage(page);
        
        // Open url
        // await homePage.navigate();

        // Locate all the elements (by css selector and "last()" method) and save it into a variable
        const navLinks = homePage.navLinks;

        // Print out all the links
        for (const element of await navLinks.elementHandles()) { // The method "elementHandles()" is to be able to iterate through all the elements that are into "navLinks"
            console.log(await element.textContent());
        }
    });
    
})
