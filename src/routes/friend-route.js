const express = require("express");
const router = express.Router();
const validateFriendForSave = require("../validations/friend-validation");

const friendController = require("../controllers/friend-controller");

router.post("/friend", validateFriendForSave, friendController.save);
router.get("/friend/all/:userId", friendController.getAll);

module.exports = router;
