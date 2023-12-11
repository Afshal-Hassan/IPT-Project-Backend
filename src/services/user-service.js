const User = require("../models/user");
const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const { MONGO_DUP_INDEX_ERROR_CODE } = require("../helpers/constant");

module.exports = {
  save: async (user) => {
    try {
      const isUserExists = await User.findOne({ email: user.email });

      if (isUserExists) {
        return isUserExists;
      } else {
        const user = new User(user);
        const newUser = await user.save();

        return newUser;
      }
    } catch (error) {
      if (error.code === MONGO_DUP_INDEX_ERROR_CODE) {
        next(new BadRequest("User already exists by this email: " + user));
      } else {
        next(new BadRequest(error));
      }
    }
  },
};
