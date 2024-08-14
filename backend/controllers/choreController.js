// controllers/choreController.js
const ChoreModel = require('../models/choreModel');

exports.getAllChores = async (req, res) => {
  try {
    const chores = await ChoreModel.getAllChores();
    res.json(chores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addChore = async (req, res) => {
  const { chore_description, duration } = req.body;
  try {
    await ChoreModel.addChore(chore_description, duration);
    res.json({ message: 'Chore added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editChore = async (req, res) => {
  const { id } = req.params;
  const { chore_description, duration } = req.body;
  try {
    await ChoreModel.editChore(id, chore_description, duration);
    res.json({ message: 'Chore edited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteChore = async (req, res) => {
  const { id } = req.params;
  try {
    await ChoreModel.deleteChore(id);
    res.json({ message: 'Chore deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
