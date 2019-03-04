const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../middleware/auth");

const Group = require("../data/schemas/group");

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

module.exports = router;
