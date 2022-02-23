const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const app = express();
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/video')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err))
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log(`Morgan enabled...`);
};

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening to PORT: ${port}`));
