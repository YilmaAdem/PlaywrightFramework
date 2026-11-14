const { test, expect } = require('@playwright/test');

test("@SmokeTest Screenshot and visual test", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //screenshot at locator level
    await page.locator("#displayed-text").screenshot({path:"Screenshot1.png"});
    await page.locator("#hide-textbox").click();
    //screenshot at page level
    await page.screenshot({path: "Screenshot2.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();

})
/*
test.only("Visual comparison ", async({page}) =>{

    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('google.png');
    //await expect(page).toHaveScreenshot("Landing1.png");

    
})*/

