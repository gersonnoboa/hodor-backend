const express = require("express");
const router = express.Router({mergeParams: true});
const bcrypt = require("bcrypt");

const User = require("../data/schemas/user");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already registered");
    }
  } catch(error) {
    return res.status(400).send("Error saving user.");
  } 
  
  const password = await hashedPassword(req.body.password);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
    group: req.params.group
  });

  try {
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

async function hashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);
  return hashedPw;
}

module.exports = router;
