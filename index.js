const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const app = express();
const error = require('./middleware/error');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/video')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err))

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error); 

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log(`Morgan enabled...`);
};

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening to PORT: ${port}`));
