const { expect } = require('@playwright/test');
const exp = require('constants');

const config = {}

config.url = 'https://demoqa.com';

config.student = {
  name: 'Juan Pablo',
  lastName: 'Rodriguez',
  email: 'jprod@test-playwright.com',
  gender: 'Male',
  mobile: '1234567890',
  dateOfBirth: '29 Sep 1991',
  subject: 'Test automation playwright',
  hobby: 'Music and dance',
  picture: 'C:/Repos/demo-qa-playwright/tests/archivos/pink_panther.jpg',
  adress: 'DC Whater 1023',
  state: 'El Paraiso',
  city: 'Rosario'
}

class Util{

    constructor(page){
        this.page=page;
        
    }

    async clearAndTypeTextField(selector, text) {
        // await selector.waitFor();
        
        await selector.click(); // click on the text field
        await this.page.keyboard.press("Control+A");
        await this.page.keyboard.press('Delete');
        await selector.type(text);
        //Verificar que el texto fue ingresado correctamente
        const value = await selector.inputValue();
        expect(value).toBe(text);
      }

      async textboxDinamico (selector, text) {
        await this.page.waitForSelector('div', {state: 'visible'});
        await selector.fill(text);
        const valorInput = await selector.inputValue();
        expect(valorInput).toBe(text);
      }
      

      async completeEmailField (selector, email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //expresion regular regex, se utiliza para verificar si el texto tiene formato valido email
        //Verifica que el texto ingresado en el textbox sea en formato email
        await selector.fill(email);
        const emailValue = await selector.inputValue(); //inputValue() obtiene el valor actual del input
        const isValidEmail = emailRegex.test(emailValue);
        expect(isValidEmail).toBeTruthy(); //verifica si el email es valido, si no cumple falla el test
      }
    
      async completeNumberField (selector, number){ //verificar que el texto ingresado en un textbox sea solo números
    
        await selector.click();
        await selector.type(number);
        const inputValue = await selector.inputValue(); // Obtener el valor del textbox
        // Validar que el valor contenga solo números usando una expresión regular
        const numericRegex = /^\d+$/;
        const isNumeric = numericRegex.test(inputValue); 
    
        expect(isNumeric).toBeTruthy(); // Asegurarse de que el valor ingresado es solo números
      }

      async selectDateForText(selector, date){
        const dateSelected = await this.page.locator('//div[@aria-label="Choose Sunday, September 29th, 1991"]') //Este metodo selecciona uncamente esta fecha, ya harcodeado
        await selector.click();
        await this.page.keyboard.press("Control+A");
        await selector.type(date);
        await dateSelected.click();
        const value = await selector.inputValue();
        expect(value).toBe(date);

        
      }

      async uploadFile(selector, file) {
        await selector.setInputFiles(file);
      }

      // Método para seleccionar una opción del dropdown
  async selectDropdownOption(dropdownSelector, optionToSelect) {
    // Esperar que el dropdown esté visible
    // await this.page.waitForSelector(dropdownSelector);
    
    // Hacer clic en el dropdown para desplegar las opciones
    await dropdownSelector.click();
    
    // Esperar que las opciones estén disponibles
    await this.page.waitForSelector('.dropdown-options'); // Reemplaza con el selector correcto

    // Hacer clic en la opción deseada
    await this.page.click('.dropdown-options >> text=${optionToSelect}');

    // Verificar si la opción fue seleccionada
    const selectedValue = await this.page.$eval(dropdownSelector, el => el.value);
    return selectedValue === optionToSelect;

    await this.page.waitForTimeout(3000);
  }


      

     

      
    
}module.exports = {Util};


// async selectOptionSelector (selector, option){
      //   const combito = await this.page.locator(selector)
      //   await combito.selectOption(option);

      //   const valueCombo = await combito.inputValue();
      //   expect(valueCombo).toBe(option);
      // }

      // async selectOptionSelector (selector, option){
      //   await this.page.waitForSelector('div', {state: 'visible'});
      //   await selector.click();
      //   const selectedOption = await this.page.getByText(option, { exact: true }).click();

      //   const selectedValue = await this.page.$eval(selector, el => el.value);
      //   if (selectedValue === selectedOption) {
      //       console.log('El valor ha sido seleccionado correctamente.');
      //   } else {
      //       console.log('Error: El valor no se ha seleccionado correctamente.');
      //   }

      // async dropdownMultiple(selector, option){
      //   await this.page.waitForSelector('div', {state: 'visible'});
      //   await selector.click();
      //   await this.page.getByText(option, { exact: true }).click();

      //   const content = await combito.textContent();
      //   await expect(content).toBe(option);
        // console.log('El valor seleccionado es: ' + content);
       
        // await this.page.waitForSelector('div', {state: 'visible'});
        // await selector.click();
        // await this.page.getByText(option, { exact: true }).click();
        // const content = await selector.textContent();
        // await expect(content.includes(option)).toBeTruthy();}