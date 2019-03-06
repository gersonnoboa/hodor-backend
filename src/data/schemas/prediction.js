const mongoose = require("mongoose");

const predictionSchema = mongoose.Schema({
  name: String,
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
