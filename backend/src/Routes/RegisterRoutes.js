const express = require("express");
const { registerController } = require("../Controllers/RegisterController");

const router = express.Router();

router.post("/register", registerController);

module.exports = router;
