const express = require("express");

const authController = require("../controllers/auth-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authenticateMiddleware, authController.register);

module.exports = router;
