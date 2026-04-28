import { test, expect } from "@playwright/test"
import HomePage from '../pages/home.page';


test.describe('Visual Comparison', () => {

    // Creating a variable (of type "HomePage" class) which will store an object of that class for each test
    let homePage: HomePage;

    // Method "beforeEach" to execute its content before each test
    test.beforeEach(async ({ page }) => {
        // Instantiating the class "HomePage" (creating and object of that class) to be able to access to it
        homePage = new HomePage(page); 
        // Open url
        await homePage.navigate();
    });
    

    test('Visual comparison - Home Page', async ({ page }) => {

        // Compare the entire page
        await expect(page).toHaveScreenshot("HomePage_ReferenceImage.png");
    });


    test('Visual comparison - "Get Started" button', async ({ page }) => {
        
        // Compare only a specific element
        await expect(homePage.getStartedBtn).toHaveScreenshot("GetStartedButton_ReferenceImage.png");
    });
    
    
});
