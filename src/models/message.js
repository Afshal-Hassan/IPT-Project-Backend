const mongoose = require("mongoose");
const BadRequest = require("../exceptions/bad-request");

const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    validate: {
      validator: function (value) {
        return this.senderId.toString() !== value.toString();
      },
      message: "receiverId must not be the same as senderId",
    },
  },
  message: {
    type: String,
    required: true,
  },
});

messageSchema.pre("save", async function (next) {
  const user1Exists = await mongoose
    .model("users")
    .exists({ _id: this.senderId });
  const user2Exists = await mongoose
    .model("users")
    .exists({ _id: this.receiverId });

  if (!user1Exists || !user2Exists) {
    next(
      new BadRequest(
        "One or both of the users do not exist in the 'users' collection"
      )
    );
  }

  next();
});

const message = new mongoose.model("messages", messageSchema);

module.exports = message;
