const Entry = require('./models/Entry');
const router = require('express').Router();

const feedController = require('./feedController');

router.get('/', feedController.init);

router.get('/api/feeds', feedController.adminFeedParser);

router.get('/api/posts', feedController.getPosts);
router.post('/api/posts', feedController.savePost);
router.delete('/api/posts/:id', feedController.deletePost);

module.exports = router;
