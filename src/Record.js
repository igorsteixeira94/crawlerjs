const fs = require('fs');
const path = require('path')
module.exports = function save(id, name, price){
    fs.writeFile(
      path.resolve(__dirname,'..','tmp','./products.csv'),
      `${id},${name.toString().replace(",", ".")},${price}\n`,
      {enconding:'utf-8',flag: 'a'},
      (err)=> {if(err) throw err})
  }
