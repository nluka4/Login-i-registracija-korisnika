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

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Registracija
 *    description: Ruta za registraciju novog korisnika, ukoliko korisnik unese validne kredencijale, morace da se uloguje na /api/auth/register kako bi dobio JWT token. Koristi se bcrypt datoteka za hesiranje lozinke u bazi podataka, takodje koristimo multer biblioteku kako bismo mogli da radimo sa datotekama koja je u ovom slucaju profilna slika korisnika.
 *    tags: [Auth]
 *    responses:
 *      201:
 *        description: Korisnik je uspesno registrovan.
 *      400:
 *        description: Neispravan zahtev.
 *      401:
 *        description: Pogresan email ili password.
 *      500:
 *        description: Serverska greska.
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              _username:
 *                type: string
 *                example: mare2
 *              _fullName:
 *                 type: string
 *                 example: Mare Markovic
 *              _email:
 *                type: string
 *                example: test3@example.compare
 *              _password:
 *                type: string
 *                example: Test123!
 *              _bio:
 *                type: string
 *                example: Lorem ipsum...
 *              _profileImage:
 *                type: string
 *                format: binary
 *
 *
 */
router.post(
  "/register",
  uploadMiddleware,
  validateRegistration,
  cryptPassword,
  registerController,
);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login
 *    description: Ruta za prijavu posojecih korisnika, ukoliko korisnik unese validne kredencijale(email i password), vraca mu se JWT token koji enkoduje podatke o user_id, username i role.
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Korisnik je uspesno ulogovan
 *      400:
 *        description: Neispravan zahtev
 *      401:
 *        description: Pogresan email ili password
 *      500:
 *        description: Serverska greska
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _email:
 *                type: string
 *                example: test@example.compare
 *              _password:
 *                type: string
 *                example: Test123!
 *
 *
 */
router.post("/login", validateLogin, loginController);

module.exports = router;
