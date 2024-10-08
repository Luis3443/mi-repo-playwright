import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // reporter: 'allure-playwright',
  // reporter: [ ['html'], ['list'] ],  // Wnen we want to use several types of reports
  // reporter: [ ['allure-playwright'], ['line'] ],  // Wnen we want to use several types of reports
  reporter: [ ['allure-playwright', {outputFolder: 'test-results'}], ['line'] ],  // Wnen we want to use several types of reports.
    // Note: The stuff inside "{}" means that the allure test results now will be saved in "test-results" folder instead in "allure-report"
  

  // Configuration for Signed-in State - This is registering the global setup file to be used for all the tests.
  globalSetup: require.resolve('./utils/global-setup'),

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://practice.sdetunicorns.com',
    // baseURL: 'http://127.0.0.1:3000',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on',  // Shows the trace (in the results report) for each tests. 
    // trace: 'off',  // Do not show the trace (in the results report).
    trace: 'retain-on-failure', // Shows the trace (in the results report) only for the tests that have failed.
    // trace: 'on-first-retry', // Shows the trace (in the results report) only when retrying a test for the first time.

    // Configuration for Signed-in State - It tells playwright to use the specific Storage state ("loggedInState.json") for all the tests.
    storageState: 'loggedInState.json'
  },

  /* Configure projects for major browsers */
  projects: [
    
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: false  },
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: false },
    },
    */


    /* Test against mobile viewports. */
    /*
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'], headless: false },
    },
    {
     name: 'Mobile Safari',
     use: { ...devices['iPhone 14 Pro Max'], headless: false },
    },
    */


    /* Test against branded browsers. */
    /*
    {
     name: 'Microsoft Edge',
     use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
     name: 'Google Chrome',
     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    */
  ],


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
