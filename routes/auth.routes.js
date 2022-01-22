const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");
const { authorize, isAdmin } = require("../middlewares/auth.middlewares");

router.post("/login", authControllers.login);
router.post("/signup", authControllers.signUp);
router.post("/authorize", authControllers.authorize);
router.get("/confirm/:confirmationCode", authControllers.verifyUser);
router.post("/change-role", [authorize, isAdmin], authControllers.changeRole);
router.post(
  "/delete-account",
  [authorize, isAdmin],
  authControllers.deleteAccount
);
router.get("/test", [authorize, isAdmin]);
module.exports = router;
