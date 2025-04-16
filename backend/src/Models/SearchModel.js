const db = require('../config/db');

const findEventsByKeyword = async (keyword) => {
  const searchTerm = `%${keyword}%`;

  const [rows] = await db.query(
    `SELECT * FROM event 
     WHERE title LIKE ? 
     OR description LIKE ? 
     OR location LIKE ?
     OR organizer_id LIKE ?`,
    [searchTerm, searchTerm, searchTerm, searchTerm]
  );

  return rows;
};

module.exports = {
  findEventsByKeyword
};
