import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async({browser})=>{
 const context = await browser.newContext({headless:false});
 const page = await context.newPage();
 await page.goto("https://rahulshettyacademy.com/angularpractice/");
 //locators by  label - click , check box
 await page.getByLabel("Check me out if you Love IceCreams!").click();
 await page.getByLabel("Employed").check();
 await page.getByLabel("Gender").selectOption("Female");
 //special locators by place order - password, username
 //await page.getByPlaceholder("Name").fill("Yilma");
 //await page.getByPlaceholder("Email").fill("yilma.mek@gmail.com");
 await page.getByPlaceholder("Password").fill("Learn2026");

 //special locators by role - such as button 
 await page.getByRole("button", {name :'Submit'}).click();
 await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

 //for the menu on the top of the page
 await page.getByRole("Link", {name :'Shop'}).click();//

});
test('@Regression Playwright Test Level timeout ', async({browser})=>{
    //timeout at test level
 const slowAssert = expect.config({timeout:9000}); // override timeout of config
 const context = await browser.newContext({headless:false});
 const page = await context.newPage();
 await page.goto("https://rahulshettyacademy.com/angularpractice/");
 //locators by  label - click , check box
 await page.getByLabel("Check me out if you Love IceCreams!").click();
 await page.getByLabel("Employed").check();
 await page.getByLabel("Gender").selectOption("Female");
 //special locators by place order - password, username
 //await page.getByPlaceholder("Name").fill("Yilma");
 //await page.getByPlaceholder("Email").fill("yilma.mek@gmail.com");
 await page.getByPlaceholder("Password").fill("Learn2026");

 //special locators by role - such as button 
 await page.getByRole("button", {name :'Submit'}).click();
 await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
 // Asseration with overriding the config timeout if team asked approval to 9s
 await slowAssert(page.getByText("Success! The Form has been submitted successfully!.")).toBeChecked();
 //for the menu on the top of the page
 await page.getByRole("Link", {name :'Shop'}).click({timeout:15000});// line level
 //using slow timeout asseration 
 await slowAssert(page.locator(".my-4")).toHaveText("Shop");
})
/*npx playwright test --UI , used as a test runner . It opens
runner and you can see what is going on for each steps of the code

*/