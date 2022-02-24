const { Movie, validateMovie } = require('../models/movies');
const { Genre } = require('../models/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies)
});

router.post('/', async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  movie = await movie.save();
});

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  })
  return schema.validate(genre);
};

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;