const express = require('express');
const router = express.Router();
const registrationController = require('../Controllers/RegisterButtonController');

router.post('/register', registrationController.register);
router.get('/my-events/:user_id', registrationController.getMyEvents);

module.exports = router;
