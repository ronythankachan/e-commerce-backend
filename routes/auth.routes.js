const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

router.post("/login", authControllers.login);
router.post("/token", authControllers.createNewToken);
router.post("/signup", authControllers.signUp);
router.get("/confirm/:confirmationCode", authControllers.verifyUser);
router.post("/change-role", [authorize, isAdmin], authControllers.changeRole);
router.get("/test", [authorize, isAdmin]);
module.exports = router;
