// validation.js
const { body, validationResult } = require("express-validator");
const BadRequest = require("../exceptions/bad-request");

const validateUserForSave = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("phoneNo").isMobilePhone().withMessage("Invalid phone number"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new BadRequest(errors.array()));
    }

    next();
  },
];

module.exports = validateUserForSave;
