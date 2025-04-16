const { cancelEventRegistration } = require('../Services/UnregisterService');

const unregisterEvent = async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        await cancelEventRegistration(userId, eventId);
        res.status(200).json({ message: 'Registration cancelled successfully.' });
    } catch (error) {
        console.error("Unregister error:", error);
        res.status(500).json({ error: 'Failed to cancel registration.' });
    }
};

module.exports = {
    unregisterEvent,
    // ...other exported controllers
};
