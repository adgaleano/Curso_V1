const { expect } = require('@playwright/test');

exports.LoginSwag = class LoginSwag{

    constructor(page){
        this.page=page;
        this.username = page.locator('//input[@id="user-name"]');
        this.password = page.locator('//input[@id="password"]');
        this.submit = page.locator('//input[@id="login-button"]');

        this.lblProducts = page.locator('.app_logo');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginUser(user, pass){
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.submit.click();
    }
}