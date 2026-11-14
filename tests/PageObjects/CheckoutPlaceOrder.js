const { expect } = require('@playwright/test');
class CheckoutPlaceOrder {

    constructor(page) {
        this.page = page;
        this.checkout = this.page.getByRole("button", { name: 'Checkout' });
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.optionCount = this.dropdown.locator("button");
        this.state = page.locator("select.input.ddl");
        this.card = page.locator("input.input.txt");
        this.submit = page.locator(".action__submit");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

    }
    // Assertion example - in cart
    async cartpage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText('ZARA COAT 3')).toBeVisible();

    }
    async withItemCheckout() {

        await this.checkout.click();
        //asseration 
        //await this.page.waitForLoadState('networkidle');
        // Wait for the shipping section to appear
        await this.page.locator('.payment__shipping').waitFor({ state: 'visible' });

        await expect(
            this.page.locator('.payment__title', { hasText: 'Shipping Information' })
        ).toBeVisible();
    }
    async dropdownlist() {
        // Clear field
        await this.country.fill("");
        await this.page.waitForTimeout(300);

        // Type slowly to trigger Angular autocomplete
        await this.country.type("Uni", { delay: 300 });
        await this.page.waitForTimeout(500);

        // Wait for dropdown to be visible
        await this.dropdown.waitFor({ state: "visible" });

        const count = await this.optionCount.count();

        for (let i = 0; i < count; i++) {
            const text = (await this.optionCount.nth(i).textContent()).trim();
            if (text === "United States") {
                await this.optionCount.nth(i).click();
                break;
            }
        }
    }

    async PaymentSubmitOrder() {

        // Step 1: Select country FIRST
        await this.dropdownlist();

        // Step 2: Now wait for state dropdown to be ready
        /*await this.state.first().waitFor({ state: 'attached' });
        await this.state.first().waitFor({ state: 'visible' });
        await this.state.first().waitFor({ state: 'enabled' });
        */
        await expect(this.state.first()).toBeVisible();
        await expect(this.state.first()).toBeEnabled();
        // Step 3: Select state options
        await this.state.nth(0).selectOption('11');
        await this.state.nth(1).selectOption('26');

        // Step 4: Fill card details
        await this.card.nth(0).fill("4012000077777");
        await this.card.nth(1).fill("432");
        await this.card.nth(2).fill("Yilma D");

        // Step 5: Submit order
        await this.submit.click();

        // Step 6: Wait for Thank You page
        await this.page.locator('.hero-primary').waitFor({ state: 'visible' });
        await expect(this.page.locator(".hero-primary"))
            .toHaveText(" Thankyou for the order. ");

        const orderIdText = await this.orderId.textContent();
        console.log(orderIdText);
    }

}

module.exports = { CheckoutPlaceOrder };