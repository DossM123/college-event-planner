const Category = require('../Models/CategoryModel');

class CategoryService {
  static async fetchCategories() {
    try {
      return await Category.getAll();
    } catch (error) {
      throw new Error('Error fetching categories');
    }
  }
}

module.exports = CategoryService;