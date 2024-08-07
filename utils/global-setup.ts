import { chromium, FullConfig } from "@playwright/test";

 // Creating the function
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 async function globalSetup(config: FullConfig) {

    // Launch (open) chronium browser and save it into a variable.
    const browser = await chromium.launch();
    // Creating a "newPage" context within "browser" instance and save it into a variable
    const page = await browser.newPage();


    // Open "my-account" page
    await page.goto('https://practice.sdetunicorns.com/my-account');

    // Save the current state (notSigned-in state) into 'notLoggedInState.json' file. The file is saved in the path set.
    await page.context().storageState( {path: 'notLoggedInState.json'} );

    // Fill user name
    await page.locator('#username').fill('practiceuser1');
    // Fill password
    await page.locator('#password').fill('PracticePass1!');
    // Click on "Log in" button  
    await page.locator('[value="Log in"]').click();
    // await page.getByRole('button', {name: 'Log in'}).click();  // Working sometimes (it does not click on the button)

    // Save the current state (signed-in state) into 'loggedInState.json' file. The file is saved in the path set.
    await page.context().storageState( {path: 'loggedInState.json'} );

    // Close the chronium browser
    await browser.close();

}

// Exporting the function (to be able to import it from another files)
// "export" is to be able to use this file in another test file
// "default" is just to export this default function right here
export default globalSetup;