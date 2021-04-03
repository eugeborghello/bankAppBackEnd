const app = require("express").Router();
const TransactionCtrl = require("../controllers/transaction");

app.patch("/deposit", TransactionCtrl.cashDeposit);
app.post("/extraction",TransactionCtrl.cashExtraction);
// [authUser],
app.get("/:cbu",  TransactionCtrl.getTransaction);
app.post("/", TransactionCtrl.createTransaction);

module.exports = app;