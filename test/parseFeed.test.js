const chai 				   = require('chai');
const chaiAsPromised = require('chai-as-promised');
const parseRSS 		 = require('../controllers/feedController').parseRSS;
const expect 				 = chai.expect;

chai.use(chaiAsPromised);

describe('parseRSS()', () => {
	it('Should return a promise containing an RSS feed', () => {

		const testFeed = {
			'name': 'toronto-star-can',
			'url': 'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.articles.news.canada.rss',
			'priority': 1,
		}

		const rssFeed = parseRSS(testFeed);

		expect(rssFeed).to.be.a('promise');
		return expect(rssFeed).to.eventually.be.an('array');
		return expect(rssFeed[0]).to.eventually.have.property('title');
	});
});
