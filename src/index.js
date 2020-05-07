const puppeteer = require('puppeteer');
const productTotal = require('./productTotal')

//Utilizo um delay de 5s, pois algumas paginas demoraram renderizar pela 1ªvez,

async function scroll(page,itemTargetCount,scrollDelay = 5000){

  let itemsPrev = [];

  const items =[];

   var pageIndex = 1;
  
   try {
    
    let previousHeight;
    
    while(items.length < itemTargetCount){
      
      itemsPrev = await page.evaluate((pageIndex)=>{
        const limit = 12; // indice da pagina, cada "passado do scroll ele incrementa uma pagina."
        
        //indica de onde o devemos continuar copiando o vetor (NodeList).
        let offset = (pageIndex - 1) * limit;

        //Acesso os elementos da infinite-scroll, com isso pego apenas os produtos visiveis(carregados)
        //Acesso a div panel-product, onde pego as informações como preço e nome.
        const extratedElements = document.querySelectorAll('infinite-scroll .panel-product');
        const products = [];
        
        var i = offset;
        for(i = offset; i < (offset+12); i++){

          //crio um objeto com os dados que preciso.
          products.push({
          id: extratedElements[i].getAttribute('produto-sku'),
          name : extratedElements[i].getAttribute('produto-nome'),
          price :extratedElements[i].getAttribute('produto-preco')

        })

        }
        return products
    
      },pageIndex);

      //Cada elemento do vetor item, simboliza todos os produtos de uma devida pagina,
      //items[0] -> todos os 12 produtos da pagina 1.
      //items[1] -> todos os 12 produtos da pagina 2.
      items.push(itemsPrev);  

      //Inicio do scroll e carregamenda da nova pagina
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
      //Fim do scroll e carregamenda da nova pagina

      pageIndex = pageIndex + 1;

    }
    return items;
    
  } catch (error) {

    console.log(error)

    return items;

  }

}

//função main 
(async () =>{

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  
  page.setDefaultTimeout(0); //"timeout infinito"
  page.setViewport({ width: 1280, height: 926 });
  
  await page.goto('https://www.paodeacucar.com/busca?qt=12&p=1&gt=list',{waitUntil: 'networkidle0'});

  const totalProducts = await productTotal();
  
  const totalPages = Math.ceil(totalProducts/12)

  //Para testar indico diminuir inicialmente o numero de paginas.
  const items = await scroll(page,totalPages)
  //passo minha classe page e a quantidade de arquivos que desejo estrair
  
  console.log(items);
  await browser.close();

})();