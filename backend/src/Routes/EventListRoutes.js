// const express = require('express');
// const eventController = require('../Controllers/EventListController');

// const router = express.Router();

// router.get('/view', eventController);

// module.exports = router;

const express = require('express');
const EventController = require('../Controllers/EventListController');

const router = express.Router();

router.get('/view', EventController.viewEvents);

module.exports = router;