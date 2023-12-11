const Friend = require("../models/friend");
const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const { MONGO_DUP_INDEX_ERROR_CODE } = require("../helpers/constant");

module.exports = {
  save: async (req, res, next) => {
    try {
      const friend = new Friend(req.body);
      const newFriends = await friend.save();

      return res
        .status(200)
        .send(
          new GenericResponse("Friends has been saved successfully", newFriends)
        );
    } catch (error) {
      if (error.code === MONGO_DUP_INDEX_ERROR_CODE) {
        next(new BadRequest("These users already exists as friends"));
      } else {
        next(new BadRequest(error));
      }
    }
  },

  getAll: async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const friends = await Friend.find({
        $or: [
          {
            userId: userId,
          },
        ],
      }).populate({
        path: "friendId",
        model: "users",
        select: "name email country phoneNo",
      });

      return res
        .status(200)
        .send(
          new GenericResponse(
            "List of all friends of user by id: " + userId,
            friends
          )
        );
    } catch (error) {
      next(new BadRequest(error));
    }
  },
};
