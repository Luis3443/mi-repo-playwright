/* eslint-disable playwright/expect-expect */
import { test } from '@playwright/test';

test.describe('Woking with table', () => {
    
    test('Scenario 4: Verify table is divided into two sections with correct number of rows', async ({ page }) => {
        
        
        // ***********     A table (All working fine)      ***********
        
        await page.goto('https://the-internet.herokuapp.com/tables');
    
        // Get the amout of Rows (counting the row of the head):
        const allRows = page.locator('//table[@id="table1"]/thead/tr | //table[@id="table1"]/tbody/tr'); // works as well (using 2 xpath locators)
        console.log(await allRows.count())
    
        // Get the amount of Rows (without counting the row of the head):
        const tableBody = page.locator('table#table1 tbody'); // Using css locator
        // const tableBody = page.locator('//table[@id="table1"]/tbody'); // works as well (using xpath locator)
        console.log(await tableBody.locator('tr').count());
    
    
        // Get the amount of Columns using a row
        const tableRow = page.locator('table#table1 tbody tr:nth-child(1)'); // Using css 
        // const tableRow = page.locator('//table[@id="table1"]/tbody/tr[1]'); // works as well (using xpath locator)s
        console.log(await tableRow.locator('td').count());
    
        // Get the amount of Columns using the table head
        const tableHead = page.locator('table#table1 thead tr'); // Using css 
        // const tableHead = page.locator('//table[@id="table1"]/thead/tr'); // works as well (using xpath locator)
        console.log(await tableHead.locator('th').count());
    
    
        // Get the text of a specific row
        const textOfRow = page.locator('table#table1 tbody tr:nth-child(1) td'); // Using css 
        // const textOfRow = page.locator('//table[@id="table1"]/tbody/tr[2]/td'); // works as well (using xpath locator)
        console.log(await textOfRow.allInnerTexts());
    
        // Get the text of a specific column
        const textOfColumn = page.locator('table#table1 tbody tr td:nth-child(2)'); // Using css 
        // const textOfColumn = page.locator('//table[@id="table1"]/tbody/tr/td[2]'); // works as well (using xpath locator)
        console.log(await textOfColumn.allInnerTexts());
        
        
    
        // ***********     Another table (NOT WORKING A PART)     ***********
    
        // await page.goto('https://www.icc-cricket.com/tournaments/cricketworldcup/standings');
    
    
        // **  THIS PART IS NOT WORKING  **
    
        // Get the amout of Rows (counting the row of the head):  - NOT WORKING (SHOWING UP ZERO INSTEAD 11)
        // const allRows = page.locator('table.w-full tr'); // Using css locator
        // const allRows = page.locator('//table[@class="w-full"]/thead/tr | //table[@class="w-full"]/tbody/tr'); // Using 2 xpath locators
        // console.log(await allRows.count());
    
        // Get the amount of Rows (without counting the row of the head):  - NOT WORKING (SHOWING UP ZERO INSTEAD 10)
        // const tableBody = page.locator('table.w-full tbody'); // Using css locator
        // const tableBody = page.locator('//table[@class="w-full"]/tbody'); // Using xpath locator
        // console.log(await tableBody.locator('tr').count());
    
    
        // Get the amount of Columns using a row  - NOT WORKING (SHOWING UP ZERO INSTEAD 9)
        // const tableRow = page.locator('table.w-full tbody tr:nth-child(1)'); // Using css 
        // const tableRow = page.locator('//table[@class="w-full"]/tbody/tr[1]'); // Using xpath locator
        // console.log(await tableRow.locator('td').count());
    
        // Get the amount of Columns using the table head  - NOT WORKING (SHOWING UP ZERO INSTEAD 9)
        // const tableHead = page.locator('table thead tr'); // Using css 
        // const tableHead = page.locator('//table[@class="w-full"]/thead/tr'); // Using xpath locator)
        // console.log(await tableHead.locator('th').count());
    
    
        // Get the text of a specific row  - NOT WORKING (SHOWING UP AN EMPTY ARRAY)
        // const textOfRow = page.locator('table.w-full tbody tr:nth-child(1) td'); // Using css 
        // const textOfRow = page.locator('//table[@class="w-full"]/tbody/tr[2]/td'); // Using xpath locator)
        // console.log(await textOfRow.allInnerTexts());
    
        // // Get the text of a specific column
        // const textOfColumn = page.locator('table.w-full tbody tr td:nth-child(2)'); // Using css 
        // // const textOfColumn = page.locator('//table[@class="w-full"]/tbody/tr/td[2]'); // works as well (using xpath locator)
        // console.log(await textOfColumn.allInnerTexts());
    
    
    
        // **  THIS PART IS WORKING FINE  **
        
        // // Get the locator of rows in the table
        // const allRows = page.locator('table tbody tr');
    
        // // Get the locator of columns in the table
        // const allColumns = page.locator('table thead tr th');
        // // const totalColumns = page.locator('table tbody tr:nth-child(3) td');  // Works as well. 
        //                                                                       // ":nth-child(3)" indicates the number of the row (in this case the 4th one due to the first one is the number 0).
    
        // // Verify the amount of rows in the table
        // await expect(allRows).toHaveCount(10);
        // // Verify the amount of columns in the table
        // await expect(allColumns).toHaveCount(9);
    
    
        // // Verify the 4th row contains the class ("border-dotted") of the line below itself.
        // await expect(allRows.nth(3)).toHaveClass(/.*border-dotted.*/); // Regular expression: It must contain "border-dotted" no matter what it may have before or after it.
    
        // // Verify the CCS property and value
        // await expect(allRows.nth(3)).toHaveCSS('border-bottom-color', /rgb.*/); // Regular expression: It must start with "rgb" no matter what it may have after it.
        
    });

});

