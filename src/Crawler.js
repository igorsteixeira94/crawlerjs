const puppeteer = require('puppeteer');


module.exports = class Crawler {

  constructor(page) {

    this.page = page;
    this.pageIndex = 1;
    this.offset = 0;
    this.limit = 12;
    this.totalProducts = 0;

  }

  //Extrair a quantidade de produtos que existem.
  async extractTotalProduct() {
    try {
      const textTotal = await this.page.evaluate(() => {
        return document.getElementsByClassName('filter ng-binding ng-scope')[0].innerHTML
      });

      this.totalProducts = (Number( textTotal.split(' ')[3]));

      return (`O total de produtos a serem crawleados é de : ${this.totalProducts}`)

    } catch (error) {
      return error;
    }

  }

  //Avança para a proxima pagina ! "Rolar o scroll"
  async nextPage() {
    console.log("Carregando proxima página...")

    //Inicio do scroll e carregamenda da nova pagina
    let previousHeight = await this.page.evaluate('document.body.scrollHeight');
    await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
    await this.page.waitFor(2000);
    //Fim do scroll e carregamento da nova pagina
    this.pageIndex += 1;
  }

  //Extrair os dados relacionados a pagina que ele se encontra !
  async extractProducts() {
    

    try {
      this.offset = (this.pageIndex - 1) * this.limit;
      console.log(`Extraindo dados da página ${this.pageIndex}`);
      const total = await this.page.evaluate((offset) => {

     
        //Acesso os elementos da infinite-scroll, com isso pego apenas os produtos visiveis(carregados)
        //Acesso a div panel-product, onde pego as informações como preço e nome.
        const extratedElements = document.querySelectorAll('infinite-scroll .panel-product');
        const products = [];
        var i;

        for(i = offset; i < (offset+12); i++){

          //crio um objeto com os dados que preciso.
          products.push({
          id: extratedElements[i].getAttribute('produto-sku'),
          name : extratedElements[i].getAttribute('produto-nome'),
          price :extratedElements[i].getAttribute('produto-preco')

        })
      }
        return products;
      },(this.offset))
      
      return(total)

    } catch (error) {
      return error;
      
    }


}
}