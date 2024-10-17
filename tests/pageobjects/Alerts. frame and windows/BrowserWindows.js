const { expect, page, chromium } = require('@playwright/test');
const { Util } = require('../Util.page');

exports.BrowserWindows = class BrowserWindows {

  constructor(page) {

    this.page = page;
    this.util = new Util(page);

    this.btnNewTab = page.locator('#tabButton');
    this.lblMessageSuccess = page.locator('#sampleHeading');
    this.btnNewWindow = page.locator('#windowButton');
    this.btnNewWindowsMessage = page.locator('#messageWindowButton');
    

  }

  async gotoForm() {
    await this.page?.goto('https://demoqa.com/browser-windows');
  }

  async clickNewTab() {
    const browser = await chromium.launch({
      headless: false
    });
    const page = await browser.newPage();

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'), //escuchar la apertura de una nueva ventana
      await this.btnNewTab.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded'); //esperar a que se cargue la nueva pestania

    const headerText = await newPage.textContent(this.lblMessageSuccess); 
    expect(headerText).toBe('This is a sample page');
    await newPage.close();
    await browser.close();
  }


  

  
}
