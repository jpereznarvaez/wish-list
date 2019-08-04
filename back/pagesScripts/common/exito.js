module.exports = async (elementoABuscar, browser) => {
    
    const page = await browser.newPage();

    await page.close();
} 