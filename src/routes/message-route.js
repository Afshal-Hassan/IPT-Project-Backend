const express = require("express");
const router = express.Router();
const validateMessageForSave = require("../validations/message-validation");

const messageController = require("../controllers/message-controller");

router.post("/message", validateMessageForSave, messageController.save);
router.post("/message/all", messageController.getAll);

module.exports = router;
