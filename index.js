const { initPuppeteer, checkService } = require("./puppeteer");
const exito = require("./pagesScripts/common/exito");
const { server } = require("./config/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("On index.js");

// (async function() {
//   try {
//     const browser = await initPuppeteer();
//     const dataThree = await exito("xbox one", browser);
//     console.log(dataThree.busqueda, dataThree.data);
//   } catch (e) {
//     const browser = await initPuppeteer();
//     const dataThree = await exito("xbox one", browser);
//     console.log(dataThree.busqueda, dataThree.data);
//   }

//   try {
//     const browser = await initPuppeteer();
//     const dataOne = await exito("nintendo switch", browser);
//     console.log(dataOne.busqueda, dataOne.data);
//   } catch (e) {
//     const browser = await initPuppeteer();
//     const dataOne = await exito("nintendo switch", browser);
//     console.log(dataOne.busqueda, dataOne.data);
//   }

//   try {
//     const browser = await initPuppeteer();
//     const dataTwo = await exito("Televisor 55 pulgadas", browser);
//     console.log(dataTwo.busqueda, dataTwo.data);
//   } catch (e) {
//     const browser = await initPuppeteer();
//     const dataTwo = await exito("Televisor 55 pulgadas", browser);
//     console.log(dataTwo.busqueda, dataTwo.data);
//   }
// })();
