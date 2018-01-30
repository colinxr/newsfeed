const NewsAPI = require('newsapi');
const newsApi = new NewsAPI(process.env.API_KEY)

const Entry = require('./models/Entry');
const routes = require('express').Router();

const controller = require('./entryController');

routes.get('/', (req, res) => {
  res.json({ express: 'Hello from express' });
});

routes.get('/api', (req, res) => {
  const ts = new Date();
  const isoDate = ts.toISOString();
  const date = isoDate.substr(0, 9);

  const articles = [];

  const sources = ['cbc-news', 'the-globe-and-mail', 'financial-post', 'the-new-york-times'];
  const domains = ['thestar.com','blogto.com','torontoist.com'];

  newsApi.v2.everything({
    sources: sources.join(),
    domains: domains.join(),
    sortBy: 'publishedAt',
    from: date,
    language: 'en'
  }).then(response => {
    res.send(response);
  });

  // To Do
  // 1. Bring in more sources
  // 2. find way to sort, score and analyze
  // 3. combine articles into buckets
});

routes.get('/api/entries', (req, res) => {
  Entry.find()
    .sort({ date: -1 })
    .then(data => {
      res.send(data);
    }).catch(err =>{
      res.send(err);
    });
});

routes.post('/api/entries', (req, res) => {
  const newEntry = new Entry(req.body);

  newEntry.save()
    .then(entry => {
      res.send({
        success: true,
        message: 'Entry successfully added'
      });
    })
    .catch(err => {
      res.send(err);
    });
  });

module.exports = routes;
