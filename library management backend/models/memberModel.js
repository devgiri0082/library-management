const mongoose = require("mongoose");

let MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
  },
  memberId: {
    type: Number,
    default: Date.now,
    unique: true,
  },
});

let MemberModel = new mongoose.model("member", MemberSchema);
module.exports = MemberModel;
