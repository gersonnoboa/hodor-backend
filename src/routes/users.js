const express = require("express");
const router = express.Router({mergeParams: true});
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const User = require("../data/schemas/user");

router.get("/me", auth, async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  res.send({
    name: user.name,
    username: user.username
  });
});

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).send("User already registered");
    }
  } catch(error) {
    return res.status(400).send("Error saving user.");
  } 
  
  const password = await hashedPassword(req.body.password);

  user = new User({
    name: req.body.name,
    username: req.body.username,
    password: password
  });

  try {
    const result = await user.save();
    res.send({
      username: user.username
    });
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
