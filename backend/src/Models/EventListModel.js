// const db = require('../config/db');

// const getEvents = async () => {
//   const [rows] = await db.execute(`
//     SELECT e.event_id, e.title, e.event_date, e.event_time, e.location, c.name AS category_name
//     FROM event e
//     LEFT JOIN eventCategory ec ON e.event_id = ec.event_id
//     LEFT JOIN category c ON ec.category_id = c.category_id
//     WHERE e.event_date >= CURDATE()
//     ORDER BY e.event_date ASC, e.event_time ASC
//   `);
//   return rows;
// };

// module.exports = { getEvents };


// const pool = require('../config/db');

// class EventCategory {
//   static async getEventsByCategory(categoryId) {
//     const [rows] = await pool.query(`
//       SELECT e.event_id, e.title, e.event_date, e.event_time, e.location, e.description, e.organizer_id
//       FROM event e
//       JOIN eventcategory ec ON e.event_id = ec.event_id
//       WHERE ec.category_id = ?
//     `, [categoryId]);
//     return rows;
//   }

//   static async getAllEvents() {
//     const [rows] = await pool.query(`
//       SELECT e.event_id, e.title, e.event_date, e.event_time, e.location, e.description, e.organizer_id
//       FROM event e
//     `);
//     return rows;
//   }
// }

// module.exports = EventCategory;



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