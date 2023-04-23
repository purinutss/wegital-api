const express = require("express");

const proportionController = require("../controllers/proportion-controller");

const router = express.Router();

router.post("/", proportionController.createProportion);

module.exports = router;
