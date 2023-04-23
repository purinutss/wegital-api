const express = require("express");

const userController = require("../controllers/user-controller.js");

const router = express.Router();

router.patch("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
module.exports = router;
