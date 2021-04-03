const mongoose = require('mongoose');
require('dotenv').config();

// const host = process.env.MONGO_HOST;
// const database = process.env.MONGO_DB;

//  URI = `mongodb://${host}/${database}`;

const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((db) => console.log('base de datos conectada'))
  .catch((err) => console.log(err));

module.exports = mongoose;
