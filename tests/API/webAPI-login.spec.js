const { test, expect, request} = require('@playwright/test');
//global variable and java script object -loginPayload
const loginPayload = {userEmail: "yilma.mek@gmail.com", userPassword: "Learn2026"};
let token;
test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayload }
  );
 //asseration - for post 200,201, 204
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;   //
  console.log(token);
});

test('@API Client App login', async ({browser}) => {
    test.setTimeout(120000);
   const context = await browser.newContext({headless:false});
   const page  = await context.newPage();
   //How playwright read java script expression - there is a method that evaulates
   // when page is navigated. it accept value arg inside the method
   //If you only set token, the app still thinks you are not logged in.
   //So, use token and email
   await page.addInitScript(({ token, email }) => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('userEmail', email);
  }, { token, email: loginPayload.userEmail });
   //const productName = 'ZARA COAT 3';
   await page.goto("https://rahulshettyacademy.com/client/#/dashboard/", {
   waitUntil: 'domcontentloaded',timeout: 60000});
   //wait page to load
   //await page.waitForLoadState('networkidle');
   //await page.locator(".card-body b").first().waitFor();
   await page.locator(".card-body").first().waitFor();
   //Start listening for the add-to-cart request BEFORE clicking

  const addToCartDone = page.waitForResponse(
    resp => resp.url().includes('add-to-cart') && resp.request().method() === 'POST'
  );
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();

   await addToCartDone;

   /* listening the flicking page
    console.log('URL after add:', page.url());
    const buttons = await page.locator('button').evaluateAll(els =>
    els.map(b => b.outerHTML.slice(0, 200))
    );
    console.log(buttons.join('\n'));
  */

   await page.locator('button[routerlink*="cart"]').click({ timeout: 60000});
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 //checkout 
    await page.getByRole("button", {name:'Checkout'}).click();
 
});
// listening the webpage if it is loaded
  test('@API  debug goto', async ({ page }) => {
     const response = await page.goto("https://rahulshettyacademy.com/client/#/dashboard/", {
       waitUntil: 'domcontentloaded',
       timeout: 60000
     });
     console.log('Status:', response?.status());
     console.log('Title:', await page.title());
   });
