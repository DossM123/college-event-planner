const express = require('express');
const router = express.Router();
const { unregisterEvent } = require('../Controllers/UnregisterController');

router.delete('/:userId/:eventId', unregisterEvent);

module.exports = router;
