const express = require("express");

const {
  validateLogin,
} = require("../middleware/authMiddlewares/validateLogin");
const cryptPassword = require("../middleware/authMiddlewares/cryptPassword");
const { loginController } = require("../controllers/loginController");
const uploadMiddleware = require("../middleware/authMiddlewares/uploadMiddleware");
const validateRegistration = require("../middleware/authMiddlewares/validateRegistration");
const router = express.Router();

router.post("/register", uploadMiddleware, validateRegistration, cryptPassword);
router.post("/login", validateLogin, loginController);

module.exports = router;
