const { test, expect, request } = require('@playwright/test');
//importing APIUtils classs
const { APIUtils } = require('../../Utils/APIUtils');
//Data - pair value format
const loginPayload = { userEmail: "yilma.mek@gmail.com", userPassword: "Learn2026" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll(async () => {
  //===========lOGIN API  refactored ===========
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload, orderPayload);
  response = await apiUtils.createOrder(orderPayload);
  console.log(response);
})
//=======Using the API order created , verify orderId from order table========

test("@API Place Order through API ", async ({ page }) => {
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
  await page.locator("button[routerlink*='myorders']").click({ timeout: 60000 });
  await page.locator("tbody").waitFor({ timeout: 60000 });

  // ========order history -Scanning the orderId  from table======= 
  const rows = await page.locator("tbody tr"); // order row 
  for (let i = 0; i < await rows.count(); ++i) {
    // getting the row order Id from the table
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    //comparing to get your recent order Id to table rowOrder Id
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click({ timeout: 60000 });
      break;
    }
  }
  //after getting the order , clik view button and review and assert 
  //if order is the correct order one 
  const orderIdDetails = await page.locator(".col-text").textContent();
  //asseration 
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

//shift + ctrl + B to run debug view - debug: debug npm script 