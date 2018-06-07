const express 				 = require('express');
const session 				 = require('express-session');
const mongoose 				 = require('mongoose');
const MongoStore 			 = require('connect-mongo')(session);
const bodyParser 			 = require('body-parser');
const path 						 = require('path');
const expressValidator = require('express-validator');
const flash 					 = require('express-flash');

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

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
	}),
}));

app.use('/', routes);

app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port} 💥 🤔 😕`);
});
