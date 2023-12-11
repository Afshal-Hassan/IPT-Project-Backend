const mongoose = require("mongoose");
const BadRequest = require("../exceptions/bad-request");

const privateRoomSchema = mongoose.Schema({
  user1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  user2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    validate: {
      validator: function (value) {
        return this.user1Id.toString() !== value.toString();
      },
      message: "user2Id must not be the same as user1Id",
    },
  },
});

privateRoomSchema.index({ user1Id: 1, user2Id: 1 }, { unique: true });

privateRoomSchema.pre("save", async function (next) {
  const user1Exists = await mongoose
    .model("users")
    .exists({ _id: this.user1Id });
  const user2Exists = await mongoose
    .model("users")
    .exists({ _id: this.user2Id });

  if (!user1Exists || !user2Exists) {
    next(new BadRequest("One or both of the users do not exists"));
  }

  next();
});

const privateRooms = new mongoose.model("private-rooms", privateRoomSchema);

module.exports = privateRooms;
