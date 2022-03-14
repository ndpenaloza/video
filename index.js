const morgan = require('morgan');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log(`Morgan enabled...`);
};

const port = process.env.PORT || 3000;
const server = app.listen(3000, () => console.log(`Listening to PORT: ${port}`));

module.exports = server;