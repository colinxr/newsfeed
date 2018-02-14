const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('./LocalStrategy');
const User = require('../models/user');

const testUser = {
  username: 'test-one',
  passwordHash: 'bcrypt-hashed-password',
  id: 1
}

passport.user(new LocalStrategy(
  (username, password, done) => {
    findUser(username, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false);

      bcrypt.compare(password, user.passwordHash, (err, isVald) => {
        if (err) return done(err);
        if (!isValid) return done(null, false)

        return done(null, user);
      })
    })
  }
))

authenticationMiddleware = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}
