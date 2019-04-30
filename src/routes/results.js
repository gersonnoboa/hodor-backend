const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

const Result = require("../data/schemas/result");
const Prediction = require("../data/schemas/prediction");
const Character = require("../data/schemas/character");
const User = require("../data/schemas/user");

router.get("/", async (req, res) => {
  await Result.deleteMany();

  try {
    const predictions = await Prediction.aggregate([
      {
        $group: {
          count: { $sum: 1 },
          _id: "$user",
          "predictions": {
            $push: "$$ROOT"
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
    ]);

    const characters = await Character.find();
    const results = calculateScores(predictions, characters);
    await Result.insertMany(results);
    
    res.send(results);
  } catch(error) {
    return res.status(400).send(error);
  }
});

router.get("/user", auth, async (req, res) => {
  let id = req.user._id;

  try {
    const predictions = await Prediction.aggregate([
      {
        $match: { "user": new mongoose.Types.ObjectId(id) }
      },
      {
        $group: {
          count: { $sum: 1 },
          _id: "$user",
          "predictions": {
            $push: "$$ROOT"
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
    ]);

    const characters = await Character.find();
    const results = calculateScores(predictions, characters);
    await Result.deleteMany({ user: id });
    await Result.insertMany(results);

    res.send(results);
  } catch (error) {
    return res.status(400).send(error);
  }
});

function calculateScores(dbData, characterData) {
  let results = [];

  dbData.forEach(element => {
    let score = 0;

    element.predictions.forEach(element => {
      const character = characterData.filter(character => character.name == element.name)[0];
      if (character.status == element.status) {
        score++;
      }  
    });

    const userId = element.user._id;
    const userName = element.user.username;
    const name = element.user.name;

    const result = {
      user: userId,
      score: score,
      username: userName,
      name: name
    }

    results.push(result);
  });

  return results;
}

module.exports = router;