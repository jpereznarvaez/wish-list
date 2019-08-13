const app = require("express").Router();
const { apiController } = require("./index");

app.get("/search", apiController.apiSearch);

module.exports = app;
