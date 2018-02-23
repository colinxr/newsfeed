const feedParser = require('feedparser-promised');
const Bluebird   = require('bluebird');
const feeds      = require('./feeds').feeds;
const Entry      = require('./models/Entry');
const routes     = require('express').Router();

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
      articles = items.map(item => item);
      //console.log(articles.length);
      return articles;
    })
    .catch(err => console.log('Error: ' + err));
}

adminFeed = async (req, res) => {
  // takes feeds object and pulls out all of the individual properties
  const feedUrls = Object
    .keys(feeds)
    .map(key => Object.values(feeds[key]))
    .reduce((a,b) => a.concat(b));

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
  const cat = req.params.category;
  const id  = req.params.id;

  const feedUrl = feeds[cat][id];
  console.log(feedUrl);

  parseFeed(feedUrl)
    .then(resp => res.send(resp));
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
  parseFeed,
  adminFeed,
  categoryFeed,
  singleFeed
}
