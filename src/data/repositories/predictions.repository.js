const Prediction = require("../schemas/prediction");

class PredictionsRepository {
  async getPredictions() {
    return await Prediction.find();
  }
}

module.exports = PredictionsRepository;