const CharacterStatistic = require("../../data/models/character-statistic");
const StatusCollection = require("../../data/models/status-collection");

module.exports.calculateCharacterStatistics = (data, characters) => {
  let groupedCharacters = getGroupedCharacters(data);
  let charactersStatusCount = getCharacterStatuses(groupedCharacters, characters);

  return charactersStatusCount;
}

function getGroupedCharacters(data) {
  return data.reduce((accumulator, current) => {
    accumulator[current.name] = accumulator[current.name] || [];
    accumulator[current.name].push(current);

    return accumulator;
  }, Object.create(null));
}

function getCharacterStatuses(data, characters) {
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
