const router 			= require('express').Router();
const Entry  			= require('../models/Entry');
const userRoutes  = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const postRoutes  = require('./postRoutes');

router.use('/auth/', userRoutes);
router.use('/api/feeds', adminRoutes);
router.use('/api/posts', postRoutes);

module.exports = router;
