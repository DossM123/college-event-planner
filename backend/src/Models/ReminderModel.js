const db = require('../config/db');

const getReminder = async (userId, eventId) => {
  const [rows] = await db.query(
    "SELECT * FROM reminder WHERE user_id = ? AND event_id = ?",
    [userId, eventId]
  );
  return rows;
};

const insertReminder = async (userId, eventId, reminderTime) => {
  return db.query(
    "INSERT INTO reminder (user_id, event_id, reminder_time) VALUES (?, ?, ?)",
    [userId, eventId, reminderTime]
  );
};

const updateReminder = async (userId, eventId, reminderTime) => {
  return db.query(
    "UPDATE reminder SET reminder_time = ? WHERE user_id = ? AND event_id = ?",
    [reminderTime, userId, eventId]
  );
};

const getAllRemindersForUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT r.event_id, r.reminder_time, e.title, e.event_date, e.event_time, e.location
     FROM reminder r
     JOIN event e ON r.event_id = e.event_id
     WHERE r.user_id = ?`,
    [userId]
  );
  return rows;
};

module.exports = {
  getReminder,
  insertReminder,
  updateReminder,
  getAllRemindersForUser,
};
