const { test, expect } = require("@playwright/test");
const { LoginPage } = require('../PageObjects/LoginPage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const{CheckoutPlaceOrder} = require('../PageObjects/CheckoutPlaceOrder');
const {OrderHistory}=require('../PageObjects/OrderHistory');

test('@SmokeTest Page object - Let us shop', async ({ page }) => {
    // Design patterh -PO is for login 
    console.log("========= Design approach :Page object Pattern=======");
    test.setTimeout(90000);
    const username = "yilma.mek@gmail.com";
    const password = 'Learn2026';
    const productName = 'ZARA COAT 3';
    
    // Login Page Object
    const loginPage = new LoginPage(page);
    await loginPage.goToUrl();
    await loginPage.validLogin(username, password);
    
    // Dashboard Page Object
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchAddProduct(productName);
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

/* ========= Design approach :Page object Pattern=======
Products: []
Order Thank You Page
 | 6af268fa92a4341c4c0e0a16 | */