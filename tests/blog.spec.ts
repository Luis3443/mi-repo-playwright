import { test, expect } from '@playwright/test'

test.describe('Blog', () => {

    test('Verify "Recent Posts" and verify the lenght of each list item', async ({ page }) => {
        // Open blog page
        await page.goto('https://practice.sdetunicorns.com/blog/');
        // Locate the element (by css) that contains posts and save it into a variable
        const recentPostList = page.locator('#recent-posts-3 ul li');
        // Verify that the element contains 5 posts
        expect(await recentPostList.count()).toEqual(5);

        // Iterate through the list and verify the char lenght > 12
        for (const el of await recentPostList.elementHandles()) {
            let element = (await el.textContent())?.trim(); // Note: "trim()" method removes the leading and trailing white space
            //console.log(element);
            //console.log(element?.length);
            expect(element?.length).toBeGreaterThan(12);
        }
    });
    
});
