const router = require('express').Router();
const feedController = require('../feedController');

//admin routes
router
	.get('/', feedController.adminFeed)
	.get('/categories', feedController.getCategories)
	.get('/:category', feedController.categoryFeed)
	.get('/:category/:id', feedController.singleFeed);

	module.exports = router;
