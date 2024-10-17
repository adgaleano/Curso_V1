const { expect, page, locator } = require('@playwright/test');
const { FormTextBox } = require('./FormUser');

// exports.WebTable = class WebTable {

class Links {

  
  constructor(page) {

    this.page = page;
    this.formUser = new FormTextBox(page);

    
    

    this.btnLink = page.locator('#simpleLink');

  }

  async gotoLinksPage() {
    await this.page?.goto('https://demoqa.com/links');
  }

  // controlar cuando se abre una pestana nueva 
  async clickLink() {
    await this.btnLink.click();
    await expect(page).toHaveURL('https://demoqa.com/');
  }  
  
  
}
module.exports = { Links };