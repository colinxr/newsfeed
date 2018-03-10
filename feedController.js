const feedParser = require('feedparser-promised');
const Bluebird   = require('bluebird');
const language   = require('@google-cloud/language');
const routes     = require('express').Router();
const feeds      = require('./feeds').feeds;
const Entry      = require('./models/Entry');

const client     = new language.LanguageServiceClient()

getCategories = (req, res) => {
  const feedCats = Object
    .keys(feeds)
    .map(key => key);

  res.send(feedCats);
}

analyzeArticle = (item) => {
  const title = item.title;
  const desc = item.summary.replace(/(<([^>]+)>)/ig,"");

  const text = `${title}. ${desc}`;
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return client
    .analyzeEntities({ document })
    .then(results => {

      relevantEntity = (obj) => {
        return obj.salience > 0.15;
      }

      const entities = results[0].entities;
      const relevant = entities.filter(relevantEntity);
      const topics = relevant.map(topic => topic.name); // only use names of the entities
      item.newsMeta.entities = topics;

      return item;
    })
   .catch(err => res.status(500).send(err.message));
}

filterByDate = (item) => {
  const now = Date.now();
  const pubDate = Date.parse(item[`pubdate`]);

  if ((now - pubDate) < 86400000) {
    item.newsMeta = {};
    return item;
  }
}

parseFeed = (feed) => {
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
      const articles = items.filter(item => filterByDate(item)); // filter items by last 24 hours.
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
    .then(data => {
      stories = [].concat(...data) // flatten resp into on array of objects
      return stories;
    })
    .then(stories => {
      stories = stories.map(story => analyzeArticle(story));

      Bluebird.all(stories)
        .then(data => {
          const date = [`pubdate`];
          // sort stories by reverse chron
          reverseChron = (arr, date) => {
            return arr.slice().sort((a, b) => {
              console.log(a[date] + ' + ' + a[`meta`][`title`]);
              return a[date] < b[date] ? 1 : -1;
            });
          }
          const sortedFeed = reverseChron(data, date);
          // const last = sortedFeed.length - 1;
          // console.dir(sortedFeed[last], {depth: null, colors: true});
          res.send(sortedFeed);
        });
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
    .then(data => {
      stories = [].concat(...data) // flatten resp into on array of objects
      return stories;
    })
    .then(stories => {
      const feedStories = stories.map(story => analyzeArticle(story));

      Bluebird.all(feedStories)
        .then(data => {
          // sort stories by reverse chron
          sortedFeed = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          res.send(sortedFeed);
        });
    });
}

singleFeed = (req, res) => {
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
  filterByDate,
  analyzeArticle,
  adminFeed,
  categoryFeed,
  singleFeed
}
