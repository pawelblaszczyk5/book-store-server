const express = require('express');
const app = express();
const database = require('./src/dbConnection');
const routes = require('./src/routes')

require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', routes);

database.init();
