// ===Helper method for loginn to event page===
const {test, expect} = require("@playwright/test");

async function loginAndGoToEvents(page) {

    await page.goto(" https://eventhub.rahulshettyacademy.com");
    await page.locator("#email").fill("yilma.mek@gmail.com");
    await page.locator("#password").fill("Learn2026$");
    await page.locator("#login-btn").click({ timeout: 60000 });


    // Wait for login to complete by waiting for ANY events link
    await page.locator('a[href="/events"]').first().waitFor();
    console.log(await page.title());

    // Click the correct events link
    await page.locator('a[href="/events"]').first().click({ timeout: 60000 });

    // Navigate to events page
    await page.waitForURL("**/events");

}
module.exports = { loginAndGoToEvents };
