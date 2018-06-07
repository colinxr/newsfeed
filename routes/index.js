const router 			= require('express').Router();
const Entry  			= require('../models/Entry');
const userRoutes  = require('../controllers/userRoutes');
const postRoutes  = require('../controllers/postRoutes');
const adminRoutes = require('../controllers/adminRoutes');

router.use('/auth/', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/feeds', adminRoutes);

module.exports = router;
