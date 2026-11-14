const { test, expect, request } = require('@playwright/test');
//global variable and java script object -loginPayload
const loginPayload = { userEmail: "yilma.mek@gmail.com", userPassword: "Learn2026" };
const orderPayload = { "orders": [{ "country": "India", "productOrderedId": "6960eae1c941646b7a8b3ed3" }] };
let token;
let orderId;
test.beforeAll(async () => {
  //===========lOGIN API ===========
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayload }
  );
  //asseration - for post 200,201, 204
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;   //
  console.log('Token : ', token);
  // =======Place order API =======
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {

        'Authorization': token,
        'Content-Type': 'application/json'
      },

    })

  console.log('Order status:', orderResponse.status());
  console.log('Order body:', await orderResponse.text());
  expect(orderResponse.ok(), `Create order failed: ${orderResponse.status()}`).toBeTruthy();
  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];

})
//=======Using the API order created , verify orderId from order table========
test("@API Place Order through API ", async ({ browser }) => {
  test.setTimeout(120000);
  const context = await browser.newContext({ headless: false });
  const page = await context.newPage();
  await page.addInitScript(({ token, email }) => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('userEmail', email);
  }, { token, email: loginPayload.userEmail });
  //console.log("Order Table View Page");
  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/", {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor({ timeout: 60000 });

  // Scanning the order table 
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < await rows.count(); ++i) {
    // getting the row order Id from the table
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    //comparing to get your recent order Id to table rowOrder Id
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click({ timeout: 60000 });
      break;
    }
  }
  //after getting the order , clik view button and review and assert 
  //if order is the correct order one 
  const orderIdDetails = await page.locator(".col-text").textContent();
  //asseration 
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

})
