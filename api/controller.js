const { initPuppeteer, checkService } = require("../puppeteer");
const exito = require("../pagesScripts/common/exito");

const apiSearch = async (req, res) => {
  const { item } = req.query;
  console.log("TCL: apiSearch -> item", item);

  try {
    const data = await makeSearch(item);
    console.log("TCL: apiSearch -> data", data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Entré al error");
    const data = await makeSearch(item);
    return res.status(200).json(data);
  }
};

async function makeSearch(item) {
  const browser = await initPuppeteer();
  const data = await exito(item, browser);
  console.log("TCL: makeSearch -> data", data);

  try {
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject();
  }
}

module.exports = {
  apiSearch
};
