const express = require("express");

const proportionController = require("../controllers/proportion-controller");

const router = express.Router();

router.post("/", proportionController.createProportion);
router.get("/", proportionController.getAllProportion);
router.get("/user", proportionController.getProportionByUserId);
module.exports = router;
