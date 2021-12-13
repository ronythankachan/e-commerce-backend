const jwt = require("jsonwebtoken");

const authorizeToken = (req, res, next) => {
  console.log("Authorize token");
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
module.exports = {
  authorizeToken,
};
