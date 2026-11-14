
class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("#login");
    }

    async goToUrl() {
        await this.page.goto("https://rahulshettyacademy.com/client");
        await this.page.waitForLoadState('networkidle');
    }

    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
//need to be exported to expose for use
//in other file - you need to initialize the objects of class 
module.exports = { LoginPage };