const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order.controllers");
const {
  authorize,
  isUser,
  isAdmin,
} = require("../middlewares/auth.middlewares");

router.get("/", [authorize, isAdmin], orderControllers.getAllOrders);
router.post("/add", [authorize, isUser], orderControllers.addOrder);

module.exports = router;
