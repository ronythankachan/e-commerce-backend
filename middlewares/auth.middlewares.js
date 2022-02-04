const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (token == null)
    return res.status(401).send({ message: "Missing access token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Authorization failed" });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && !req.user.admin)
    return res
      .status(403)
      .send({ message: "You don't have permission for this operation" });
  next();
};
const isUser = (req, res, next) => {
  if (req.user && req.user.admin)
    return res
      .status(403)
      .send({ message: "You don't have permission for this operation" });
  next();
};

module.exports = {
  authorize,
  isAdmin,
  isUser,
};
