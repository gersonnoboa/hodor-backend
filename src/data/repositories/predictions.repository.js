const Prediction = require("../schemas/prediction");
const User = require("../schemas/user");

class PredictionsRepository {
  async getPredictions() {
    return await Prediction.find();
  }
}

module.exports = PredictionsRepository;
