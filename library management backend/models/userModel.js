let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
});

let userModel = new mongoose.model("user", userSchema);

module.exports = { userModel };
