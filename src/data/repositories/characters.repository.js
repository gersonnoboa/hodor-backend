const Character = require("../schemas/character");

class CharactersRepository {
  async getCharacters() {
    return await Character.find();
  }
}

module.exports = CharactersRepository;