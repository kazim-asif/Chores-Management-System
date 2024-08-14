// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.addUser);
router.put('/users/:id', UserController.editUser);
router.delete('/users/:id', UserController.removeUser);

module.exports = router;
