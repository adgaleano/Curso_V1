const { expect, page } = require('@playwright/test');
const { Util } = require('../Util.page');

// exports.WebTable = class WebTable {

class WebTable {

  
  constructor(page) {

    this.page = page;
    this.util= new Util(page);

    this.btnAdd = page.locator('#addNewRecordButton');
    this.frameFormUser = page.locator('.modal-content');
    this.inputFirstname = page.locator('#firstName');
    this.inputLastname = page.locator('#lastName');
    this.inputEmail = page.locator('#userEmail');
    this.inputAge = page.locator('#age');
    this.inputSalary = page.locator('#salary');
    this.inputDepartment = page.locator('#department');
    this.btnSubmit = page.locator('#submit');

    this.inputSearchBar = page.locator('#searchBox');
    this.lblTitleFormRegistration = page.locator('#registration-form-modal');

    this.btnedit1Cierra = page.locator('//span[@id="edit-record-1"]//*[name()="svg"]');

    this.btnDelete1Kierra = page.locator('//span[@id="delete-record-3"]//*[name()="svg"]//*[name()="path" and contains(@d,"M864 256H7")]');
  }

  async gotoWebTablePage() {
    await this.page?.goto('https://demoqa.com/webtables');
  }

  async addEmployeForm (name, lastname, email, age, salary, department){ 
    const nameListUsers = await this.page.locator(`//div[normalize-space()='${name}'] `); 

    const title = await this.page.locator('#registration-form-modal');
    await this.btnAdd.click();
    await expect(title).toHaveText(/Registration Form/);

    await this.util.clearAndTypeTextField(this.inputFirstname, name)
    await this.util.clearAndTypeTextField(this.inputLastname, lastname);
    await this.util.completeEmailField(this.inputEmail, email);
    await this.util.completeNumberField(this.inputAge, age);
    await this.util.completeNumberField(this.inputSalary, salary);
    await this.util.clearAndTypeTextField(this.inputDepartment, department);

    await this.btnSubmit.click();
    await expect(nameListUsers).toContainText(name);
  }

  //Este metodo busca un usuario en particular porque el selector de Editar esta escrito para ese usuario
  async searchEmployeForm (textSearch){
    const nameListUsers = await this.page.locator(`//div[normalize-space()='${textSearch}'] `); 
    
    await this.util.clearAndTypeTextField(this.inputSearchBar, textSearch);

    await expect(nameListUsers).toContainText(textSearch);

  }

  //Este metodo lo unico que hace es editar el campo name, para editar otro campo hay que modificar el metodo
  async editNameEmployeForm (newName){
    const nameListUsers = await this.page.locator(`//div[normalize-space()='${newName}'] `);

    
    await this.btnedit1Cierra.click();
    await expect(this.lblTitleFormRegistration).toHaveText(/Registration Form/);

    await this.util.clearAndTypeTextField(this.inputFirstname, newName)
    await this.btnSubmit.click();
    await expect(nameListUsers).toContainText(newName);
  }

//eliminar un usuario de la tabla
  async deleteEmployeForm (newName){
    const nameListUsers = await this.page.locator(`//div[normalize-space()='${newName}'] `);
    await this.btnDelete1Kierra.click();

    // metodo tobevisible para verificar que el elemento se elimino de la tabla
    await expect(nameListUsers).not.toBeVisible();
  }

  
}
module.exports = { WebTable };