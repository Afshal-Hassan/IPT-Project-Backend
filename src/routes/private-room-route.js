const express = require("express");
const router = express.Router();

const privateRoomController = require("../controllers/private-room-controller");

router.post("/private-room", privateRoomController.save);
router.get("/private-room/:user1Id/:user2Id", privateRoomController.get);

module.exports = router;
