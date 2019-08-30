const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: String, require: true },
  priceFormated: { type: Number, require: true },
  quantity: { type: Number, require: true },
  categories: { type: Array, require: false },
  image: { type: String, require: true }
});

module.exports = model("Product", productSchema);
