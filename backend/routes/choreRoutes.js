// routes/choreRoutes.js
const express = require('express');
const router = express.Router();
const ChoreController = require('../controllers/choreController');

router.get('/chores', ChoreController.getAllChores);
router.post('/chores', ChoreController.addChore);
router.put('/chores/:id', ChoreController.editChore);
router.delete('/chores/:id', ChoreController.deleteChore);

module.exports = router;
