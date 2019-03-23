const express = require('express');
const Character = require("../data/schemas/character");

module.exports.fillCharacters = async function() {
  //const isCharacterListSaved = await Character.find();
  
  //if (isCharacterListSaved != null && isCharacterListSaved.length > 0) { return }

  const characterStringArray = getCharacterArray();

  const characters = characterStringArray.map(element => {
    return {
      name: element,
      status: "Alive",
      image: getImagePath(element)
    }
  });

  try {
    await Character.deleteMany();
    await Character.insertMany(characters);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

function getCharacterArray() {
  return [
    "Jon Snow",
    "Sansa Stark",
    "Arya Stark",
    "Bran Stark",
    "Cersei Lannister",
    "Jaime Lannister",
    "Tyrion Lannister",
    "Daenerys Targaryen",
    "Yara Greyjoy",
    "Theon Greyjoy",
    "Euron Greyjoy",
    "Melisandre",
    "Jorah Mormont",
    "The Hound",
    "The Mountain",
    "Samwell Tarly",
    "Gilly",
    "Sam (child)",
    "Varys",
    "Brienne of Tarth",
    "Davos Seaworth",
    "Bronn",
    "Podrick Payne",
    "Tormund Giantsbane",
    "Grey Worm",
    "Missandei",
    "Gendry",
    "Beric Dondarrion",
    "Qyburn"
  ];
}

function getImagePath(character) {
  return "/images/" + getImageName(character);
}

function getImageName(character) {
  let imageName = character.replace(/\s/g, '');
  return imageName.toLowerCase() + ".jpg";
}