import { expect, Page, Locator } from '@playwright/test'

// Creating the class
class BlogPage {

    // Declaring the properties of the class (mandatory in TypeScript)
    page: Page;
    recentPostList: Locator;

    // Creating the constructor and initializing the properties 
    constructor(page: Page) {
        this.page = page; // To be able to have access to "page" property
        this.recentPostList = page.locator('#recent-posts-3 ul li');
    }

    // ******  Helper methods  ******

    // Navigate to an specific url
     async navigate() {
        await this.page.goto('/blog/');
    }

    // Iterate through the list and verify the char length
    async verifyCharsLenght(lenght: number) {
        for (const el of await this.recentPostList.elementHandles()) {
            const element = (await el.textContent())?.trim(); // Note: "trim()" method removes the leading and trailing white space
            //console.log(element);
            //console.log(element?.length);
            expect(element?.length).toBeGreaterThan(lenght);
        }
    }

}

// Exporting the class (to be able to import it from another files)
// "export" is to be able to use this file in another test file
// "default" is just to export this default class right here
export default BlogPage;