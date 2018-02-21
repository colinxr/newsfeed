const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('express-flash');

require('dotenv').config({ path: 'config.env' });

const routes = require('./routes');

mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Controll-Allow-Credentials', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const strategy = new Auth0Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT,
  clientSecret: proces.env.AUTH_SECRET,
  callbackURL: proces.env.AUTH_CALLBACK
},
  (accessToken, refreshToken, extramParams, profile, done) => {
  return done(null, profile);
});

passport.use(strategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
