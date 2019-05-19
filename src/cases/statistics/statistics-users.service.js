const UserStatistic = require("../../data/models/user-statistic");

module.exports.calculateUserStatistics = (data) => {
  let groupedUsers = getGroupedUsers(data);
  let statistics = generateUserStatistics(groupedUsers);

  return statistics;
}

function getGroupedUsers(data) {
  return data.reduce((accumulator, current) => {
    accumulator[current.user] = accumulator[current.user] || [];
    accumulator[current.user].push(current);

    return accumulator;
  }, Object.create(null));
}

function generateUserStatistics(data) {
  let statistics = [];

  for (var user in data) {
    let userData = data[user];
    let statistic = new UserStatistic();

    userData.forEach(element => {
      statistic.determineStatus(element);
    });

    statistics.push(statistic);
  }

  return statistics;
}
