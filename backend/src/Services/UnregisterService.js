const { unregisterFromEvent } = require('../Models/UnregisterModel');

const cancelEventRegistration = async (userId, eventId) => {
    return await unregisterFromEvent(userId, eventId);
};

module.exports = {
    cancelEventRegistration
};
