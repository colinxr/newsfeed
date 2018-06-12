const Bluebird   = require('bluebird');
const feedParser = require('feedparser-promised');
const language   = require('@google-cloud/language');
const feeds      = require('../feeds')
const Entry      = require('../models/Entry');

const client     = new language.LanguageServiceClient()

getCategories = (req, res) => {
  const feedCats = Object
    .keys(feeds)
    .map(key => key);

  res.send(feedCats);
}

filterByDate = (item) => {
  const now = Date.now();
  const pubDate = Date.parse(item[`pubdate`]);

  if ((now - pubDate) < 86400000) return item;
}

relevantEntity = (obj) => {
	return obj.salience > 0.12;
}

analyzeContent = (item, feed) => {
  const title = item.title;
  const desc = item.summary ? item.summary.replace(/(<([^>]+)>)/ig,"") : '';
  const text = `${title}. ${desc}`;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return client.analyzeEntities({ document })
  	.then(results => {
      const relevant = results[0].entities.filter(relevantEntity);
      const topics = relevant.map(topic => topic.name); // only use names of the entities
			item.newsMeta = {};
			item.newsMeta.source = feed;
			item.newsMeta.entities = topics;

			return item;
    })
   .catch(err => res.status(500).send(err.message));
}

parseFeed = (feed) => {
  const httpConfig = {
    uri: feed.url,
    gzip: true,
  }
  const fpConfig = {
    feedurl: feed.url,
    addmeta: true,
    normalize: true,
  }

  return feedParser.parse(httpConfig, fpConfig)
    .then(items => {
			// filter items by last 24 hours.
      let articles = items.filter(item => filterByDate(item))
			// if feed is a low priority, only return the first third of the entries
			articles = feed.priority > 3 ? articles.slice(0, articles.length / 3) : articles;
			// for each entry, preform entity analysis
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

	transformFeedData(feedList)
		.then(stories => sendApiData(res, stories))
		.catch(err => res.status(500).send(err.message));
}

categoryFeed = (req, res) => {
  // get the category
  const cat = req.params.category;
  const feedList = Object
    .keys(feeds[cat])
    .map(key => feeds[cat][key]);

	transformFeedData(feedList)
		.then(stories => sendApiData(res, stories))
		.catch(err => res.status(500).send(err.message));
}

singleFeed = (req, res) => {
  const { category, id } = req.params;
	const singleFeed = feeds[category].filter(feed => feed.name === id);

  transformFeedData(singleFeed)
		.then(stories => sendApiData(res, stories))
		.catch(err => res.status(500).send(err.message));
}

transformFeedData = (feedList) => {
	// parse the indivdual urls and hold them in this variable
  const promises = feedList.map(feed => parseFeed(feed));

  // once all promises return values, flatten them in one array, sort it then send off to front-end
  return Bluebird.all(promises)
		.then(resp => flattenArray(resp))
		.then(arr => reverseChron(arr))
    .catch(err => res.status(500).send(err.message));
}

flattenArray = (data) => {
	return flatArray = [].concat(...data);
}

// sort stories by reverse chron
reverseChron = (arr) => {
	const date = [`pubdate`];

	return arr.slice().sort((a, b) => {
		return a[date] < b[date] ? 1 : -1;
	});
}

sendApiData = (res, stories) => {
	return Bluebird.all(stories)
		.then(sortedFeed => res.send(sortedFeed))
		.catch(err => res.status(500).send(err.message));
}

module.exports = {
  getCategories,
  analyzeContent,
  adminFeed,
  categoryFeed,
  singleFeed
}
