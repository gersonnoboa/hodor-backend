const express = require("express");
const router = express.Router({mergeParams: true});
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const User = require("../data/schemas/user");
const Result = require("../data/schemas/result");

router.get("/me", auth, async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  res.send({
    name: user.name,
    username: user.username
  });
});

router.get("/results", auth, async (req, res) => {
  try {
    const result = await Result.findOne({ user: req.user._id });
    res.send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  let bodyUsername = req.body.username;
  if (bodyUsername == null || bodyUsername.trim().length < 4) {
    return res.status(400).send("Username is mandatory and should be at least four characters long");
  }

  bodyUsername = bodyUsername.toLowerCase();

  try {
    let user = await User.findOne({ username: bodyUsername });
    if (user) {
      return res.status(400).send("User already registered");
    }
  } catch(error) {
    return res.status(400).send("Error saving user.");
  } 
  
  let bodyPassword = req.body.password;

  if (bodyPassword == null || bodyPassword.trim().length < 6) {
    return res.status(400).send("Password is mandatory and should be at least six characters long");
  }

  const password = await hashedPassword(bodyPassword);

  user = new User({
    username: bodyUsername,
    password: password
  });

  try {
    const result = await user.save();
    res.send({
      username: user.username
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

async function hashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);
  return hashedPw;
}

module.exports = router;
