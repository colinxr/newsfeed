const router 			= require('express').Router();
const Entry  			= require('../models/Entry');
const userRoutes  = require('./userRoutes');
const postRoutes  = require('./postRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/auth/', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/feeds', adminRoutes);

module.exports = router;
