const { initPuppeteer, checkService } = require("../puppeteer");
const exito = require("../pagesScripts/common/exito");
const alibaba = require("../pagesScripts/common/alibaba");

const { Product } = require("../product/index");

const apiSearch = async (req, res) => {
  const { item, categories } = req.query;
  console.log("TCL: apiSearch -> item", item);
  console.log("TCL: apiSearch -> category", categories);

  try {
    const data = await makeSearch(item, categories);
    console.log("TCL: apiSearch -> data", data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Entré al error");
    const data = await makeSearch(item, categories);
    return res.status(200).json(data);
  }
};

const apiSearchAlibaba = async (req, res) => {
  const { item, categories } = req.query;
  console.log("TCL: apiSearch -> item", item);
  console.log("TCL: apiSearch -> category", categories);

  try {
    const data = await makeSearchAlibaba(item, categories);
    console.log("TCL: apiSearch -> data", data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Entré al error");
    const data = await makeSearchAlibaba(item, categories);
    return res.status(200).json(data);
  }
};

async function makeSearchAlibaba(item, categories = "") {
  try {
    const browser = await initPuppeteer();
    const data = await alibaba(item, categories, browser);
    console.log("TCL: makeSearch -> data", data);

    data.forEach(async product => {
      let newProduct = new Product();

      const repet = await Product.findOne({
        description: product.description
      });

      if (repet) {
        console.log("Product already exits");
      } else {
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.priceFormated = product.priceFormated;
        newProduct.quantity = product.quantity;
        newProduct.categories = [...product.categories];
        newProduct.image = product.image;

        const saved = await newProduct.save();

        if (saved) {
          console.log("Product save");
        } else {
          console.log("Not saved");
        }
      }
    });

    return Promise.resolve(data);
  } catch (error) {
    throw Error(error);
  }
}

async function makeSearch(item, categories = "") {
  try {
    const browser = await initPuppeteer();
    const data = await exito(item, categories, browser);
    console.log("TCL: makeSearch -> data", data);

    data.forEach(async product => {
      let newProduct = new Product();

      const repet = await Product.findOne({
        description: product.description
      });

      if (repet) {
        console.log("Product already exits");
      } else {
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.priceFormated = product.priceFormated;
        newProduct.quantity = product.quantity;
        newProduct.categories = [...product.categories];
        newProduct.image = product.image;

        const saved = await newProduct.save();

        if (saved) {
          console.log("Product save");
        } else {
          console.log("Not saved");
        }
      }
    });

    return Promise.resolve(data);
  } catch (error) {
    throw Error(error);
  }
}

const apiSave = async (req, res) => {
  const newProduct = new Product();

  newProduct.name = "Coco";
  newProduct.description = "newProduct";
  newProduct.price = "123";
  newProduct.priceFormated = 123;
  newProduct.quantity = 123;
  newProduct.categories.push("tech");
  newProduct.image = "url";

  const saved = await newProduct.save();

  if (saved) return res.status(200).json(saved);
  else res.status(400).json({ error: "Loser" });
};

module.exports = {
  apiSearch,
  apiSave,
  apiSearchAlibaba
};
