import { test, expect } from '@playwright/test';
import BlogPage from '../pages/blog.page';

test.describe('Blog', () => {

    // Creating a variable (of type "BlogPage" class) which will store an object of that class for each test
    let blogPage: BlogPage;

    test('Verify "Recent Posts" and verify the lenght of each list item', async ({ page }) => {

        // Instantiating the class "BlogPage" (creating and object of that class) to be able to access to it
        blogPage = new BlogPage(page);

        // Open blog page
        await blogPage.navigate();

        // Verify that the element contains 5 posts
        expect(await blogPage.recentPostList.count()).toEqual(5);

        // Verify the number of characters for each post (to be greater than 12)
        await blogPage.verifyCharsLenght(12);
    });
    
});
