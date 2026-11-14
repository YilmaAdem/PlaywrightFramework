
import { test, expect } from '@playwright/test';

test("@SmokeTest Add to cart and submit order", async ({ browser }) => {
   // ====Customer Loging Page =======
   console.log("Customer Loging Page");
   const email = 'yilma.mek@gmail.com';
   const context = await browser.newContext({ headless: false });
   const page = await context.newPage();
   const userName = page.locator('#userEmail');
   const passWrd = page.locator("#userPassword");
   //const itemTitles = page.locator(".card-body");
   //access the site
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   //login 
   await userName.fill('yilma.mek@gmail.com');
   await passWrd.fill('Learn2026');
   await page.locator("#login").click();

   // ========Add item to Cart Page=====
   console.log("Add item to Cart Page");
   //search items and add to cart and checkout
   await page.locator(".card-body", { hasText: "ZARA COAT 3" })
      .getByRole("button", { name: "Add To Cart" })
      .click();
   // Go to cart
   await page.locator("button[routerlink='/dashboard/cart']").click();
   // Assert item is visible in cart
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   //checkout 
   await page.getByRole("button", { name: 'Checkout' }).click();

   // =============Payment Page==============
   console.log(" Payment Page");
   //wait to load payment page
   await page.waitForLoadState('networkidle');
   await expect(page.getByText("Shipping Information")).toBeVisible();
   await page.locator("[placeholder*='Country']").pressSequentially("United", { delay: 100 });
   //
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   // state options 
   const optionCount = await dropdown.locator("button").count();
   //iterate through 
   for (let i = 0; i < optionCount; i++) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text.trim() === "United States") {
         await dropdown.locator("button").nth(i).click();
         break;
      }

   }
   // asseration on the email - grayed one 
   await expect(page.locator(".user__name [type = 'text']").first())
      .toHaveText(email);

   //waiting the dropdown of the months    
   await page.waitForSelector("select.input.ddl", { state: 'visible' });
   await page.locator("select.input.ddl").nth(0).selectOption('11');  // Month
   await page.locator("select.input.ddl").nth(1).selectOption('26');  // Year
   // credit card
   await page.locator("input.input.txt").nth(0).fill("4012000077777");
   //CVV
   await page.locator("input.input.txt").nth(1).fill("432");

   //await page.locator("div:has-text('CVV Code') input.input.txt").nth(1).fill('432');
   // Name on the card
   await page.locator("input.input.txt").nth(2).fill("Yilma D");
   //Place order button - two ways - css locator or getByRole
   //await page.getByRole("button", {name:'PLACE ORDER'}).click();
   await page.locator(".action__submit").click()

   await page.waitForLoadState('networkidle');
   // ======Order Submit thank you Page========
   console.log("Order Thank You Page");
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   //Grab the order number
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   // ==============Order Table view========
   // how to scan order in the order table
   console.log("Order Table View Page");
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();

   // Scanning the order table 
   const rows = await page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
      // getting the row order Id from the table
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      //comparing to get your recent order Id to table rowOrder Id
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   //after getting the order , clik view button and review and assert 
   //if order is the correct order one 
   const orderIdDetails = await page.locator(".col-text").textContent();
   //asseration 
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

})