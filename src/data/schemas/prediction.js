const mongoose = require("mongoose");

const predictionSchema = mongoose.Schema({
  character: String,
  status: String
});

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;