const express = require('express');
const router = express.Router();
const organizeController = require('../Controllers/OrganizerController');


router.get('/:userId', organizeController.getOrganizerDetails);

module.exports = router;
