const express = require("express");
const router = express.Router({mergeParams: true});

const Group = require("../data/schemas/group");

router.get("/", async (req, res) => {
  const groups = await Group.find();
  res.send(groups);
});

router.post("/", async (req, res) => {
  const group = new Group({
    name: req.body.name
  });

  try {
    const result = await group.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
