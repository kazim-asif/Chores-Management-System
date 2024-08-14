// controllers/assignmentController.js
const AssignmentModel = require('../models/assignmentModel');

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await AssignmentModel.getAllAssignments();
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.assignChoreToUser = async (req, res) => {
  const { userId, choreId } = req.body;
  try {
    await AssignmentModel.assignChoreToUser(userId, choreId);
    res.json({ message: 'Chore assigned to user successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.reassignChoreToUser = async (req, res) => {
  const { id } = req.params;
  const { userId, choreId } = req.body;
  try {
    await AssignmentModel.reassignChoreToUser(id, userId, choreId);
    res.json({ message: 'Chore reassigned to user successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    await AssignmentModel.removeAssignment(id);
    res.json({ message: 'Assignment removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
