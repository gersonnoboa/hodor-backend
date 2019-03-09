const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");

const GroupUser = require("../data/schemas/group-user");
const Group = require("../data/schemas/group");

router.get("/", auth, async (req, res) => {
  const user = req.user._id;

  const groupUsers = await GroupUser
  .find({ user: user })
  .populate( {
    path: "group",
    model: Group
  });
  res.send(groupUsers);
});

router.get("/:id", auth, async (req, res) => {
  const users = await GroupUser.find({group: req.params.id})
  res.send(users);
});

router.post("/", auth, async (req, res) => {
  const user = req.user._id;

  const groupId = req.body.group;
  if (groupId == null || groupId.trim() == "") {
    return res.status(400).send("Group ID cannot be empty");
  }

  const previous = await GroupUser.findOne({ user: user, group: groupId});
  if (previous) { return res.status(400).send("You have already joined that group"); }

  const existingGroup = await Group.findOne({ _id: groupId})
  if (!existingGroup) { return res.status(400).send("Invalid group ID"); }

  const group = new GroupUser({
    user: user,
    group: groupId
  });

  try {
    const result = await group.save();
    res.send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;