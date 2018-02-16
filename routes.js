const router = require('express').Router();
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const BearerStrategy = require('passport-http-bearer').Strategy;
// const jwt = require('jwt-simple');
const passport = require('./passport');
const Entry = require('./models/Entry');
const feedController = require('./feedController');
const userController = require('./userController');

// const ADMIN = 'admin';
// const ADMIN_PASSWORD = 'password';
// const SECRET = 'mysecret';
//
// passport.use(new LocalStrategy((username, password, done) => {
//   if (username === ADMIN && password === ADMIN_PASSWORD) {
//     done(null, jwt.encode({ username }, SECRET));
//     return
//   }
//   done(null, false);
// }));
// passport.use(new BearerStrategy((token, done) =>{
//   try {
//     const { username } = jwt.decode(token, SECRET);
//     if (username === ADMIN) {
//       done(null, username);
//       return;
//     }
//     done(null, false);
//   } catch (error) {
//     done(null, false);
//   }
// }));

router.get('/', feedController.init);

//user routes
router.post('/api/login', passport.authenticate('local', {session: false}),
  (req, res) => {
    res.send({
      token: req.user,
    });
  },
);

//router.post('/api/register', userController.register);

//admin routes
router.get('/api/feeds', passport.authenticate('bearer', { session: false }), feedController.adminFeedParser);

//front page routes
router.get('/api/posts', feedController.getPosts);
router.post('/api/posts', feedController.savePost);
router.delete('/api/posts/:id', passport.authenticate('bearer', { session: false }), feedController.deletePost);

module.exports = router;
