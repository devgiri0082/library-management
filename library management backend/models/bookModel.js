const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      unique: false,
      required: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genre",
    },
    author: {
      type: ["string"],
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

let BookModel = new mongoose.model("book", BookSchema);
module.exports = BookModel;
