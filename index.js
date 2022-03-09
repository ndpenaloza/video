const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid');
const morgan = require('morgan');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log(`Morgan enabled...`);
};

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening to PORT: ${port}`));
