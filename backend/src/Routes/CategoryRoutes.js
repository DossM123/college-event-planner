const express = require('express');
const CategoryController = require('../Controllers/CategoryController');

const router = express.Router();

router.get('/view', CategoryController.getCategories);

module.exports = router;