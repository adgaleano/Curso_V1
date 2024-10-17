const { expect, page } = require('@playwright/test');

exports.CheckboxUser = class CheckboxUser {

  
  constructor(page) {

    this.page = page;
    this.checkHome = page.locator('//span[@class="rct-checkbox"]//*[name()="svg"]');
    this.lblHomeTag = page.locator('//span[normalize-space()="home"]');
    this.rowDesplegar = page.locator('//*[name()="path" and contains(@d,"M10 6L8.59")]');
  }

  async gotoCheckPage() {
    await this.page?.goto('https://demoqa.com/checkbox');
  }

  async checkBoxClickRows (){
    await this.checkHome.click();
    await expect(this.lblHomeTag, { name: 'home' }).toBeVisible();
  }

  async selectCheckboxTree (nameCheckbox){
    await this.rowDesplegar.click();
    await this.page.getByText(nameCheckbox).click();
  }

  
};