class UserStatistic {
  constructor() {
    this.cerseiAlive = false;
    this.daenerysAlive = false;

    this.jonAlive = false;
    this.sansaAlive = false;
    this.aryaAlive = false;
    this.branAlive = false;

    this.atLeastOneWhiteWalker = false;

    this.houndAlive = false;
    this.mountainAlive = false;
  }

  determineStatus(element) {
    if (this.isAlive("Cersei Lannister", element)) {
      this.cerseiAlive = true;
    }

    if (this.isAlive("Daenerys Targaryen", element)) {
      this.daenerysAlive = true;
    }

    if (this.isAlive("Jon Snow", element)) {
      this.jonAlive = true;
    }

    if (this.isAlive("Sansa Stark", element)) {
      this.sansaAlive = true;
    }

    if (this.isAlive("Arya Stark", element)) {
      this.aryaAlive = true;
    }

    if (this.isAlive("Bran Stark", element)) {
      this.branAlive = true;
    }

    if (this.isAlive("The Hound", element)) {
      this.houndAlive = true;
    }

    if (this.isAlive("The Mountain", element)) {
      this.mountainAlive = true;
    }

    this.checkWhiteWalker(element);
  }

  isAlive(character, element) {
    return (element.name == character && element.status == "Alive");
  }

  checkWhiteWalker(element) {
    if (element.status == "White Walker") {
      this.hasWhiteWalker = true;
    }
  }
}

module.exports = UserStatistic;
