const { Rental } = require('../models/rentals');
const { Movie } = require('../models/movies');
const validate = require('../middleware/validate')
const moment = require('moment');
const Joi = require('joi');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', [auth, validate(validateReturn)], async (req, res) => {

  const rental = await Rental.lookup(req.bodycustomerId, req.body.movieId);

  if (!rental) return res.status(404).send('Rental not found');

  if (rental.dateReturned) return res.status(400).send('Rental already returned');

  rental.return();
  
  await rental.save();

  await Movie.update({ _id: rental.movie._id }, {
    $inc: { numberInStock: 1}
  })

  return res.status(200).send(rental);
});

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()  
  })
  return schema.validate(req);
};

module.exports = router;