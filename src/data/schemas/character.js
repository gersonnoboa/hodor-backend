const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  name: String,
  status: String,
  image: String
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
