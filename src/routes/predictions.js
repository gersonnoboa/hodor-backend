const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../middleware/auth");

const Prediction = require("../data/schemas/prediction");

router.get("/", auth, async (req, res) => {
  let user = req.user._id;
  const predictions = await Prediction.find({ user: user});
  res.send(predictions);
});

router.post("/", auth, async (req, res) => {
  const user = req.user._id;
  const character = req.body.character;
  const status = req.body.status;

  const document = {
    character: character,
    status: status,
    user: user
  }

  try {
    const result = await Prediction.updateOne({ character: character, user: user }, document, { upsert: true });
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
