module.exports = async (elementoABuscar, browser) => {
  const totalReulstSelector =
    "div.exito-search-result-3-x-totalProducts.pv5.bn-ns.bt-s.b--muted-5.tc-s.tl.t-action--small";

  const page = await browser.newPage();
  await page.goto("https://www.exito.com/");

  await page.waitForFunction(function() {
    const barraDeBusqueda1 = document.querySelector("#downshift-4-input");
    const barraDeBusqueda2 = document.querySelector("#downshift-0-input");

    const botonBuscar1 = document.querySelector(
      "#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span > span > svg"
    );
    const botonBuscar2 = document.querySelector(
      "#header-container-movile > div.exito-header-2-x-headerContainerMobile > div > div.minicart-content.minicart-content-mobile > aside > div > button > span.MuiIconButton-label > span.MuiBadge-root.custom-badge > svg"
    );

    if (
      (barraDeBusqueda1 || barraDeBusqueda2) &&
      (botonBuscar1 || botonBuscar2)
    )
      return true;
  });

  const barraDeBusqueda = await page.evaluate(function() {
    const barra1 = document.querySelector("#downshift-4-input");
    const barra2 = document.querySelector("#downshift-0-input");

    if (barra1) return "#downshift-4-input";
    else if (barra2) return "#downshift-0-input";
  });

  await page.waitForFunction(function() {
    const botonBuscar1 = document.querySelector(
      "#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span > span > svg"
    );
    const botonBuscar2 = document.querySelector(
      "#header-container-movile > div.exito-header-2-x-headerContainerMobile > div > div.minicart-content.minicart-content-mobile > aside > div > button > span.MuiIconButton-label > span.MuiBadge-root.custom-badge > svg"
    );

    return botonBuscar1 || botonBuscar2;
  });

  const botonBuscar = await page.evaluate(function() {
    const botonBuscar1 = document.querySelector(
      "#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span"
    );
    const botonBuscar2 = document.querySelector(
      "#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span"
    );

    if (botonBuscar1)
      return "#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span";
    else if (botonBuscar2)
      return "#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span";
  });

  console.log("Barra de busqueda: ", barraDeBusqueda);
  console.log("Boton busqueda:", botonBuscar);

  await page.type(barraDeBusqueda, elementoABuscar);
  await page.click(botonBuscar);

  await page.waitForFunction(totalReulstSelector => {
    console.log("TCL: totalReulstSelector", totalReulstSelector);
    const totalResultsElement = document.querySelector(totalReulstSelector);
    console.log("TCL: totalResultsElement", totalResultsElement);

    return totalResultsElement;
  }, totalReulstSelector);

  const totalFound = await page.evaluate(
    totalReulstSelector =>
      document.querySelector(totalReulstSelector).innerText,
    totalReulstSelector
  );

  console.log("TCL: totalFound", totalFound);

  /*
    document.querySelectorAll(".exito-product-summary-2-x-clearLink.h-100").forEach(elem => {

        const info = elem.querySelector('.exito-product-summary-2-x-information');
        
        if(info)
        console.log(info.innerText)
        
        })*/

  //await page.waitForSelector('')

  //  await page.close();
};
