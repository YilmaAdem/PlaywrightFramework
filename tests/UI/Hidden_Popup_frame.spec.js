const{test, expect} = require('@playwright/test');

console.log(" ======== Frame and Pop up management ======")
test("@Regression Handle Hidden and popup pages", async({page})=>{
    test.setTimeout(90000);
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();


    //how to handle page on and off
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click({timeout:1600});
    await expect(page.locator("#displayed-text")).toBeHidden();

    // How to handle java popup - diaglog  accept or dismiss
    await page.locator("#confirmbtn").click({timeout:1600});
    page.on('dialog', dialog => accept());
   // page.on('dialog', dialog => dismiss());
   //How to handle hover on 
   await page.locator("#mousehover").hover();

    //handling frames(page.frameLocator) - Iframe - when you get them in web page that leads to open in other page 
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator("li a[href*='lifetime-access']:visible").click({timeout:1600});
    // capture 13,522 from *Join 13,522 Happy Subscibers! * /
    const textCheck =await framePage.locator(".test h2").textContent();
    console.log(textCheck.split("") [1]);




})