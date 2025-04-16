const db = require('../config/db');

const Registration = {
  registerUserForEvent: (userId, eventId) => {
    return db.query(
      'INSERT INTO registration (user_id, event_id) VALUES (?, ?)',
      [userId, eventId]
    );
  },

  getUserRegistrations: (userId) => {
    return db.query(
      `SELECT e.* FROM event e
       JOIN registration r ON e.event_id = r.event_id
       WHERE r.user_id = ?`,
      [userId]
    );
  }
};

module.exports = Registration;
