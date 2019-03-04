const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../middleware/auth");

const Group = require("../data/schemas/group");

router.get("/", auth, async (req, res) => {
  const user = req.user._id;

  const groups = await Group.find({ user: user});
  res.send(groups);
});

router.post("/", auth, async (req, res) => {
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

router.post("/join", auth, async (req, res) => {
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
