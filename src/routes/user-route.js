const express = require("express");

const userController = require("../controllers/user-controller.js");

const router = express.Router();

router.patch("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
module.exports = router;
