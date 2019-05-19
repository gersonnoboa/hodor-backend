const PredictionsRepository = require("../../data/repositories/predictions.repository");
const CharactersRepository = require("../../data/repositories/characters.repository");

const StatisticsCharacterService = require("./statistics-characters.service.js");
const StatisticsUsersService = require("./statistics-users.service.js");

class StatisticsService {
  constructor() {
    this.predictionsRepository = new PredictionsRepository();
    this.charactersRepository = new CharactersRepository();
  }

  async getAllCharacterData() {
    let characterData = await this.predictionsRepository.getPredictions();
    let characters = await this.charactersRepository.getCharacters();

    let characterStatistics = StatisticsCharacterService.calculateCharacterStatistics(characterData, characters);
    let userStatistics = StatisticsUsersService.calculateUserStatistics(characterData);

    return {
      characterStatistics: characterStatistics,
      userStatistics: userStatistics
    };
  }
}

module.exports = StatisticsService;
