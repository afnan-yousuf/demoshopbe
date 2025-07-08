const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmailforVerification = require("../util/email");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send({ data: users, success: true });
});

router.post("/register", async (req, res) => {
  const { username, email, password, phone, dob } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hash,
    phone: phone,
    dob: dob,
  });
  newUser
    .save()
    .then(() => {
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      sendEmailforVerification(email, token);
      res.send({ msg: "User Registered", success: true });
    })
    .catch((error) => {
      res.send({
        msg: "Error while registrations",
        success: false,
        error: error,
      });
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: username }, { username: username }],
  });
  if (!user) return res.status(400).json({ msg: "Invalid Username or Email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  if (!user.isvarified) {
    return res.status(403).json({ msg: "Please verify your email first" });
  }

  res.json({ token, user: { id: user._id, userName: user.userName } });
});

router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.isvarified) return res.json({ msg: "Email already verified" });

    user.isvarified = true;
    await user.save();

    res.json({ msg: "Email verified successfully!" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
});

module.exports = router;
