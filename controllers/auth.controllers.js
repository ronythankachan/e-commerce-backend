const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sendConfirmationEmail } = require("../utils/email.utils");
const Role = require("../models/role.model");

let refreshTokens = [];

const login = async (req, res) => {
  const result = await User.findOne({ email: req.body.email });
  console.log(result.password);
  console.log(req.body.password);
  if (!result) return res.status(550).send({ message: "No such user" });
  if (!(await bcrypt.compare(req.body.password, result.password)))
    return res.status(401).send({ message: "Incorrect password" });
  if (result.status !== "Active")
    return res.status(403).send({ message: "Account activation pending" });
  const user = { email: req.body.email };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.send({ accessToken, refreshToken });
};

// API to add a new user into database
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
      console.log(err);
      res.status(500).send({ message: err.message });
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
const createNewToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email });
    res.send({ accessToken: accessToken });
  });
};

// Create a new access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};

module.exports = {
  login,
  createNewToken,
  signUp,
  verifyUser,
};
