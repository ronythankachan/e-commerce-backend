const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

let refreshTokens = [];

const login = async (req, res) => {
  const error = validateLoginData(req.body);
  if (error) return res.status(400).send({ message: error });
  const result = await User.findOne({ email: req.body.email });
  if (!result) return res.status(550).send({ message: "E-mail doesn't exist" });
  if (!(await bcrypt.compare(req.body.password, result.password)))
    return res.status(401).send({ message: "Incorrect password" });
  if (result.status === "Pending")
    return res.status(403).send("Account activation pending");
  const user = { email: req.body.email };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.send({ accessToken, refreshToken });
};

const validateLoginData = (data) => {
  let message = "";
  if (!data.email) message = "Email field is missing";
  else if (!/\S+@\S+\.\S+/.test(data.email)) message = "Invalid e-mail";
  else if (!data.password) message = "Password field is missing";
  return message;
};

// API to add a new user into database
const signUp = async (req, res) => {
  const error = validateSignUpData(req.body);
  if (error) return res.status(400).send({ message: error });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    confirmationCode: generateConfirmationCode(),
  });
  const userExists = await User.exists({ email: req.body.email });
  if (userExists)
    return res.status(409).send({ message: "User already exists" });
  newUser
    .save()
    .then(() => {
      res.send({
        message: "Accout created. Check your email for verification",
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
// validate signup data
const validateSignUpData = (data) => {
  let message = "";
  if (!data.name) message = "Name is missing";
  else if (!/^[a-zA-Z ]+$/.test(data.name))
    message = "Name should only contain letters";
  else if (!data.email) message = "E-mail is missing";
  else if (!/\S+@\S+\.\S+/.test(data.email)) message = "Invalid e-mail";
  else if (!data.phone) message = "Phone number is missing";
  else if (!/^[789]\d{9}$/.test(data.phone)) message = "Invalid phone number";
  else if (!data.password) message = "Password field is missing";
  else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(data.password)
  )
    message =
      "Password should atleast contain 8 characters including one uppercase letter, one special character and a number";
  return message;
};

// Function to send an e mail verification for authentication
const sendEmailVerification = (email) => {};

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
};
