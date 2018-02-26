const feeds = {
  canada: {
    'toronto-star-can':    'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.canada.rss',
    'cbc-canada': 'http://rss.cbc.ca/lineup/canada.xml',
    'cbc-politics': 'http://rss.cbc.ca/lineup/politics.xml'
    },
  toronto: {
    'toronto-star-ont': 'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.queenspark.rss',
    'toronto-star-spurr': 'https://www.thestar.com/content/thestar.RSSManagerServlet.articles.authors_spurr_ben.rss',
    'toronto-star-kalinowski': 'https://www.thestar.com/content/thestar.RSSManagerServlet.articles.authors_kalinowski_tess.rss',
    'cbc-toronto': 'http://rss.cbc.ca/lineup/canada-toronto.xml',
    'blog-to': 'http://feeds.feedburner.com/blogto/'
  },
  usa: {
    'buzzfeed-news': 'https://www.buzzfeed.com/usnews.xml',
    'nyt-politics': 'http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml'
  },
  other: {
    'cbc-news-world': 'http://rss.cbc.ca/lineup/world.xml'
  }
}

module.exports = { feeds };
