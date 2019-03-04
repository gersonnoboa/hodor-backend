const mongoose = require("mongoose");

const groupUserSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group"
  }
});

const GroupUser = mongoose.model("GroupUser", groupUserSchema);

module.exports = GroupUser;