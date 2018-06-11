const routes     = require('express').Router();
const User       = require('../models/User');

authenticateUser = (req, res, next) => {
	const {email, password, passwordConf, loginEmail, loginPassword} = req.body;


	if (email && password && passwordConf) {
		const userData = {
			email,
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
				res.send({
					success: false,
					err: 'Wrong Email or Password',
				});

				console.log(err);
				return false;
			}

			req.session.userId = user._id;
			res.send({
				success: true,
				message: 'User Logged In Successfully',
				sessionId: req.session.userId,
				cookie: req.session.cookie,
			});
		})
	} else {
		const err = new Error('All fields required');
		err.status = 400;
		res.send(err);
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
