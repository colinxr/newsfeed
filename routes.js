const router = require('express').Router();
const passport = require('passport');
const Entry = require('./models/Entry');
const feedController = require('./feedController');

router.get('/', feedController.init);

//user routes
router.post('/api/register', userController.register);
router.post('/api/login', userController.login);

//admin routes
router.get('/api/feeds', feedController.adminFeedParser);

//front page routes
router.get('/api/posts', feedController.getPosts);
router.post('/api/posts', feedController.savePost);
router.delete('/api/posts/:id', feedController.deletePost);

module.exports = router;
