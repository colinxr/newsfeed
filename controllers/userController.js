const routes     = require('express').Router();
const User       = require('../models/User');

authenticateUser = (req, res, next) => {
	const {email, username, password, passwordConf, loginEmail, loginPassword} = req.body;

	if (email && username && password && passwordConf) {
		const userData = {
			email,
			username,
			password,
			passwordConf,
		}

		User.create(userData, (err, user) => {
			if (err) return next(err);
			res.send({
        success: true,
        message: 'User Added Successfully'
      });
		})
	} else if (loginEmail && loginPassword) {
		User.authenticate(loginEmail, loginPassword, (err, user) => {
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

logoutUser = (req, res, next) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) return next(err);

			res.send({
				success: true,
				message: 'User logged out sucessfully',
			});
		});
	}
}

module.exports = {
	authenticateUser,
	logoutUser,
}