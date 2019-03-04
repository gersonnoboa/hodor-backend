const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");

const GroupUser = require("../data/schemas/group-user");

router.get("/", auth, async (req, res) => {
  const user = req.user._id;

  const groupUsers = await GroupUser.find({ user: user });
  res.send(groupUsers);
});

router.get("/:id", auth, async (req, res) => {
  const users = await GroupUser.find({group: req.params.id})
  res.send(users);
});

router.post("/", auth, async (req, res) => {
  const user = req.user._id;

  const group = new GroupUser({
    user: user,
    group: req.body.group  
  });

  try {
    const result = await group.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;