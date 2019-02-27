const express = require("express");
const router = express.Router({mergeParams: true});

const Prediction = require("../data/schemas/prediction");

router.get("/", async (req, res) => {
  const predictions = await Prediction.find();
  res.send(predictions);
});

router.post("/", async (req, res) => {
  const prediction = new Prediction({
    character: req.body.character,
    status: req.body.status
  });

  try {
    const result = await prediction.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;