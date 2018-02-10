const NewsAPI = require('newsapi');
const feedparser = require('feedparser-promised');
const newsApi = new NewsAPI(process.env.API_KEY)

const Entry = require('./models/Entry');
const routes = require('express').Router();

const controller = require('./feedController');

exports.init = (req, res) => {
  res.json({ express: 'Hello from express' });
}

exports.adminFeedParser = (req, res) => {
  const articles = [];
  const feeds = [
  	'http://www.guardian.co.uk/world/usa/rss',
  	'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.canada.rss',
  	'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.queenspark.rss',
  	'http://feeds.feedburner.com/blogto/',
  	'http://rss.cbc.ca/lineup/world.xml',
  	'http://feeds.reuters.com/Reuters/worldNews',
  	'http://feeds.bbci.co.uk/news/world/rss.xml',
  	'http://feeds.bbci.co.uk/news/business/rss.xml',
  	'http://feeds.bbci.co.uk/news/technology/rss.xml'
  	]

  feeds.forEach(feed => {
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
        articles = items.map(item => item);
      })
      .catch(err => console.log(err));
  });
}
exports.adminFeedNewsApi = (req, res) => {
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
}

exports.getPosts = (req, res) => {
  Entry.find()
    .sort({ date: -1 })
    .then(data => {
      res.send(data);
    }).catch(err =>{
      res.send(err);
    });
}

exports.savePost = (req, res) => {
  // NLP stuff to determine topic and theme
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
}

exports.deletePost = (req, res) => {
  Entry.remove({ _id: req.params.id})
    .then(entry => res.send({ message: 'Post has been deleted.' }))
    .catch(err => res.send({ message: 'error' }));
}
