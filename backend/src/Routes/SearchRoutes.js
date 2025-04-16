const express = require('express');
const { searchEvents } = require('../Controllers/SearchController');

const router = express.Router();

// GET
router.get('/', searchEvents);

module.exports = router;
