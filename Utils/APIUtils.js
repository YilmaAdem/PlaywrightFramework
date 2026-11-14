class APIUtils {
    constructor(apiContext, loginPayload, orderPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.orderPayload = orderPayload;
    }
    // =====Two  methods - for login and create order ======
    // Login  by token -which one get inspect on login ->  network->cookies 
    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayload }
        );
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder() {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: this.orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        );
        const orderResponseJson = await orderResponse.json();
        console.log("ORDER JSON:",orderResponseJson);

        const orderId = orderResponseJson.orders[0];

        response.orderId = orderId;

        return response;
    
    }
}
module.exports = { APIUtils };
