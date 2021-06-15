let mongoose = require("mongoose");

let issueSchema = new mongoose.Schema(
  {
    issuingMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
    },
    issuedBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
    isIssued: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let IssueModel = new mongoose.model("issue", issueSchema);

module.exports = IssueModel;
