class DashboardPage {

    constructor(page) {
        this.page = page;
        this.product = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        //Dashboard cart
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]');
        this.checkout = page.getByRole("button", {name:'Checkout'});
        //this.shipping = page.getByText("Shipping Information");
        this.country = page.locator("[placeholder*='Country']");
    }

    async searchAddProduct(productName) {
        await this.product.first().waitFor({state:'visible'});
        const titles = await this.productText.allTextContents(); //list all items
        console.log("Products:", titles);

        await this.product
            .filter({ hasText: productName })
            .getByRole("button", { name: "Add to Cart" })
            .click();
    }

    async navigateToCart() {

        await this.cartButton.click({timeout :10000});
    }
    
}

module.exports = { DashboardPage };