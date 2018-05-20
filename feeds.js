const feeds = {
  canada: {
    'toronto-star-can':    'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.canada.rss',
    'cbc-canada': 'http://rss.cbc.ca/lineup/canada.xml',
    'cbc-politics': 'http://rss.cbc.ca/lineup/politics.xml',
    'vice-news-ca': 'https://news.vice.com/en_ca/rss',
    'global-canada': 'https://globalnews.ca/canada/feed/',
    },
  toronto: {
    'toronto-star-ont': 'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.queenspark.rss',
    'toronto-star-spurr': 'https://www.thestar.com/content/thestar.RSSManagerServlet.articles.authors_spurr_ben.rss',
    'toronto-star-kalinowski': 'https://www.thestar.com/content/thestar.RSSManagerServlet.articles.authors_kalinowski_tess.rss',
    'cbc-toronto': 'http://rss.cbc.ca/lineup/canada-toronto.xml',
    'blog-to': 'http://feeds.feedburner.com/blogto/',
    'torontoist': 'https://torontoist.com/feed/',
    'global-toronto': 'https://globalnews.ca/toronto/feed/',
  },
  usa: {
    // 'buzzfeed-news': 'https://www.buzzfeed.com/usnews.xml',
    'nyt-politics': 'http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
    'the-atlantic-us': 'https://www.theatlantic.com/feed/channel/national/',
    'washington-post': 'http://feeds.washingtonpost.com/rss/politics',
    'politico': 'https://www.politico.com/rss/politics08.xml'
  },
  other: {
    'cbc-news-world': 'http://rss.cbc.ca/lineup/world.xml'
  }
}

module.exports = { feeds };
