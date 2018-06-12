const feeds = {
  'canada': [
    {
			'name': 'toronto-star-can',
			'url': 'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.canada.rss',
			'priority': 1,
		},
  	{
			'name': 'cbc-canada',
			'url': 'http://rss.cbc.ca/lineup/canada.xml',
			'priority': 1,
		},
    {
			'name': 'cbc-politics',
			'url': 'http://rss.cbc.ca/lineup/politics.xml',
			'priority': 2,
		},
    {
			'name': 'vice-news-ca',
			'url': 'https://news.vice.com/en_ca/rss',
			'priority': 2,
		},
    {
			'name': 'global-canada',
			'url': 'https://globalnews.ca/canada/feed/',
			'priority': 5,
		},
		{
			'name': 'national-post-can',
			'url': 'http://nationalpost.com/category/news/national/feed',
			'priority': 1,
		},
		{
			'name': 'national-post-pol',
			'url': 'http://nationalpost.com/category/news/politics/feed',
			'priority': 1,
		}
  ],
  'toronto': [
		{
			'name': 'toronto-star-ont',
			'url': 'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.queenspark.rss',
			'priority': 1,
		},
    {
			'name': 'toronto-star-spurr',
			'url': 'https://www.thestar.com/content/thestar.RSSManagerServlet.articles.authors_spurr_ben.rss',
			'priority': 5,
		},
    {
			'name': 'toronto-star-kalinowski',
			'url':'https://www.thestar.com/content/thestar.RSSManagerServlet.articles.authors_kalinowski_tess.rss',
			'priority': 1,
		},
    {
			'name': 'cbc-toronto',
			'url':'http://rss.cbc.ca/lineup/canada-toronto.xml',
			'priority':2,
		},
    {
			'name': 'blog-to',
			'url':'http://feeds.feedburner.com/blogto/',
			'priority': 4,
		},
    {
			'name': 'torontoist',
			'url':'https://torontoist.com/feed/',
			'priority': 3,
		},
    {
			'name': 'global-toronto',
			'url':'https://globalnews.ca/toronto/feed/',
			'priority': 5,
		},
		{
			'name': 'national-post-toronto',
			'url': 'http://nationalpost.com/category/news/toronto/feed',
			'priority': 1,
		}
  ],
  'usa': [
    // 'buzzfeed-news': 'https://www.buzzfeed.com/usnews.xml',
		{
			'name': 'buzzfeed-news',
			'url': 'https://www.buzzfeed.com/usnews.xml',
			'priority': 5,
		},
    {
			'name': 'nyt-politics',
			'url': 'http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
			'priority': 1,
		},
    {
			'name': 'the-atlantic-us',
			'url': 'https://www.theatlantic.com/feed/channel/national/',
			'priority': 1,
		},
    {
			'name': 'washington-post',
			'url': 'http://feeds.washingtonpost.com/rss/politics',
			'priority': 1,
		},
    {
			'name': 'politico',
			'url': 'https://www.politico.com/rss/politics08.xml',
			'priority': 1,
		},
  ],
  'other': [
    {
			'name': 'cbc-news-world',
			'url': 'http://rss.cbc.ca/lineup/world.xml',
			'priority': 5,
		},
  ],
}

module.exports = feeds;
