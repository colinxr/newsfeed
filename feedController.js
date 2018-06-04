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

analyzeContent = (item, feed) => {
  const title = item.title;
  const desc = item.summary ? item.summary.replace(/(<([^>]+)>)/ig,"") : '';

  const text = `${title}. ${desc}`;
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return client
    .analyzeEntities({ document })
    .then(results => {
      relevantEntity = (obj) => {
        return obj.salience > 0.12;
      }

      const entities = results[0].entities;
      const relevant = entities.filter(relevantEntity);
      const topics = relevant.map(topic => topic.name); // only use names of the entities
			item.newsMeta.source = feed;
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
    uri: feed.url,
    gzip: true,
  }
  const fpConfig = {
    feedurl: feed.url,
    addmeta: true,
    normalize: true
  }

  return feedParser.parse(httpConfig, fpConfig)
    .then(items => {

      let articles = items.filter(item => filterByDate(item)) // filter items by last 24 hours.
			articles = feed.priority > 3 ? articles.slice(0, articles.length / 3) : articles;
			articles = articles.map(article => analyzeContent(article, feed));
      return articles;
    })
    .catch(err => console.log('Error: ' + err));
}

adminFeed = (req, res) => {
  // take feeds object and pull out all of the individual properties
  let feedList = Object
    .keys(feeds)
    .map(key => feeds[key])

	 feedList = [].concat.apply([], feedList);

	 transformFeedData(res, feedList);
}

categoryFeed = (req, res) => {
  // get the category
  const cat = req.params.category;
  let feedList = Object
    .keys(feeds[cat])
    .map(key => feeds[cat][key]);

	transformFeedData(res, feedList);
}

singleFeed = (req, res) => {
  const { category, id } = req.params;
	const singleFeedObj = feeds[category].filter(feed => feed.name === id);

  transformFeedData(res, singleFeedObj);
}

transformFeedData = (res, feedList) => {
	// parse the indivdual urls and hold them in this variable
  const promises = feedList.map(feed => parseFeed(feed));

  // once all promises return values, flatten them in one array, sort it then send off to front-end
  Bluebird.all(promises)
    .then(data => {
      stories = [].concat(...data) // flatten resp into on array of objects
      return stories;
    })
    .then(stories => {
      Bluebird.all(stories)
        .then(resp => {
          const date = [`pubdate`];
          // sort stories by reverse chron
          reverseChron = (arr, date) => {
            return arr.slice().sort((a, b) => {
              return a[date] < b[date] ? 1 : -1;
            });
          }
          const sortedFeed = reverseChron(resp, date);
		          // const last = sortedFeed.length - 1;
		          // console.dir(sortedFeed[last], {depth: null, colors: true});
							// let count = 0;
							// sortedFeed.map(i => {
							// 	if (i.newsMeta.source.name == 'cbc-news-world') count++;
							// });
							// console.log(count);
          res.send(sortedFeed);
        })
        .catch(err => res.status(500).send(err.message));
    })
    .catch(err => res.status(500).send(err.message));
}

module.exports = {
  getCategories,
  parseFeed,
  filterByDate,
  analyzeContent,
  adminFeed,
  categoryFeed,
  singleFeed
}
