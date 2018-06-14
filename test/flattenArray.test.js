const expect = require('chai').expect;
const flattenArray = require('../controllers/feedController').flattenArray;

describe('flattenArray()', () => {
	it('should take an array of nested arrays and return a flat one', () => {
		const testArr = [
			[{
				x: true,
			}],
			[{
				x: false,
			}],
			[{
				x: true,
			}],
		];

		const correctArr = [
			{ x: true, },
			{ x: false, },
			{ x: true, },
		];

		const flatArr = flattenArray(testArr);

		expect(flatArr).to.deep.equal(correctArr);
	});
});
