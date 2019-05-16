const PredictionsRepository = require("../../data/repositories/predictions.repository");
const CharactersRepository = require("../../data/repositories/characters.repository");
const StatusCollection = require("../../data/models/status-collection");
const CharacterStatistic = require("../../data/models/character-statistic");

class StatisticsService {
  constructor() {
    this.predictionsRepository = new PredictionsRepository();
    this.charactersRepository = new CharactersRepository();
  }

  async getAllCharacterData() {
    let data = await this.predictionsRepository.getPredictions();
    let characters = await this.charactersRepository.getCharacters();

    let statistics = await calculateCharacterStatistics(data, characters);
    return statistics;
  }

  getStatusData() {
    return this.predictionsRepository.getPredictionsByStatus(status);
  }
}

async function calculateCharacterStatistics(data, characters) {
  let groupedCharacters = getGroupedCharacters(data);

  let charactersStatusCount = getCharacterStatusCount(groupedCharacters, characters);

  return charactersStatusCount;
}

function getGroupedCharacters(data) {
  return data.reduce(function (accumulator, current) {
    accumulator[current.name] = accumulator[current.name] || [];
    accumulator[current.name].push(current);

    return accumulator;
  }, Object.create(null));
}

function getCharacterStatusCount(data, characters) {
  let characterStatistics = [];
  
  characters.forEach(element => {
    let name = element.name;
    let dataForCharacter = data[name];
    
    var statusCollection = (dataForCharacter == undefined) ? new StatusCollection() : getStatusCollection(dataForCharacter);
    let characterStatistic = new CharacterStatistic(name, statusCollection);
    characterStatistics.push(characterStatistic);
  });

  return characterStatistics;
}

function getStatusCollection(dataForCharacter) {
  let statusCollection = dataForCharacter.reduce(function (accumulator, current) {
    if (current.status == "Alive") {
      accumulator.alive++;
    } else if (current.status == "Dead") {
      accumulator.dead++;
    } else if (current.status == "White Walker") {
      accumulator.whiteWalker++;
    }

    accumulator.total++;

    return accumulator;
  }, new StatusCollection())

  return statusCollection;
}

module.exports = StatisticsService;
