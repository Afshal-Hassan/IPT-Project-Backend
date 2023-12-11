const User = require("../models/user");
const friendService = require("../services/friend-service");
const BadRequest = require("../exceptions/bad-request");
const { MONGO_DUP_INDEX_ERROR_CODE } = require("../helpers/constant");

module.exports = {
  save: async (user) => {
    const isUserExists = await User.findOne({ email: user.email });

    if (isUserExists) {
      return isUserExists;
    } else {
      const userModel = new User(user);
      const newUser = await userModel.save();

      const existingUsers = await User.find({
        $nor: [{ email: user.email }],
      });

      const friends1 = existingUsers.map((u) => ({
        userId: u._id,
        friendId: newUser._id,
      }));

      const friends2 = existingUsers.map((u) => ({
        userId: newUser._id,
        friendId: u._id,
      }));

      friendService.save(friends1);
      friendService.save(friends2);

      return newUser;
    }
  },
};
