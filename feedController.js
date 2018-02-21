// const NewsAPI = require('newsapi');
// const newsApi = new NewsAPI(process.env.API_KEY)
const memCache = require('memory-cache');
const feedParser = require('feedparser-promised');
const Bluebird   = require('bluebird');

const Entry = require('./models/Entry');
const routes = require('express').Router();

const controller = require('./feedController');

init = (req, res) => {
  res.json({ express: 'Hello from express' });
}

cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__'+req.originalUrl || req.url;
    let cachedBody = memCache.get(key);

    if (cachedBody) {
      res.send(cachedBody);
      return
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      }
    }
  }
}

adminFeedParser = async (req, res) => {
  const feeds = {
  	'toronto-star-can':    'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.canada.rss',
  	'toronto-star-ont': 'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.queenspark.rss',
  	'blog-to': 'http://feeds.feedburner.com/blogto/',
  	'cbc-news-world': 'http://rss.cbc.ca/lineup/world.xml',
    'buzzfeed-news': 'https://www.buzzfeed.com/usnews.xml'
  }

  const feedUrls = Object
      .keys(feeds)
      .map(key => feeds[key]);

  const promises = feedUrls.map(feed => parseFeed(feed));

  Bluebird.all(promises)
    .then(resp => {
      stories = []
        .concat(...resp) // flattens resp into on array of objects
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // sorts stories by reverse chron
      res.send(stories);
    });
}

parseFeed = (feed) => {
    let articles = [];

    const httpConfig = {
      uri: feed,
      gzip: true,
    }

    const fpConfig = {
      addmeta: true
    }

    return feedParser.parse(httpConfig, fpConfig)
      .then(items => {
        articles = items.map(item => item);
        //console.log(articles.length);
        return articles;
      })
      .catch(err => console.log('Error: ' + err));


}

adminFeedNewsApi = (req, res) => {
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

getPosts = (req, res) => {
  Entry.find()
    .sort({ date: -1 })
    .then(data => {
      res.send(data);
    }).catch(err =>{
      res.send(err);
    });
}

savePost = (req, res) => {
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

deletePost = (req, res) => {
  Entry.remove({ _id: req.params.id})
    .then(entry => res.send({ message: 'Post has been deleted.' }))
    .catch(err => res.send({ message: 'error' }));
}

module.exports = {
  init,
  cache,
  adminFeedParser,
  adminFeedNewsApi,
  getPosts,
  savePost,
  deletePost,
  parseFeed
}
