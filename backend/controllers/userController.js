// controllers/userController.js
const UserModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addUser = async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    await UserModel.addUser(first_name, last_name);
    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;
  try {
    await UserModel.editUser(id, first_name, last_name);
    res.json({ message: 'User edited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.removeUser(id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
