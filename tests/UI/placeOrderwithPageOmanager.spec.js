const { test, expect } = require("@playwright/test");
const {POManager} = require('../PageObjects/POmanager');

/*Json ->string->JS object */
const dataset = require('../../Utils/placeOrderTestData.json');

test('@Regression Page object - Let us shop', async ({ page }) => {
    // Design patterh -PO is for login 
    console.log("=========Page Object Manager =======");
    test.setTimeout(90000);
    // Page Object manager 
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl();
    await loginPage.validLogin(dataset.username, dataset.password);
    
    // Dashboard Page Object getDashboardPage
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchAddProduct(dataset.productName);
    await dashboardPage.navigateToCart();

    //Submit order and validate 
    const checkoutPlaceOrder = poManager.getCheckoutPlaceOrder();
    //checkout with item
    await checkoutPlaceOrder.cartpage();
    await checkoutPlaceOrder.withItemCheckout();
    //await checkoutPlaceOrder.dropdownlist();
    await checkoutPlaceOrder.PaymentSubmitOrder();

    //order history
    const orderHistory = poManager.getOrderHistory();
    await orderHistory.OrderTable();

})