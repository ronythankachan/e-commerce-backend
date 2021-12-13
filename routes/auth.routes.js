const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");

router.post("/login", authControllers.login);
router.post("/token", authControllers.createNewToken);
router.post("/signup", authControllers.signUp);
module.exports = router;
