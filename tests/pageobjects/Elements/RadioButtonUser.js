const { expect, page } = require('@playwright/test');

exports.RadioButtonUser = class RadioButtonUser {

  
  constructor(page) {

    this.page = page;
    this.lblTextSuccess = page.locator('.text-success');
  }

  async gotoRadiobuttonPage() {
    await this.page?.goto('https://demoqa.com/radio-button');
  }

  async RadiobutonClickRows (nameRadio){
    await this.page.getByText(nameRadio).click();
    await expect(this.lblTextSuccess, { nameRadio }).toBeVisible();
  }

  
};