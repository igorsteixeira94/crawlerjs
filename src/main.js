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

  let totalProducts = 0
  while (totalProducts < crawler.totalProducts) {

    const products = await crawler.extractProducts();
    products.map(product => Gravar(product.id, product.name, product.price))

    totalProducts += products.length;

    console.log(`Extraido ${products.length} produtos da página ${crawler.pageIndex}. ${totalProducts} de ${crawler.totalProducts} produtos no banco de dados.`);

    await crawler.nextPage();

  }

  await browser.end();

}
main()
