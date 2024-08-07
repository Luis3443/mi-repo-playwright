import { test, expect, Page } from '@playwright/test';

// Note: "serial" means that all the tests inside de "describe" block will be executed sequentially (not in parallel)
// test.describe.serial('My Account', () => {  // This code line is for solution 2
test.describe('My Account', () => {  // This code line is for solution 1 and 3

    
    // **********  Way to resolve the disadvantage of "Solution 3": To be able to run tests that do NOT need login  **********
    // Note: Before executing this part, uncomment the two lines "Configuration for Signed-in State" in "playwright.config.ts" file (those belong to "Solution 3").
    // Note: Before executing this part, uncomment the "test.describe" code line corresponding for this solution ("test.describe('My Account',").
    
    // "describe" block nested.
    test.describe('"Account" Page without login', () => {

        // Tells this "describe" block to use the specific "storage state" for all its "tests" blocks.
        test.use( {storageState: './notLoggedInState.json'} );
        // test.use( {storageState: 'C:/Users/Luis/Cursos/Automation/playwright-course/notLoggedInState.json'} );
        
        test('Verify "Login" and "Register" buttons are visible', async ({ page }) => {
            await page.goto('/my-account');
            await expect(page.locator('[name="login"]')).toBeVisible();
            await expect(page.locator('[name="register"]')).toBeVisible();
    
            // Verify "Login" and "Register" forms are visible
            // await expect(page.locator('form[class*="login"]')).toBeVisible();
            // await expect(page.locator('form[class*="register"]')).toBeVisible();
        })
    })
    

    // **********  Solution 3: Signed-in state  **********
    // Advantages: 
    //  - The tests are executed in parallel.
    //  - The login is executed only once.
    // Disadvantages: 
    //  - Slightly complex configuration:
    //      - Creation of "global-setup.ts" file and implementation of "login" script inside that file.
    //      - Configurarion inside "playwright.config.ts" file.
    //  - Unable to run tests that that need to be not-logged in (there is a solution for this).
    // Note: Before executing this solution, uncomment the two lines "Configuration for Signed-in State" in "playwright.config.ts" file (those belong to "Solution 3").
    // Note: Before executing this solution, uncomment the "test.describe" code line corresponding for this solution ("test.describe('My Account',").
    
    test('Confirm Login', async ( {page} ) => {

        await page.goto('/my-account');

        // Verify "Log out" option is visible
        await expect(page.locator('li a[href*="logout"]')).toBeVisible();
        // await expect(page.locator('a[href*="logout"]')).toBeVisible();  // Not working (there are two elements with that locator)
        // await expect(page.getByLabel('Account pages').getByRole('link', { name: 'Log out' })).toBeVisible();  // Working. Recommendes by PlayWright results report
        // await expect(page.locator('a:has-text("Logout")')).toBeVisible();  // Not working (it's the one utilized in the course)
        
        // Verify "Log in" button is hidden
        await expect(page.locator('button[name="login"]')).toBeHidden();
        // await expect(page.getByRole('button', {name: 'Log in'})).toBeHidden();  // Works as well
    })
    
    test('Access "orders" page', async ( {page} ) => {
        await page.goto('/my-account');
        await page.locator('li a[href*="orders"]').click();
        // await page.getByRole('link', { name: 'Orders'}).click(); // Not working ( because there are two "Orders" links in the page)
        await expect(page).toHaveURL(/.*orders/)
    })

    test('Access "downloads" page', async ( {page} ) => {
        await page.goto('/my-account');
        await page.getByRole('link', {name: 'Downloads'}).click();
        await expect(page).toHaveURL(/.*downloads/)
    })
    

    
    // **********  Solution 2: "beforeAll" hook  **********
    // Advantage: The steps inside "beforeAll" hook are executed only once.
    // Disadvantage: The tests are executed sequentially (not in parallel)
    // Note: Before executing this solution, comment the two lines "Configuration for Signed-in State" in "playwright.config.ts" file (those belong to "Solution 3").
    // Note: Before executing this solution, uncomment the "test.describe" code line corresponding for this solution ("test.describe.serial('My Account',").
    /*
    let page: Page; // Creating a variable (of type "Page" interface) which will store an object of that class for each test
    test.beforeAll(async ({browser}) => {

        // Creating a "newPage" context within "browser" instance.
        page = await browser.newPage();

        // Open "my-account" page
        await page.goto('/my-account');
        // Fill user name
        await page.locator('#username').fill('practiceuser1');
        // Fill password
        await page.locator('#password').fill('PracticePass1!');
        // Click on "Log in" button  
        await page.locator('[value="Log in"]').click();
        // await page.getByRole('button', {name: 'Log in'}).click();  // Working sometimes (it does not click on the button)
    })


    // Note: Since we already created a shared "page" context above ("let page: Page; "), the tests blocks will not need to have 
    // a "page" context ( "test('Login', async ( {page} ) => {" )
    test('Confirm Login', async (  ) => {

        // Verify "Log out" option is visible
        await expect(page.locator('li a[href*="logout"]')).toBeVisible();
        // await expect(page.locator('a[href*="logout"]')).toBeVisible();  // Not working (there are two elements with that locator)
        // await expect(page.getByLabel('Account pages').getByRole('link', { name: 'Log out' })).toBeVisible();  // Working. Recommendes by PlayWright results report
        // await expect(page.locator('a:has-text("Logout")')).toBeVisible();  // Not working (it's the one utilized in the course)
        
        // Verify "Log in" button is hidden
        await expect(page.locator('button[name="login"]')).toBeHidden();
        // await expect(page.getByRole('button', {name: 'Log in'})).toBeHidden();  // Works as well
    })
    
    test('Access "orders" page', async (  ) => {
        await page.locator('li a[href*="orders"]').click();
        // await page.getByRole('link', { name: 'Orders'}).click(); // Not working ( because there are two "Orders" links in the page)
        await expect(page).toHaveURL(/.*orders/)
    })

    test('Access "downloads" page', async (  ) => {
        await page.getByRole('link', {name: 'Downloads'}).click();
        await expect(page).toHaveURL(/.*downloads/)
    })
    */



    // **********  Solution 1: "beforeEach" hook  **********
    // Advantage: The tests are executed in parallel.
    // Disadvantage: The steps inside "beforeEach" hook are executed for each test.
    // Note: Before executing this solution, comment the two lines "Configuration for Signed-in State" in "playwright.config.ts" file (those belong to "Solution 3").
    // Note: Before executing this solution, uncomment the "test.describe" code line corresponding for this solution ("test.describe('My Account',").
    /*
    test.beforeEach(async ({ page }) => {
        // Open "my-account" page
        await page.goto('/my-account');
        // Fill user name
        await page.locator('#username').fill('practiceuser1');
        // Fill password
        await page.locator('#password').fill('PracticePass1!');
        // Click on "Log in" button  
        await page.locator('[value="Log in"]').click();
        // await page.getByRole('button', {name: 'Log in'}).click();  // Working sometimes (it does not click on the button)
    })
    
    
    test('Confirm Login', async ( {page} ) => {

        // Verify "Log out" option is visible
        await expect(page.locator('li a[href*="logout"]')).toBeVisible();
        // await expect(page.locator('a[href*="logout"]')).toBeVisible();  // Not working (there are two elements with that locator)
        // await expect(page.getByLabel('Account pages').getByRole('link', { name: 'Log out' })).toBeVisible();  // Working. Recommendes by PlayWright results report
        // await expect(page.locator('a:has-text("Logout")')).toBeVisible();  // Not working (it's the one utilized in the course)
        
        // Verify "Log in" button is hidden
        await expect(page.locator('button[name="login"]')).toBeHidden();
        // await expect(page.getByRole('button', {name: 'Log in'})).toBeHidden();  // Works as well
    })
    
    test('Access "orders" page', async ( {page} ) => {
        await page.locator('li a[href*="orders"]').click();
        // await page.getByRole('link', { name: 'Orders'}).click(); // Not working ( because there are two "Orders" links in the page)
        await expect(page).toHaveURL(/.*orders/)
    })

    test('Access "downloads" page', async ( {page} ) => {
        await page.getByRole('link', {name: 'Downloads'}).click();
        await expect(page).toHaveURL(/.*downloads/)
    })
    */
    
})

