const { Genre, validateGenre } = require('../models/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genre = await Genre.find().sort('name');
  res.send(genre)
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id)

  if (!genre) return res.status(404).send('genre not found')

  res.send(genre);
})

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name});
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async(req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name},
    { new: true});

  if (!genre) return res.status(404).send('genre not found')
  
  res.send(genre);
})

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('genre not found')

  res.send(genre)
})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required() 
  })
  return schema.validate(genre);
}

module.exports = router;