const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");
const authMiddlewares = require("../middlewares/auth.middlewares");

router.post("/login", authControllers.login);
router.post("/token", authControllers.createNewToken);
router.get("/posts", authMiddlewares.authorizeToken, authControllers.getPosts);
router.post("/signup", authControllers.signUp);
module.exports = router;
