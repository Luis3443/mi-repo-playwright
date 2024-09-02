import { Page, Locator } from '@playwright/test'

// Creating the class
class HomePage {

    // Declaring the properties (variables for the locators) of the class (mandatory in TypeScript)
    page: Page;
    getStartedBtn: Locator;
    headingText: Locator;
    homeText: Locator;
    searchIcon: Locator;
    navLinks: Locator;

    // Creating the constructor and initializing the properties 
    constructor(page: Page){
        this.page = page;  // To be able to have access to "page" property
        this.getStartedBtn = page.locator('#get-started');
        this.headingText = page.locator('text=Think different. Make different.');
        this.homeText = page.locator('#zak-primary-menu >> text=Home');
        this.searchIcon = page.locator('//*[@class="zak-header-actions zak-header-actions--desktop"]//*[@class="zak-header-search__toggle"]'); 
        this.navLinks = page.locator('#zak-primary-menu li[id*="menu-item-"]'); 
    }

    
    // ******  Helper methods  ******

    // Navigate to an specific url
    async navigate() {
        await this.page.goto('/');
    }

    // Get and return the text of each nav link
    async getNavLinksText() {
        return await this.navLinks.allTextContents();
    }

    // Print out all the links
    async PrintAllNavLinks() {
        for (const element of await this.navLinks.elementHandles()) { // The method "elementHandles()" is to be able to iterate through all the elements that are into "navLinks"
            console.log(await element.textContent());
        }
    }

}


// Exporting the class (to be able to import it from another files)
// "export" is to be able to use this file in another test file
// "default" is just to export this default class right here
export default HomePage;
