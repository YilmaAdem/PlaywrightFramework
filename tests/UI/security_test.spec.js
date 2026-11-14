
const { test, expect } = require("@playwright/test");
test("@SmokeTest Order Table: Security test scenario", async ({ page }) => {
  test.setTimeout(120000);

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill('yilma.mek@gmail.com');
  await page.locator("#userPassword").fill('Learn2026');
  await page.locator("#login").click();

  await page.locator(".card-body b").first().waitFor({ timeout: 60000 });
  await page.locator("button[routerlink*='myorders']").click();

  // ⭐ Register route BEFORE the request happens
  await page.route("**/api/ecom/order/get-orders-details*", route => {
    route.continue({
      url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"
    });
  });

  // Now load the table
  await page.locator("tbody").waitFor({ timeout: 60000 });

  // Trigger the intercepted request
  await page.locator("button:has-text('View')").first().click();

  // Assert the unauthorized message
  const messageLocator = page.getByText("You are not authorize to view this order");
  await messageLocator.waitFor({ timeout: 30000 });

  const message = await messageLocator.textContent();
  console.log(message);

  await expect(messageLocator).toBeVisible();
});
