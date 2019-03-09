const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"), { expiresIn: '30d' });
  return token
}

const User = mongoose.model("User", userSchema);

module.exports = User;
