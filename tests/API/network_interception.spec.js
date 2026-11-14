const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../../Utils/APIUtils');

const loginPayload = {
    userEmail: "yilma.mek@gmail.com",
    userPassword: "Learn2026"
};

const orderPayload = {
    orders: [{
        country: "India",
        productOrderedId: "6960eac0c941646b7a8b3e68"
    }]
};

const fakePayLoadOrders = {
    data: [],
    message: "No Orders"
};

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload, orderPayload);

    response = await apiUtils.createOrder();
    console.log(response);
});

test('@API No order in order table - Network Intercept', async ({ page }) => {

    test.setTimeout(120000);

    await page.addInitScript(({ token, email }) => {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userEmail', email);
    }, {
        token: response.token,
        email: loginPayload.userEmail
    });

    // Register route BEFORE navigation/click
    await page.route('**/api/ecom/order/get-orders-for-customer/**', async route => {

        console.log('Intercepted:', route.request().url());

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakePayLoadOrders)
        });
    });

    await page.goto(
        'https://rahulshettyacademy.com/client/#/dashboard/',
        {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        }
    );

    await page.locator("button[routerlink*='myorders']").click();

    await page.waitForResponse(resp =>
        resp.url().includes('get-orders-for-customer')
    );

    const noOrdersMessage = page.getByText('No Orders');

    await expect(noOrdersMessage).toBeVisible({ timeout: 30000 });

    console.log(await noOrdersMessage.textContent());
});