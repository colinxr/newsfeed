const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NewsAPI = require('newsapi');

require('dotenv').config({ path: 'config.env' });

const newsApi = new NewsAPI(process.env.API_KEY)

mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Controll-Allow-Credentials', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/', (req, res) => {
  res.send({ express: 'Hello from express' });
});

app.get('/api', (req, res) => {
  const ts = new Date();
  const isoDate = ts.toISOString();

  const date = isoDate.substr(0, 9);

  newsApi.v2.everything({
    sources: 'cbc-news,the-globe-and-mail,financial-post',
    domains: 'thestar.com,blogto.com',
    sortBy: 'publishedAt',
    from: date,
  }).then(response => {
    res.send(response);
  });

  // To Do
  // 1. Bring in more sources
  // 2. find way to sort, score and analyze
  // 3. combine articles into buckets


});

app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
