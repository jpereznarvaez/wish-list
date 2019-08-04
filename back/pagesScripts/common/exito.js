module.exports = async (elementoABuscar, browser) => {
    
    const page = await browser.newPage();
    await page.goto('https://www.exito.com/');
    
    await page.waitForFunction(function(){
        const barraDeBusqueda1 = document.querySelector('#downshift-4-input')
        const barraDeBusqueda2 = document.querySelector('#downshift-0-input')

        const botonBuscar1 = document.querySelector('#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div > label > div > span > span > svg')
        const botonBuscar2 = document.querySelector('#header-container-movile > div.exito-header-2-x-headerContainerMobile > div > div.minicart-content.minicart-content-mobile > aside > div > button > span.MuiIconButton-label > span.MuiBadge-root.custom-badge > svg')
        
        if((barraDeBusqueda1 || barraDeBusqueda2) && (botonBuscar1 || botonBuscar2)) return true
    })

    const barraDeBusqueda = await page.evaluate(function(){
        const barra1 = document.querySelector('#downshift-4-input')
        const barra2 = document.querySelector('#downshift-0-input')

        if(barra1) return '#downshift-4-input'
        else return '#downshift-0-input'
    })

    const botonBuscar = await page.evaluate(function(){
        const botonBuscar1 = document.querySelector('#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span')
        const botonBuscar2 = document.querySelector('#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span')
    
        if(botonBuscar1) return '#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span'
        else if(botonBuscar2) return '#header-container-web > div.exito-header-2-x-searchBar.z-5.relative.bg-white > div:nth-child(1) > div > div.exito-header-2-x-searchContentWeb > div > div > div.flex.search-input.search-input-background.pl5 > label > div > span'
        
    })

    console.log('Barra de busqueda: ', barraDeBusqueda)
    console.log('Boton busqueda:', botonBuscar)

    await page.type(barraDeBusqueda, elementoABuscar)
    await page.click(botonBuscar)

    await page.waitForSelector('#render-store\.home > div > div.vtex-store__template.bg-base > div > div.flex.flex-grow-1.w-100.flex-column > div:nth-child(5) > div > div.relative.justify-center.flex > div > div.exito-search-result-3-x-resultGallery.search-result-resultado-busqueda > div.exito-search-result-3-x-gallery.flex.flex-row.flex-wrap.items-stretch.bn.ph1 > div:nth-child(1) > section > div.product-summary-add-to-car > div > div > button > div')

    console.log('Hola guapo')

    await page.close();
} 