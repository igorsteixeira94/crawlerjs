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
 - Desenvolver um script que faça o scroll da página, para carregar os dados. 
 - Carregar os dados de acordo com o offset da página, offset = (pageAtual -1)*qtd_produtos_pag
 
 
 
 Obs.: Por conta do tempo e dos desafios enfretados, não consegui modelar os arquivos 
