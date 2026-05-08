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

console.log("uploadMiddleware:", typeof uploadMiddleware);
console.log("validateRegistration:", typeof validateRegistration);
console.log("cryptPassword:", typeof cryptPassword);
console.log("validateLogin:", typeof validateLogin);
console.log("loginController:", typeof loginController);

router.post(
  "/register",
  uploadMiddleware,
  validateRegistration,
  cryptPassword,
  registerController,
);
router.post("/login", validateLogin, loginController);

module.exports = router;
