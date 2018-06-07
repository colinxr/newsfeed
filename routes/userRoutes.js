const router = require('express').Router();
const userController = require('../controllers/userController');

//auth routes
router
	.post('/users', userController.authenticateUser)
	.get('/logout', userController.logoutUser);

module.exports = router;
