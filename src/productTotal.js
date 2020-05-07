const puppeteer = require('puppeteer');
/*Modulo apenas para pegar o total de produtos existentes*/
module.exports = productTotal = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.paodeacucar.com/busca?qt=12&p=1&gt=list');
  const textTotal = await page.evaluate(() => {
    return document.getElementsByClassName('filter ng-binding ng-scope')[0].innerHTML
  })

  await browser.close();
  return (Number( textTotal.split(' ')[3]))
}

