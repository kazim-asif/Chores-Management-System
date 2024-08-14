// routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const AssignmentController = require('../controllers/assignmentController');

router.get('/assignments', AssignmentController.getAllAssignments);
router.post('/assignments', AssignmentController.assignChoreToUser);
router.put('/assignments/:id', AssignmentController.reassignChoreToUser);
router.delete('/assignments/:id', AssignmentController.removeAssignment);

module.exports = router;
