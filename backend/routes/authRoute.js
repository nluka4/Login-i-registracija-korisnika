const express = require("express");
const { validateLogin } = require("../middleware/validateLogin");
const cryptPassword = require("../middleware/cryptPassword");
const { loginController } = require("../controllers/loginController");
const router = express.Router();

router.post("/login", validateLogin, cryptPassword, loginController);

module.exports = router;
