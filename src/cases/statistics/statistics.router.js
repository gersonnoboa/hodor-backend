const express = require("express");
const router = express.Router({ mergeParams: true });

const StatisticsService = require("./statistics.service");
const service = new StatisticsService();

router.get("/characters", async (req, res) => {
  let data = await service.getAllCharacterData();

  res.status(200).send(data);
});

module.exports = router;