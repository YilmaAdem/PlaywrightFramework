const { test, expect } = require("@playwright/test");

/*Json ->string->JS object */
const { LoginPage } = require('../PageObjects/LoginPage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const{CheckoutPlaceOrder} = require('../PageObjects/CheckoutPlaceOrder');
const {OrderHistory}=require('../PageObjects/OrderHistory');
const dataset = require('../../Utils/placeOrderTestData.json');
test.describe.configure({mode:'parallel'});
test('@SmokeTest Page object - Let us shop', async ({ page }) => {
    // Design patterh -PO is for login 
    console.log("=========Test Data Driven Test=======");
    test.setTimeout(90000);
    // Login Page Object
    const loginPage = new LoginPage(page);
    await loginPage.goToUrl();
    await loginPage.validLogin(dataset.username, dataset.password);
    
    // Dashboard Page Object
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchAddProduct(dataset.productName);
    await dashboardPage.navigateToCart();

    //Submit order and validate 
    const checkoutPlaceOrder = new CheckoutPlaceOrder(page);
    //checkout with item
    await checkoutPlaceOrder.cartpage();
    await checkoutPlaceOrder.withItemCheckout();
    //await checkoutPlaceOrder.dropdownlist();
    await checkoutPlaceOrder.PaymentSubmitOrder();

    //order history
    const orderHistory = new OrderHistory(page)
    await orderHistory.OrderTable();

})