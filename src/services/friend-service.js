const Friend = require("../models/friend");
const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const { MONGO_DUP_INDEX_ERROR_CODE } = require("../helpers/constant");

module.exports = {
  save: async (friends) => {
    const newFriends = await Friend.insertMany(friends);
    return newFriends;
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
        select: "name email profilePic",
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
