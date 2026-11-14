// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { trace } = require('node:console');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
// you put config in variable - const config
const config = defineConfig({
  //test directory - where you can annotate to run tests 
  testDir: './tests',
  retries: 1,  // fail test cases will rerun once after fail. Good for flaky test
  //timeout - manual configuration - globally
  timeout: 12000,
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'on-failure'
    }],
    ['allure-playwright']
  ],
  //timeout - on asseration level - expect
  expect: {
    timeout: 12000
  },
  // reporter:"html",

  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    /* collect trace when retrying the failed test : 
     see https://playwright.dev/docs/trace-viewer */

    browserName: "chromium",
    headless: true,
    //Tracer
    //trace: 'retain-on-failure', // off , on 
    trace: 'on-first-retry', // off , on

    //Timeout 
    actionTimeout: 100 * 1000, // for click , fill etc
    navigationTimeout: 50 * 1000


  },

});
//exporting the  model wit syntax exports = config-  variable above
module.exports = config;
module.exports = defineConfig({
  testDir: './tests',

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'on-failure'
    }],
    ['allure-playwright']
  ]
});

