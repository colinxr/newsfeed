const feedParser = require('feedparser-promised');
const Bluebird   = require('bluebird');
const language   = require('@google-cloud/language');
const feeds      = require('./feeds').feeds;
const Entry      = require('./models/Entry');
const routes     = require('express').Router();

const client     = new language.LanguageServiceClient()

getCategories = (req, res) => {
  const feedCats = Object
    .keys(feeds)
    .map(key => key);

  res.send(feedCats);
}

analyzeArticle = (item) => {
  console.log('analyzing post');
  const title = item.title;
  const stripTags = item.summary.replace(/(<([^>]+)>)/ig,"");
  const desc = stripTags;

  const text = `${title}. ${desc}`;
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const topics = [];

  client.analyzeEntities({ document })
    .then(results => {
      const entities = results[0].entities;
      entities.forEach(entity => {
        // console.log(entity.name);
        // console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
        // if (entity.metadata && entity.metadata.wikipedia_url) {
          // console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
        // }
        if (entity.salience > 0.15) {
          topics.push(entity.name);
        }
      });
      item.newsMeta.entities = topics;

      return item;
    })
   .catch(err => {
     console.error('ERROR:', err);
     res.status(500).send(err.message);
   });
}

parseFeed = (feed) => {
  let articles = [];

  const httpConfig = {
    uri: feed,
    gzip: true,
  }

  const fpConfig = {
    feedurl: feed,
    addmeta: true,
    normalize: true
  }

  return feedParser.parse(httpConfig, fpConfig)
    .then(items => {
      let articles = [];
      items.map(item => {
        // asign newsfeed score
        const now = Date.now() / 1000
        const pubDate = Date.parse(item[`rss:pubdate`][`#`]) / 1000;

        // Only show posts from last 24 hours in admin backend feed
        if ((now - pubDate) > 86400) {
          item.newsMeta = {};
          // console.dir(item);
          analyzeArticle(item);
          articles.push(item);
        }
      });

      return articles;
    })
    .catch(err => console.log('Error: ' + err));
}

adminFeed = async (req, res) => {
  // take feeds object and pull out all of the individual properties
  const feedUrls = Object
    .keys(feeds)
    .map(key => Object.values(feeds[key]))
    .reduce((a,b) => a.concat(b));

  // parse the indivdual urls and hold them in this variable
  const promises = feedUrls.map(feed => parseFeed(feed));

  // once all promises return values, flatten them in one array, sort it then send off to front-end
  Bluebird.all(promises)
    .then(resp => {
      console.log(typeof(resp));
      stories = []
        .concat(...resp) // flatten resp into on array of objects
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // sort stories by reverse chron
        console.dir(stories[0], {depth: null, colors: true});
      res.send(stories);
    });
}

categoryFeed = async (req, res) => {
  // get the category
  const cat = req.params.category;

  // get the urls from that particular category in Feeds Object
  const feedUrls = Object
    .keys(feeds[cat])
    .map(key => feeds[cat][key]);

  // parses the indivdual urls and holds them in this variable
  const promises = feedUrls.map(feed => parseFeed(feed));

  // once all promises return values, flatten them in one array, sort it then send off to front-end
  Bluebird.all(promises)
    .then(resp => {
      stories = []
        .concat(...resp) // flattens resp into on array of objects
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // sorts stories by reverse chron
      res.send(stories);
    });
}

singleFeed = (req, res) => {
  // set the param variables
  const { cat, id } = req.params;

  // set the feed url
  const feedUrl = feeds.toronto[id];

  // parse feed then send results
  parseFeed(feedUrl)
    .then(resp => res.send(resp));
}

module.exports = {
  getCategories,
  parseFeed,
  analyzeArticle,
  adminFeed,
  categoryFeed,
  singleFeed
}
