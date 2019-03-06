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

  let predictions = [];
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
    res.status(400).send(error);
  }
});

module.exports = router;
