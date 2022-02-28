const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
 
});

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    trim: true,
  },
}));

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string(5).min(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max().required()
  })
  return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validateUser = validateUser;