const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sendConfirmationEmail } = require("../helpers/email.helper");
const RefreshToken = require("../models/refresh-tokens.model");

// Login
const login = async (req, res) => {
  const result = await User.findOne({ email: req.body.email });
  if (!result) return res.status(550).send({ message: "No such user" });
  if (!(await bcrypt.compare(req.body.password, result.password)))
    return res.status(401).send({ message: "Incorrect password" });
  if (result.status !== "Active")
    return res.status(403).send({ message: "Account activation pending" });
  const user = { email: result.email, admin: result.admin };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  new RefreshToken({ refreshToken }).save();
  res.send({ accessToken, refreshToken });
};

// Add new user
const signUp = async (req, res) => {
  const user = req.body;
  try {
    const confirmationCode = generateConfirmationCode();
    await new User({ ...user, confirmationCode }).save();
    sendConfirmationEmail(user.name, user.email, confirmationCode);
    res.send({ message: "Accout created. Check your email for verification" });
  } catch (err) {
    if (err.code === 11000)
      res.status(409).send({ message: "User is already exists" });
    else res.status(500).send("Failed to add account");
  }
};

// Admin - change role of users.
const changeRole = async (req, res) => {
  if (!req.admin || !req._id)
    return res
      .status(400)
      .send({ message: "_id field and admin boolean value is required" });
  try {
    await User.findByIdAndUpdate(req._id, { admin: req.admin });
    res.send({ message: `Role changed to ${req.admin}` });
  } catch (err) {
    res.status(500).send({ message: "Failed to change user role" });
  }
};

// Admin - Delete a user account.
const deleteAccount = async (req, res) => {
  if (!req._id) return res.status(400).send("_id field is missing");
  try {
    await User.findByIdAndDelete(req._id);
    res.send({ message: "Account deleted" });
  } catch (err) {
    res.status(500).send({ message: "Failed to delete account" });
  }
};

// Account activation by email verification
const verifyUser = async (req, res) => {
  const confirmationCode = req.params.confirmationCode;
  try {
    const user = await User.findOne({ confirmationCode });
    if (!user) return res.status(404).send({ message: "User not found" });
    user.status = "Active";
    await user.save();
    res.send({ message: "Account activated successfully" });
  } catch (err) {
    res.status(500).send({ message: "Account activation failed" });
  }
};

// Generate a confirmation code for signup verification from email
const generateConfirmationCode = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 25; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
};

// Check if a token is valid
const authorize = async (req, res) => {
  const accessToken = req.body.accessToken;
  if (!accessToken)
    return res.status(401).send({ message: "Token is missing" });
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.send({ message: "Token is valid" });
  } catch (err) {
    res.status(403).send({ message: "Invalid token" });
  }
};

// Create a new access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

module.exports = {
  login,
  authorize,
  signUp,
  verifyUser,
  changeRole,
  deleteAccount,
};
