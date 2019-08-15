const { initPuppeteer, checkService } = require("./puppeteer");
const exito = require("./pagesScripts/common/exito");
const { server } = require("./config/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
