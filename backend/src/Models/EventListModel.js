const pool = require('../config/db');

class Event {
  static async getEvents(categoryId) {
    let query = `
      SELECT e.event_id, e.title, e.event_date, e.event_time, e.location, e.description, e.organizer_id
      FROM event e
    `;
    const params = [];
    if (categoryId) {
      query += `
        JOIN eventcategory ec ON e.event_id = ec.event_id
        WHERE ec.category_id = ?
      `;
      params.push(categoryId);
    }
    const [rows] = await pool.query(query, params);
    return rows;
  }
}

module.exports = Event;