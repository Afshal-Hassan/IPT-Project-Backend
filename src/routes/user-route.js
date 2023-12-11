const express = require("express");
const router = express.Router();
const validateUserForSave = require("../validations/user-validation");

const userController = require("../controllers/user-controller");

router.post("/user", validateUserForSave, userController.save);

module.exports = router;
