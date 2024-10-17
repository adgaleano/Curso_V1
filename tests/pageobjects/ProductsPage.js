const { page, expect, locator } = require('@playwright/test');

exports.Products = class Products {

  constructor(page) {

    this.page = page;
    this.btnAddBackpack = page.locator('#add-to-cart');
    this.btnRemoveBackPack = page.locator('#remove-sauce-labs-backpack');
    this.btnRemoveDetailed = page.locator('#remove'); //este selector es el boton 'remove' cuando abris el producto
    this.lblTitleProduct = page.locator('//div[normalize-space()="Sauce Labs Fleece Jacket"]');
    this.imgProduct = page.locator('//img[@alt="Sauce Labs Backpack"]');
    this.lblPrice = page.locator('//div[@class="inventory_details_price"]');
    this.btnCart = page.locator('.shopping_cart_link');
    this.btnCheckout = page.locator('#checkout');
    this.txtBoxFirstName = page.locator('#first-name');
    this.txtBoxLastName = page.locator('#last-name');
    this.txtBoxCP = page.locator('#postal-code');
    this.btnContinueCheckbox = page.locator('#continue');
    this.lblCheckoutOK = page.locator('.title');
    
  }

  async gotoProducts() {
    await this.page?.goto('https://www.saucedemo.com/inventory.html');
  }

  //Este metodo en teoria deberia funcionar pero no esta tomando el nombre del producto por variable. Falta fixear eso
  async selectProduct (nameProduct){
    //esto selecciona el producto que yo le paso a traves de nameProduct
    const titleProduct = await this.page.locator(`//div[normalize-space()= '${nameProduct}']`);
    
    await titleProduct.click();
  }

  async addToCartProductSelected (){
    await this.btnAddBackpack.click();
  }

  async removeToCartProductSelected () {
    await this.btnRemoveDetailed.click();
  }

  //Este metodo es para abrir el producto y si esta habilitado el add to cart presionarlo, y si esta habilitado Remove presionarlo tmb
  async viewProductDetailed (nameProduct) {
    const addToCart = '#add-to-cart';
    const buttonCart = await this.page.locator(addToCart);
    await this.selectProduct(nameProduct);
    //con el metodo count() verifico si existe el elemento
    const count = await buttonCart.count(); //count() retorna el numero de elements que coinciden con el selector. Si no existe retorna 0
    if(count>0){
      await this.addToCartProductSelected();
    } else {
      await this.removeToCartProductSelected();
    }
    expect(count).toBeGreaterThan(0); //si el elemen no existe falla
    
  }

  async checkoutYourInformation (firstName, lastName, CP){
    await this.btnCart.click();
    await this.btnCheckout.click();
    await this.txtBoxFirstName.fill(firstName);
    await this.txtBoxLastName.fill(lastName);
    await this.txtBoxCP.fill(CP);
    await this.btnContinueCheckbox.click();
    await expect(this.lblCheckoutOK).toContainText('Checkout: Overview');
  }
  

  
};