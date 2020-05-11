const puppeteer = require('puppeteer');

const Browser = require('./Browser');
const Crawler = require('./Crawler');
const Gravar = require('./Record');

async function main() {

  //Iniciando o navegador
  const browser = new Browser();

  //'acessando o site'
  const page = await browser.start();

  const crawler = new Crawler(page);

  console.log("Iniciando o Crawler/Web Scraping");

  console.log(await crawler.extractTotalProduct());

  while (crawler.pageIndex < 2) {

    const products = await crawler.extractProducts();
    products.map(product => Gravar(product.id, product.name, product.price))

    await crawler.nextPage();

  }

  await browser.end();

}
main()