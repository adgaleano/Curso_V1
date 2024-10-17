const { expect, page, selectors } = require('@playwright/test');

const file = "C:/Repos/demo-qa-playwright/tests/archivos/upload_file.txt";


exports.Uploads =  class Uploads  {

  
  constructor(page) {

    this.page = page;
    this.btnUpload = page.locator('#uploadFile');
   
  }

  async gotoUploadsPage() {
    await this.page?.goto('https://demoqa.com/upload-download');
  }

  async uploadFile() {
    // const selector = await this.page.locator(this.btnUpload); 
    await this.btnUpload.setInputFiles(file);
  }

  async downloadFile(){
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Download').click();
    const download = await downloadPromise; 
    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('C:\Repos\demo-qa-playwright\tests\archivos' + download.suggestedFilename());

    page.on('download', download => download.path().then(console.log));
    
  }  

  
}
