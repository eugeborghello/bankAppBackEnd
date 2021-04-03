const { Router } = require('express');
// importamos las rutas
const user = require('./user.js');
const auth = require("./routeAuth.js");
const account = require('./account.js');
const transaction = require ('./transaction.js')
const card = require ('./cards.js')
const router = Router();

router.use("/users", user); 
router.use("/users", auth);
router.use('/accounts', account) 
router.use('/transactions', transaction)
router.use('/cards', card)
//router.use("/auth", auth)

module.exports = router;