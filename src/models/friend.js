const mongoose = require("mongoose");
const BadRequest = require("../exceptions/bad-request");

const friendSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    validate: {
      validator: function (value) {
        return this.userId.toString() !== value.toString();
      },
      message: "friendId must not be the same as userId",
    },
  },
});

friendSchema.index({ userId: 1, friendId: 1 }, { unique: true });

friendSchema.pre("save", async function (next) {
  const user1Exists = await mongoose
    .model("users")
    .exists({ _id: this.userId });
  const user2Exists = await mongoose
    .model("users")
    .exists({ _id: this.friendId });

  if (!user1Exists || !user2Exists) {
    next(new BadRequest("One or both of the users do not exists"));
  }

  next();
});

const friend = new mongoose.model("friends", friendSchema);

module.exports = friend;
