const chai 				   		= require('chai');
const chaiAsPromised 		= require('chai-as-promised');
const transformFeedData = require('../controllers/feedController').transformFeedData;
const feeds 						= require('../feeds');
const expect 				 		= chai.expect;

chai.use(chaiAsPromised);

describe('transformFeedData()', () => {
	it('Should return a promise of an array of objects', () => {
		let testFeedList = Object
	    .keys(feeds)
	    .map(key => feeds[key])

		testFeedList = [].concat.apply([], testFeedList);

		const newsFeed = transformFeedData(testFeedList);

		expect(newsFeed).to.be.a('promise');
		return expect(newsFeed).to.eventually.be.an('array');
		return expect(newsFeed[0]).to.eventually.be.an('object');
		return expect(newsFeed[0]).to.eventually.have.property('title');
	});
});
