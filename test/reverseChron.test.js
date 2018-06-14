const expect = require('chai').expect;
const reverseChron = require('../controllers/feedController').reverseChron;


describe('reverseChron()', () => {
	it('Should reverse a an array of objects based on time', () => {
		const testArr = [
			{
				item: 1,
				pubdate: '2018-06-14T08:00:00.000Z',
			},
			{
				item: 2,
				pubdate: '2018-06-13T18:31:50.000Z',
			},
			{
				item: 3,
				pubdate: '2018-06-14T12:03:25.000Z',
			},
		];

		const correctArr = [
			{
				item: 3,
				pubdate: '2018-06-14T12:03:25.000Z',
			},
			{
				item: 1,
				pubdate: '2018-06-14T08:00:00.000Z',
			},
			{
				item: 2,
				pubdate: '2018-06-13T18:31:50.000Z',
			},
		];

		const reverseArr = reverseChron(testArr);

		expect(reverseArr).to.deep.equal(correctArr);
	});
});
