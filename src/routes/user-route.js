const express = require("express");

const userController = require("../controllers/user-controller.js");

const router = express.Router();

router.patch("/:userId", userController.updateProfile);
module.exports = router;
