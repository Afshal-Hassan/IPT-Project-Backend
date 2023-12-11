const User = require("../models/user");
const GenericResponse = require("../dto/generic-response");
const BadRequest = require("../exceptions/bad-request");
const { MONGO_DUP_INDEX_ERROR_CODE } = require("../helpers/constant");

module.exports = {
  save: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const newUser = await user.save();

      return res
        .status(201)
        .send(new GenericResponse("User has been saved successfully", newUser));
    } catch (error) {
      if (error.code === MONGO_DUP_INDEX_ERROR_CODE) {
        next(
          new BadRequest("User already exists by this email: " + req.body.email)
        );
      } else {
        next(new BadRequest(error));
      }
    }
  },
};
