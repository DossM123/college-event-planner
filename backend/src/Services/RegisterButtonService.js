const Registration = require('../Models/RegisterButtonModel');

const register = async (userId, eventId) => {
  return await Registration.registerUserForEvent(userId, eventId);
};

const getUserEvents = async (userId) => {
  return await Registration.getUserRegistrations(userId);
};

module.exports = { register, getUserEvents };
