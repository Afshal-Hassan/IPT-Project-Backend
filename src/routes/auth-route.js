const express = require("express");
const router = express.Router();
const validateFriendForAuth = require("../validations/auth-validation");

const authController = require("../controllers/auth-controller");

router.post("/auth", validateFriendForAuth, authController.login);

module.exports = router;
