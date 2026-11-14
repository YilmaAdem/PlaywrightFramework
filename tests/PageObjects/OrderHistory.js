const { expect } = require('@playwright/test');

class OrderHistory {

    constructor(page) {
        this.page = page;
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myorders = page.locator("button[routerlink*='myorders']");
        this.order = page.locator(".col-text");
    }

    async OrderTable() {

        // Clean order ID from Thank You page
        const orderIdText = (await this.orderId.textContent())
            .replace(/\|/g, '')
            .trim();

        console.log("Thank You Page Order ID:", orderIdText);

        await this.page.waitForLoadState('networkidle');

        await this.myorders.click();
        await this.page.waitForLoadState('networkidle');

        // Wait for table body (not rows)
        await this.page.locator("table.table-bordered tbody").waitFor();

        const rows = this.page.locator("table.table-bordered tbody tr");
        const rowCount = await rows.count();

        let clicked = false;

        for (let i = 0; i < rowCount; i++) {
            const rowOrderId = (await rows.nth(i).locator("th").textContent()).trim();
            console.log("Row Order ID:", rowOrderId);

            if (rowOrderId.includes(orderIdText)) {
                await rows.nth(i).locator("button").first().click();
                clicked = true;
                break;
            }
        }

        if (!clicked) {
            throw new Error("Order ID not found in table");
        }

        await this.page.waitForLoadState('domcontentloaded');

        await this.page.locator('.col-text').first().waitFor({ state: 'visible' });

        const orderIdDetails = (await this.order.first().textContent()).trim();
        expect(orderIdDetails).toContain(orderIdText);
    }
}

module.exports = { OrderHistory };
