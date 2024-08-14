// models/userModel.js
const db = require('../db');

class UserModel {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err) {
          resolve(rows);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static addUser(firstName, lastName) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (first_name, last_name) VALUES (?, ?)', [firstName, lastName], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static editUser(id, firstName, lastName) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET first_name = ?, last_name = ? WHERE id = ?', [firstName, lastName, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static removeUser(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }
}

module.exports = UserModel;
