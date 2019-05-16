const PredictionsRepository = require("../../data/repositories/predictions.repository");

class StatisticsInteractor {
  constructor() {
    this.repository = new PredictionsRepository();
  }

  async getAllCharacterData() {
    let data = await this.repository.getPredictions();
    calculateCharacterStatistics(data);
  }

  getStatusData() {
    return this.repository.getPredictionsByStatus(status);
  }
}

function calculateCharacterStatistics(data) {
  data.forEach(element => {
    console.log(element);
  });
}

module.exports = StatisticsInteractor;
