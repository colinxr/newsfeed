const router = require('express').Router();
const postController = require('../controllers/postController');
const mid = require('../middleware');


//front page routes
router
	.get('/', postController.getPosts)
	.post('/', mid.requiresLogin, postController.savePost)
	.get('/:tag', postController.getPostsByTag)
	.delete('/:id', mid.requiresLogin, postController.deletePost);

module.exports = router;
