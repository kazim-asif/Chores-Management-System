// models/choreModel.js
const db = require('../db');

class ChoreModel {
  static getAllChores() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM chores', (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static addChore(description, duration) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO chores (chore_description, duration) VALUES (?, ?)', [description, duration], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static editChore(id, description, duration) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE chores SET chore_description = ?, duration = ? WHERE id = ?', [description, duration, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static deleteChore(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM chores WHERE id = ?', [id], (err, result) => {
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

module.exports = ChoreModel;