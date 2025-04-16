const registrationService = require('../Services/RegisterButtonService');

const register = async (req, res) => {
  const { user_id, event_id } = req.body;
  try {
    await registrationService.register(user_id, event_id);
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

const getMyEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await registrationService.getUserEvents(user_id);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registered events', details: err.message });
  }
};

module.exports = { register, getMyEvents };
