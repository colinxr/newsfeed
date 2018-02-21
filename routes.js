const router = require('express').Router();
const passport = require('./passport');
const Entry = require('./models/Entry');
const feedController = require('./feedController');
const userController = require('./userController');


router.get('/', feedController.init);

//auth routes
router.post('/auth/login', passport.authenticate('local', {session: false}),
  (req, res) => {
    res.send({
      token: req.user,
    });
  },
);

//router.post('/auth/register', userController.register);

//admin routes
//router.get('/api/feeds', passport.authenticate('bearer', { session: false }), feedController.adminFeedParser);
router.get('/api/feeds', feedController.adminFeedParser);

//front page routes
router.get('/api/posts', feedController.getPosts);
router.post('/api/posts', feedController.savePost);
router.delete('/api/posts/:id', passport.authenticate('bearer', { session: false }), feedController.deletePost);

module.exports = router;
