const db = require('../config/db');

// Function to fetch user by userId
const getUserById = async (userId) => {
  try {
    const [rows] = await db.execute(
      'SELECT name, email, phone, year_of_study FROM users WHERE user_id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return null; 
    }
    return rows[0];
  } catch (error) {
    throw new Error('Database query error: ' + error.message);
  }
};

module.exports = {
  getUserById,
};
