
const { test, expect } = require("@playwright/test");
import { loginAndGoToEvents } from "../../Utils/helper";
import { SIX_EVENTS_RESPONSE } from "../../Utils/SixEvent";
import{FOUR_EVENTS_RESPONSE } from "../../Utils/fourEvent";

test.describe.configure({mode:'parallel'});
test("@SmokeTest Six Event Banner visible", async ({ browser }) => {
    test.setTimeout(90000);
    const context = await browser.newContext();
    const page = await context.newPage();
    //step 1 : Mock 
    await page.route("**/api/events**", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(SIX_EVENTS_RESPONSE),
        });
    });
    // login to event url 
    await loginAndGoToEvents(page);
    // verify cards are loaded and visible
    const cards = page.locator('[data-testid="event-card"]');
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(6);
    // Verify banner is visible
    const banner = page.getByText(/sandbox holds up to/i);
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("9 bookings");
});

test("@SmokeTest Four Event Banner Visible", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    //step 1 : Mock 
    await page.route("**/api/events**", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(FOUR_EVENTS_RESPONSE ),
        });
    });
    // login to event url 
    await loginAndGoToEvents(page);
    // verify cards are loaded and visible
    const cards = page.locator('[data-testid="event-card"]');
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(4);
    // Verify banner is visible
    const banner = page.getByText(/sandbox holds up to/i);
    await expect(banner).not.toBeVisible();

});