const router = require('express').Router();
const mid = require('../middleware');
const feedController = require('../controllers/feedController');

//admin routes
router
	.get('/', mid.requiresLogin, feedController.adminFeed)
	.get('/categories', mid.requiresLogin, feedController.getCategories)
	.get('/:category', mid.requiresLogin, feedController.categoryFeed)
	.get('/:category/:id', mid.requiresLogin, feedController.singleFeed);

	module.exports = router;
