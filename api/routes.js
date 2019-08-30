const app = require("express").Router();
const { apiController } = require("./index");

app.get("/search", apiController.apiSearch);
app.get("/save", apiController.apiSave);
app.get("/alibaba/search", apiController.apiSearchAlibaba);

module.exports = app;
