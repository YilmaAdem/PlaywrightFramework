/*https://playwright.dev/docs/test-fixtures
Test fixtures are used to establish the environment for each test,
giving the test everything it needs and nothing else.
Test fixtures are isolated between tests

*/
//custom fixture - reusable unit of code for setup and teardown on test
// extending from test 

const base = require("@playwright/test");
const {request} = require("@playwright/test");
const { APIUtils } = require("../Utils/APIUtils");
const loginPayload = { userEmail: "yilma.mek@gmail.com", userPassword: "Learn2026" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

exports.customTest = base.test.extend({
    // bring the code that enable us to login
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator("#userEmail").fill('yilma.mek@gmail.com');
        await page.locator("#userPassword").fill('Learn2026');
        await page.locator("#login").click();
        await use(page);

    },
    createOrder: async ({ }, use) => {
        //===========lOGIN API  refactored ===========
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayload, orderPayload);
        const response = await apiUtils.createOrder(orderPayload);
        await use(response);  
        //console.log("Nice!");  
    } ,
    testDataForOrder:{

      productName:"ZARA COAT 3"


    }
});

