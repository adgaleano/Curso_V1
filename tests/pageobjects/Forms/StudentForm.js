const { expect, page } = require('@playwright/test');
const { Util } = require('../Util.page');

exports.StudentForm = class StudentForm {

  constructor(page) {

    this.page = page;
    this.util = new Util(page);

    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.genderMale = page.locator('//label[@for="gender-radio-1"]');
    this.genderFemale = page.locator('#gender-radio-2');
    this.genderOther = page.locator('#gender-radio-3');
    this.mobile = page.locator('#userNumber');
    this.dateOfBirth = page.locator('#dateOfBirthInput');
    this.subjectPri = page.locator('#subjectsInput')
    this.subjects = page.locator('//div[@class="subjects-auto-complete__input"]');
    this.hobbies = page.locator('#hobbiesWrapper');
    this.uploadPicture = page.locator('#uploadPicture');
    this.currentAddress = page.locator('#currentAddress');
    this.state = page.locator('#state svg'); //#state
    this.city = page.locator('#city svg');
    this.btnSubmit = page.locator('#submit');

  }

  async gotoForm() {
    await this.page?.goto('https://demoqa.com/automation-practice-form');
  }

  async RadiobutonClickRows (gender){
    //Ciclo condicional IF para que valide si la variable gender es igual a 'Male', 'Female' o 'Other'
    if (gender === 'Male') {
      await this.genderMale.click();
      await expect(this.genderMale).toBeVisible();
    } else if (gender === 'Female') {
      await this.genderFemale.click();
      await expect(this.genderFemale).toBeVisible();
    } else if (gender === 'Other') {
      await this.genderOther.click();
      await expect(this.genderOther).toBeVisible();
    }
    
  }


  async addStudent (name, lastName, email, gender, mobile, dateOfBirth, subject, hobby, picture, adress, state, city) {
    await this.util.clearAndTypeTextField(this.firstName, name);
    await this.util.clearAndTypeTextField(this.lastName, lastName);
    await this.util.completeEmailField(this.email, email);
    await this.RadiobutonClickRows(gender);
    await this.util.completeNumberField(this.mobile, mobile);
    await this.util.selectDateForText(this.dateOfBirth, dateOfBirth);
    // await this.util.clearAndTypeTextFieldTwo(this.subjectPri,this.subjects, subject);
    await this.util.textboxDinamico(this.subjectPri, subject);
    await this.RadiobutonClickRows(this.hobbies, hobby);
    await this.util.uploadFile(this.uploadPicture, picture);
    await this.util.clearAndTypeTextField(this.currentAddress, adress);
    await this.util.selectDropdownOption(this.state, state);
    await this.util.selectDropdownOption(this.city, city);
    await this.btnSubmit.click();
  }

  
}
