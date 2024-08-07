import { Page } from '@playwright/test'
import UploadComponent from './component/upload.component'

// Creating the class
class CartPage {

    // Declaring the properties of the class (mandatory in TypeScript)
    private page: Page;

    // Creating the constructor and initializing the properties 
    constructor (page: Page) {
        this.page = page;  // To be able to have access to "page" property
    }

    
    // ******  Helper methods  ******

    // Instantiate "UploadComponent" class (create an objet of that class) and return it
    uploadComponent () {
        return new UploadComponent(this.page);
    }

    // Navigate to an specific url
    async navigate () {
        await this.page.goto('/cart/');
    }

}

// Exporting the class (to be able to import it from another files)
// "export" is to be able to use this file in another test file
// "default" is just to export this default class right here
export default CartPage;

