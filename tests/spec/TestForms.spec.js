const { test, expect } = require('@playwright/test');
const { resolve } = require('path');
const { StudentForm } = require('../pageobjects/Forms/StudentForm');

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

test.only('Completar formulario de registro de estudiantes correctamente', async({page}) => {
    const student = new StudentForm(page);
    test.setTimeout(120000);
    await student.gotoForm();
    await student.addStudent('luca', 'prodan', 'test@test.com', 'Male', '123456789', '29 Sep 1991', 'Test Playwright Automation', 'Sports', 'C:/Repos/demo-qa-playwright/tests/archivos/pink_panther.jpg', 'San Martin', 'Uttar Pradesh', 'Merrut');
    await expect(page).toHaveTitle(/.*Thanks for submitting the form/);
})