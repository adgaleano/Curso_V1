const { test, expect } = require('@playwright/test');
const { LoginSwag } = require('../pageobjects/LoginSwag');
const { Products } = require('../pageobjects/ProductsPage');

test.beforeEach(async ({ page, isMobile }) => {
    const loginPage = new LoginSwag(page);
    await loginPage.goto();
    await loginPage.loginUser('standard_user','secret_sauce');
  });

test('Agregar un producto al carrito desde Product Page', async ({page}) => {
    const products = new Products(page);
    await products.gotoProducts();
    await products.addToCartProductSelected();
    
    // await expect(loginPage.lblProducts, { name: 'Swag Labs' }).toBeVisible();
});
  

test('Eliminar un producto del carrito', async ({page}) => {
    const products = new Products(page);
    await products.gotoProducts();
    await products.addToCartProductSelected();
    await page.pause();
    await products.removeToCartProductSelected();
});

test('Agregar un producto a un carrito desde el Detalle', async ({page}) => {
    const products = new Products(page);
    await products.gotoProducts();
    await products.viewProductDetailed('Sauce Labs Backpack');

});

test('Checkout: Your Information', async({page}) => {
    const products = new Products(page);
    await products.gotoProducts();
    await products.checkoutYourInformation('test2', 'gago', '2325');
    await page.pause();
})
