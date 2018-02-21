const router = require('express').Router();
const passport = require('./passport');
const Entry = require('./models/Entry');
const feedController = require('./feedController');
const userController = require('./userController');

router.get('/', feedController.init);

//auth routes
router.get(
  '/auth/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH_CLIENT,
    domain: process.env.AUTH_DOMAIN,
    redirectUri: process.env.AUTH_CALLBACK,
    audience: 'https://' + process.env.AUTH_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// Perform session logout and redirect to homepage
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/auth/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/admin');
  }
);


//router.post('/auth/register', userController.register);

//admin routes
//router.get('/api/feeds', passport.authenticate('bearer', { session: false }), feedController.adminFeedParser);
router.get('/api/feeds', feedController.adminFeedParser);

//front page routes
router.get('/api/posts', feedController.getPosts);
router.post('/api/posts', feedController.savePost);
router.delete('/api/posts/:id', feedController.deletePost);

module.exports = router;
