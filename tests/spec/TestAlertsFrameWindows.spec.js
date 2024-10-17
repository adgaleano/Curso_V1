const { test, expect } = require('@playwright/test');
const { resolve } = require('path');
const { BrowserWindows } = require('../pageobjects/Alerts. frame and windows/BrowserWindows');



const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

test('Abrir nueva pestana', async ({page}) => {
    const browserWin = new BrowserWindows(page);
    await browserWin.gotoForm();
    await browserWin.clickNewTab();
    // await expect(loginPage.lblProducts, { name: 'Swag Labs' }).toBeVisible();
});

