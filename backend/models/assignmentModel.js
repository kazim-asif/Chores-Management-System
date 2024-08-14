// models/assignmentModel.js
const db = require('../db');

class AssignmentModel {
  static getAllAssignments() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT 
          assignments.id AS assignment_id,
          users.id AS user_id,
          users.first_name AS user_first_name,
          users.last_name AS user_last_name,
          chores.id AS chore_id,
          chores.chore_description AS chore_description,
          chores.duration AS chore_duration
          FROM assignments
          JOIN users ON assignments.user_id = users.id
          JOIN chores ON assignments.chore_id = chores.id`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static assignChoreToUser(userId, choreId) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO assignments (user_id, chore_id) VALUES (?, ?)', [userId, choreId], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static reassignChoreToUser(assignmentId, userId, choreId) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE assignments SET user_id = ?, chore_id = ? WHERE id = ?', [userId, choreId, assignmentId], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  static removeAssignment(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM assignments WHERE id = ?', [id], (err, result) => {
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

module.exports = AssignmentModel;