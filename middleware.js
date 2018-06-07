requiresLogin = (req, res, next) => {
	if (req.session && req.session.userId) return next();

	const err = new Error('You Must Be Logged In to view this page');
	err.status = 401;
	return next(err);
}

module.exports = {
	requiresLogin,
}
