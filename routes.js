const router = require('express').Router();
const Entry  = require('./models/Entry');
const feedController = require('./feedController');

//admin routes
router.get('/api/feeds', feedController.adminFeed);
router.get('/api/feeds/:category', feedController.categoryFeed);
router.get('/api/feeds/:category/:id', feedController.singleFeed);

//front page routes
router.get('/api/posts', feedController.getPosts);
router.post('/api/posts', feedController.savePost);
router.delete('/api/posts/:id', feedController.deletePost);

module.exports = router;
