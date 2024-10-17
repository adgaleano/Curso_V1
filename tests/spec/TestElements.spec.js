const { test, expect } = require('@playwright/test');
const { FormTextbox } = require('../pageobjects/Elements/FormUser');
const { CheckboxUser } = require('../pageobjects/Elements/CheckboxUser');
const { RadioButtonUser} = require('../pageobjects/Elements/RadioButtonUser');
const { WebTable } = require('../pageobjects/Elements/WebTable');
const { resolve } = require('path');
const { Buttons } = require('../pageobjects/Elements/Buttons');
const { Links } = require('../pageobjects/Elements/Links');
const { Uploads } = require('../pageobjects/Elements/Uploads');

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

test('Completar formulario con datos correctos', async ({page}) => {
    const textbox = new FormTextbox(page);
    await textbox.gotoForm();
    await textbox.completeForm('luca', 'prodan@test.com', 'Martinez 1', 'Martinez 2');    
    // await expect(loginPage.lblProducts, { name: 'Swag Labs' }).toBeVisible();
});

test('clickear en el checkbox Home', async({page}) => {
    const checkbox = new CheckboxUser(page);
    await checkbox.gotoCheckPage();
    await checkbox.checkBoxClickRows();
    await sleep(4000);
})

test('Deberia clickear en el checkbox que le paso por parametro', async({page}) => {
    const checkbox = new CheckboxUser(page);
    await checkbox.gotoCheckPage();
    await checkbox.selectCheckboxTree('Documents');
    await sleep(3000);
})

test('Permite clickear en un Raddio button pasado por parametro', async({page}) => {
    const radiobutton = new RadioButtonUser(page);
    await radiobutton.gotoRadiobuttonPage();
    await radiobutton.RadiobutonClickRows('Impressive');
    await sleep(3000); 
})

test('Agregar Empleado en WEB TABLES', async({page}) => {
    const webTables = new WebTable(page);
    await webTables.gotoWebTablePage();
    await webTables.addEmployeForm('Ramiro', 'Casta', 'rami@test.com', '30', '1200', 'Support');
    await sleep(3000);
})

test('Editar el campo de un empleado en WEB TABLES', async({page}) => {
    const webTables = new WebTable(page);
    await webTables.gotoWebTablePage();
    //En este test, si o si debe ser este usuario el que se deba editar. El metodo no contempla otro user. 
    await webTables.searchEmployeForm('Cierra');
    await expect(webTables.btnedit1Cierra).toBeVisible();
    await webTables.editNameEmployeForm('Jorgito');

    await sleep(3000);

})

test('Borrar el campo de un empleado en WEB TABLES', async({page}) => {
    const webTables = new WebTable(page);
    await webTables.gotoWebTablePage();
    //En este test, si o si debe ser este usuario el que se deba borrar. El metodo no contempla otro user. 
    await webTables.searchEmployeForm('Kierra');
    await expect(webTables.btnDelete1Kierra).toBeVisible();
    await webTables.deleteEmployeForm('Jorgito');
    await sleep(3000);
})

test('Probar funcionamiento de button eventos', async({page}) => {
    const buttons = new Buttons(page);
    await buttons.gotoButtonsPage();
    await buttons.doubleClick();
    // realizar un scroll en la pagina
    await page.mouse.wheel(0, 300);
    await buttons.rightClick();
    await buttons.clickDynamic();  
    await sleep(3000);
} )

test('Clickear en un link y esperar que se abra una pestania nueva', async ({page}) => {
    const links = new Links(page);
    await links.gotoLinksPage();
    await links.clickLink();


    await sleep(3000);
})

test('Subir un archivo a la pagina', async ({page}) => {
    const uploads = new Uploads(page);
    await uploads.gotoUploadsPage();
    await page.mouse.wheel(0, 300); //scroll
    await uploads.uploadFile();
    await sleep(3000);
})

test.only('Descargar archivo de la pagina', async({page})  => {
    const uploads = new Uploads(page);
    await uploads.gotoUploadsPage();
    await page.mouse.wheel(0, 300); //scroll    
    await uploads.downloadFile();
    await sleep(6000);

})

