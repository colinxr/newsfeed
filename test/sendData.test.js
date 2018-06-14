const chai 				   		= require('chai');
const chaiHttp					= require('chai-http');
const chaiAsPromised 		= require('chai-as-promised');
const sendData 				  = require('../controllers/feedController').sendData;
const feeds 						= require('../feeds');
const expect 				 		= chai.expect;

chai.use(chaiHttp);

describe('sendData()', () => {
	it('Should send JSON to client', () => {
		chai.request('http://localhost:3001')
			.get('/api/feeds/')
			.end((err, res) => {
				if (err) { done(err) }

				expect(res).to.have.status(200);
				expect(res.header['content-type']).to.be.equal('application/json; charset=utf-8');
			})
	});
});
