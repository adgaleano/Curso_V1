const { expect, page, locator } = require('@playwright/test');
const { FormTextBox } = require('./FormUser');

// exports.WebTable = class WebTable {

class Buttons {

  
  constructor(page) {

    this.page = page;
    this.formUser = new FormTextBox(page);

    this.btnDoubleClick = page.locator('#doubleClickBtn'); 
    this.btnRightClick = page.locator('#rightClickBtn');
    this.btnClick = page.locator('//button[@id="RYxLg"]');

    this.lblDoubleClick = page.locator('#doubleClickMessage');
    this.lblRightClick = page.locator('#rightClickMessage');
    this.lblClick = page.locator('#dynamicClickMessage');
  }

  async gotoButtonsPage() {
    await this.page?.goto('https://demoqa.com/buttons');
  }

  async doubleClick() {
    await this.btnDoubleClick.dblclick();
    await expect(this.lblDoubleClick).toContainText('You have done a double click');
  }

  async rightClick() {
    await this.btnRightClick.dispatchEvent('contextmenu');
    await expect(this.lblRightClick).toContainText('You have done a right click');
  }   
  async clickDynamic() {   
    await this.page.getByRole('button', { name: 'Click Me', exact: true }).click();
    await expect(this.lblClick).toContainText('You have done a dynamic click'); 
  }  
  
  
} 
module.exports = { Buttons };