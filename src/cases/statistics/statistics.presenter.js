const StatisticsInteractor = require("../../cases/statistics/statistics.interactor");

class StatisticsPresenter {
  constructor() {
    this.interactor = new StatisticsInteractor();
  }

  async getAllCharacterData() {
    let data = await this.interactor.getAllCharacterData();

    return data;
  }

  async getStatusData() {
    let data = await this.repository.getPredictionsByStatus(status);

    return data;
  }
}

module.exports = StatisticsPresenter;
