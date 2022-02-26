const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genres');

const Movie = mongoose.model('Movies', new mongoose.Schema({
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

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  })
  return schema.validate(genre);
};

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;