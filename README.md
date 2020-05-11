## Introdução:
 Crawler/web scraping são “robôs” que vasculham html estáticos em busca de informações. Teoricamente para se criar um web scraping basta enviarmos uma request via http para algum servidor e aguardar o envio do response e caso exista o html. 
Com o HTML em mãos, basta percorrermos a árvore DOM em busca dos nós/dados que desejamos.

## Problema 1:
O desafio ocorre quando esta pagina html retornada pelo servidor, possui algum javascript para renderização de forma dinâmica (por exemplo, construção de um elemento table consumindo uma api). Uma vez que cliente HTTP como, axios e request não conseguem “rodar esses scripts”.

## Solução 1:
A solução encontrada para o problema proposto foi o uso de um headless browser, de forma leiga, teremos um navegador sem cabeça, “um google-chrome nosso cliente http” ! Com isso conseguimos renderizar a página e acessar todo o html. Podendo assim percorrer a sua DOM em busca das informações desejadas !

## Problema 2:
A página em questão utiliza paginação e um infinite-scroll para apresentar os dados. Ou seja, como não temos acesso a API, temos que simular o scroll do mouse para ter acesso aos dados de forma linear. Porém a medida que “descemos a página com scroll”, ou seja trocamos de página, os elementos da página anterior também ficaram na DOM. Devemos tratar esta questão para não copiar dados de maneira repetida.

## Solução 2: 
 - Desenvolvido um script que faz o scroll da página (manipulando a DOM de maneira a parecer um usuário utilizando a página), para carregar os dados de maneira linear. 
 - Carregar os dados de acordo com o offset da página, offset = (pageAtual -1)*qtd_produtos_pag
 - Para não criar um click via script(maximizar o tempo) já peguei diretamente a url que retorna todos os produtos. (Url gerada ao apertar o botão de buscar). URL = 'https://www.paodeacucar.com/busca?qt=12&p=1&gt=list', onde qt: é a quantidade de produtos por pagina, fixado em 12. p: é a pagina que se encontra em tela. gt: apenas para apresentar os dados em list ou grid.
 

 ## Algumas das soluções que gostaria de implementar:
  1. Buscar todas as categorias, pegar o link de cada uma e fazer a scraping dos produtos, categoria por categoria;
  2. Gerar todo o html da pagina e depois utiliza-lo;
  3. Fazer uma busca via api, perderia todo o sentido de utilizar web scraping.
  *Desafio que me deixou bastante interessado, visto que é a primeira vez que implemento um web scraping*
 
 
 
 Obs.: Como finalizei em cima da hora, contando que fui "pego de surpresa com o desafio", não modelei de uma maneira mais organizada dos dados. Portanto para rodar o crawler basta :
- Clonar o repositorio;
- Entrar na pasta cd crawlerjs
- Rodar um yarn install para instalação das dependencias 
- Yarn start para rodar o script.
 
 A saída é gerada em um arquivo saida.txt. Apenas joguei a saída que seria em tela, para um arquivo > saida.txt
 
  # Resultado
   Para finalizar a requisição busca todos os produtos ! Para cada 1000 produtos em testes demorou cerca de 8mins para realizar o crawler. Infelizmente ao meu ver uma solução bastante onerosa. *Mais detalhes no código*
  
  *Utilizado apenas para exercicio "academico", em nenhum momento o presente script vem a ferir os termos de uso dos dados e informações.*
