const User       = require('./models/User');
const routes     = require('express').Router();

authenticateUser = (req, res, next) => {

	if (req.body.email &&
		req.body.username &&
		req.body.password &&
		req.body.passwordConf) {

		const userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			passwordConf: req.body.passwordConf,
		}

		User.create(userData, (err, user) => {
			if (err) return next(err);
			res.send({
        success: true,
        message: 'User Added Successfully'
      });
		})
	} else if (req.body.loginEmail && req.body.loginPassword) {
		User.authenticate(req.body.loginEmail, req.body.loginPassword, (err, user) => {
			if (err || !user) {
				const err = new Error('Wrong Email or Password');
				err.status = 401;
				return next(err);
			}

			req.session.userId = user._id;
			res.send({
				success: true,
				message: 'User Logged In Successfully',
			});
		})
	} else {
		const err = new Error('All fields required');
		err.status = 400;
		return next(err);
	}
}

module.exports = {
	authenticateUser
}
