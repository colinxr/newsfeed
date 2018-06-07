const router = require('express').Router();
const Entry  = require('./models/Entry');
const feedController = require('./feedController');
const postController = require('./postController');
const userController = require('./userController');

//auth routes

router.post(
	'/auth/users',
	userController.authenticateUser
);

//admin routes
router.get(
  '/api/feeds',
  feedController.adminFeed
);

router.get(
  '/api/feeds/categories',
  feedController.getCategories
);

router.get(
  '/api/feeds/:category',
  feedController.categoryFeed
);

router.get(
  '/api/feeds/:category/:id',
  feedController.singleFeed
);

//front page routes
router.get(
  '/api/posts',
  postController.getPosts
);

router.get(
  '/api/posts/:tag',
  postController.getPostsByTag
);

router.post(
  '/api/posts',
  postController.savePost
);

router.delete(
  '/api/posts/:id',
  postController.deletePost
);

module.exports = router;
