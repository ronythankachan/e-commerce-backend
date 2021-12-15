const jwt = require("jsonwebtoken");

const authorizeToken = (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role !== "admin")
    return res.status(403).send("You don't have permission for this operation");
  next();
};
const isUser = (req, res, next) => {
  if (req.user && req.user.role !== "user")
    return res.status(403).send("You don't have permission for this operation");
  next();
};
module.exports = {
  authorizeToken,
  isAdmin,
  isUser,
};
