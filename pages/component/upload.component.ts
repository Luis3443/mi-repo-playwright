import { Page, Locator } from '@playwright/test'

// Creating the class
class UploadComponent {

    // Declaring the properties of the class (mandatory in TypeScript)
    private page: Page;
    uploadInput: string;
    uploadBtn: Locator;
    successText: Locator;

    // Creating the constructor and initializing the properties 
    constructor (page: Page) {
        this.page = page;  // To be able to have access to "page" property
        this.uploadInput = 'input#upfile_1';
        this.uploadBtn = page.locator('#upload_1');
        this.successText = page.locator('#wfu_messageblock_header_1_1');
    }


    // ******  Helper methods  ******

    // Upload a file
    async uploadFile(filePath: string) {
        // Upload the test file (it's like clicking on "Select File" button and select the file from the OS explorer)
        await this.page.setInputFiles(this.uploadInput, filePath);

        // Click on "Upload File" button
        await this.uploadBtn.click();
    }

}

// Exporting the class (to be able to import it from another files)
// "export" is to be able to use this file in another test file
// "default" is just to export this default class right here
export default UploadComponent;