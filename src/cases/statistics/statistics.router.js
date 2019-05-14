const express = require("express");
const router = express.Router({ mergeParams: true });

const StatisticsPresenter = require("./statistics.presenter");
const presenter = new StatisticsPresenter();

router.get("/characters", async (req, res) => {
  await presenter.getAllCharacterData();

  res.status(200).send("Ok");
});

module.exports = router;