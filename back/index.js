const { initPuppeteer, checkService} = require('./puppeteer');
const exito = require('./pagesScripts/common/exito');


(async function(){
    try{
const browser = await initPuppeteer();
const data= await exito('TELEVISOR 50 PULGADAS' ,browser);
console.log(data);

    }
    catch(e){console.log(e)}


})();