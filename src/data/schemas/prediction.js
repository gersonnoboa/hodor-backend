const mongoose = require("mongoose");

const predictionSchema = mongoose.Schema({
  character: String,
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
