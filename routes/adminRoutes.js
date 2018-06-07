const router = require('express').Router();
const feedController = require('../controllers/feedController');

//admin routes
router
	.get('/', feedController.adminFeed)
	.get('/categories', feedController.getCategories)
	.get('/:category', feedController.categoryFeed)
	.get('/:category/:id', feedController.singleFeed);

	module.exports = router;
