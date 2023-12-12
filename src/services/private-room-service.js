const PrivateRoom = require("../models/private-room");
const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const { MONGO_DUP_INDEX_ERROR_CODE } = require("../helpers/constant");

module.exports = {
  save: async (privateRooms) => {
    const newPrivateRooms = await PrivateRoom.insertMany(privateRooms);

    return newPrivateRooms;
  },

  get: async (req, res, next) => {
    try {
      const user1Id = req.params.user1Id;
      const user2Id = req.params.user2Id;

      const privateRoom = await PrivateRoom.find({
        $and: [
          {
            $or: [{ user1Id: user1Id }, { user1Id: user2Id }],
          },
          {
            $or: [{ user2Id: user1Id }, { user2Id: user2Id }],
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
