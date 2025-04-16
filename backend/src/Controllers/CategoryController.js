const CategoryService = require('../Services/CategoryService');

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await CategoryService.fetchCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CategoryController;