const feedParser = require('feedparser-promised');
const Bluebird   = require('bluebird');
const feeds      = require('./feeds').feeds;
const Entry      = require('./models/Entry');
const routes     = require('express').Router();

getCategories = (req, res) => {
  const feedCats = Object
  .keys(feeds)
  .map(key => key);

  res.send(feedCats);
}

parseFeed = (feed) => {
  let articles = [];

  const httpConfig = {
    uri: feed,
    gzip: true,
  }

  const fpConfig = {
    feedurl: feed,
    addmeta: true
  }

  return feedParser.parse(httpConfig, fpConfig)
    .then(items => {
      let articles = [];
      items.map(item => {
        // asign newsfeed score
        const now = Date.now() / 1000
        const pubDate = Date.parse(item[`rss:pubdate`][`#`]) / 1000;

        // return item if item is no more than 24 hours.
        if ((now - pubDate) > 86400)  {
          //console.log(date);
          articles.push(item);
        }
      });
      //console.log(articles.length);
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
      stories = []
        .concat(...resp) // flatten resp into on array of objects
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // sort stories by reverse chron
        // console.log(stories[0]);
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
  adminFeed,
  categoryFeed,
  singleFeed
}
