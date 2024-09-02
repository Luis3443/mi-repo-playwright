import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import APIController from '../controller/api.controller';
// import { faker } from '@faker-js/faker';  // It's no needes when the form is filled with data for the API response


test.describe('Contact', () => {

    // Creating a variable (of type "ContactPage" class) which will store an object of that class for each test
    let contactPage: ContactPage;

    // Creating a variable (of type "APIRequestContext" class) which will store an object of that class
    // let fakerApi: APIRequestContext; // Line to be used when there is no "control" file

    // Creating a variable to store the first user from the API response
    let firstPerson: APIResponse;

    // "beforeAll" method to create a new API request
    // test.beforeAll(async ( {playwright} ) => {  // Line to be used when there is no "control" file
    test.beforeAll(async ( ) => {  // Line to be used when there is "control" file

        // Creating a new request context (providing the base URL) and assign it to the variable of type "APIRequestContext"
        // fakerApi = await playwright.request.newContext( {baseURL: 'https://jsonplaceholder.typicode.com/'} );

        // Calling "init" method (it initializes the API context)
        await APIController.init();

        // ***********************************************************************************
        // Calling the https request (GET) for "users" API and saving its response into a variable
        /*
        const response = await fakerApi.get('users')

        // Converting the API response (in json format) and printing it
        // console.log(await response.json());

        // Converting the API response (in json format) and save it in a variable
        const responseBody = await response.json();
        Getting the first user from the API response and storing it into a variable
        firstPerson = responseBody[0];
        */

        // Calling "getUsers" method (it calls the https request (GET) for "users" API)
        firstPerson = await APIController.getUsers();

        // ***********************************************************************************
        // Calling the https request (POST) for "users" API and saving its response into a variable
        /*
        const postResponse = await fakerApi.post( 'users/1/todos', 
            {
                data: {
                    "title": "Learn Playwright", 
                    "completed": "false"
                } 
            });

        // Converting the API response (in json format) and save it in a variable
        const postResponseBody = await postResponse.json();
        // Printing the API response
        console.log(postResponseBody);
        */

        // Calling "createUserToDo" method (it calls the https request (POST) for "users/1/todos" API)
        const newUserToDo = await APIController.createUserToDo();
        console.log(newUserToDo);

    });
    

    test('Fill "Contact" form and verify success message', async ({ page }) => {

        // Instantiating the class "ContactPage" (creating and object of that class) to be able to access to it
        contactPage = new ContactPage (page);

        // Examples of incorrect codes that EsLint will catch
        // page.pause();
        // await page.waitForTimeout(5000);

        // Open contact page
        await contactPage.navigate();
        // await page.goto('https://practice.sdetunicorns.com/contact/');

        // A way to open the PlayWrigth Inspector (Besides the command: npx playwright test "contact.spec.ts" -g "Contact\s+Fill\s+\SContact\S\s+form\s+and\s+verify\s+success\s+message$" --debug)
        // await page.pause();

        // Fill the form - Using dynamic data and "fakerJs" library to generate data automatically
        // await contactPage.fillForm(faker.person.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));
        // Fill the form - Using hardcoded data
        // await contactPage.fillForm();

        // Add a soft assertion (It will fail intentionally). 
        // Note: The next steps will continue even if this soft asserttion fails.
        //await expect.soft(contactPage.message).toHaveText('Fail the test message');

        // Fill the form - Using the data obtained from the API response
        await contactPage.fillForm(firstPerson['name'], firstPerson['email'], firstPerson['phone'], firstPerson['website']);

        // Click on "Submit" button
        await contactPage.submitBtn.click();
        
        // This is to stop and fail the test if the "soft assertion" above fails.
        //expect(test.info().errors.length).toBeLessThan(1);

        // Verify success message is visible (Verify the element has the following text):
        await expect(contactPage.successMessage).toHaveText('Thanks for contacting us! We will be in touch with you shortly');
    });
    
});