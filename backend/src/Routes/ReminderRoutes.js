const express = require('express');
const router = express.Router();
const reminderController = require('../Controllers/ReminderController');

// POST
router.post('/', reminderController.saveReminder);

// GET
router.get('/:userId', reminderController.getReminders);

module.exports = router;
