const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
