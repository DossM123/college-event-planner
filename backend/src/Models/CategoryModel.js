const db = require('../config/db');

class Category {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM category');
    return rows;
  }
}

module.exports = Category;