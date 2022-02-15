const Joi = require('joi');
const morgan = require('morgan');
const express = require('express');
const app = express();
const home = require('./routes/home');
const genres = require('./routes/genres');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', home);
app.use('/api/genres', genres);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log(`Morgan enabled...`)
}

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening to PORT: ${port}`));
