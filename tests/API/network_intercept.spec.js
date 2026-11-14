const { test, expect, request } = require('@playwright/test');
//importing APIUtils classs
const { APIUtils } = require('../../Utils/APIUtils');
//Data - pair value format
const loginPayload = { userEmail: "yilma.mek@gmail.com", userPassword: "Learn2026" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    //===========lOGIN API  refactored ===========
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload, orderPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log(response);
})
//=======Network intercepting for no order in the Order table========

test("No order in orderTabel - Network intercept ", async ({ page }) => {
    await page.addInitScript(({ token, email }) => {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userEmail', email);
    }, { token: response.token, email: loginPayload.userEmail });

    //========order history- accessing the table====== 
    test.setTimeout(120000);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/", {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    // facker intercepting  the network before the order table  
    //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/",
        async route => {

            const response = await request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            });
        }
    )
    await page.locator("button[routerlink*='myorders']").click({ timeout: 60000 });
    await page.waitForResponse(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
});