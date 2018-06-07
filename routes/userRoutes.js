const router = require('express').Router();
const userController = require('../userController');

//auth routes
router
	.post('/users', userController.authenticateUser)
	.get('/logout', userController.logoutUser);

module.exports = router;
