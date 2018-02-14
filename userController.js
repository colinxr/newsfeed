const User       = require('./models/User');
const routes     = require('express').Router();
const controller = require('./userController');

register = (req, res) => {
  console.log('register');
}

login = (req, res) => {
  console.log('login');
}

module.exports = {
  register,
  login
}
