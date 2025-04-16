const db = require('../config/db');

const unregisterFromEvent = (userId, eventId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM registration WHERE user_id = ? AND event_id = ?`;
        db.query(query, [userId, eventId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    unregisterFromEvent
};
