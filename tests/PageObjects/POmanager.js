const { LoginPage } = require('../PageObjects/LoginPage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const{CheckoutPlaceOrder} = require('../PageObjects/CheckoutPlaceOrder');
const {OrderHistory}=require('../PageObjects/OrderHistory');

class POManager{

    constructor(page){
        this.page = page;
        this.LoginPage =new LoginPage(this.page); //declaring the page 
        this.DashboardPage = new DashboardPage(this.page);
        this.CheckoutPlaceOrder = new CheckoutPlaceOrder(this.page);
        this.OrderHistory = new OrderHistory(this.page);
  
    }
    getLoginPage(){

        return this.LoginPage;
    }
    getDashboardPage(){
        return this.DashboardPage;
    }

    getCheckoutPlaceOrder(){

        return this.CheckoutPlaceOrder;
    }
    getOrderHistory(){

        return this.OrderHistory;
    }

}
module.exports = {POManager};