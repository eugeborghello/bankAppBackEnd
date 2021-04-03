const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/routes/index.js');
require('dotenv').config();
// Base de datos
require('./src/database.js');

// Middelwares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// port
const PORT = process.env.PORT || 3002;

// Rutas
app.use('/', routes);

app.listen(`${PORT}`, () => console.log(`escuchando en el puerto ${PORT}`));
