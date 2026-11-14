const {test, expect, request} = require('@playwright/test');
const{customTest} = require("../../Utils/fixtures");

customTest("@Regression Usage of fixtures", async({authenticatedPage, createOrder,testDataForOrder})=>{

    //Rquirement:  loging, create order and verify from history 
await authenticatedPage.goto("https://rahulshettyacademy.com/client/");

await authenticatedPage.locator("button[routerlink*='myorders']").click({ timeout: 60000 });
await authenticatedPage.locator("tbody").waitFor({ timeout: 60000 });
// assert that if orderId is visible 
await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
console.log(testDataForOrder.productName); //printing the product name

})

/* Result set :


Running 1 test using 1 worker
tests\UI\fixture-usage.spec.js:4:12 › Usage of fixtures
ORDER JSON: {
  orders: [ '6ae50f74a90a419aa8366b77' ],
  productOrderId: [ '6960eac0c941646b7a8b3e68' ],
  message: 'Order Placed Successfully'
}
ZARA COAT 3
  1 passed (17.8s)


*/
