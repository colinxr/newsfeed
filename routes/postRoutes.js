const router = require('express').Router();
const postController = require('../controllers/postController');
const mid = require('../middleware');


//front page routes
router
	.get('/', postController.getPosts)
	.post('/', postController.savePost)
	.get('/:tag', postController.getPostsByTag)
	.delete('/:id', postController.deletePost);

module.exports = router;
