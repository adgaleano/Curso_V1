const { expect, page } = require('@playwright/test');
const { Util } = require('../Util.page');

exports.FormTextbox = class FormTextbox {

  constructor(page) {

    this.page = page;
    this.util = new Util(page);

    this.btnTextBox = page.locator('//span[normalize-space()="Text Box"]');
    this.inputUserName = page.locator('#userName');
    this.inputUserMail = page.locator('#userEmail')
    this.inputAdress1 = page.locator('#currentAddress')
    this.inputAdress2 = page.locator('#permanentAddress');
    this.btnSubmit = page.locator('//button[@id="submit"]');

    this.lblNameAssert = page.locator('#name');
  }

  async gotoForm() {
    await this.page?.goto('https://demoqa.com/text-box');
  }



  async completeForm (name, email, adress1, adress2){
    
    await this.util.clearAndTypeTextField(this.inputUserName, name);
    
    await this.util.completeEmailField(this.inputUserMail, email);
    
    await this.inputAdress1.fill(adress1);
    await this.inputAdress2.fill(adress2);
    await this.btnSubmit.click();
    await expect(this.lblNameAssert, { name: name }).toBeVisible();
  }

  
}
