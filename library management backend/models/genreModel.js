const mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: "true",
    required: true,
  },
});

let genreModel = new mongoose.model("genre", genreSchema);

module.exports = genreModel;
