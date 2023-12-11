// validation.js
const { body, validationResult } = require("express-validator");
const BadRequest = require("../exceptions/bad-request");

const validateFriendForSave = [
  body("userId").notEmpty().withMessage("User Id is required"),
  body("friendId").notEmpty().withMessage("Friend Id is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new BadRequest(errors.array()));
    }

    next();
  },
];

module.exports = validateFriendForSave;
