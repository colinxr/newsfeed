const expect = require('chai').expect;
const analyzeContent = require('../controllers/feedController').analyzeContent;

describe('analyzeContent()', () => {
	it('Should add a nested object into an object', () => {

		const testObj = {
			title: 'test',
			description: 'test description',
		}

		const testFeed = {
			'name': 'test-feed',
			'url': 'http://test-url.com/test-feed.xml',
			'priority': 1,
		}

		const correctObj = {
			'title': 'test',
			'description': 'test description',
			'newsMeta': {
				'source': testFeed,
		 	}
    }

		const metaObj = analyzeContent(testObj, testFeed);

		expect(metaObj).to.deep.equal(correctObj);
	});
});
