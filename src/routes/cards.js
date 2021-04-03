const app = require("express").Router();
const CardCtrl = require("../controllers/cards");

app.get("/", CardCtrl.getCards);
app.post("/", CardCtrl.createCard);


module.exports = app;
