const puppeteer = require('puppeteer');

module.exports = class Crawler {



  async start() {
   try {

    this.browser = await puppeteer.launch();

    const page = await this.browser.newPage();

    page.setDefaultTimeout(50000); //"timeout maximo de 50s"
    page.setViewport({ width: 1280, height: 926 });

    await page.goto('https://www.paodeacucar.com/busca?qt=12&p=1&gt=list',{waitUntil: 'networkidle0'});

    return page;

   } catch (error) {
     return error;
   }



  }

  async end(){
    this.browser.close();
  }
}
