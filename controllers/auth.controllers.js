const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sendConfirmationEmail } = require("../helpers/email.helper");
const Role = require("../models/role.model");
const RefreshToken = require("../models/refresh-tokens.model");

// Login
const login = async (req, res) => {
  const result = await User.findOne({ email: req.body.email }).populate("role");
  if (!result) return res.status(550).send({ message: "No such user" });
  if (!(await bcrypt.compare(req.body.password, result.password)))
    return res.status(401).send({ message: "Incorrect password" });
  if (result.status !== "Active")
    return res.status(403).send({ message: "Account activation pending" });
  const user = { email: req.body.email, role: result.role.name };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  new RefreshToken({ refreshToken: refreshToken }).save();
  res.send({ accessToken, refreshToken });
};

// Add new user
const signUp = async (req, res) => {
  let { name, email, phone, password } = req.body;
  const confirmationCode = generateConfirmationCode();
  const role = await Role.findOne({ name: "user" });
  const user = new User({
    name,
    email,
    password,
    phone,
    confirmationCode,
    role: role._id,
  });
  user
    .save()
    .then(() => {
      sendConfirmationEmail(name, email, confirmationCode);
      res.send({
        message: "Accout created. Check your email for verification",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
// Admin - change role of users.
const changeRole = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role)
    return res.status(400).send({ message: "Invalid input" });
  const roleData = await Role.findOne({ name: role });
  User.findOneAndUpdate({ email: req.body.email }, { role: roleData._id })
    .then(() => {
      res.send({ message: `Role is changed to ${role}` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Admin - Delete a user account.
const deleteAccount = async (req, res) => {
  if (!req.body.email) return res.status(400).send("user email is required");
  User.deleteOne({ email: req.body.email })
    .then(() => {
      res.send({ message: "Account deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Failed to delete account" });
    });
};

// Account activation by email verification
const verifyUser = async (req, res) => {
  const confirmationCode = req.params.confirmationCode;
  const user = await User.findOne({ confirmationCode });
  if (!user) return res.status(404).send({ message: "User not found" });
  user.status = "Active";
  user
    .save()
    .then(() => {
      res.send({ message: "Account activated successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Account activation failed" });
    });
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

// Create a new JWT token from refresh token
const createNewToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const tokenExists = await RefreshToken.exists({ refreshToken: refreshToken });
  if (!tokenExists)
    return res.status(403).send({ message: "Invalid refresh token" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .send({ message: "Refresh token validation failed" });
    const accessToken = generateAccessToken({ email: user.email });
    res.send({ accessToken: accessToken, refreshToken: refreshToken });
  });
};

// Create a new access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = {
  login,
  createNewToken,
  signUp,
  verifyUser,
  changeRole,
  deleteAccount,
};
