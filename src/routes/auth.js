const express = require("express");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcrypt");

const User = require("../data/schemas/user");

router.post("/", async (req, res) => {
  let username = req.body.username.toLowerCase();

  let user = await User.findOne({ username: username });
  if (!user) { return res.status(400).send("Invalid username or password"); }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) { return res.status(400).send("Invalid username or password"); }

  const token = user.generateAuthToken();
  res.send({ token: token });
});

module.exports = router;