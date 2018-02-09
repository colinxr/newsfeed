const NewsAPI = require('newsapi');
const feedparser = require('feedparser-promised');
const newsApi = new NewsAPI(process.env.API_KEY)

const Entry = require('./models/Entry');
const routes = require('express').Router();

const controller = require('./entryController');

routes.get('/', (req, res) => {
  res.json({ express: 'Hello from express' });
});

routes.get('/api/feed', (req, res) => {
  const articles = [];
  const feeds = ['http://feeds.feedburner.com/blogto/','http://rss.cbc.ca/lineup/world.xml'];

  feeds.forEach(feed => {
    console.log(feed);

    const httpConfig = {
      uri: feed,
      gzip: true,
    }

    const fpConfig = {
      addmeta: false,
      normalize: false,
    }

    feedparser.parse(httpConfig, fpConfig)
      .then(items => {
        items.forEach(item => articles.push(item));
      })
      .catch(err => console.log(err));
  });


  const ts = new Date();
  const isoDate = ts.toISOString();
  const date = isoDate.substr(0, 9);

  const sources = ['cbc-news', 'the-globe-and-mail', 'financial-post', 'the-new-york-times', 'the-verge', 'the-washington-post', 'new-york-magazine'];
  const domains = ['thestar.com','blogto.com','torontoist.com','sharpmagazine.com'];

  newsApi.v2.everything({
    sources: sources.join(),
    domains: domains.join(),
    sortBy: 'publishedAt',
    from: date,
    language: 'en'
  }).then(response => {
    res.send(response);
  });

  //res.send(articles);

  // To Do
  // 1. Bring in more sources
  // 2. find way to sort, score and analyze
  // 3. combine articles into buckets
});

routes.get('/api/posts', (req, res) => {
  Entry.find()
    .sort({ date: -1 })
    .then(data => {
      res.send(data);
    }).catch(err =>{
      res.send(err);
    });
});

routes.post('/api/posts', (req, res) => {
  const newEntry = new Entry(req.body);

  newEntry.save()
    .then(entry => {
      res.send({
        success: true,
        message: 'Post Added Successfully'
      });
    })
    .catch(err => {
      res.send(err);
    });
  });

module.exports = routes;
