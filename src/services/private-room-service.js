const PrivateRoom = require("../models/private-room");
const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const { MONGO_DUP_INDEX_ERROR_CODE } = require("../helpers/constant");

module.exports = {
  save: async (req, res, next) => {
    try {
      const privateRoom = new PrivateRoom(req.body);
      const newPrivateRoom = await privateRoom.save();

      return res
        .status(200)
        .send(
          new GenericResponse(
            "Private Room has been saved successfully",
            newPrivateRoom
          )
        );
    } catch (error) {
      if (error.code === MONGO_DUP_INDEX_ERROR_CODE) {
        next(new BadRequest("These users private rooms already exists"));
      } else {
        next(new BadRequest(error));
      }
    }
  },

  get: async (req, res, next) => {
    try {
      const user1Id = req.params.user1Id;
      const user2Id = req.params.user2Id;

      const privateRoom = await PrivateRoom.find({
        $or: [
          {
            user1Id: user1Id,
          },
          {
            user1d: user2Id,
          },
          {
            user2Id: user1Id,
          },
          {
            user2Id: user2Id,
          },
        ],
      });

      return res
        .status(200)
        .send(
          new GenericResponse(
            "Private room key of users by id: " + user1Id + " & " + user2Id,
            privateRoom
          )
        );
    } catch (error) {
      next(new BadRequest(error));
    }
  },
};
