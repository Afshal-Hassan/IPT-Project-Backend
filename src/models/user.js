const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  profilePic: {
    type: String,
  },
});

const user = new mongoose.model("users", userSchema);

module.exports = user;
