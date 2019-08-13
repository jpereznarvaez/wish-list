module.exports = async (elementoABuscar, browser) => {
  console.log("Begin of exito");

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  console.log("After newPage");
  //await page.setViewport({ width: 1920, height: 926 });
  console.log("After setViewPort");
  await page.goto("http://www.exito.com/");
  console.log("After page.goto()");

  await page.waitForFunction(function() {
    console.log("Begin of waitForFunction searchBar");
    const searchBar = document.querySelector("#downshift-0-input");

    const searchButton = document.querySelector(
      "#header-container > div.z-5.relative.bg-white.exito-header-2-x-searchBar > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span > span > svg"
    );

    console.log("TCL: searchBar", searchBar);
    console.log("TCL: searchButton", searchButton);

    if (searchBar && searchButton) return true;
  });

  console.log("After waitForFunction searchBar");

  const mainSearchBar = await page.evaluate(function() {
    console.log("Begin mainSearchBar");
    const searchBar = document.querySelector("#downshift-0-input");
    console.log("TCL: searchBar", searchBar);

    if (searchBar) return "#downshift-0-input";
  });

  // await page.waitForFunction(function() {
  //   const searchButton = document.querySelector(
  //     "#header-container > div.z-5.relative.bg-white.exito-header-2-x-searchBar > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span"
  //   );

  //   return searchButton;
  // });

  const mainSearchButton = await page.evaluate(function() {
    const searchButton = document.querySelector(
      "#header-container > div.z-5.relative.bg-white.exito-header-2-x-searchBar > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span > span > svg"
    );

    if (searchButton)
      return "#header-container > div.z-5.relative.bg-white.exito-header-2-x-searchBar > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span > span > svg";
  });

  console.log("Barra de busqueda: ", mainSearchBar);
  console.log("Boton busqueda:", mainSearchButton);

  await page.type(mainSearchBar, elementoABuscar);
  await page.click(mainSearchButton);

  await page.waitForFunction(function() {
    let totalResultSelector = `body > div.render-container.render-route-store-search > div > div.vtex-store__template.bg-base > div > div.flex.flex-grow-1.w-100.flex-column > div:nth-child(5) > div > div.relative.justify-center.flex > div > div.exito-search-result-3-x-resultGallery.search-result-resultado-busqueda > div.exito-search-result-3-x-gallery.flex.flex-row.flex-wrap.items-stretch.bn.ph1 > div:nth-child(1)`;

    return document.querySelector(totalResultSelector);
  });

  const totalFound = await page.evaluate(() => {
    let totalResultSelector = `body > div.render-container.render-route-store-search > div > div.vtex-store__template.bg-base > div > div.flex.flex-grow-1.w-100.flex-column > div:nth-child(5) > div > div.relative.justify-center.flex > div > div.exito-search-result-3-x-resultGallery.search-result-resultado-busqueda > div.exito-search-result-3-x-gallery.flex.flex-row.flex-wrap.items-stretch.bn.ph1 > div:nth-child(1)`;

    return document.querySelector(totalResultSelector).innerText;
  });

  console.log("TCL: totalFound", totalFound);

  const allProducts = await page.evaluate(elementoABuscar => {
    console.log("Elemento:", elementoABuscar);
    let products = {
      busqueda: elementoABuscar,
      data: []
    };

    const info = document.querySelectorAll(
      ".exito-product-summary-2-x-information"
    );

    for (let [index, item] of info.entries()) {
      let product = {};
      console.log("Index", index);
      console.log("Item", item);

      try {
        product.antes = item.querySelector(
          ".exito-vtex-components-2-x-listPriceValue"
        ).innerText;
      } catch (error) {}

      try {
        product.ahora = item.querySelector(
          ".exito-vtex-components-2-x-sellingPrice.dib"
        ).innerText;
      } catch (error) {}

      try {
        product.otro = item.querySelector(
          ".exito-vtex-components-2-x-alliedPrice.dib"
        ).innerText;
      } catch (error) {}

      try {
        product.informacion = item.querySelector(
          ".exito-vtex-components-2-x-productBrand"
        ).innerText;
      } catch (error) {}

      products.data.push(product);
    }
    console.log(JSON.stringify(products));
    return products;
  }, elementoABuscar);

  console.table(allProducts.data);
  await page.close();

  return allProducts;
  /*
    document.querySelectorAll(".exito-product-summary-2-x-clearLink.h-100").forEach(elem => {

        const info = elem.querySelectorAll('.exito-product-summary-2-x-information') --> forEach;
        precio de lista --> .exito-vtex-components-2-x-listPriceValue
        precio de venta --> .exito-vtex-components-2-x-sellingPrice.dib
        precio otros --> .exito-vtex-components-2-x-alliedPrice.dib
        descripción --> .exito-vtex-components-2-x-productBrand
        
        info.forEach(
          item => 
            console.log('Antes:', item.querySelector('.exito-vtex-components-2-x-listPriceValue').innerText, 
                        'Ahora:', item.querySelector('.exito-vtex-components-2-x-sellingPrice.dib').innerText, 
                        'Otro medio de pago:', item.querySelector('.exito-vtex-components-2-x-alliedPrice.dib').innerText, 
                        'Info:', item.querySelector('.exito-vtex-components-2-x-productBrand').innerText))

        if(info)
        console.log(info.innerText)
        
        })*/

  //await page.waitForSelector('')

  //  await page.close();
};
