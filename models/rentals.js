const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rentals', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    trim: true,
  },
  genre: {
    type: genreSchema,
    default: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  }
}));