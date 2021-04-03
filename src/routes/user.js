const app = require("express").Router();
// Model user
const Users = require("../models/user");
const UsersCtrl = require("../controllers/users");
const authUser = require("../middleware/authUserToken");

// Traer todos los users
app.get("/", UsersCtrl.getUsers);

// Traer un usuario en particular
app.get("/:id", UsersCtrl.getUserId);

//Modificar informacion de un usuario
app.patch("/:id", UsersCtrl.updateDataUser);

// Ruta para enviar notificacion por mail
app.post("/email/a", UsersCtrl.sendEmail);

app.patch("/forgot/aa", UsersCtrl.emailCode);

app.patch("/resetpass/a", UsersCtrl.passwordReset);

module.exports = app;
