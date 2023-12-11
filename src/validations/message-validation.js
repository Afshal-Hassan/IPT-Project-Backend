// validation.js
const { body, validationResult } = require("express-validator");
const BadRequest = require("../exceptions/bad-request");

const validateMessageForSave = [
  body("senderId").notEmpty().withMessage("Sender Id is required"),
  body("receiverId").notEmpty().withMessage("Receiver Id is required"),
  body("message").notEmpty().withMessage("Message is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new BadRequest(errors.array()));
    }

    next();
  },
];

module.exports = validateMessageForSave;
