const puppeteer = require("puppeteer");

let browser;

const initPuppeteer = async () => {
  if (!browser)
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: ['--no-sandbox']
    });
  return browser;
};

const checkService = async () => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto("https://es-la.facebook.com/");
  await page.waitForSelector("#email");
  await page.waitForSelector("#pass");

  await page.waitForFunction(function() {
    const selector1 = document.querySelector("#u_0_a");
    const selector2 = document.querySelector("#u_0_2");

    if (selector2 || selector1) return true;
  });

  const selector = await page.evaluate(function() {
    const selector1 = document.querySelector("#u_0_a");
    const selector2 = document.querySelector("#u_0_2");

    if (selector1) return "#u_0_a";
    else return "#u_0_2";
  });

  console.log("hola soy falcao 2", selector);

  await page.type("#email", "");
  await page.type("#pass", "");
  await page.click(selector);

  await page.waitForSelector("#u_ps_0_5_5 > div > div.clearfix._42ef > div");

  await page.close();
};

module.exports = {
  initPuppeteer,
  checkService,
  puppeteer,
  browser
};

/*document.querySelectorAll(".exito-product-summary-2-x-clearLink.h-100").forEach(elem => {

const info = elem.querySelector('.exito-product-summary-2-x-information');

if(info)
console.log(info.innerText)

})
 */
