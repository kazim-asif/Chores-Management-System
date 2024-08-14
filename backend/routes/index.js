// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const choreRoutes = require('./choreRoutes');
const assignmentRoutes = require('./assignmentRoutes');
const router = express.Router();

router.use(userRoutes);
router.use(choreRoutes);
router.use(assignmentRoutes);

module.exports = router;
