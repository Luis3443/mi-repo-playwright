import { APIRequestContext, request } from "@playwright/test";

// Creating a class 
class APIController {
    // Creating a property of the class (a variable of type "APIRequestContext" class which will store an object of that class)
    private fakerApi: APIRequestContext;

    // Method to initialize the request context
    async init() {
        // Creating a new request context (providing the base URL) and assign it to the variable of type "APIRequestContext"
        this.fakerApi = await request.newContext ( {baseURL: 'https://jsonplaceholder.typicode.com/'} );
    }

    // Method to call the https request (GET) for "users" and get its response.
    async getUsers() {
        // Calling the https request (GET) for "users" API and saving its response into a variable.
        const response = await this.fakerApi.get('users')
        // Converting the API response (in json format) and save it in a variable.
        const responseBody = await response.json(); 
        // Getting the first user from the API response and returning it.
        return  responseBody[0];
    }

    // Method to to call the https request (POST) for "users/1/todos" and get its response.
    async createUserToDo() {
        // Calling the https request (POST) for "users" API and saving its response into a variable
        const postResponse = await this.fakerApi.post( 'users/1/todos', 
            {
                data: {
                    "title": "Learn Playwright", 
                    "completed": "false"
                } 
            });

        // Converting the API response (in json format) and and returning it.
        return  await postResponse.json();
    }
}

// Exporting the class so that other files can be import it
export default new APIController();