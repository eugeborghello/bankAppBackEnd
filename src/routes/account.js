const app = require("express").Router();
// Model user
const Users = require("../models/user");
const Account = require("../models/account");
const AccountsCtrl = require("../controllers/accounts");
const authUser = require("../middleware/authUserToken");

app.get("/:id", AccountsCtrl.getAccount);
app.post("/:id", AccountsCtrl.createAccount);
app.delete("/:id", [authUser], AccountsCtrl.deleteAccount);

module.exports = app;
