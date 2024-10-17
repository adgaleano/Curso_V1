const { test, expect } = require('@playwright/test');
const { LoginSwag } = require('../pageobjects/LoginSwag');

test('Completar Formulario de usuario', async ({page}) => {
    const loginPage = new LoginSwag(page);
    await loginPage.goto();
    await loginPage.loginUser('standard_user','secret_sauce');
    await

    await expect(loginPage.lblProducts, { name: 'Swag Labs' }).toBeVisible();
});