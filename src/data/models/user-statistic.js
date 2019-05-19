class UserStatistic {
  constructor() {
    this.isCerseiAlive = false;
    this.isDaenerysAlive = false;

    this.isJonAlive = false;
    this.isSansaAlive = false;
    this.isAryaAlive = false;
    this.isBranAlive = false;
    
    this.isHoundAlive = false;
    this.isMountainAlive = false;

    this.isNightKingAlive = false;
  }

  determineStatus(element) {
    if (this.isAlive("Cersei Lannister", element)) {
      this.isCerseiAlive = true;
    }

    if (this.isAlive("Daenerys Targaryen", element)) {
      this.isDaenerysAlive = true;
    }

    if (this.isAlive("Jon Snow", element)) {
      this.isJonAlive = true;
    }

    if (this.isAlive("Sansa Stark", element)) {
      this.isSansaAlive = true;
    }

    if (this.isAlive("Arya Stark", element)) {
      this.isAryaAlive = true;
    }

    if (this.isAlive("Bran Stark", element)) {
      this.isBranAlive = true;
    }

    if (this.isAlive("The Hound", element)) {
      this.isHoundAlive = true;
    }

    if (this.isAlive("The Mountain", element)) {
      this.isMountainAlive = true;
    }

    this.checkWhiteWalker(element);
  }

  isAlive(character, element) {
    return (element.name == character && element.status == "Alive");
  }

  checkWhiteWalker(element) {
    if (element.status == "White Walker") {
      this.isNightKingAlive = true;
    }
  }
}

module.exports = UserStatistic;
