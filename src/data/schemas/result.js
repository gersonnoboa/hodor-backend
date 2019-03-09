const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  score: Number
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
