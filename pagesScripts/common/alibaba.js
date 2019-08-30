module.exports = async (elementoABuscar, categories = "", browser) => {
  console.log("Begin of exito");

  const page = await browser.newPage();
  //await page.setViewport({ width: 1920, height: 1080 });
  await page.setRequestInterception(true);

  await page.on("request", req => {
    if (
      req.resourceType() == "stylesheet" ||
      req.resourceType() == "font" ||
      req.resourceType() == "image"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  console.log("After newPage");

  try {
    await page.goto("https://www.alibaba.com/");
    console.log("After page.goto()");

    await page.waitForFunction(function() {
      console.log("Begin of waitForFunction searchBar");
      const searchBar = document.querySelector(
        "#J_SC_header > header > div.sc-hd-row.sc-hd-main > div.sc-hd-cell.sc-hd-searchbar-wrap > div > div > form > div.ui-searchbar-main > input"
      );

      const searchButton = document.querySelector(
        "#J_SC_header > header > div.sc-hd-row.sc-hd-main > div.sc-hd-cell.sc-hd-searchbar-wrap > div > div > form > input.ui-searchbar-submit"
      );

      if (searchBar && searchButton) return true;
    });

    console.log("After waitForFunction searchBar");

    const mainSearchBar = await page.evaluate(function() {
      console.log("Begin mainSearchBar");
      const searchBar = document.querySelector(
        "#J_SC_header > header > div.sc-hd-row.sc-hd-main > div.sc-hd-cell.sc-hd-searchbar-wrap > div > div > form > div.ui-searchbar-main > input"
      );

      if (searchBar)
        return "#J_SC_header > header > div.sc-hd-row.sc-hd-main > div.sc-hd-cell.sc-hd-searchbar-wrap > div > div > form > div.ui-searchbar-main > input";
    });

    // await page.waitForFunction(function() {
    //   const searchButton = document.querySelector(
    //     "#header-container > div.z-5.relative.bg-white.exito-header-2-x-searchBar > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span"
    //   );

    //   return searchButton;
    // });

    const mainSearchButton = await page.evaluate(function() {
      const searchButton = document.querySelector(
        "#J_SC_header > header > div.sc-hd-row.sc-hd-main > div.sc-hd-cell.sc-hd-searchbar-wrap > div > div > form > div.ui-searchbar-main > input"
      );

      if (searchButton)
        return "#J_SC_header > header > div.sc-hd-row.sc-hd-main > div.sc-hd-cell.sc-hd-searchbar-wrap > div > div > form > div.ui-searchbar-main > input";
    });

    await page.type(mainSearchBar, elementoABuscar);
    await page.click(mainSearchButton);

    const suscribeResult = await page.waitForFunction(function() {
      let suscribreSelector = document.querySelector(
        "#J-m-trade-alert > div > div.J-scc-search.J-ta-section.scc-t-a-search > input.J-search-text.scc-t-a-search-text.ui2-textfield.ui2-textfield-single.ui2-textfield-large"
      ).placeholder;

      /* let oppsMessage = document.querySelector(
        "body > div.render-container.render-route-store-search > div > div.vtex-store__template.bg-base > div > div.flex.flex-grow-1.w-100.flex-column > div:nth-child(5) > div > div.relative.justify-center.flex > div > div.exito-search-result-3-x-resultGallery.search-result-resultado-busqueda > div.exito-search-result-3-x-gallery > div > div.flex.justify-end-ns.justify-center-s.ttu.f1.ph4.pv4-s.pv0-ns.c-muted-3.ph9.b"
      ); */

      if (suscribreSelector /* || oppsMessage */) return suscribreSelector;
    });

    console.log("TCL: suscribreSelector", suscribeResult);

    const totalFound = await page.evaluate(() => {
      try {
        var totalResultSelector = document
          .querySelector(
            `body > div.l-page > div.l-page-main-v2 > div.l-main-content > div.l-grid-top > div > div > div.refine-filters__result-section > div.refine-filters__result-left > div > div.seb-refine-result__label > span`
          )
          .innerText.trim();
      } catch (error) {}

      /* try {
        var oppsMessage = document
          .querySelector(
            "body > div.render-container.render-route-store-search > div > div.vtex-store__template.bg-base > div > div.flex.flex-grow-1.w-100.flex-column > div:nth-child(5) > div > div.relative.justify-center.flex > div > div.exito-search-result-3-x-resultGallery.search-result-resultado-busqueda > div.exito-search-result-3-x-gallery > div > div.flex.justify-end-ns.justify-center-s.ttu.f1.ph4.pv4-s.pv0-ns.c-muted-3.ph9.b"
          )
          .innerText.trim()
          .toLowerCase();
      } catch (error) {} */
      // let notFound = document.querySelector(
      //   "body > div.render-container.render-route-store-search > div > div.vtex-store__template.bg-base > div > div.flex.flex-grow-1.w-100.flex-column > div:nth-child(5) > div > div.relative.justify-center.flex > div > div.exito-search-result-3-x-resultGallery.search-result-resultado-busqueda > div.exito-search-result-3-x-gallery > div > div.flex.justify-end-ns.justify-center-s.ttu.f1.ph4.pv4-s.pv0-ns.c-muted-3.ph9.b"
      // );

      // if (notFound) return "not found";

      return totalResultSelector ? totalResultSelector : null;
    });

    console.log("TCL: totalFound", totalFound);

    if (totalFound == "ops!") {
      await page.close();
      return {
        message: "element not found"
      };
    }

    const allProducts = await page.evaluate(
      (elementoABuscar, categories) => {
        console.log("Elemento:", elementoABuscar);
        let products = [];

        const productsFounded = document
          .querySelectorAll(".m-gallery-product-item-wrap")
          .filter(item => Boolean(item.querySelector(".item-main")));

        const productsWithPrice = productsFounded.filter(item =>
          Boolean(item.querySelector(".price").innerText)
        );

        for (let [index, item] of productsWithPrice.entries()) {
          let product = {};
          product.name = elementoABuscar;

          console.log("Item", item);

          /* try {
            product.antes = item
              .querySelector(".exito-vtex-components-2-x-listPriceValue")
              .innerText.trim();
          } catch (error) {} */

          try {
            product.price =
              item
                .querySelector(".price")
                .childNodes[1].childNodes[2].innerText.trim() || "0";
          } catch (error) {}

          try {
            product.priceFormated =
              Number(
                item
                  .querySelector(".price")
                  .childNodes[1].childNodes[2].innerText.trim()
                  .replace("$", "")
              ) || 0;
          } catch (error) {}
          /* try {
            product.otro = item
              .querySelector(".exito-vtex-components-2-x-alliedPrice.dib")
              .innerText.trim();
          } catch (error) {} */

          try {
            product.description = item
              .querySelector(".title.three-line")
              .childNodes[1].getAttribute("title")
              .trim();
          } catch (error) {}

          product.quantity = 100;
          product.categories = categories;
          product.image = `https:${item
            .querySelector(".offer-image-box")
            .childNodes[1].getAttribute("src")
            .trim()}`;

          products.push(product);
        }

        //console.log(JSON.stringify(products));
        return products;
      },
      elementoABuscar,
      categories
    );

    //console.table(allProducts.data);
    await page.close();

    return allProducts;
  } catch (error) {
    console.log({ error: error });
    await page.close();
    throw Error("Something went wrong");
  }
  /*
      document.querySelectorAll(".exito-product-summary-2-x-clearLink.h-100").forEach(elem => {
  
          const info = elem.querySelectorAll('.exito-product-summary-2-x-information') --> forEach;
          precio de lista --> .exito-vtex-components-2-x-listPriceValue
          precio de venta --> .exito-vtex-components-2-x-sellingPrice.dib
          precio otros --> .exito-vtex-components-2-x-alliedPrice.dib
          descripción --> .exito-vtex-components-2-x-productBrand
          
          info.forEach(
            item => 
              console.log('Antes:', item.querySelector('.exito-vtex-components-2-x-listPriceValue').innerText.trim(), 
                          'Ahora:', item.querySelector('.exito-vtex-components-2-x-sellingPrice.dib').innerText.trim(), 
                          'Otro medio de pago:', item.querySelector('.exito-vtex-components-2-x-alliedPrice.dib').innerText.trim(), 
                          'Info:', item.querySelector('.exito-vtex-components-2-x-productBrand').innerText.trim()))
  
          if(info)
          console.log(info.innerText.trim())
          
          })*/

  //await page.waitForSelector('')

  //  await page.close();
};
