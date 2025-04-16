const reminderModel = require('../Models/ReminderModel');

const saveReminder = async (userId, eventId, reminderTime) => {
  const existing = await reminderModel.getReminder(userId, eventId);

  if (existing.length > 0) {
    await reminderModel.updateReminder(userId, eventId, reminderTime);
  } else {
    await reminderModel.insertReminder(userId, eventId, reminderTime);
  }
};

const getUserReminders = async (userId) => {
  return reminderModel.getAllRemindersForUser(userId);
};

module.exports = {
  saveReminder,
  getUserReminders,
};
