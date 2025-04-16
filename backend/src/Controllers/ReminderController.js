const reminderService = require('../Services/ReminderService');

const saveReminder = async (req, res) => {
  const { userId, eventId, reminderTime } = req.body;

  if (!userId || !eventId || !reminderTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await reminderService.saveReminder(userId, eventId, reminderTime);
    res.status(200).json({ message: "Reminder saved successfully" });
  } catch (err) {
    console.error("Reminder Save Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getReminders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const reminders = await reminderService.getUserReminders(userId);
    res.status(200).json(reminders);
  } catch (err) {
    console.error("Fetch Reminders Error:", err);
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
};

module.exports = {
  saveReminder,
  getReminders,
};
