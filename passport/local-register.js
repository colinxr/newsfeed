const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy({
  emailField: 'email',
  usernameField: 'username',
  passwordField: 'password',
  session: false.
  passReqToCallback: true
}, (req, email, username, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    username: username.trim()
  };

  const newUser = new User(userData);

  newUser.save((err) => {
    if (err) return done(err);

    return done(null);
  });
});


module.exports = { strategy };
