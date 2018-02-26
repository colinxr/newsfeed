const router = require('express').Router();
const Entry  = require('./models/Entry');
const feedController = require('./feedController');
const postController = require('./postController');

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

router.post(
  '/api/posts',
  postController.analyzeEntities,
  postController.savePost
);

router.delete(
  '/api/posts/:id',
  postController.deletePost
);

module.exports = router;
