const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

const Prediction = require("../data/schemas/prediction");
const Character = require("../data/schemas/character");

router.get("/", auth, async (req, res) => {
  let user = req.user._id;
  
  try {
    const predictions = await Character.aggregate([
      {
        $lookup: {
          from: "predictions",
          let: {
            characterName: "$name"
          },
          pipeline: [{ 
            $match: { 
              $expr: {
                $and: [
                  { $eq: ["$user", mongoose.Types.ObjectId(user)] },
                  { $eq: ["$name", "$$characterName"] }
                ]
              }
            }    
          }],
          as: "prediction"
        }
      },
      {
        $project: {
          "name": 1,
          "status": 1,  
          "image": 1, 
          "user_prediction": "$prediction.status"
        }
      },
      {
        $project: {
          "prediction": 0
        }
      }
    ]);

    res.send(predictions);
  }
  catch (error) {
    return res.send(400).error(error);
  }
});

router.post("/", auth, async (req, res) => {
  const user = req.user._id;

  let predictions = [];

  if (req.body.predictions == null || req.body.predictions.length() == 0) {
    return res.status(400).send("Invalid predictions");
  }

  req.body.predictions.forEach(element => {
    let status = element.status;

    if (status != "") {
      const prediction = {
        name: element.name,
        status: element.status,
        user: user
      }

      predictions.push(prediction);
    }
  });

  try {
    let result = await Prediction.deleteMany({ user: user});
    result = await Prediction.insertMany(predictions);
    res.send({ "status": "OK" });
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
