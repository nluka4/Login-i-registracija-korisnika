const express = require("express");

const {
  validateLogin,
} = require("../middleware/authMiddlewares/validateLogin");
const cryptPassword = require("../middleware/authMiddlewares/cryptPassword");
const { loginController } = require("../controllers/loginController");
const uploadMiddleware = require("../middleware/authMiddlewares/uploadMiddleware");
const validateRegistration = require("../middleware/authMiddlewares/validateRegistration");
const registerController = require("../controllers/registerController");
const router = express.Router();

router.post(
  "/register",
  uploadMiddleware,
  validateRegistration,
  cryptPassword,
  registerController,
);
router.post("/login", validateLogin, loginController);

module.exports = router;
