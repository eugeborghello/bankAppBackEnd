const app = require("express").Router();
const UsersCtrl = require("../controllers/auth");

// login
app.post("/login", UsersCtrl.postLogin);

// obtener perfil del usuario

// Crear un nuevo usuario
app.post("/", UsersCtrl.createUser);

module.exports = app;
